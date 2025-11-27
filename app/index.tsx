// App.tsx

import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Animated,
  Platform,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { GameBoard } from '@/components/GameBoard';

function PlinkoGame() {
  const [score, setScore] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(0);
  const [isDropping, setIsDropping] = useState<boolean>(false);
  const [ballsInPlay, setBallsInPlay] = useState<number>(0);
  const scoreAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
    }
  }, [score, bestScore]);

  const handleScoreUpdate = (points: number) => {
    setScore((prev) => prev + points);
    
    Animated.sequence([
      Animated.timing(scoreAnimation, {
        toValue: 1.3,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scoreAnimation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleDropBall = () => {
    if (ballsInPlay < 5) {
      setIsDropping(true);
      setBallsInPlay((prev) => prev + 1);
      setTimeout(() => setIsDropping(false), 100);
    }
  };

  const handleDropComplete = () => {
    setBallsInPlay((prev) => Math.max(0, prev - 1));
  };

  const handleReset = () => {
    setScore(0);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#0f0c29', '#302b63', '#24243e']}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <Text style={styles.title}>🎯 PLINKO</Text>
          
          <View style={styles.scoreContainer}>
            <View style={styles.scoreBox}>
              <Text style={styles.scoreLabel}>Score</Text>
              <Animated.Text
                style={[
                  styles.scoreValue,
                  { transform: [{ scale: scoreAnimation }] },
                ]}
              >
                {score}
              </Animated.Text>
            </View>
            
            <View style={styles.scoreBox}>
              <Text style={styles.scoreLabel}>Best</Text>
              <Text style={[styles.scoreValue, styles.bestScore]}>
                {bestScore}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.gameContainer}>
          <GameBoard
            onScoreUpdate={handleScoreUpdate}
            isDropping={isDropping}
            onDropComplete={handleDropComplete}
          />
        </View>

        <View style={styles.bottomSection}>
          <View style={styles.controls}>
            <TouchableOpacity
              style={[
                styles.dropButton,
                ballsInPlay >= 5 && styles.dropButtonDisabled,
              ]}
              onPress={handleDropBall}
              disabled={ballsInPlay >= 5}
              activeOpacity={0.7}
            >
              <Text style={styles.dropButtonText}>
                {ballsInPlay >= 5 ? 'WAIT...' : 'DROP BALL'}
              </Text>
              <Text style={styles.ballCounter}>
                {ballsInPlay}/5 in play
              </Text>
            </TouchableOpacity>

            <View style={styles.bottomRow}>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={handleReset}
                activeOpacity={0.7}
              >
                <Text style={styles.resetButtonText}>RESET</Text>
              </TouchableOpacity>
              <Text style={styles.instructionText}>
                💡 Land in high-value buckets!
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <PlinkoGame />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0c29',
  },
  gradient: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  header: {
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 8,
    textShadowColor: 'rgba(255, 215, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  scoreContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  scoreBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderRadius: 10,
    minWidth: 90,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  scoreLabel: {
    color: '#ccc',
    fontSize: 10,
    marginBottom: 1,
  },
  scoreValue: {
    color: '#FFD700',
    fontSize: 20,
    fontWeight: 'bold',
  },
  bestScore: {
    color: '#00ff88',
  },
  gameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0,
    paddingVertical: 10,
  },
  bottomSection: {
    paddingBottom: Platform.OS === 'ios' ? 10 : 20,
    paddingHorizontal: 20,
  },
  controls: {
    alignItems: 'center',
    gap: 8,
  },
  dropButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 25,
    width: '100%',
    maxWidth: 280,
    alignItems: 'center',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  dropButtonDisabled: {
    backgroundColor: '#666',
    shadowColor: '#666',
  },
  dropButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  ballCounter: {
    color: '#333',
    fontSize: 10,
    marginTop: 2,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    width: '100%',
  },
  resetButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  instructionText: {
    color: '#aaa',
    fontSize: 10,
    flex: 1,
  },
});