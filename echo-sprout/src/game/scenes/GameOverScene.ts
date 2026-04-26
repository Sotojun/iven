import Phaser from 'phaser';

export class GameOverScene extends Phaser.Scene {
  constructor() {
    super('game-over');
  }

  create(data: { levelId?: number }): void {
    const levelId = data.levelId ?? 1;

    this.add.text(640, 280, 'Try Again, Sprout!', {
      fontFamily: 'Arial Black',
      fontSize: '58px',
      color: '#ff8d8d'
    }).setOrigin(0.5);

    this.add
      .text(640, 390, 'R: Retry  |  L: Level Select', {
        fontFamily: 'Arial',
        fontSize: '30px',
        color: '#f2f6ff'
      })
      .setOrigin(0.5);

    this.input.keyboard?.once('keydown-R', () => this.scene.start('play', { levelId }));
    this.input.keyboard?.once('keydown-L', () => this.scene.start('level-select'));
  }
}
