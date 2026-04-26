import type Phaser from 'phaser';
import { COLORS } from '../utils/colors';

export class MovingPlatform {
  readonly sprite: Phaser.Physics.Arcade.Sprite;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    width: number,
    height: number,
    toX: number,
    toY: number,
    duration: number
  ) {
    this.sprite = scene.physics.add
      .sprite(x, y, 'platform')
      .setDisplaySize(width, height)
      .setTint(COLORS.platform)
      .setImmovable(true);

    const body = this.sprite.body as Phaser.Physics.Arcade.Body;
    body.setAllowGravity(false);

    scene.tweens.add({
      targets: this.sprite,
      x: toX,
      y: toY,
      duration,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.inOut'
    });
  }
}
