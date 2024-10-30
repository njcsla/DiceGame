import MainScene from './scenes/MainScene.js';
import GameScene from './scenes/GameScene.js';
import ForgeScene from './scenes/ForgeScene.js';

const config = {
    type: Phaser.AUTO,
    width: 960,
    height: 540,
    backgroundColor: '#000000',
    scene: [MainScene, GameScene, ForgeScene]
};

export default config;