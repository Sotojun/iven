import Phaser from 'phaser';
import { COLORS } from '../utils/colors';

export class BootScene extends Phaser.Scene {
  constructor() {
    super('boot');
  }

  preload(): void {
    this.createTexture('player', 30, 40, COLORS.player);
    this.createTexture('enemy', 30, 30, COLORS.enemy);
    this.createTexture('collectible', 18, 18, COLORS.collectible);
    this.createTexture('platform', 64, 20, COLORS.platform);
    this.createTexture('hazard', 64, 16, COLORS.hazard);
    this.createTexture('goal', 48, 96, COLORS.goal);
    this.createTexture('checkpoint', 30, 72, COLORS.checkpoint);
  }

  create(): void {
    this.scene.start('menu');
  }

  private createTexture(key: string, w: number, h: number, color: number): void {
    const g = this.add.graphics();
    g.fillStyle(color, 1);
    g.fillRoundedRect(0, 0, w, h, 8);
    g.generateTexture(key, w, h);
    g.destroy();
  }
}
