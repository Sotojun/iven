import Phaser from 'phaser';
import { CameraSystem } from '../systems/CameraSystem';
import { HudSystem } from '../systems/HudSystem';
import { InputSystem } from '../systems/InputSystem';
import { LevelManager } from '../systems/LevelManager';
import { SaveSystem } from '../systems/SaveSystem';
import { AudioSystem } from '../systems/AudioSystem';
import { Player } from '../entities/Player';
import { Enemy } from '../entities/Enemy';
import { Collectible } from '../entities/Collectible';
import { MovingPlatform } from '../entities/MovingPlatform';
import { Hazard } from '../entities/Hazard';
import { GoalGate } from '../entities/GoalGate';
import { Checkpoint } from '../entities/Checkpoint';
import { MAX_LEVELS } from '../utils/constants';
import { COLORS } from '../utils/colors';

export class PlayScene extends Phaser.Scene {
  private levelId = 1;
  private inputSystem!: InputSystem;
  private audioSystem!: AudioSystem;
  private player!: Player;
  private enemies: Enemy[] = [];
  private collectibles!: Phaser.Physics.Arcade.Group;
  private checkpoints: Checkpoint[] = [];
  private spawnPoint = { x: 120, y: 420 };
  private found = 0;
  private total = 0;

  constructor() {
    super('play');
  }

  create(data: { levelId?: number }): void {
    this.levelId = data.levelId ?? 1;
    const manager = new LevelManager();
    const level = manager.getById(this.levelId);

    this.cameras.main.setBackgroundColor(COLORS.midSky);
    this.physics.world.setBounds(0, 0, level.worldWidth, 720);

    this.inputSystem = new InputSystem(this);
    this.audioSystem = new AudioSystem(this);

    const platforms = this.physics.add.staticGroup();
    level.platforms.forEach((p) => {
      const block = this.add.rectangle(p.x, p.y, p.w, p.h, COLORS.ground);
      this.physics.add.existing(block, true);
      platforms.add(block as unknown as Phaser.Types.Physics.Arcade.GameObjectWithBody);
    });

    const movingGroup = this.physics.add.group({ allowGravity: false, immovable: true });
    level.movingPlatforms.forEach((p) => {
      const moving = new MovingPlatform(this, p.x, p.y, p.w, p.h, p.toX, p.toY, p.duration);
      movingGroup.add(moving.sprite);
    });

    this.player = new Player(this, level.playerSpawn.x, level.playerSpawn.y);
    this.spawnPoint = { ...level.playerSpawn };

    this.enemies = level.enemies.map((e) => new Enemy(this, e.x, e.y, e.patrol));
    const enemyGroup = this.physics.add.group(this.enemies.map((e) => e.sprite));

    this.collectibles = this.physics.add.group();
    level.collectibles.forEach((c) => {
      this.collectibles.add(new Collectible(this, c.x, c.y).sprite);
    });
    this.total = level.collectibles.length;

    const hazards = this.physics.add.group({ allowGravity: false, immovable: true });
    level.hazards.forEach((h) => hazards.add(new Hazard(this, h.x, h.y, h.w, h.h).sprite));

    const goal = new GoalGate(this, level.goal.x, level.goal.y);

    this.checkpoints = level.checkpoints.map((p) => new Checkpoint(this, p.x, p.y));
    const checkpointGroup = this.physics.add.group(this.checkpoints.map((c) => c.sprite));

    this.physics.add.collider(this.player.sprite, platforms);
    this.physics.add.collider(this.player.sprite, movingGroup);
    this.physics.add.collider(enemyGroup, platforms);
    this.physics.add.collider(this.collectibles, platforms);

    this.physics.add.overlap(this.player.sprite, enemyGroup, () => this.handleDeath());
    this.physics.add.overlap(this.player.sprite, hazards, () => this.handleDeath());

    this.physics.add.overlap(this.player.sprite, this.collectibles, (_, item) => {
      item.destroy();
      this.found += 1;
      this.audioSystem.beep(620, 0.07, 'triangle');
      hud.setCollectibles(this.found, this.total);
    });

    this.physics.add.overlap(this.player.sprite, checkpointGroup, (_, point) => {
      const checkpoint = this.checkpoints.find((c) => c.sprite === point);
      if (checkpoint && !checkpoint.activated) {
        checkpoint.activate();
        this.spawnPoint = { x: checkpoint.sprite.x, y: checkpoint.sprite.y - 50 };
        this.audioSystem.beep(520, 0.08, 'sawtooth');
      }
    });

    this.physics.add.overlap(this.player.sprite, goal.sprite, () => {
      const save = new SaveSystem();
      save.setBestCollectibles(this.levelId, this.found);
      if (this.levelId < MAX_LEVELS) {
        save.unlock(this.levelId + 1);
        this.scene.start('win', { levelId: this.levelId, next: this.levelId + 1 });
      } else {
        this.scene.start('win', { levelId: this.levelId, next: null });
      }
    });

    const hud = new HudSystem(this);
    hud.setLevel(level.name);
    hud.setCollectibles(this.found, this.total);

    new CameraSystem(this).follow(this.player, level.worldWidth);

    this.input.keyboard?.once('keydown-ESC', () => this.scene.start('level-select'));
  }

  update(): void {
    this.player.move(this.inputSystem.leftPressed(), this.inputSystem.rightPressed());

    if (this.inputSystem.jumpPressed()) {
      this.player.jump();
      this.audioSystem.beep(380, 0.05, 'square');
    }

    this.enemies.forEach((enemy) => enemy.update());

    if (this.player.sprite.y > 900) {
      this.handleDeath();
    }
  }

  private handleDeath(): void {
    this.audioSystem.beep(180, 0.2, 'sawtooth');
    this.player.respawn(this.spawnPoint.x, this.spawnPoint.y);
  }
}
