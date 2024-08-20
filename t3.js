// script.js

const cells = document.querySelectorAll('[data-cell]');
const status = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');

let currentPlayer = 'X'; // X starts the game
let gameBoard = ['', '', '', '', '', '', '', '', '']; // Empty board

// Function to check for a win condition
function checkWin() {
    const winConditions = [
        [0, 1, 2], // Row 1
        [3, 4, 5], // Row 2
        [6, 7, 8], // Row 3
        [0, 3, 6], // Column 1
        [1, 4, 7], // Column 2
        [2, 5, 8], // Column 3
        [0, 4, 8], // Diagonal 1
        [2, 4, 6]  // Diagonal 2
    ];

    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }

    if (!gameBoard.includes('')) return 'Tie'; // No empty cells left
    return null;
}

// Function to handle cell clicks
function handleClick(e) {
    const cell = e.target;
    const index = Array.from(cells).indexOf(cell);

    if (gameBoard[index] || checkWin()) return; // Ignore if cell is taken or game is over

    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;

    const winner = checkWin();
    if (winner) {
        if (winner === 'Tie') {
            status.textContent = 'It\'s a tie!';
        } else {
            status.textContent = `${winner} wins!`;
        }
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
}

// Function to reset the game
function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    status.textContent = `Player X's turn`;
}

// Add event listeners to cells
cells.forEach(cell => cell.addEventListener('click', handleClick));

// Add event listener to reset button
resetBtn.addEventListener('click', resetGame);
