// 로그인 화면, 배경을 넣을까?
import { fetchData } from "../config.js";

export default class LoginScene extends Phaser.Scene {
    constructor() {
        super('loginScene');
    }

    preload() {
        this.load.html('nameform', './ui/loginform.html');
    }

    create() {
        const text = this.add.text(10, 10, 'Please login to play', { color: 'white', fontFamily: 'Arial', fontSize: '32px '});

        const element = this.add.dom(480, 270).createFromCache('nameform');
        element.setPerspective(800);
        

        element.addListener('click');

        element.on('click', (event) =>{
            if (event.target.name === 'loginButton')
            {
                const inputUsername = element.getChildByName('username');
                const inputPassword = element.getChildByName('password');

                // 입력이 있으면?
                if (inputUsername.value !== '' && inputPassword.value !== ''){                    
                    fetchData({username: inputUsername.value, password: inputPassword.value, action: 'Login'})
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            this.registry.set('username', inputUsername);
                            //  클릭 이벤트 비활성화
                            element.removeListener('click');

                            //  로그인 화면 아래로 내려가기
                            this.tweens.add({ targets: element.rotate3d, x: 1, w: 90, duration: 3000, ease: 'Power3' });

                            this.tweens.add({
                                targets: element, scaleX: 2, scaleY: 2, y: 700, duration: 3000, ease: 'Power3',
                                onComplete: () =>{
                                element.setVisible(false);
                                // 끝나면 메인화면으로 이동
                                element.scene.scene.start('mainScene');
                                }
                            });
                            //  인사말? 다른걸로 교체? 뭘로 하지
                            text.setText(`Welcome ${inputUsername.value}`);
                        }
                        else {
                            //  틀리면 깜빡거림
                            this.tweens.add({ targets: text, alpha: 0.1, duration: 200, ease: 'Power3', yoyo: true });
                            text.setText('Invalid username or password');
                        }
                    })
                .catch(error => {
                console.error('Error:', error);
                });
                }
            }
        });

        this.tweens.add({
            targets: element,
            y: 300,
            duration: 3000,
            ease: 'Power3'
        });
    }
}
