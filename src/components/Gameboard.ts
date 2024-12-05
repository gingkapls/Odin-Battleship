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

export type shipOrientation = 'vertical' | 'horizontal';

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

  /**
   *
   * @param n {number} Number to test
   * @param min {number} Lower bound(inclusive)
   * @param max {number} Upper bound(exclusive)
   * @returns
   */
  static #isInRange(n: number, [min, max]: [number, number]) {
    return n >= min && n < max;
  }

  #isValidPos([x, y]: Pos) {
    return (
      Gameboard.#isInRange(x, [0, this.#rows]) &&
      Gameboard.#isInRange(y, [0, this.#cols])
    );
  }

  #isCellEmpty([x, y]: Pos): boolean {
    return this.#board.at(x).at(y).ship === null;
  }

  isAreaEmpty([xStart, yStart]: Pos, [xEnd, yEnd]: Pos) {
    // Check for neighbouring ships
    // 1 row above and below ship
    // Use <= because start will be equal to end for 1 unit width
    for (let row = xStart - 1; row <= xEnd + 1; ++row) {
      // 1 cell before and after ship's length
      for (let col = yStart - 1; col <= yEnd + 1; ++col) {
        if (
          this.#isValidPos([row, col]) && // within bounds
          !this.#isCellEmpty([row, col]) // is occupied
        ) {
          return false;
        }
      }
    }

    // Check ship's area
    for (let row = xStart; row <= xEnd; ++row) {
      for (let col = yStart; col <= yEnd; ++col) {
        if (!this.#isValidPos([row, col])) return false;
      }
    }
    return true;
  }

  placeShip(ship: Ship, [x, y]: Pos, orientation: shipOrientation): boolean {
    const vectorized: { horizontal: Pos; vertical: Pos } = {
      horizontal: [x, y + ship.length - 1],
      vertical: [x + ship.length - 1, y],
    };

    const areaStart: Pos = [x, y];
    const areaEnd: Pos = vectorized[orientation];

    // length - 1 because our board is 0 indexing
    if (!this.isAreaEmpty(areaStart, areaEnd)) return false;

    for (let row = areaStart[0]; row <= areaEnd[0]; ++row) {
      for (let col = areaStart[1]; col <= areaEnd[1]; ++col) {
        this.#board.at(row).at(col).ship = ship;
      }
    }

    return true;
  }

  receiveAttack([x, y]: Pos): boolean {
    if (!this.#isValidPos([x, y])) return false;

    const cell = this.#board.at(x).at(y);
    if (cell.ship === null || cell.isHit === true) return false;

    cell.ship.hit();
    cell.isHit = true;
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
