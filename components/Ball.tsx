// components/Ball.tsx

import React from 'react';
import { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';
import { GAME_CONFIG } from '../constants/gameConfig';
import { Ball as BallType } from '../utils/physics';

interface BallProps {
  x: number;
  y: number;
  color?: string;
}

export const Ball: React.FC<BallProps> = ({ x, y, color = GAME_CONFIG.BALL_COLOR }) => {
  return (
    <>
      <Defs>
        <RadialGradient id="ballGradient" cx="30%" cy="30%">
          <Stop offset="0%" stopColor="#FF6666" stopOpacity="1" />
          <Stop offset="100%" stopColor={color} stopOpacity="1" />
        </RadialGradient>
      </Defs>
      <Circle
        cx={x}
        cy={y}
        r={GAME_CONFIG.BALL_RADIUS}
        fill="url(#ballGradient)"
        stroke="#CC0000"
        strokeWidth="1"
      />
    </>
  );
};

export const createBall = (): BallType => {
  return {
    x: GAME_CONFIG.BOARD_WIDTH / 2,
    y: 50,
    vx: (Math.random() - 0.5) * 2,
    vy: 0,
    id: Date.now() + Math.random(),
  };
};