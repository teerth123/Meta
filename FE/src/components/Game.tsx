import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import GameScene from './GameScene';

// Phaser game config
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game-container', // Container div in React
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 }, // No gravity for top-down game
      debug: false, // Set to true to see collision boxes
    },
  },
  scene: GameScene,
};

const Game: React.FC = () => {
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    // Initialize Phaser game instance
    gameRef.current = new Phaser.Game(config);

    // Cleanup on component unmount
    return () => {
      gameRef.current?.destroy(true);
    };
  }, []);

  return <div id="game-container" />;
};

export default Game;
