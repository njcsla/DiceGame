export default class GameButton extends Phaser.GameObjects.Image {
    constructor(scene, x, y, texture) {
        // 상속받는 클래스의 생성자 호출
        super(scene, x, y, texture);

        // 씬에 이 게임 오브젝트 추가
        scene.add.existing(this);

        // 크기 조정 (필요에 따라 활성화)
        this.setScale(0.5);

        // 버튼의 크기에 맞는 히트 영역 설정
        this.setInteractive({
            useHandCursor: true
        });
        
        this.inEnabled = true;
    }

    // 클릭 이벤트 핸들러 설정 메서드
    setClickHandler(callback) {
        this.on('pointerdown', () =>{
            if(this.inEnabled){
                callback();
            }
        });
    }

    disableButton(){
        this.isEnabled = false;
        this.setTint(0x888888);
    }

    enableButton(){
        this.isEnabled = true;
        this.clearTint();
    }
}