document.addEventListener("DOMContentLoaded", function(){
    var globals = {};
    var gameStarted = false;
    var startGame = function() {
        var aiPlayer = new AI();
        globals.game = new Game(aiPlayer);
        aiPlayer.plays(globals.game);
        globals.game.start();
        gameStarted = true;
    };
    if (gameStarted === false) {
        startGame();
    }
//button click functions
    $(".eachListener").click(function() {
        if ($(this).hasClass("free")) {

            if (globals.game.currentState.clickWorks === true) {
                globals.game.currentState.makeAMove(this);
                if (globals.game.currentState.gameStatus === "running") {
                    globals.game.ai.notify(globals.game.currentState.player);
                }
            }
        }
    });
    //select player
    $(".playerSelect").click(function() {
        globals.game.playerSelect();
    });
    //reset/clear board
    $(".resetButton").click(function () {
        globals.game.clearBoard();
    });
});
var BoardOps = function(old, game) {
    var currentButton;
    var i;
    this.board = ["E","E","E","E","E","E","E","E","E"];
    this.player = "X";
    this.gameResult;
    this.gameStatus === "beginning";
    this.gameWon = false;
    this.moveCount = 0;
    this.allEmptySpaces = [];
    this.clickWorks = true;
    this.XWon;
    if (typeof old !== "undefined") {
        var len = old.board.length;
        this.board = new Array(len);
        for (var itr = 0 ; itr < len ; itr++) {
            this.board[itr] = old.board[itr];
        }
        this.moveCount = old.moveCount;
        this.gameStatus = old.gameStatus;
        this.gameResult = old.gameResult;
        this.gameWon = old.gameWon;
        this.clickWorks = old.clickWorks;
        this.player = old.player;
    }

    this.terminalCheck = function() {
        //rows
        for (i = 0; i <= 6 ; i += 3) {
            if (this.board[i] === this.board[i+1] && this.board[i+1] === this.board[i+2] && this.board[i] !== "E") {
                this.gameWon = true;
                this.clickWorks = false;
                return this.gameOver();
            }
        }
        //columns
        for (i = 0; i <= 2 ; i++) {
            if (this.board[i] === this.board[i+3] && this.board[i+3] === this.board[i+6] && this.board[i] !== "E") {
                this.gameWon = true;
                return this.gameOver();
            }
        }
        //diagonals
        if (this.board[0] === this.board[4] && this.board[4] === this.board[8] && this.board[0] !== "E") {
            this.gameWon = true;
            return this.gameOver();
        }
        if (this.board[2] === this.board[4] && this.board[4] === this.board[6] && this.board[2] !== "E") {
            this.gameWon = true;
            return this.gameOver();
        }
        //draw
        for (i = 0; i < this.board.length ; i++) {
            if (this.board[i] === "E") {
                return false;
            }
            if (i === 8) {
                this.gameWon = false;
                return this.gameOver();
            }
        }
    };
    this.gameOver = function() {
        this.gameStatus = "ended";
        this.clickWorks = false;
        if (this.gameWon === true) {
            this.gameResult = this.player + " has won!";
            if (this.player === "O") {
                this.XWon = true;
            }
            else {
                this.XWon = false;
            }
            return true;
        }
        else if (this.gameWon === false) {
            this.gameResult = "Drawn";
            return true;
        }
    };
    this.prompt = function() {
        alert(this.gameResult);
    }
    this.makeAMove = function(self) {
        if (this.clickWorks === true) {
            this.mark(self);
            if (this.terminalCheck()) {
                this.prompt();
                game.clearBoard();
            }
            this.advanceMove();
        }
    };
    this.mark = function (self) {
        if (this.gameStatus !== "ended") {
            $(".playerSelect")[0].disabled = "disabled";
            this.gameStatus = "running";
            currentButton = self.title;
            if (this.board[currentButton] === "E") {
                self.innerHTML = this.player;
                this.board[currentButton] = this.player;
                $(self).toggleClass("free");
            }
        }
    };
    this.aiMark = function (input) {
        if (this.gameStatus !== "ended") {
            $(".playerSelect")[0].disabled = "disabled";
            this.gameStatus = "running";
            currentButton = input;
            if (this.board[currentButton] === "E") {
                var titleSelect = document.querySelectorAll("[title]");
                titleSelect[currentButton].innerHTML = this.player;
                this.board[currentButton] = this.player;
                titleSelect[currentButton].classList.toggle("free");
                if (this.terminalCheck()) {
                    this.prompt();
                    game.clearBoard();
                }
            }
        }
    };
    this.advanceMove = function() {
        if (this.player === "X") {
            this.player = "O";
        }
        else {
            this.player = "X";
        }
    };
    this.moveCounter = function() {
        this.moveCount++;
    };
    this.emptySpaces = function() {
        var indexes = [];
        for (i = 0; i < this.board.length; i++) {
            if(this.board[i] === "E") {
                indexes.push(i);
            }
        }
        return indexes;
    };
    this.drawBoard = function() {
        for (var i = 0; i < this.board.length ; i++) {
            document.querySelectorAll("[title]")[i].innerHTML = this.board[i];
        }
    };
};
var Game = function(aiplayer) {
    var allSpaces;
    this.ai = aiplayer;
    this.aiSign = "O";
    this.currentState = new BoardOps();
    this.currentState.board = ["E","E","E","E","E","E","E","E","E"];
    this.currentState.player = "X";
    this.currentState.gameStatus = "beginning";
    this.clearBoard = function() {
        allSpaces = document.querySelectorAll("[title]");
        for (var i = 0; i < this.currentState.board.length ; i++) {
            this.currentState.board[i] = "E";
            allSpaces[i].innerHTML = "";
            allSpaces[i].classList.remove("free");
            allSpaces[i].classList.add("free");
        }
        this.currentState.gameStatus = "running";
        this.currentState.gameResult;
        this.currentState.clickWorks = true;
        this.currentState.player = "X";
        this.currentState.moveCount = 0;
        this.aiSign = "O";
        $(".playerSelect")[0].disabled = false;
        $(".playerSelect")[0].checked = false;
    };
    this.playerSelect = function() {
        if (this.currentState.gameStatus === "running") {
            if (this.aiSign === "O") {
                this.aiSign = "X";
                this.ai.notify(this.currentState.player);
            }
            else {
                this.aiSign = "O";
            }
        }
    };
    this.advanceTo = function (_state) {
        this.currentState = _state;
        if(_state.terminalCheck()) {
            this.currentState.gameStatus = "ended";
        }
        else {
            if(this.currentState.player === this.aiSign) {
                this.ai.notify(this.currentState.player);
            }
        }
    };
    this.start = function() {
        if (this.currentState.gameStatus === "beginning") {
            this.advanceTo(this.currentState);
            this.currentState.gameStatus = "running";
        }
    };
};
Game.score = function(_state) {
    if (_state.gameWon === true && _state.XWon === true) {
        return 10 - _state.moveCount;
    }
    else if (_state.gameWon === true && _state.XWon === false) {

        return - 10 + _state.moveCount;
    }
    else {

        return 0;
    }
};
var AI = function() {
    var game = {};
    function makeAImove(player) {
        var alp = -1000;
        var bet = 1000;
        var available = game.currentState.emptySpaces();
        var availableActions = available.map(function(pos) {
            var action = new AIaction(pos);
            var nextState = action.applyTo(game.currentState); // advanceMove - turn : o -> x;
            action.minimaxVal = minimax(nextState, alp, bet);
            if (action.minimaxVal != undefined) {
                return action;
            }
        });
        if (player === "X") {
            availableActions.sort(AIaction.DESCENDING);
        }
        else {
            availableActions.sort(AIaction.ASCENDING);
        }
        var chosenAction = availableActions[0];
        var next = chosenAction.applyTo(game.currentState);
        game.currentState.aiMark(chosenAction.movePosition);
        game.advanceTo(next);
    }
    function minimax(state, alp, bet) {
        var alpha = alp; // Alpha
        var beta = bet; // Beta
        if (state.terminalCheck()) {
            return Game.score(state);
        }
        else {
            // Initial scores (similar to Maximiser and Minimiser)
            var stateScore;
            if(state.player === "X") {
                stateScore = -Infinity; 
            }
            else {

                stateScore = +Infinity;
            }
            var spaces = state.emptySpaces();
            var nextMoves = spaces.map(function(pos) {
                var action = new AIaction(pos);
                var nextState = action.applyTo(state);
                return nextState;
            });
            nextMoves.forEach(function(nextState){
                if (state.player === "X") { // If the player is X (not O)
                    if (alpha > beta) { 
                        return beta;
                    }
                    else {
                        var nextScore = minimax(nextState, alpha, beta);
                        if (nextScore > stateScore) {
                            stateScore = nextScore;
                            alpha = stateScore;
                        }
                    }
                }
                else {
                    if ( alpha > beta ) {
                        return alpha;
                    }
                    else {
                        var nextScore = minimax(nextState, alpha, beta);
                    }
                    if (nextScore < stateScore) {
                        stateScore = nextScore;
                        beta = stateScore;
                    }
                }
            });
        }
        return stateScore;
    }
    this.plays = function(_game) {
        game = _game;
    };
    this.notify = function(player) {
        makeAImove(player);
    };
};
var AIaction = function(pos) {
    this.movePosition = pos;
    this.minimaxVal = 0;
    this.applyTo = function(state) {
        var next = new BoardOps(state);
        next.board[this.movePosition] = state.player;
        if (state.player ==="O") {
            next.moveCount++;
        }
        next.advanceMove();
        return next;
    };
};
AIaction.ASCENDING = function(firstAction, secondAction) {
    if(firstAction.minimaxVal < secondAction.minimaxVal) {
        return -1;
    }
    else if (firstAction.minimaxVal > secondAction.minimaxVal){
        return 1;
    }
    else {
        return 0;
    }
};
AIaction.DESCENDING = function(firstAction, secondAction) {
    if(firstAction.minimaxVal > secondAction.minimaxVal) {
        return -1;
    }
    else if (firstAction.minimaxVal < secondAction.minimaxVal) {
        return 1;
    }
    else {
        return 0;
    }
};