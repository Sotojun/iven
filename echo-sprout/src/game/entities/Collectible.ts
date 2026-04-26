import type Phaser from 'phaser';
import { COLORS } from '../utils/colors';

export class Collectible {
  readonly sprite: Phaser.Physics.Arcade.Sprite;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.sprite = scene.physics.add.sprite(x, y, 'collectible').setTint(COLORS.collectible);
    const body = this.sprite.body as Phaser.Physics.Arcade.Body;
    body.setAllowGravity(false);
  }
}
