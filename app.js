/* global $ */

const state = {
    board: [ null, null, null, null, null, null, null, null, null ],
    currentPlayer: "X",
    winPattern: [],
};

const addToBoard = (id) => {
    if (state.winPattern.length !== 0) return; // if the games over
    
    if (state.board[id] === null) {
        state.board[id] = state.currentPlayer;
        state.currentPlayer = (state.currentPlayer === "X") ? "O" : "X";
        state.winPattern = checkWinner();
        renderBoard();
    }
};


const checkWinner = () => {
    const winPatterns = [[1,2,3], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [2,4,6], [0,4,8]];
    
     for (let i = 0; i < winPatterns.length; i++) {
        const winPattern = winPatterns[i];

        if ( !state.board[winPattern[0]] ) continue;

        if ( state.board[winPattern[0]] === state.board[winPattern[1]] && state.board[winPattern[1]] === state.board[winPattern[2]] ) {
            return winPattern;
        }
    }

    return [];
    
};

const renderBoard = () => {
    const renderRow = (startId, endId) => {
        let html = `<div class="row">`;
        
        for (let i = startId; i <= endId; i++) {
            const winClass = state.winPattern.includes(i) ? 'win' : '';
            
            html += `<div class="cell ${winClass}" id="${i}">
                <p>${state.board[i] ? state.board[i] : '&nbsp'}</p>
            </div>`;
        }
        
        html += `</div>`;
        return html;
    };
    
    let html = '';
    html += renderRow(0,2);
    html += renderRow(3,5);
    html += renderRow(6,8);
    
    $('.board').html(html);
};

const newGame = () => {
    state.board = [ null, null, null, null, null, null, null, null, null ];
    state.currentPlayer = "X";
    state.winPattern = [];
    renderBoard();
};

$().ready(() => {
    renderBoard();
    
    $('.board').on('click', '.cell', () => {
        addToBoard($(event.target).closest('.cell').attr('id'));
    });
    
    $('.controls').on('click', '#new-game', () => {
        newGame();
    });
});