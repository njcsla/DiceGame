import Config from "./config.js";
import {fetchData} from "./config.js";
import {gameState} from "./data/dataManager.js";


const game = new Phaser.Game(Config);
export default game;

// 게임창 종료 감지
window.addEventListener('beforeunload', (event) => {
    const username = gameState.userId;
    fetchData({username: username, action: 'Exit'})
        .then(response => response.json())
        .then(data => console.log("Window close event recorded:", data))
        .catch(error => console.error("Error reporting window close:", error));
});
