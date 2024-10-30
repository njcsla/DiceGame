// import Phaser from "phaser";
import Button from "../ui/myButton.js";

export default class MainScene extends Phaser.Scene {
  constructor() {
      super("mainScene");
  }

  preload(){
    this.load.image('mainbg', './asset/bg/mainbg.png');
    this.load.image('playbutton', './asset/button/gameButton.png');
    this.load.image('optionbutton', './asset/button/optionButton.png');
    this.load.spritesheet('dice', './asset/dicesprite.png',{
      frameWidth: 78, frameHeight: 109     
    });

  }
  

  create() 
  { 
    this.add.image(480, 270, 'mainbg').setScale(0.5);

    const playButton = new Button(this, 160, 300, 'playbutton');
    playButton.setClickHandler(() => this.scene.start('gameScene'));
    
    const forgeButton = new Button(this, 160, 400, 'optionbutton');
    forgeButton.setClickHandler(() => alert('구현중입니다.'));
    }
}