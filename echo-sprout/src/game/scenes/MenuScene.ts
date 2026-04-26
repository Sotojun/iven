import Phaser from 'phaser';
import { COLORS } from '../utils/colors';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super('menu');
  }

  create(): void {
    this.cameras.main.setBackgroundColor(COLORS.sky);

    this.add.text(640, 200, 'Echo Sprout', {
      fontFamily: 'Arial Black',
      fontSize: '72px',
      color: COLORS.text
    }).setOrigin(0.5);

    this.add.text(640, 290, 'Ten Tiny Worlds', {
      fontFamily: 'Arial',
      fontSize: '36px',
      color: '#b9c6ff'
    }).setOrigin(0.5);

    const start = this.add.text(640, 420, 'Press SPACE to Start', {
      fontFamily: 'Arial',
      fontSize: '30px',
      color: '#89f0ba'
    }).setOrigin(0.5);

    this.tweens.add({ targets: start, alpha: 0.3, yoyo: true, repeat: -1, duration: 700 });

    this.input.keyboard?.once('keydown-SPACE', () => {
      this.scene.start('level-select');
    });
  }
}
