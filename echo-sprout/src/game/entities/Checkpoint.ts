import type Phaser from 'phaser';
import { COLORS } from '../utils/colors';

export class Checkpoint {
  readonly sprite: Phaser.Physics.Arcade.Sprite;
  activated = false;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.sprite = scene.physics.add.sprite(x, y, 'checkpoint').setTint(COLORS.checkpoint);
    const body = this.sprite.body as Phaser.Physics.Arcade.Body;
    body.setAllowGravity(false);
    this.sprite.setImmovable(true);
  }

  activate(): void {
    this.activated = true;
    this.sprite.setTint(0xffffff);
  }
}
