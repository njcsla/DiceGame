import { gameState } from '../data/dataManager.js';
import Button from "../ui/myButton.js";


export default class ForgeScene extends Phaser.Scene {
    constructor() {
        super('forgeScene');
    }

    preload() {
        this.load.image('forgebg', './asset/bg/empty.png');
        this.load.image('forgeText', './asset/forgeText.png');
        this.load.image('upgradeButton', './asset/button/upgradeButton.png');
        this.load.json('upgradeData', './data/upgradeData.json');
        this.load.image('dice1', './asset/dice1.png');
        this.load.image('dice2', './asset/dice2.png');
        this.load.image('dice3', './asset/dice3.png');
        this.load.image('dice4', './asset/dice4.png');
    }   

    create() {
        
        this.upgradeData = this.cache.json.get('upgradeData');
        this.add.image(480, 270, 'forgebg').setScale(0.5);
        this.add.image(480, 270, 'forgeText').setScale(0.5);
        this.updateDiceImage();

        const upgradeButton = new Button(this, 470, 400, 'upgradeButton');
        upgradeButton.setClickHandler(() => {
            this.upgradeDice();
        })
    
        const backButton = new Button(this, 800, 470, 'backButton');
        backButton.setClickHandler(() => {
            this.scene.start('gameScene');
        });

        this.playerResourcesText = this.add.text(680, 93, `${gameState.playerResources}`, {fontSize: '30px', fill: '#edc248', stroke:'#000000', strokeThickness: 3}).setFontFamily("TAEBAEK");
        this.needResourcesText = this.add.text(280, 150, `${gameState.nextResources}`, {fontSize: '30px', fill: '#9d7ef7', stroke:'#000000',strokeThickness: 3}).setFontFamily("TAEBAEK");
        this.nextLevelText = this.add.text(280, 195, `${gameState.playerLevel + 1}`, {fontSize: '30px', fill: '#9d7ef7', stroke:'#000000', strokeThickness: 3}).setFontFamily("TAEBAEK");
        

    }

    update() {
        this.playerResourcesText.setText(`${gameState.playerResources}`);
        this.needResourcesText.setText(`${gameState.nextResources}`);
        this.nextLevelText.setText(`${gameState.nextLevel}`)
    }

    upgradeDice() {
        gameState.nextLevel = gameState.playerLevel + 1;
        const upgradeInfo = this.upgradeData.upgrades.find(u => u.level === gameState.nextLevel);

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
            this.updateDiceImage();

            const newUpgradeInfo = this.upgradeData.upgrades.find(u => u.level === gameState.playerLevel + 1);
            if (newUpgradeInfo) {
                gameState.nextResources = newUpgradeInfo.cost;
                gameState.nextRate = newUpgradeInfo.successRate;
            } else {
                gameState.nextResources = "강화 불가";
                gameState.nextRate = 0;
            }
            
            console.log("강화 성공!");
        } else {
            // 강화 실패
            console.log("강화 실패!");
        }
        
    }
    updateDiceImage() {
        const level = gameState.playerLevel;
        
        let diceImageKey = 'dice1'; // 기본 이미지
        if (level >= 12) {
            diceImageKey = 'dice4';
        } else if (level >= 8) {
            diceImageKey = 'dice3';
        } else if (level >= 4) {
            diceImageKey = 'dice2';
        }
    
        // 기존 주사위 이미지가 있다면 제거 후 새 이미지 추가
        if (this.diceImage) {
            this.diceImage.destroy();
        }
        this.diceImage = this.add.image(480, 270, diceImageKey).setScale(0.5);
    }
    
}