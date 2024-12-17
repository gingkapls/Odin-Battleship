import './style.css';

const createBoard = (gridSize: number): HTMLDivElement => {
  const board = document.createElement('div');
  board.classList.add('board');

  for (let i = 0; i < gridSize; ++i) {
    for (let j = 0; j < gridSize; ++j) {
      const cell = document.createElement('div');
      cell.classList.add('grid-cell');
      cell.dataset.row = String(i);
      cell.dataset.col = String(j);
      board.appendChild(cell);
    }
  }

  return board;
};

const container = document.querySelector('#player1 > .board-container');
const container2 = document.querySelector('#player2 > .board-container');

container.replaceChildren(createBoard(10));


container2.replaceChildren(createBoard(10));
