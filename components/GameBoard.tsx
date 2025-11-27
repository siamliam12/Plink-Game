// components/GameBoard.tsx

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg from 'react-native-svg';
import { GAME_CONFIG } from '../constants/gameConfig';
import { Peg, generatePegs } from './Peg';
import { Ball, createBall } from './Ball';
import { Bucket } from './Bucket';
import {
  checkCollision,
  handlePegCollision,
  updateBallPhysics,
  checkBucketCollision,
  Ball as BallType,
} from '../utils/physics';

interface GameBoardProps {
  onScoreUpdate: (points: number) => void;
  isDropping: boolean;
  onDropComplete: () => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({ onScoreUpdate, isDropping, onDropComplete }) => {
  const [pegs] = useState(generatePegs());
  const [balls, setBalls] = useState<BallType[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (isDropping && balls.length < GAME_CONFIG.MAX_BALLS) {
      const newBall = createBall();
      setBalls((prev) => [...prev, newBall]);
    }
  }, [isDropping, balls.length]);

  useEffect(() => {
    const animate = () => {
      setBalls((currentBalls) => {
        if (currentBalls.length === 0) return currentBalls;

        let scoreToAdd = 0;
        let shouldComplete = false;

        const updatedBalls = currentBalls
          .map((ball) => {
            let updatedBall = updateBallPhysics({ ...ball });

            pegs.forEach((peg) => {
              if (checkCollision(updatedBall, peg)) {
                updatedBall = handlePegCollision(updatedBall, peg);
              }
            });

            const bucketIndex = checkBucketCollision(updatedBall);
            if (bucketIndex !== -1) {
              scoreToAdd += GAME_CONFIG.BUCKET_SCORES[bucketIndex];
              shouldComplete = true;
              return null;
            }

            if (updatedBall.y > GAME_CONFIG.BOARD_HEIGHT + 50) {
              shouldComplete = true;
              return null;
            }

            return updatedBall;
          })
          .filter((ball): ball is BallType => ball !== null);

        // Schedule callbacks for next tick
        if (scoreToAdd > 0) {
          setTimeout(() => onScoreUpdate(scoreToAdd), 0);
        }
        if (shouldComplete) {
          setTimeout(() => onDropComplete(), 0);
        }

        return updatedBalls;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [pegs, onScoreUpdate, onDropComplete]);

  return (
    <View style={styles.container}>
      <View style={styles.board}>
        <Svg
          width={GAME_CONFIG.BOARD_WIDTH}
          height={GAME_CONFIG.BOARD_HEIGHT}
          style={styles.svg}
        >
          {pegs.map((peg) => (
            <Peg key={peg.id} x={peg.x} y={peg.y} />
          ))}

          {balls.map((ball) => (
            <Ball key={ball.id} x={ball.x} y={ball.y} />
          ))}
        </Svg>

        {GAME_CONFIG.BUCKET_SCORES.map((score, index) => (
          <Bucket
            key={index}
            index={index}
            score={score}
            color={GAME_CONFIG.BUCKET_COLORS[index]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  board: {
    width: GAME_CONFIG.BOARD_WIDTH,
    height: GAME_CONFIG.BOARD_HEIGHT,
    backgroundColor: '#1a1a2e',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#FFD700',
    position: 'relative',
    overflow: 'hidden',
  },
  svg: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});