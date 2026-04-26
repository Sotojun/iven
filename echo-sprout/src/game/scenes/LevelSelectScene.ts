import Phaser from 'phaser';
import { MAX_LEVELS } from '../utils/constants';
import { SaveSystem } from '../systems/SaveSystem';

export class LevelSelectScene extends Phaser.Scene {
  constructor() {
    super('level-select');
  }

  create(): void {
    const save = new SaveSystem();
    const unlocked = save.getUnlockedLevel();

    this.add.text(640, 80, 'Choose a Tiny World', {
      fontFamily: 'Arial',
      fontSize: '42px',
      color: '#f2f6ff'
    }).setOrigin(0.5);

    for (let i = 1; i <= MAX_LEVELS; i += 1) {
      const x = 220 + ((i - 1) % 5) * 210;
      const y = 220 + Math.floor((i - 1) / 5) * 220;
      const enabled = i <= unlocked;
      const label = this.add
        .text(x, y, `World ${i}\nBest seeds: ${save.getBestCollectibles(i)}`, {
          fontFamily: 'Arial',
          fontSize: '24px',
          align: 'center',
          color: enabled ? '#89f0ba' : '#6a718f',
          backgroundColor: '#1b2240',
          padding: { x: 12, y: 10 }
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: enabled });

      if (enabled) {
        label.on('pointerdown', () => {
          this.scene.start('play', { levelId: i });
        });
      }
    }

    this.add
      .text(640, 640, 'ESC: Main Menu', { fontFamily: 'Arial', fontSize: '22px', color: '#f2f6ff' })
      .setOrigin(0.5);

    this.input.keyboard?.once('keydown-ESC', () => this.scene.start('menu'));
  }
}
