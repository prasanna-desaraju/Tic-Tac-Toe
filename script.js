// script.js
const cells = document.querySelectorAll('[data-cell]');
const winnerMessage = document.getElementById('winner-message');
const restartButton = document.getElementById('restartButton');
const selectionScreen = document.getElementById('selection-screen');
const gameScreen = document.getElementById('game-screen');
const chooseXButton = document.getElementById('choose-x');
const chooseOButton = document.getElementById('choose-o');

let isXTurn;
let playerSymbol = 'x'; // Default symbol
let opponentSymbol = 'o';

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const checkWin = (currentClass) => {
  return winningCombinations.some(combination =>
    combination.every(index => cells[index].classList.contains(currentClass))
  );
};

const isDraw = () => {
  return [...cells].every(cell =>
    cell.classList.contains('x') || cell.classList.contains('o')
  );
};

const handleClick = (e) => {
  const cell = e.target;
  const currentClass = isXTurn ? playerSymbol : opponentSymbol;
  cell.classList.add(currentClass);
  cell.textContent = isXTurn ? (playerSymbol === 'x' ? 'X' : 'O') : (opponentSymbol === 'x' ? 'X' : 'O');

  if (checkWin(currentClass)) {
    winnerMessage.textContent = `${isXTurn ? 'You' : 'Opponent'} Win! 🎉`;
    endGame();
  } else if (isDraw()) {
    winnerMessage.textContent = "It's a Draw! 🤝";
    endGame();
  } else {
    isXTurn = !isXTurn;
  }
};

const endGame = () => {
  cells.forEach(cell => cell.removeEventListener('click', handleClick));
};

const startGame = () => {
  isXTurn = playerSymbol === 'x';
  winnerMessage.textContent = '';
  cells.forEach(cell => {
    cell.classList.remove('x', 'o');
    cell.textContent = '';
    cell.addEventListener('click', handleClick, { once: true });
  });
};

const initializeGame = (symbol) => {
  playerSymbol = symbol;
  opponentSymbol = symbol === 'x' ? 'o' : 'x';
  selectionScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  startGame();
};

// Event listeners for symbol selection
chooseXButton.addEventListener('click', () => initializeGame('x'));
chooseOButton.addEventListener('click', () => initializeGame('o'));

// Restart button
restartButton.addEventListener('click', () => {
  gameScreen.classList.add('hidden');
  selectionScreen.classList.remove('hidden');
});
