import { Ship } from './Ship';

class Cell {
  ship: Ship;
  isHit: boolean;

  constructor() {
    this.ship = null;
    this.isHit = false;
  }
}

type Pos = [number, number];

export class Gameboard {
  #board: Cell[][];
  #rows: number;
  #cols: number;

  constructor([rows, cols]: [number, number] = [10, 10]) {
    this.#rows = rows;
    this.#cols = cols;

    this.#board = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => new Cell()),
    );
  }

  get board(): readonly Cell[][] {
    return Object.freeze(this.#board);
  }

  #isValidPos([x, y]: Pos) {
    return x < this.#rows && y < this.#cols;
  }

  #isCellEmpty([x, y]: Pos): boolean {
    return this.#board.at(x).at(y).ship === null;
  }

  isAreaEmpty([x, y]: Pos, length: number) {
    // Check for neighbouring ships
    // 1 row above and below ship
    for (let row = x - 1; row < x + 1; ++row) {
      // 1 cell before and after ship's length
      for (let col = y - 1; col < y + length + 1; ++col) {
        if (
          !this.#isValidPos([row, col]) || // out of bounds
          (this.#isValidPos([row, col]) && !this.#isCellEmpty([row, col])) // within bounds and occupied
        ) {
          return false;
        }
      }
    }
    return true;
  }

  placeShip(ship: Ship, [x, y]: Pos): boolean {
    if (!this.isAreaEmpty([x, y], ship.length)) return false;
    const cell = this.#board.at(x).at(y);

    for (let col = y, row = x; col < y + ship.length; ++col) {
      this.#board.at(row).at(col).ship = ship;
    }
    return true;
  }

  receiveAttack([x, y]: Pos): boolean {
    const pos = this.#board.at(x).at(y);
    if (pos.ship === null || pos.isHit === true) return false;

    pos.ship.hit();
    console.log(pos.isHit);
    pos.isHit = true;
    console.log(pos.isHit);
    return true;
  }

  allSunk(): boolean {
    // TODO: implement
    // There exists a ship that isn't sunk
    // return this.ships.some((ship) => !ship.isSunk);
    return false;
  }

  ships: Ship[];
}
