import { Player } from './Player';

export class EventController {
  player: Player;

  constructor(player: Player) {
    this.player = player;
  }

  boardDragOverHandler(e: DragEvent): void {
    e.preventDefault();
    if (!(e.target instanceof HTMLElement)) return;
    if (!e.target.classList.contains('grid-cell')) return;

    const id = e.dataTransfer.getData('text/plain');
    const [row, col] = [
      parseInt(e.target.dataset.row),
      parseInt(e.target.dataset.col),
    ];

    // why is it an empty string sometimes?
    if (id.length === 0) return;

    const shipEl: HTMLElement = document.querySelector(`#${id}`);

    // Don't assign node to same cell
    if (shipEl.parentElement === e.target.parentElement) return;

    const ship = this.player.ships.find((ship) => ship.id === shipEl.id);

    console.log(ship, row, col);
    if (!this.player.gameboard.canPlaceShip(ship, [row, col])) return;

    shipEl.classList.add('dragging');
    e.target.appendChild(shipEl);
  }

  boardDropHandler(e: DragEvent): void {
    if (!(e.currentTarget instanceof HTMLElement)) return;
    if (!(e.target instanceof HTMLElement)) return;

    const data = e.dataTransfer.getData('text/plain');

    // why is it an empty string sometimes?
    if (data.length === 0) return;

    e.dataTransfer.dropEffect = 'move';
  }

  shipDragStartHandler(e: DragEvent): void {
    if (!(e.currentTarget instanceof HTMLElement)) return;

    e.dataTransfer.setData('text/plain', e.currentTarget.id);
    const parent = e.currentTarget.parentElement;

    if (parent.classList.contains('ship-container')) return;

    const [row, col] = [Number(parent.dataset.row), Number(parent.dataset.col)];
    this.player.gameboard.removeShip([row, col]);
  }

  shipDragEndHandler(e: DragEvent): void {
    if (!(e.currentTarget instanceof HTMLElement)) return;
    if (!(e.target instanceof HTMLElement)) return;

    console.log(e.dataTransfer.dropEffect);
    e.target.classList.remove('dragging');
    const shipEl = e.currentTarget;

    const ship = this.player.ships.find((ship) => ship.id === shipEl.id);
    const row = parseInt(shipEl.parentElement.dataset.row);
    const col = parseInt(shipEl.parentElement.dataset.col);

    if (e.dataTransfer.dropEffect === 'none') {
      const data = e.dataTransfer.getData('text/plain');
      const ship = document.querySelector(`#${data}`);
      document.querySelector('.ship-container').append(ship);
      return;
    }

    if (this.player.gameboard.canPlaceShip(ship, [row, col])) {
      this.player.gameboard.placeShip(ship, [row, col]);
    }
    console.log(this.player.gameboard);
  }

  shipClickHandler(e: Event) {
    const shipEl = e.target;
    if (!(shipEl instanceof HTMLElement)) return;
    if (!shipEl.parentElement.classList.contains('grid-cell')) return;

    const [row, col] = [
      parseInt(shipEl.parentElement.dataset.row),
      parseInt(shipEl.parentElement.dataset.col),
    ];

    const status = this.player.gameboard.rotateShip([row, col]);

    if (!status) return;

    const oldHeight = shipEl.style.height;
    const oldWidth = shipEl.style.width;

    shipEl.style.height = oldWidth;
    shipEl.style.width = oldHeight;
  }
  
}
