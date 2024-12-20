import { DragAndDropHandler } from './DragAndDropHandler';
import { Gameboard } from './Gameboard';
import { Player } from './Player';
import { Ship } from './Ship';

export class DOMBoardSetup {
  boardEl: HTMLDivElement;
  attackButton: HTMLButtonElement;
  shipContainer: HTMLDivElement;
  ships: HTMLDivElement[];
  resetButton: HTMLButtonElement;
  eventHandlers: DragAndDropHandler;
  player: Player;
  gameboard: Gameboard;

  constructor(player: Player, eventHandlers: DragAndDropHandler) {
    this.gameboard = player.gameboard;
    this.player = player;
    this.boardEl = this.#createBoard(player.gameboard);
    this.shipContainer = this.#createShipContainer();
    this.eventHandlers = eventHandlers;

    this.#addShipsToContainer(this.player.ships);
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

    for (let row = 0; row < board.rows; ++row) {
      for (let col = 0; col < board.cols; ++col) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        cell.dataset.row = String(row);
        cell.dataset.col = String(col);
        boardEl.appendChild(cell);
      }
    }
    
    boardEl.addEventListener("dragover", this.eventHandlers.boardDragOverHandler)
    boardEl.addEventListener("dragover", this.eventHandlers.boardDragOverHandler)

    return boardEl;
  }

  #createShipElement = (ship: Ship): HTMLElement => {
    const shipEl = document.createElement('div');
    shipEl.classList.add('ship');
    shipEl.id = ship.id;
    shipEl.draggable = true;
    shipEl.style.width = `${ship.length * 3}rem`;

    // Drag and drop
    shipEl.addEventListener('dragstart', this.eventHandlers.shipDragStartHandler);
    shipEl.addEventListener('dragend', this.eventHandlers.shipDragEndHandler);

    // Rotate on click
    shipEl.addEventListener('click', this.eventHandlers.shipClickHandler);
    return shipEl;
  };
}
