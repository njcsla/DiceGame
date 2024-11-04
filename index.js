import Config from "./config.js";
import {fetchData} from "./config.js";


const game = new Phaser.Game(Config);
export default game;

// 게임창 종료 감지
const username = game.registry.get('username');

window.addEventListener('beforeunload', (event) => {
    fetchData({username: username, action: 'Exit'})
        .then(response => response.json())
        .then(data => console.log("Window close event recorded:", data))
        .catch(error => console.error("Error reporting window close:", error));
});
