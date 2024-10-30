export const gameState = {
    playerLevel: 1,
    computerLevel: 1,
    playerResources: 100,
    playerLives: 4,
    playerDiceLevels: null,  // JSON 데이터로부터 불러올 값
    computerDiceLevels: null,
    nextResources : 7,
    nextRate: 0,
    nextLevel: 1
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
    gameState.nextLevel = 1;
}
