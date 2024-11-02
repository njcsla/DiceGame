import MainScene from './scenes/MainScene.js';
import GameScene from './scenes/GameScene.js';
import ForgeScene from './scenes/ForgeScene.js';
import LoginScene from './scenes/LoginScene.js';

const config = {
    type: Phaser.AUTO,
    width: 960,
    height: 540,
    backgroundColor: '#000000',
    parent : 'game-container',
    dom:{
        createContainer: true
    },
    scene: [LoginScene, MainScene, GameScene, ForgeScene] // 씬 추가될 때 마다 추가해야함

};


export default config;