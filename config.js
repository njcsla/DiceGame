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

export function fetchData(data){
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyU2f_RbbccploiiE0lE7GxOfCnF9B8k__cZnf28d5FZ8bHOVRt5U3mHeSITd5Qt7al/exec';
                    
    return fetch(scriptURL,{
        redirect: "follow",
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',       // cors 없어도 됨... 차피 일렉트론으로 빌드할거라.. 그래도 혹시 모르니깐..
        body: JSON.stringify(data)
    })
}



export default config;