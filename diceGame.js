const fs = require('fs');
const readli = require('readline');
const util = require('util');


const rl = readli.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

// JSON 파일 읽기
let diceData = JSON.parse(fs.readFileSync('datafile.json', 'utf-8'));
let upgradeData = JSON.parse(fs.readFileSync('upgradeData.json', 'utf-8')).upgrades;

const playerDiceLevels = diceData.playerDiceLevels;
const computerDiceLevels = diceData.computerDiceLevels;

// 게임 기본 데이터
let playerLevel = 1;
let computerLevel = 1;
let playerLives = 4;
let playerResources = 0;
let mainStatus = true;
let nextLevel = playerLevel + 1;
let upgradeInfo = upgradeData.find(u => u.level === nextLevel);
let cost = 0;
let forgeResult = ' ';


function userUpdate() {
    playerDiceInfo = 'DICE INFO: ' + playerDiceLevels[playerLevel].join(",").padEnd(25, ' ');
    computerDiceInfo = computerDiceLevels[computerLevel].join(", ").padEnd(20, ' ');
    playerResourceInfo = 'Gold: ' + playerResources.toString().padEnd(15, ' ');
    playerLivesInfo = 'Lives: ' + playerLives.toString().padEnd(13, ' ');
    if (forgeResult === '[31mFail.[0m'){
        forgeResultInfo = forgeResult.padEnd(39, ' ');            
    }
    else {
        forgeResultInfo = forgeResult.padEnd(30, ' ');
    }
    

    costInfo = `Cost: ${cost.toString().padEnd(12, ' ').padStart(3, ' ')}`;

}

// 주사위 굴리기
function rollDice(diceFaces) {
    const dice1 = diceFaces[Math.floor(Math.random() * diceFaces.length)];
    const dice2 = diceFaces[Math.floor(Math.random() * diceFaces.length)];
    return dice1 + dice2;
}

function playRound() {
    const playerRoll = rollDice(playerDiceLevels[playerLevel]);
    const computerRoll = rollDice(computerDiceLevels[computerLevel]);

    console.log(`플레이어: ${playerRoll}, 컴퓨터: ${computerRoll}`);

    if (playerRoll > computerRoll) {
        console.log("\x1b[34m플레이어 승리!\x1b[0m");
        playerResources += 15 + (computerLevel - 1) * 10; // 승리시 기본 15원 + 난이도 보너스
        playerLives += 1; // 승리시 목숨 1 회복
        computerLevel += 1; // 난이도 증가
    } else if (playerRoll < computerRoll) {
        console.log("\x1b[31m컴퓨터 승리!\x1b[0m");
        playerResources += 5; // 패배시 5원 획득
        playerLives -= 1; // 패배시 목숨 1 차감
    } else {
        console.log("\x1b[32m비김!\x1b[0m");
        // 비겼을 때는 목숨 변화 없음
    }
    
}
async function gamePage() {
    let gameStatus = true;    
    while(gameStatus){
        // await drawArt('gameArt.utf8ans');
        console.log(`\x1b[31mComputerLevel: ${computerLevel}\x1b[0m \x1b[32mGold: ${playerResources}\x1b[0m \x1b[34mLives: ${playerLives}\x1b[0m`);
        const answer = await askQuestion('1. 주사위 던지기 / 2. 돌아가기 > ');
        switch (answer) {
            case '1':
                console.clear();
                console.log("대결을 시작합니다.");
                playRound();
                checkGameOver();
                break;
            default:
                return;
        }
    }
}
async function forgePage() {
    let forgeStatus = true; // 강화 페이지 상태
    while (forgeStatus) {
        nextLevel = playerLevel + 1;
        upgradeInfo = upgradeData.find(u => u.level === nextLevel);
        cost = upgradeInfo.cost;
        await drawArt('forgeArt.utf8ans'); // 강화 화면을 출력
        const answer = await askQuestion('입력해주세요 > ');

        
        switch (answer) {
            case '1': // 강화 시도
                if (!upgradeInfo) {
                    forgeResult = "더 이상 강화할 수 없습니다."
                    break;
                }

                if (playerResources >= cost) {
                    // 강화 확률 계산
                    const success = Math.random() * 100 < upgradeInfo.successRate;
                    playerResources -= upgradeInfo.cost;

                    if (success) {
                        playerLevel += 1;
                        forgeResult = 'Success!'
                    } else {
                        forgeResult = '[31mFail.[0m';
                    }
                } else {
                    forgeResult = 'NOT ENOUGH GOLD.'
                }
                break;

            case '2': // 돌아가기
                forgeStatus = false; // 강화 페이지를 빠져나감
                forgeResult = ' ';
                break;

            default:
                console.log("잘못된 입력입니다. 다시 입력해주세요.");
        }
    }
}
function resetGame() {
    playerLevel = 1;
    computerLevel = 1;
    playerLives = 4; // 목숨 4개로 초기화
    playerResources = 0;
}

function checkGameOver() {
    if (playerLives <= 0) {
        console.log("게임 오버!");
        resetGame();
        gameStatus = false;
    }
}


async function drawArt(address) {
    console.clear();
    userUpdate();
    try {
        // ANSI 파일 읽기
        let data = await util.promisify(fs.readFile)(address, 'utf-8');

        // 플레이스홀더를 실제 변수로 대체
        data = data.replace('{{playerDice}}', playerDiceInfo)
                   .replace('{{computerDice}}', computerDiceInfo)
                   .replace('{{playerResources}}', playerResourceInfo)
                   .replace('{{playerLives}}',  `\x1b[34m${playerLivesInfo}\x1b[0m`)
                   .replace('{{forgeResult}}', forgeResultInfo)
                   .replace('{{cost}}', costInfo);
                
        console.log(data); // 화면 출력
    } catch (err) {
        console.error("화면출력 에러:", err);
    }
}


async function main() {
    
    while (mainStatus) {
        await drawArt('mainArt_1.utf8ans');
        const answer = await askQuestion('입력해주세요 > ');

        if (answer === '1') {
            await gamePage();
        } 
        else if (answer === '2') {
            
            await forgePage();
        } 
        else if (answer === '3') {
            mainStatus = false;
        } 
        else {
            console.log('다시 입력하세요.');
        }
    }
    rl.close();
}



main(); 