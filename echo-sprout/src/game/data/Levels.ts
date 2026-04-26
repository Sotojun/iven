import { TILE } from '../utils/constants';
import type { LevelData } from './LevelData';

const makeLevel = (id: number): LevelData => {
  const width = 2600 + id * 300;
  const floorY = 680;

  return {
    id,
    name: `World ${id}: Tiny Trail ${id}`,
    worldWidth: width,
    playerSpawn: { x: 120, y: 420 },
    goal: { x: width - 180, y: 420 },
    platforms: [
      { x: width / 2, y: floorY, w: width, h: 80 },
      { x: 360 + id * 30, y: 560, w: TILE * 4, h: 24 },
      { x: 720 + id * 40, y: 500, w: TILE * 3, h: 24 },
      { x: 1040 + id * 35, y: 430, w: TILE * 3, h: 24 },
      { x: 1390 + id * 45, y: 520, w: TILE * 4, h: 24 },
      { x: 1780 + id * 30, y: 450, w: TILE * 3, h: 24 }
    ],
    movingPlatforms: [
      {
        x: 560 + id * 50,
        y: 340,
        w: TILE * 2,
        h: 20,
        toX: 760 + id * 50,
        toY: 260,
        duration: 2600 - id * 80
      }
    ],
    enemies: [
      { x: 920 + id * 35, y: 360, patrol: 120 },
      { x: 1600 + id * 30, y: 380, patrol: 160 }
    ],
    collectibles: [
      { x: 420 + id * 40, y: 500 },
      { x: 760 + id * 40, y: 430 },
      { x: 1180 + id * 35, y: 360 },
      { x: 1520 + id * 30, y: 450 },
      { x: width - 320, y: 360 }
    ],
    hazards: [
      { x: 1280 + id * 20, y: 675, w: TILE * 2.2, h: 14 },
      { x: 1960 + id * 18, y: 675, w: TILE * 1.8, h: 14 }
    ],
    checkpoints: [{ x: width / 2, y: 390 }]
  };
};

export const LEVELS: LevelData[] = Array.from({ length: 10 }, (_, i) => makeLevel(i + 1));
