import Phaser from 'phaser';

class GameScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys | undefined;

  constructor() {
    super('GameScene');
  }

  preload() {
    // Corrected asset paths (from public/assets/)
    this.load.tilemapTiledJSON('map', '/assets/practice.json');
    this.load.image('tiles', '/assets/Tileset.png');
    this.load.spritesheet('player', '/assets/player.png', { frameWidth: 16, frameHeight: 16 });
  }

  create() {
    // Create the tilemap
    const map = this.make.tilemap({ key: 'map' });

    // Add the tileset image to the map
    const tileset = map.addTilesetImage('Tileset', 'tiles');
    if (!tileset) {
      throw new Error("Tileset could not be loaded. Check the name in Tiled and asset path.");
    }

    // Create layers from the Tiled map
    const groundLayer = map.createLayer('ground', tileset, 0, 0);
    if (!groundLayer) {
      throw new Error("Ground layer could not be created. Check layer name in Tiled.");
    }

    const wallsLayer = map.createLayer('walls', tileset, 0, 0);
    if (!wallsLayer) {
      throw new Error("Walls layer could not be created. Check layer name in Tiled.");
    }

    // Set collision for tiles in the walls layer based on the "collide" property
    wallsLayer.setCollisionByProperty({ collide: true });

    // Create the player sprite
    this.player = this.physics.add.sprite(100, 100, 'player');
    this.player.setCollideWorldBounds(true); // Prevent player from leaving the map

    // Set up collision between player and walls
    this.physics.add.collider(this.player, wallsLayer);

    // Set up keyboard controls
    this.cursors = this.input.keyboard?.createCursorKeys();

    // Set camera to follow the player
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);
  }

  update() {
    if (!this.cursors) {
      return; // Prevent errors if cursors are not initialized
    }

    // Handle player movement
    const speed = 200;
    this.player.setVelocity(0); // Reset velocity

    if (this.cursors.left?.isDown) {
      this.player.setVelocityX(-speed);
    } else if (this.cursors.right?.isDown) {
      this.player.setVelocityX(speed);
    }

    if (this.cursors.up?.isDown) {
      this.player.setVelocityY(-speed);
    } else if (this.cursors.down?.isDown) {
      this.player.setVelocityY(speed);
    }
  }
}

// Export GameScene to be used in Game.tsx
export default GameScene;
