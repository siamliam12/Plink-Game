// constants/gameConfig.ts

export const GAME_CONFIG = {
  // Board dimensions - REDUCED SIZE
  BOARD_WIDTH: 320,
  BOARD_HEIGHT: 500,
  
  // Pegs
  PEG_ROWS: 10,
  PEG_COLS: 7,
  PEG_RADIUS: 4,
  PEG_COLOR: '#FFD700',
  
  // Ball
  BALL_RADIUS: 7,
  BALL_COLOR: '#FF4444',
  
  // Buckets
  BUCKET_COUNT: 7,
  BUCKET_WIDTH: 45.7, // 320 / 7
  BUCKET_HEIGHT: 50,
  BUCKET_SCORES: [10, 20, 50, 100, 50, 20, 10],
  BUCKET_COLORS: ['#8B4513', '#CD853F', '#DEB887', '#FFD700', '#DEB887', '#CD853F', '#8B4513'],
  
  // Physics
  GRAVITY: 0.5,
  BOUNCE_FACTOR: 0.7,
  HORIZONTAL_RANDOMNESS: 3,
  FRAME_RATE: 60,
  
  // Game
  MAX_BALLS: 5,
} as const;

export type GameConfig = typeof GAME_CONFIG;