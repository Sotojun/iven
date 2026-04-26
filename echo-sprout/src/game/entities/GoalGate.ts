import type Phaser from 'phaser';
import { COLORS } from '../utils/colors';

export class GoalGate {
  readonly sprite: Phaser.Physics.Arcade.Sprite;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.sprite = scene.physics.add.sprite(x, y, 'goal').setTint(COLORS.goal);
    const body = this.sprite.body as Phaser.Physics.Arcade.Body;
    body.setAllowGravity(false);
    this.sprite.setImmovable(true);
  }
}
