# Plinko Game - React Native/Expo

A fully functional Plinko game built with React Native, Expo, and TypeScript, featuring realistic physics simulation, smooth animations, and an engaging user interface.

## Demo

https://drive.google.com/file/d/15GNUvQmd9M2oBqJRvBBXHTbjthBr865g/view?usp=drive_link

## Features Implemented

### Core Requirements 
- **Game Board Setup**: Vertical board with 10 rows of pegs arranged in a zigzag pattern
- **Ball Drop Mechanics**: Interactive ball dropping with realistic physics simulation
- **Collision Detection**: Balls bounce off pegs with random directional changes
- **7 Scoring Buckets**: Bottom buckets with values: 10, 20, 50, 100, 50, 20, 10
- **Score Tracking**: Real-time score display with animated updates
- **Clean UI**: Modern gradient-based interface with intuitive controls

### Bonus Features 
- **Real Physics Simulation**: Custom physics engine with gravity, velocity, bounce mechanics, and collision detection
- **Multiple Balls**: Support for up to 5 balls dropping simultaneously
- **Animations**: Smooth score update animations and visual feedback
- **Best Score Tracking**: Persistent tracking of highest score achieved
- **Mobile-Friendly UI**: Fully responsive design optimized for mobile devices
- **Visual Polish**: Gradient backgrounds, gold-themed styling, and professional appearance

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) or Android Emulator / EXPO GO app

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/siamliam12/Plink-Game.git
   cd plinkgame
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   or
   npm run start
   ```

4. **Run on device/simulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your physical device

## 📁 Project Structure

```
plinkgame/
├── app/
|   |_index.tsx                      # Main application component
├── components/
│   ├── GameBoard.tsx           # Game board with physics animation loop
│   ├── Ball.tsx                # Ball component with gradient styling
│   ├── Peg.tsx                 # Peg component and generation logic
│   └── Bucket.tsx              # Bucket component for scoring
├── utils/
│   └── physics.ts              # Physics engine (collision, gravity, bouncing)
├── constants/
│   └── gameConfig.ts           # Centralized game configuration
├── package.json
└── README.md
```

## How to Play

1. **Tap "DROP BALL"** to release a ball from the top center of the board
2. Watch as the ball bounces off the golden pegs on its way down
3. The ball will land in one of the 7 buckets at the bottom
4. Your score increases based on the bucket value (center bucket = 100 points!)
5. You can drop up to 5 balls simultaneously
6. Try to achieve the highest score possible!
7. Use the **RESET** button to start a new game

## 🛠️ Technical Implementation

### Physics Engine
The game features a custom-built physics engine that handles:
- **Gravity Simulation**: Constant downward acceleration
- **Collision Detection**: Circle-to-circle collision using distance calculations
- **Bounce Mechanics**: Realistic velocity reflection with configurable bounce factor
- **Random Horizontal Movement**: Adds unpredictability to gameplay
- **Wall Collision**: Prevents balls from leaving the board boundaries

### Architecture Highlights
- **TypeScript**: Full type safety throughout the application
- **Modular Components**: Separation of concerns for maintainability
- **Custom Hooks**: Efficient state management with React hooks
- **Animation Loop**: Smooth 60fps animation using `requestAnimationFrame`
- **Configuration-Driven**: Easy to modify game parameters in one file

### Key Technologies
- **React Native**: Cross-platform mobile framework
- **Expo**: Development platform and toolchain
- **TypeScript**: Type-safe JavaScript
- **react-native-svg**: Vector graphics for pegs and balls
- **expo-linear-gradient**: Gradient backgrounds
- **react-native-safe-area-context**: Safe area handling for modern devices

## Configuration

Easily customize the game by editing `constants/gameConfig.ts`:

```typescript
export const GAME_CONFIG = {
  BOARD_WIDTH: 320,              // Board width
  BOARD_HEIGHT: 500,             // Board height
  PEG_ROWS: 10,                  // Number of peg rows
  BUCKET_SCORES: [10,20,50,100,50,20,10], // Bucket values
  GRAVITY: 0.5,                  // Gravity strength
  BOUNCE_FACTOR: 0.7,            // Bounciness (0-1)
  HORIZONTAL_RANDOMNESS: 3,      // Random bounce variation
  MAX_BALLS: 5,                  // Max simultaneous balls
};
```

## Dependencies

```json
{
  "expo": "~52.0.11",
  "react": "18.3.1",
  "react-native": "0.76.3",
  "react-native-svg": "^15.8.0",
  "expo-linear-gradient": "~14.0.1",
  "react-native-safe-area-context": "^4.12.0"
}
```

## Design Decisions

### Visual Design
- **Color Scheme**: Dark blue gradient background with gold accents for premium feel
- **Typography**: Bold, clear fonts for easy readability
- **Golden Pegs**: Eye-catching contrast against dark background
- **Bucket Colors**: Gradient from brown (low value) to gold (high value)

### User Experience
- **Responsive Controls**: Large, touch-friendly buttons
- **Visual Feedback**: Animated score updates when scoring
- **Ball Counter**: Shows how many balls are currently in play
- **Disabled State**: Button grays out when max balls reached

### Performance
- **Efficient Rendering**: Only re-renders when necessary
- **Optimized Collision Detection**: Calculated per-frame for all active balls
- **Memory Management**: Balls are removed from state when they finish

## Development Notes

- **Time Spent**: ~2 hours as per assignment guidelines
- **Approach**: Started with core physics, then added UI polish and bonus features
- **Learning**: First time working with React Native physics simulation
- **Challenges**: Managing state updates during animation loop, optimizing collision detection

## Known Issues

- None at this time

## 👨‍💻 Author

**Md Siam Ahmed**
- GitHub: github.com/siamliam12
- Email: siamahmed222945@gmail.com

---

## 📸 Screenshots

### Main Game Screen
![WhatsApp Image 2025-11-27 at 1 59 09 PM (2)](https://github.com/user-attachments/assets/2006113a-be80-4299-b103-ff26202dab50)

### Scoring Action

![WhatsApp Image 2025-11-27 at 1 59 09 PM](https://github.com/user-attachments/assets/89bdde8e-db36-4064-981d-cafabca53e43)

### Multiple Balls

![WhatsApp Image 2025-11-27 at 1 59 09 PM (1)](https://github.com/user-attachments/assets/8d9da093-3bea-41b1-bb44-db09b247e2b5)

---

**Built with using React Native + Expo**

## Assignment Completion Checklist

- Working functional app with all core features
- Clean, modular code architecture with TypeScript
- Modern, polished UI/UX design
- Multiple bonus features implemented
- GitHub repository with clear commit history
- Screen recording demonstrating gameplay
- Comprehensive README with setup instructions
- Completed within 48-hour timeframe
