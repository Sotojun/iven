import type Phaser from 'phaser';
import { COLORS } from '../utils/colors';

export class Hazard {
  readonly sprite: Phaser.Physics.Arcade.Sprite;

  constructor(scene: Phaser.Scene, x: number, y: number, w: number, h: number) {
    this.sprite = scene.physics.add
      .sprite(x, y, 'hazard')
      .setDisplaySize(w, h)
      .setImmovable(true)
      .setTint(COLORS.hazard);

    const body = this.sprite.body as Phaser.Physics.Arcade.Body;
    body.setAllowGravity(false);
  }
}
