// utils/physics.ts

import { GAME_CONFIG } from '../constants/gameConfig';

export interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  id: number;
}

export interface Peg {
  x: number;
  y: number;
  id: string;
}

export const checkCollision = (ball: Ball, peg: Peg): boolean => {
  const dx = ball.x - peg.x;
  const dy = ball.y - peg.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < (GAME_CONFIG.BALL_RADIUS + GAME_CONFIG.PEG_RADIUS);
};

export const handlePegCollision = (ball: Ball, peg: Peg): Ball => {
  const dx = ball.x - peg.x;
  const dy = ball.y - peg.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  if (distance === 0) return ball;
  
  const nx = dx / distance;
  const ny = dy / distance;
  
  const dotProduct = ball.vx * nx + ball.vy * ny;
  ball.vx = (ball.vx - 2 * dotProduct * nx) * GAME_CONFIG.BOUNCE_FACTOR;
  ball.vy = (ball.vy - 2 * dotProduct * ny) * GAME_CONFIG.BOUNCE_FACTOR;
  
  ball.vx += (Math.random() - 0.5) * GAME_CONFIG.HORIZONTAL_RANDOMNESS;
  
  const overlap = (GAME_CONFIG.BALL_RADIUS + GAME_CONFIG.PEG_RADIUS) - distance;
  ball.x += nx * overlap;
  ball.y += ny * overlap;
  
  return ball;
};

export const updateBallPhysics = (ball: Ball): Ball => {
  ball.vy += GAME_CONFIG.GRAVITY;
  
  ball.x += ball.vx;
  ball.y += ball.vy;
  
  if (ball.x - GAME_CONFIG.BALL_RADIUS < 0) {
    ball.x = GAME_CONFIG.BALL_RADIUS;
    ball.vx = -ball.vx * GAME_CONFIG.BOUNCE_FACTOR;
  }
  if (ball.x + GAME_CONFIG.BALL_RADIUS > GAME_CONFIG.BOARD_WIDTH) {
    ball.x = GAME_CONFIG.BOARD_WIDTH - GAME_CONFIG.BALL_RADIUS;
    ball.vx = -ball.vx * GAME_CONFIG.BOUNCE_FACTOR;
  }
  
  return ball;
};

export const checkBucketCollision = (ball: Ball): number => {
  if (ball.y >= GAME_CONFIG.BOARD_HEIGHT - GAME_CONFIG.BUCKET_HEIGHT) {
    const bucketIndex = Math.floor(ball.x / GAME_CONFIG.BUCKET_WIDTH);
    if (bucketIndex >= 0 && bucketIndex < GAME_CONFIG.BUCKET_COUNT) {
      return bucketIndex;
    }
  }
  return -1;
};