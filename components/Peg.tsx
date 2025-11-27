// components/Peg.tsx

import React from 'react';
import { Circle } from 'react-native-svg';
import { GAME_CONFIG } from '../constants/gameConfig';
import { Peg as PegType } from '../utils/physics';

interface PegProps {
  x: number;
  y: number;
}

export const Peg: React.FC<PegProps> = ({ x, y }) => {
  return (
    <Circle
      cx={x}
      cy={y}
      r={GAME_CONFIG.PEG_RADIUS}
      fill={GAME_CONFIG.PEG_COLOR}
      stroke="#FFA500"
      strokeWidth="1"
    />
  );
};

export const generatePegs = (): PegType[] => {
  const pegs: PegType[] = [];
  const horizontalSpacing = GAME_CONFIG.BOARD_WIDTH / (GAME_CONFIG.PEG_COLS + 1);
  const verticalSpacing = (GAME_CONFIG.BOARD_HEIGHT - GAME_CONFIG.BUCKET_HEIGHT - 100) / GAME_CONFIG.PEG_ROWS;
  
  for (let row = 0; row < GAME_CONFIG.PEG_ROWS; row++) {
    const isOffsetRow = row % 2 === 1;
    const colsInRow = isOffsetRow ? GAME_CONFIG.PEG_COLS - 1 : GAME_CONFIG.PEG_COLS;
    
    for (let col = 0; col < colsInRow; col++) {
      const xOffset = isOffsetRow ? horizontalSpacing : horizontalSpacing / 2;
      const x = xOffset + col * horizontalSpacing;
      const y = 100 + row * verticalSpacing;
      
      pegs.push({ x, y, id: `peg-${row}-${col}` });
    }
  }
  
  return pegs;
};