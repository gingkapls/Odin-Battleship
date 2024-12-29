import { EventController } from './EventController';
import { Gameboard } from './Gameboard';
import { Player } from './Player';
import { Ship } from './Ship';

export class DOMBoard {
  container: HTMLElement;
  boardEl: HTMLDivElement;
  btnReady: HTMLButtonElement;
  shipContainer: HTMLDivElement;
  ships: HTMLDivElement[];
  eventHandlers: EventController;
  player: Player;
  gameboard: Gameboard;

  constructor(
    player: Player,
    eventHandlers: EventController,
    container: HTMLElement,
  ) {
    this.gameboard = player.gameboard;
    this.player = player;
    this.eventHandlers = eventHandlers;
    this.container = container;
    
    this.#initBoard();
  }

  #initBoard() {
    this.shipContainer = this.#createShipContainer();
    this.btnReady = this.#createReadyButton();
    this.boardEl = this.#createBoard(this.player.gameboard);
    this.#addShipsToContainer(this.player.ships);
    this.container.replaceChildren(
      this.shipContainer,
      this.boardEl,
      this.btnReady,
    );
  }
  
  reset() {
    this.#initBoard();
  }

  #addShipsToContainer(shipArray: Ship[]): void {
    shipArray.forEach((ship) => {
      const shipEl = this.#createShipElement(ship);
      this.shipContainer.appendChild(shipEl);
    });
  }

  #createShipContainer(): HTMLDivElement {
    const container = document.createElement('div');
    container.classList.add('ship-container');
    return container;
  }

  #createBoard(board: Gameboard): HTMLDivElement {
    const boardEl = document.createElement('div');
    boardEl.classList.add('board');
    boardEl.draggable = false;

    for (let row = 0; row < board.rows; ++row) {
      for (let col = 0; col < board.cols; ++col) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        cell.dataset.row = String(row);
        cell.dataset.col = String(col);
        boardEl.appendChild(cell);
      }
    }

/*     boardEl.addEventListener(
      'drop',
      this.eventHandlers.boardDropHandler.bind(this.eventHandlers),
    ); */
    boardEl.addEventListener(
      'dragover',
      this.eventHandlers.boardDragOverHandler.bind(this.eventHandlers),
    );
    boardEl.addEventListener('click', (e) =>
      this.eventHandlers.cellClickHandler(e, this.player),
    );

    return boardEl;
  }

  disableBoard() {
    this.boardEl.style.pointerEvents = 'none';
  }

  showBoard(): void {
    this.container.parentElement.style.display = 'flex';
    this.boardEl.style.display = 'grid';
  }

  hideBoard(): void {
    this.container.parentElement.style.display = 'none'
    this.boardEl.style.display = 'none';
  }

  removeExtraElements() {
    const elements: NodeListOf<HTMLElement> = this.container.querySelectorAll(
      '.btn-ready, .ship-container',
    );
    elements.forEach((el) => el.remove());
  }

  removeShipElements(): void {
    const ships = this.container.querySelectorAll('.ship');
    ships.forEach((ship) => ship.remove());
  }

  #createShipElement = (ship: Ship): HTMLElement => {
    const shipEl = document.createElement('div');
    const cellSize = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue(
        '--cell-size-unitless',
      ),
    );
    shipEl.classList.add('ship');
    shipEl.id = ship.id;
    shipEl.draggable = true;
    shipEl.style.width = `${ship.length * cellSize}rem`;

    // Drag and drop
    shipEl.addEventListener(
      'dragstart',
      this.eventHandlers.shipDragStartHandler.bind(this.eventHandlers),
    );
    shipEl.addEventListener(
      'dragend',
      this.eventHandlers.shipDragEndHandler.bind(this.eventHandlers),
    );

    // Rotate on click
    shipEl.addEventListener(
      'click',
      this.eventHandlers.shipClickHandler.bind(this.eventHandlers),
    );
    return shipEl;
  };

  #createReadyButton(): HTMLButtonElement {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Ready';
    button.classList.add('btn-ready');
    button.addEventListener(
      'click',
      this.eventHandlers.btnReadyHandler.bind(this.eventHandlers),
    );
    return button;
  }
}
