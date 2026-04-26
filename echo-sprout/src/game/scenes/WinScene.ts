import Phaser from 'phaser';

export class WinScene extends Phaser.Scene {
  constructor() {
    super('win');
  }

  create(data: { levelId: number; next: number | null }): void {
    this.add.text(640, 250, `World ${data.levelId} Cleared!`, {
      fontFamily: 'Arial Black',
      fontSize: '56px',
      color: '#ffe28c'
    }).setOrigin(0.5);

    const message = data.next
      ? `Press SPACE for World ${data.next}\nPress L for Level Select`
      : 'You finished all 10 worlds!\nPress L for Level Select';

    this.add
      .text(640, 390, message, {
        fontFamily: 'Arial',
        fontSize: '30px',
        color: '#f2f6ff',
        align: 'center'
      })
      .setOrigin(0.5);

    if (data.next) {
      this.input.keyboard?.once('keydown-SPACE', () => this.scene.start('play', { levelId: data.next }));
    }
    this.input.keyboard?.once('keydown-L', () => this.scene.start('level-select'));
  }
}
