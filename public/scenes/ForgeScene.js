import { gameState } from '../data/dataManager.js';
import Button from "../ui/myButton.js";


export default class ForgeScene extends Phaser.Scene {
    constructor() {
        super('forgeScene');
    }

    preload() {
        this.load.image('forgebg', './asset/bg/forgebg.png');
        this.load.image('upgradeButton', './asset/button/upgradeButton.png');
        this.load.json('upgradeData', './data/upgradeData.json');
    }

    create() {
        this.upgradeData = this.cache.json.get('upgradeData');
        this.add.image(480, 270, 'forgebg').setScale(0.5);

        const upgradeButton = new Button(this, 470, 400, 'upgradeButton');
        upgradeButton.setClickHandler(() => {
            this.upgradeDice();
        })
    
        const backButton = new Button(this, 800, 470, 'backButton');
        backButton.setClickHandler(() => {
            this.scene.start('gameScene');
        });
        this.playerResourcesText = this.add.text(680, 95, `${gameState.playerResources}`, {fontFamily: 'BMJUA_ttf', fontSize: '30px', fill: '#8836d9', stroke:'#000000', strokeThickness: 3});
        this.needResourcesText = this.add.text(280, 150, `${gameState.nextResources}`, {fontFamily: 'BMJUA_ttf', fontSize: '30px', fill: '#9d7ef7', stroke:'#000000',strokeThickness: 3});
        this.nextLevelText = this.add.text(280, 195, `${gameState.playerLevel + 1}`, {fontFamily: 'BMJUA_ttf', fontSize: '30px', fill: '#9d7ef7', stroke:'#000000', strokeThickness: 3});
        

    }

    update() {
        this.playerResourcesText.setText(`${gameState.playerResources}`);
        this.needResourcesText.setText(`${gameState.nextResources}`);
        this.nextLevelText.setText(`${gameState.playerLevel + 1}`);
       
    }

    upgradeDice() {
        const nextLevel = gameState.playerLevel + 1;
        const upgradeInfo = this.upgradeData.upgrades.find(u => u.level === nextLevel);

        if (!upgradeInfo) {
            console.log("더 이상 강화할 수 없습니다.");
            return;
        }

        gameState.nextResources = upgradeInfo.cost;
        gameState.nextRate = upgradeInfo.successRate;

        // 플레이어 자원이 강화 비용보다 적으면 강화 실패
        if (gameState.playerResources < gameState.nextResources) {
            console.log("자원이 부족합니다.");
            return;
        }

        // 강화 비용 차감
        gameState.playerResources -= gameState.nextResources;

        // 성공 여부 결정 (성공 확률에 따라)
        const success = Math.random() * 100 < gameState.nextRate;

        if (success) {
            // 강화 성공
            gameState.playerLevel += 1;  // 레벨 상승
            console.log("강화 성공!");
        } else {
            // 강화 실패
            console.log("강화 실패!");
        }
        
    }
}