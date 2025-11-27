// components/Bucket.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GAME_CONFIG } from '../constants/gameConfig';

interface BucketProps {
  index: number;
  score: number;
  color: string;
}

export const Bucket: React.FC<BucketProps> = ({ index, score, color }) => {
  const x = index * GAME_CONFIG.BUCKET_WIDTH;
  
  return (
    <View
      style={[
        styles.bucket,
        {
          left: x,
          width: GAME_CONFIG.BUCKET_WIDTH,
          height: GAME_CONFIG.BUCKET_HEIGHT,
          backgroundColor: color,
        },
      ]}
    >
      <Text style={styles.scoreText}>{score}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bucket: {
    position: 'absolute',
    bottom: 0,
    borderWidth: 2,
    borderColor: '#654321',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  scoreText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});