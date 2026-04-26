import Phaser from 'phaser';

export class InputSystem {
  readonly cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  readonly wasd: {
    up: Phaser.Input.Keyboard.Key;
    left: Phaser.Input.Keyboard.Key;
    right: Phaser.Input.Keyboard.Key;
  };

  constructor(scene: Phaser.Scene) {
    this.cursors = scene.input.keyboard!.createCursorKeys();
    this.wasd = scene.input.keyboard!.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D
    }) as InputSystem['wasd'];
  }

  leftPressed(): boolean {
    return Boolean(this.cursors.left?.isDown || this.wasd.left.isDown);
  }

  rightPressed(): boolean {
    return Boolean(this.cursors.right?.isDown || this.wasd.right.isDown);
  }

  jumpPressed(): boolean {
    return Boolean(
      Phaser.Input.Keyboard.JustDown(this.cursors.up!) || Phaser.Input.Keyboard.JustDown(this.wasd.up)
    );
  }
}
