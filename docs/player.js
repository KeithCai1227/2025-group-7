class Player {
        
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

