import { DragAndDropHandler } from './DragAndDropHandler';
import { Gameboard } from './Gameboard';
import { Player } from './Player';
import { Ship } from './Ship';

export class DOMBoardSetup {
  #container: HTMLElement;
  boardEl: HTMLDivElement;
  attackButton: HTMLButtonElement;
  shipContainer: HTMLDivElement;
  ships: HTMLDivElement[];
  resetButton: HTMLButtonElement;
  eventHandlers: DragAndDropHandler;
  player: Player;
  gameboard: Gameboard;

  constructor(
    player: Player,
    eventHandlers: DragAndDropHandler,
    container: HTMLElement,
  ) {
    this.gameboard = player.gameboard;
    this.player = player;
    this.eventHandlers = eventHandlers;
    this.#container = container;

    this.shipContainer = this.#createShipContainer();
    this.boardEl = this.#createBoard(player.gameboard);
    this.#addShipsToContainer(this.player.ships);
    this.#container.replaceChildren(this.shipContainer, this.boardEl);
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

    boardEl.addEventListener(
      'drop',
      this.eventHandlers.boardDragOverHandler.bind(this.eventHandlers),
    );
    boardEl.addEventListener(
      'dragover',
      this.eventHandlers.boardDragOverHandler.bind(this.eventHandlers),
    );

    return boardEl;
  }

  #createShipElement = (ship: Ship): HTMLElement => {
    const shipEl = document.createElement('div');
    shipEl.classList.add('ship');
    shipEl.id = ship.id;
    shipEl.draggable = true;
    shipEl.style.width = `${ship.length * 3}rem`;

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
}
