import Phaser from 'phaser';

export class AudioSystem {
  constructor(private readonly scene: Phaser.Scene) {}

  beep(frequency = 440, length = 0.08, type: OscillatorType = 'square'): void {
    if (!(this.scene.sound instanceof Phaser.Sound.WebAudioSoundManager)) {
      return;
    }

    const audioContext = this.scene.sound.context;
    const now = audioContext.currentTime;
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.06, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + length);

    osc.connect(gain);
    gain.connect(audioContext.destination);
    osc.start(now);
    osc.stop(now + length + 0.02);
  }
}
