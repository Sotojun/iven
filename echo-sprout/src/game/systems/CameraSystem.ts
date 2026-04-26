import type { Player } from '../entities/Player';

export class CameraSystem {
  constructor(private readonly scene: Phaser.Scene) {}

  follow(player: Player, worldWidth: number): void {
    this.scene.cameras.main.startFollow(player.sprite, true, 0.08, 0.08);
    this.scene.cameras.main.setBounds(0, 0, worldWidth, 720);
  }
}
