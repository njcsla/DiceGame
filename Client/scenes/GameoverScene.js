import { fetchData, logdata } from "../config.js";
import { resetData } from "../data/dataManager.js";
import Button from "../ui/myButton.js";

export default class GameoverScene extends Phaser.Scene {
    constructor() {
        super("gameoverScene");
    }

    preload() {
        this.load.image('gameoverbg', './asset/bg/gameover.png');
        this.load.image('retryButton', './asset/button/resetButton.png');

        const data = logdata('gameover');
        fetchData(data)
        .then(resetData());
        
    }
    
    create() {
        this.add.image(480, 270, 'gameoverbg').setScale(0.5);
        this.add.image(480, 270, 'info').setScale(0.5);
        const retryButton = new Button(this, 840, 480, 'retryButton');
        retryButton.setClickHandler(() => 
            this.scene.start('mainScene')
        );
    }
    
};