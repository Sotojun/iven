import { LEVELS } from '../data/Levels';
import type { LevelData } from '../data/LevelData';

export class LevelManager {
  getAll(): LevelData[] {
    return LEVELS;
  }

  getById(id: number): LevelData {
    const level = LEVELS.find((l) => l.id === id);
    if (!level) {
      throw new Error(`Missing level ${id}`);
    }
    return level;
  }
}
