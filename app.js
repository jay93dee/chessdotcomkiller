const pieceSymbols = {
  p: "♟", r: "♜", n: "♞", b: "♝", q: "♛", k: "♚",
  P: "♙", R: "♖", N: "♘", B: "♗", Q: "♕", K: "♔"
};

const chess = new Chess();

const boardElement = document.querySelector('.board');
const historyList = document.querySelector('.history-list');
const moveInput = document.querySelector('input[type="text"]');
const errorElement = document.getElementById('error'); // You can add an element with id="error" for messages

function drawBoard() {
  boardElement.innerHTML = '';
  const board = chess.board();

  for (let row = 7; row >= 0; row--) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement('div');
      square.classList.add('square');

      // Checker pattern
      if ((row + col) % 2 === 0) {
        square.style.backgroundColor = document.body.classList.contains('dark-mode') ? '#6a8caf' : 'cornflowerblue';
      } else {
        square.style.backgroundColor = document.body.classList.contains('dark-mode') ? '#222' : 'antiquewhite';
      }

      const piece = board[row][col];
      if (piece) {
        const symbol = piece.color === 'w' ? pieceSymbols[piece.type.toUpperCase()] : pieceSymbols[piece.type];
        square.textContent = symbol;
      }
      boardElement.appendChild(square);
    }
  }
}

function updateHistory() {
  const moves = chess.history();
  historyList.innerHTML = '';
  for (let i = 0; i < moves.length; i += 2) {
    const whiteMove = moves[i] || '';
    const blackMove = moves[i + 1] || '';
    const moveText = document.createElement('div');
    moveText.textContent = `${i/2 + 1}. ${whiteMove} ${blackMove}`;
    historyList.appendChild(moveText);
  }
}
const modeToggle = document.getElementById('modeToggle');

modeToggle.addEventListener('change', () => {
  if (modeToggle.checked) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
 drawBoard();
});


function makeMove() {
  errorElement.textContent = '';
  const move = moveInput.value.trim();
  if (!move) return;

  const result = chess.move(move, { sloppy: true });
  if (result) {
    drawBoard();
    updateHistory();
  } else {
    errorElement.textContent = 'Invalid move. Use notation like "e2e4".';
  }
  moveInput.value = '';
}

document.querySelector('button').addEventListener('click', makeMove);
moveInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') makeMove();
});

// Initial render
drawBoard();
updateHistory();

