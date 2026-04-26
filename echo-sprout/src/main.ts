import Phaser from 'phaser';
import { gameConfig } from './game/GameConfig';

const app = document.getElementById('app');
if (!app) {
  throw new Error('Missing #app mount node');
}

new Phaser.Game({
  ...gameConfig,
  parent: app
});
