import { COLORS } from '../utils/colors';

export class HudSystem {
  private readonly levelText: Phaser.GameObjects.Text;
  private readonly collectiblesText: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene) {
    this.levelText = scene.add
      .text(20, 20, '', {
        fontFamily: 'Arial',
        fontSize: '24px',
        color: COLORS.text
      })
      .setScrollFactor(0)
      .setDepth(1000);

    this.collectiblesText = scene.add
      .text(20, 52, '', {
        fontFamily: 'Arial',
        fontSize: '20px',
        color: COLORS.text
      })
      .setScrollFactor(0)
      .setDepth(1000);
  }

  setLevel(name: string): void {
    this.levelText.setText(name);
  }

  setCollectibles(found: number, total: number): void {
    this.collectiblesText.setText(`Seeds: ${found}/${total}`);
  }
}
