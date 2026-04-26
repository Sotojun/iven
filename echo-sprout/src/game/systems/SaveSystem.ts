import { SAVE_KEY } from '../utils/constants';

interface SaveData {
  unlockedLevel: number;
  bestCollectibles: Record<number, number>;
}

const defaultSave: SaveData = {
  unlockedLevel: 1,
  bestCollectibles: {}
};

export class SaveSystem {
  private save: SaveData;

  constructor() {
    this.save = this.load();
  }

  private load(): SaveData {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return defaultSave;

    try {
      const parsed = JSON.parse(raw) as SaveData;
      return {
        unlockedLevel: Math.max(1, parsed.unlockedLevel ?? 1),
        bestCollectibles: parsed.bestCollectibles ?? {}
      };
    } catch {
      return defaultSave;
    }
  }

  persist(): void {
    localStorage.setItem(SAVE_KEY, JSON.stringify(this.save));
  }

  getUnlockedLevel(): number {
    return this.save.unlockedLevel;
  }

  unlock(level: number): void {
    this.save.unlockedLevel = Math.max(this.save.unlockedLevel, level);
    this.persist();
  }

  setBestCollectibles(level: number, count: number): void {
    const best = this.save.bestCollectibles[level] ?? 0;
    if (count > best) {
      this.save.bestCollectibles[level] = count;
      this.persist();
    }
  }

  getBestCollectibles(level: number): number {
    return this.save.bestCollectibles[level] ?? 0;
  }
}
