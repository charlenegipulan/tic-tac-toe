/*----- constants -----*/

//declare variable to keep check of turns and scores
var lookup = {
    '1' : 'WhiteSmoke',
    '-1' : 'SlateGray',
    'null' : 'white'
};


/*----- app's state (variables) -----*/

var board, turn, winner; 

var score = {
    '1' : 0,
    '-1' : 0,
    'T' : 0
};


/*----- cached element references -----*/

//our array of divs
var squares = document.querySelectorAll('td div');
var messageEl = document.querySelector('h1');
var scoreEls = document.querySelectorAll('section p');



/*----- event listeners -----*/

//even listener to run handleMove function when table is clicked and button resetted
document.querySelector('table').addEventListener('click', handleMove);
document.querySelector('button').addEventListener('click', init);




/*----- functions -----*/

//this function runs when a move is taken
function handleMove (evt) {
    if (evt.target.tagName !== 'DIV') return;
    var idx = Array.from(squares).findIndex(function(div) {return div === evt.target });
    if (board[idx] || winner ) return; //doesnt let you click again if winner or box is taken
    board[idx] =turn;
    turn *= -1;
    winner = getWinner();
    if (winner) score[winner]++; //keeps score and increment score if theres a winner
    render();
}

//checks for the winning combos 
function getWinner () {
    if (Math.abs(board[0] + board [1] + board[2]) === 3) return board[0]; 
    if (Math.abs(board[3] + board [4] + board[5]) === 3) return board[3]; 
    if (Math.abs(board[6] + board [7] + board[8]) === 3) return board[6]; 
    if (Math.abs(board[0] + board [3] + board[6]) === 3) return board[0]; 
    if (Math.abs(board[1] + board [4] + board[7]) === 3) return board[1]; 
    if (Math.abs(board[2] + board [5] + board[8]) === 3) return board[2]; 
    if (Math.abs(board[0] + board [4] + board[8]) === 3) return board[0]; 
    if (Math.abs(board[2] + board [4] + board[6]) === 3) return board[2]; 
    if (board.includes(null)) return null;
    return 'T';
}


//initialize the application's state, null represents how nobody has made a move yet
function init () { 
    board = new Array(9).fill(null);
    turn = 1;
    winner = null; //set to 1 or -1 if a player wins, 'T' if tie
    
    render();
}

// function that runs and checks result after every turn is taken
function render () {
    squares.forEach(function(sq, idx) {
        sq.style.backgroundColor = lookup[board[idx]];
    });
//render the message
    if (winner === "T") {
        messageEl.textContent = `It's a draw!`;
    } else if (winner) {
        messageEl.textContent = `Congrats Player ${lookup[winner].toUpperCase()}!!!`;
    } else {
        messageEl.textContent = `Player ${lookup[turn].toUpperCase()}'s Turn`;
    }
    scoreEls[0].innerHTML = `Player ${lookup['1'].toUpperCase()}: <strong>${score['1']}</strong>`;
    scoreEls[1].innerHTML = `Player ${lookup['-1'].toUpperCase()}: <strong>${score['-1']}</strong>`;
    scoreEls[2].innerHTML = `Ties: <strong>${score['T']}</strong>`;
} 

init();

