const STARTED = 0;
const ENDED = 1;

const playerSpan = document.getElementById('player');
const gameTable = document.getElementById('game');

const game = {
    state : STARTED,
    turn : 'X',
    move : 0
}

function nextTurn(){
    game.move++;
    if(game.turn == "X"){
        game.turn = 'O';
    }
    else{
        game.turn = 'X';
    }
    if(game.move == 9){
        alert("GAME OVER");
    }
    playerSpan.textContent = game.turn;
}

function isSeqCaptured(arrayof3cells){
    let winningCombo = game.turn + game.turn + game.turn;
    if (arrayof3cells.map(i => i.textContent).join('') == winningCombo){
        alert('Game Over | Winner = ' + game.turn);
    }   
}

function isRowCaptured(row){
    let tableRow = Array.from(gameTable.children[0].children[row-1].children);
    isSeqCaptured(tableRow);
}

function isColCaptured(col){
    let tableCol = [
        gameTable.children[0].children[0].children[col-1],
        gameTable.children[0].children[1].children[col-1],
        gameTable.children[0].children[2].children[col-1]
    ]
    isSeqCaptured(tableCol);
}

function isDiagCaptured(row, col){
    if(row != col && (row + col) != 4){
        return;
    }
    let diag1 = [
        gameTable.children[0].children[0].children[0],
        gameTable.children[0].children[1].children[1],
        gameTable.children[0].children[2].children[2]
    ]
    let diag2 = [
        gameTable.children[0].children[0].children[2],
        gameTable.children[0].children[1].children[1],
        gameTable.children[0].children[2].children[0]
    ]
    isSeqCaptured(diag1)
    isSeqCaptured(diag2)
}

function boxClick(row, col){
    console.log("Box clicked" , row, col);
    let clickBox = gameTable.children[0].children[row-1].children[col-1];
    clickBox.textContent = game.turn;
    isRowCaptured(row);
    isColCaptured(col);
    isDiagCaptured(row, col);
    nextTurn();
}
