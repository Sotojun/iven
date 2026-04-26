import type Phaser from 'phaser';
import { COLORS } from '../utils/colors';

export class Enemy {
  readonly sprite: Phaser.Physics.Arcade.Sprite;
  private readonly startX: number;
  private readonly patrol: number;

  constructor(scene: Phaser.Scene, x: number, y: number, patrol: number) {
    this.sprite = scene.physics.add.sprite(x, y, 'enemy').setTint(COLORS.enemy);
    this.startX = x;
    this.patrol = patrol;
    this.sprite.setVelocityX(90);
    this.sprite.setCollideWorldBounds(true);
  }

  update(): void {
    if (this.sprite.x > this.startX + this.patrol) {
      this.sprite.setVelocityX(-90);
      this.sprite.setFlipX(true);
    } else if (this.sprite.x < this.startX - this.patrol) {
      this.sprite.setVelocityX(90);
      this.sprite.setFlipX(false);
    }
  }
}
