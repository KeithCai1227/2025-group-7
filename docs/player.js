class Player {

    //"humanPlayer" should be false if the player is an AI
    //"keyListener" should be null if the player is an AI
    constructor (difficultyLevel, humanPlayer, keyListener) {
        this.score = 0;
        this.difficultyLevel = difficultyLevel;
        this.humanPlayer = humanPlayer;
        this.keyListener = keyListener;
    }

    incrementScore () {
        score += 1;
    }

    getScore () {
        return score;
    }

    respondToPlayerInput () {
        this.keyListener.listenForKeys();
    }
}

