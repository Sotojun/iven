export interface RectPlatform {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface MovingPlatformData extends RectPlatform {
  toX: number;
  toY: number;
  duration: number;
}

export interface EnemyData {
  x: number;
  y: number;
  patrol: number;
}

export interface CollectibleData {
  x: number;
  y: number;
}

export type HazardData = RectPlatform;

export interface CheckpointData {
  x: number;
  y: number;
}

export interface LevelData {
  id: number;
  name: string;
  worldWidth: number;
  playerSpawn: { x: number; y: number };
  goal: { x: number; y: number };
  platforms: RectPlatform[];
  movingPlatforms: MovingPlatformData[];
  enemies: EnemyData[];
  collectibles: CollectibleData[];
  hazards: HazardData[];
  checkpoints: CheckpointData[];
}
