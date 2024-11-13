export const gameState = {
    userId: "",
    playerLevel: 1,
    computerLevel: 1,
    playerResources: 100,
    playerLives: 4,
    playerDiceLevels: null,  // JSON 데이터로부터 불러올 값
    computerDiceLevels: null,
    nextResources : 7,
    nextRate: 0,
    nextLevel: 2,

    forgetime: 0,
    wintime: 0,
    drawtime: 0,
    losetime: 0
};

// JSON 데이터를 설정하는 함수
export function setDiceData(diceData) {
    gameState.playerDiceLevels = diceData.playerDiceLevels;
    gameState.computerDiceLevels = diceData.computerDiceLevels;
}

export function resetData() {
    gameState.playerLevel = 1;
    gameState.computerLevel = 1;
    gameState.playerResources = 100;
    gameState.playerLives = 4;
    gameState.nextResources = 7;
    gameState.nextRate = 0;
    gameState.nextLevel = 2;
    gameState.forgetime = 0;
    gameState.wintime = 0;
    gameState.drawtime = 0;
    gameState.losetime = 0;
}

export function checkMilestone(type) {
    switch (type){
        case "forge":
            gameState.forgetime += 1
            if (gameState.forgetime === 10){
                gameState.playerResources += 100
                alert("도전과제 달성!! 10번이나 실패하시다니.. 100원이라도 드릴게요..");
            }
            break;
        case "win":
            gameState.wintime +=1
            if (gameState.wintime === 5){
                gameState.playerResources += 100
                alert("도전과제 달성!! 5연승 축하드립니다!!!");
            }
            break;
        case "draw":
            gameState.drawtime += 1
            if(gameState.drawtime === 10){
                gameState.playerResources += 200
                alert("도전과제 달성!! 10번이나 비긴다구요???");
            }
            break;
        case "lose":
            gameState.losetime += 1
            if(gameState.losetime === 10){
                gameState.playerResources += 150
                alert("도전과제 달성!! 10번이나 패배하셨네요..?");
            }
            break;
    }
    return;
}
