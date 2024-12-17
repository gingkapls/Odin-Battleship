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
      cell.draggable = false;
      board.appendChild(cell);
    }
  }

  return board;
};

const container = document.querySelector('#player1 > .board-container');
const container2 = document.querySelector('#player2 > .board-container');

const dragOverHandler = (e: DragEvent): void => {
  e.preventDefault();
  if (!(e.target instanceof HTMLElement)) return;
  const data = e.dataTransfer.getData('text/plain');
  const ship = document.querySelector(`#${data}`);

  // Don't assign node to same cell
  if (ship.parentElement === e.target.parentElement) return;

  e.target.appendChild(ship);
  console.log(e.target.dataset.row, e.target.dataset.col);
};

const dropHandler = (e: DragEvent): void => {
  if (!(e.currentTarget instanceof HTMLElement)) return;
  if (!(e.target instanceof HTMLElement)) return;

  e.dataTransfer.dropEffect = 'move';
};

const dragStartHandler = (e: DragEvent): void => {
  if (!(e.target instanceof HTMLElement)) return;

  e.dataTransfer.setData('text/plain', e.target.id);
  console.log(e.target.id);
};

const dragEndHandler = (e: DragEvent): void => {
  if (!(e.currentTarget instanceof HTMLElement)) return;
  if (!(e.target instanceof HTMLElement)) return;

  console.log(e.dataTransfer.dropEffect);

  if (e.dataTransfer.dropEffect === 'none') {
    const data = e.dataTransfer.getData('text/plain');
    const ship = document.querySelector(`#${data}`);

    document.querySelector('.ship-container').append(ship);
  }
};

const ship = document.querySelector('#ship1');

ship.addEventListener('dragstart', dragStartHandler);
ship.addEventListener('dragend', dragEndHandler);

// Creating boards
container.replaceChildren(createBoard(10));
container2.replaceChildren(createBoard(10));

container.addEventListener('dragover', dragOverHandler);
container.addEventListener('drop', dropHandler);
