import type Phaser from 'phaser';
import { JUMP_VELOCITY, PLAYER_SPEED } from '../utils/constants';
import { COLORS } from '../utils/colors';

export class Player {
  readonly sprite: Phaser.Physics.Arcade.Sprite;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.sprite = scene.physics.add.sprite(x, y, 'player');
    this.sprite.setTint(COLORS.player);
    this.sprite.setCollideWorldBounds(true);
    this.sprite.setBounce(0.02);
  }

  move(left: boolean, right: boolean): void {
    if (left) {
      this.sprite.setVelocityX(-PLAYER_SPEED);
      this.sprite.setFlipX(true);
    } else if (right) {
      this.sprite.setVelocityX(PLAYER_SPEED);
      this.sprite.setFlipX(false);
    } else {
      this.sprite.setVelocityX(0);
    }
  }

  jump(): void {
    if (this.sprite.body?.blocked.down || this.sprite.body?.touching.down) {
      this.sprite.setVelocityY(JUMP_VELOCITY);
    }
  }

  respawn(x: number, y: number): void {
    this.sprite.setPosition(x, y);
    this.sprite.setVelocity(0, 0);
  }
}
