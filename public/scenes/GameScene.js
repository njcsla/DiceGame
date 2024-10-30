// GameScene : 주사위 굴리는 화면

// 게임 정보, 리셋기능, 주사위 기능 불러옴
import { gameState, resetData, setDiceData } from '../data/dataManager.js';
import Button from "../ui/myButton.js";
let rollButton;

export default class GameScene extends Phaser.Scene {
  constructor() {
      super("gameScene");
  };

  preload(){
    this.load.image('playbg', './asset/bg/playbg.png');
    this.load.json('diceData', './data/datafile.json');
    this.load.image('rollButton', './asset/button/rollButton.png');
    this.load.image('forgeButton', './asset/button/forgeButton.png');
    this.load.image('backButton', './asset/button/backButton.png');
    this.load.image('winText', './asset/win.png');
    this.load.image('loseText', './asset/lose.png');
  };
  
  create() 
  { 
    // 주사위 정보 로드
    const diceData = this.cache.json.get('diceData');
    setDiceData(diceData);

    // UI 구성
    this.add.image(480, 270, 'playbg').setScale(0.5);
    rollButton = new Button(this, 470, 370, 'rollButton');
    rollButton.setClickHandler(() => {
      this.playRound();
    });

    const forgeButton = new Button(this, 800, 400, 'forgeButton');
    forgeButton.setClickHandler(() => {
        this.scene.start('forgeScene');
    });

    const backButton = new Button(this, 800, 470, 'backButton');
    backButton.setClickHandler(() => {
        this.scene.start('mainScene');
    });

    this.win = this.add.image(485, 270, 'winText').setScale(0.5).setVisible(false);
    this.lose = this.add.image(485, 270, 'loseText').setScale(0.5).setVisible(false);

    this.playerResourceText = this.add.text(50, 100, `Player Resources: ${gameState.playerResources}`, {fontfamily: 'BMJUA_ttf', fontSize: '20px', fill: '#fff' });
    this.playerLivesText = this.add.text(50, 130, `Player Lives: ${gameState.playerLives}`, {fontfamily: 'BMJUA_ttf', fontSize: '20px', fill: '#fff' });
    this.computerLevelText = this.add.text(50, 160, `Computer Level: ${gameState.computerLevel}`, {fontfamily: 'BMJUA_ttf', fontSize: '20px', fill: '#fff' });

  };

  update() {
    // UI 업데이트
    this.playerResourceText.setText(`Player Resources: ${gameState.playerResources}`);
    this.playerLivesText.setText(`Player Lives: ${gameState.playerLives}`);
    this.computerLevelText.setText(`Computer Level: ${gameState.computerLevel}`);
    this.checkGameOver();
  };

  
  // 주사위 계산
  rollDice(diceFaces) {
    const dice1 = diceFaces[Math.floor(Math.random() * diceFaces.length)];
    const dice2 = diceFaces[Math.floor(Math.random() * diceFaces.length)];
    return dice1 + dice2;
  };

  // 라운드 실행
  playRound() {
    // 카메라 효과
    this.cameras.main.shake(200, 0.01);

    // 카메라 효과가 끝난 뒤 실행
    this.time.delayedCall(300, () => {
      rollButton.disableButton();
      
      // 주사위 레벨에 맞는 데이터 사용
      const playerRoll = this.rollDice(gameState.playerDiceLevels[gameState.playerLevel]);
      const computerRoll = this.rollDice(gameState.computerDiceLevels[gameState.computerLevel]);

      console.log(`플레이어: ${playerRoll}, 컴퓨터: ${computerRoll}`);

      if (playerRoll > computerRoll) {
          console.log("플레이어 승리!");
          gameState.playerResources += 15 + (gameState.computerLevel - 1) * 10;
          gameState.playerLives += 1;
          gameState.computerLevel += 1;
          

      } else if (playerRoll < computerRoll) {
          console.log("컴퓨터 승리!");
          gameState.playerResources += 5;
          gameState.playerLives -= 1;

          this.lose.setVisible(true);
          this.win.setVisible(false);

      } else {
          console.log("비김!");
      };
      this.uiUpdate(playerRoll, computerRoll);
      rollButton.enableButton();
    });
  }

  // 결과에 따라 UI(승/패) 표시
  uiUpdate(player, computer) {
    
    if (player > computer) {
      this.win.setVisible(true);
      this.lose.setVisible(false);
    }
    else if (player < computer) {
      this.lose.setVisible(true);
      this.win.setVisible(false);
    };

    this.time.delayedCall(1000, () => {
      this.lose.setVisible(false);
      this.win.setVisible(false);
    });

  }

  checkGameOver() {
    if (gameState.playerLives <= 0) {
        console.log('게임 오버!');
        resetData();
        this.scene.start('mainScene'); // 메인 화면으로 이동, 효과 업데이트 해야됨
    }
  }
};

