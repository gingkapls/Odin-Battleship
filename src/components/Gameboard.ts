import { Ship } from './Ship';
import { Cell } from './Cell';

export type Pos = [number, number];

export interface AttackResult {
  pos: Pos;
  status: 'success' | 'miss' | 'invalid';
}

export interface Location {
  ship: Ship;
  start: Pos;
  end: Pos;
}

export class Gameboard {
  #board: Cell[][];
  #rows: number;
  #cols: number;
  #locations: Location[];

  constructor([rows, cols]: [number, number] = [10, 10]) {
    this.#rows = rows;
    this.#cols = cols;

    this.#board = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => new Cell()),
    );
    this.#locations = [];
  }

  get board(): readonly Cell[][] {
    return Object.freeze(this.#board);
  }

  get rows() {
    return this.#rows;
  }
  get cols() {
    return this.#cols;
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

  #findShipByPos([row, col]: Pos): Location {
    return this.#locations.find(
      (loc) =>
        Gameboard.#isInRange(row, [loc.start[0], loc.end[0] + 1]) && // +1 because upper bound is exclusive
        Gameboard.#isInRange(col, [loc.start[1], loc.end[1] + 1]), // row,col coords of ship
    );
  }

  #isValidPos([row, col]: Pos) {
    return (
      Gameboard.#isInRange(row, [0, this.#rows]) &&
      Gameboard.#isInRange(col, [0, this.#cols])
    );
  }

  #isCellEmpty([row, col]: Pos): boolean {
    return this.#board[row][col].ship === null;
  }

  isAreaEmpty([rowStart, colStart]: Pos, [rowEnd, colEnd]: Pos) {
    // Check for neighbouring ships
    // 1 row above and below ship
    // Use <= because start will be equal to end for 1 unit width
    for (let row = rowStart - 1; row <= rowEnd + 1; ++row) {
      // 1 cell before and after ship's length
      for (let col = colStart - 1; col <= colEnd + 1; ++col) {
        if (
          this.#isValidPos([row, col]) && // within bounds
          !this.#isCellEmpty([row, col]) // is occupied
        ) {
          return false;
        }
      }
    }

    // Check ship's area
    for (let row = rowStart; row <= rowEnd; ++row) {
      for (let col = colStart; col <= colEnd; ++col) {
        if (!this.#isValidPos([row, col])) return false;
      }
    }
    return true;
  }

  #registerShip(ship: Ship, start: Pos, end: Pos): void {
    this.#locations.push({ ship, start, end } as Location);
  }

  #deregisterShip(ship: Ship): void {
    const idx = this.#locations.findIndex((location) =>
      Object.is(location.ship, ship),
    );
    this.#locations = this.#locations.toSpliced(idx, 1);
  }

  static vectorizeCoords(ship: Ship, [row, col]: Pos) {
    const vectorized: { horizontal: Pos; vertical: Pos } = {
      horizontal: [row, col + ship.length - 1],
      vertical: [row + ship.length - 1, col],
    };

    return {
      areaStart: [row, col] as Pos,
      areaEnd: vectorized[ship.orientation] as Pos,
    };
  }

  canPlaceShip(ship: Ship, [row, col]: Pos): boolean {
    const { areaStart, areaEnd } = Gameboard.vectorizeCoords(ship, [row, col]);
    return this.isAreaEmpty(areaStart, areaEnd);
  }

  placeShip(ship: Ship, [row, col]: Pos): boolean {
    const { areaStart, areaEnd } = Gameboard.vectorizeCoords(ship, [row, col]);

    // length - 1 because our board is 0 indexing
    if (!this.isAreaEmpty(areaStart, areaEnd)) return false;

    for (let row = areaStart[0]; row <= areaEnd[0]; ++row) {
      for (let col = areaStart[1]; col <= areaEnd[1]; ++col) {
        this.#board[row][col].ship = ship;
      }
    }

    this.#registerShip(ship, areaStart, areaEnd);
    return true;
  }

  // TODO: do something about orientation
  removeShip([row, col]: Pos): Location {
    const location = this.#findShipByPos([row, col]);

    const [rowStart, colStart] = location.start;
    const [rowEnd, colEnd] = location.end;

    // remove ship from board
    for (let row = rowStart; row <= rowEnd; ++row) {
      for (let col = colStart; col <= colEnd; ++col) {
        this.#board[row][col].ship = null;
      }
    }

    // remove ship from location array
    this.#deregisterShip(location.ship);
    return location;
  }

  moveShip([rowSrc, colSrc]: Pos, [rowDest, colDest]: Pos): boolean {
    // Fetch ship details
    const { ship, start } = this.#findShipByPos([rowSrc, colSrc]);

    // Remove ship to handle the case where we overlap it with its original position
    this.removeShip([rowSrc, colSrc]);

    const { areaStart, areaEnd } = Gameboard.vectorizeCoords(ship, [
      rowDest,
      colDest,
    ]);

    // Early return if destination area isn't empty
    // Replace ship at original position
    if (this.isAreaEmpty(areaStart, areaEnd) === false) {
      this.placeShip(ship, start);
      return false;
    }

    this.placeShip(ship, [rowDest, colDest]);
    return true;
  }

  rotateShip([row, col]: Pos): boolean {
    // Remove old ship to handle overlaps
    const { ship } = this.removeShip([row, col]);
    ship.toggleOrientation();

    const { areaStart: newAreaStart, areaEnd: newAreaEnd } =
      Gameboard.vectorizeCoords(ship, [row, col]);

    if (this.isAreaEmpty(newAreaStart, newAreaEnd)) {
      // Ship can be rotated
      this.placeShip(ship, [row, col]);
      return true;
    } else {
      // Place back into original orientation if not enough space
      ship.toggleOrientation();
      this.placeShip(ship, [row, col]);
      return false;
    }
  }

  receiveAttack([row, col]: Pos): AttackResult {
    const res: AttackResult = { pos: [row, col], status: 'invalid' };
    // TODO: indicate missed hits
    if (!this.#isValidPos([row, col])) {
      return res;
    }

    const cell = this.#board[row][col];

    if (cell.isHit) return res;

    cell.isHit = true;
    if (cell.ship === null) {
      res.status = 'miss';
      return res;
    }

    cell.ship.hit();
    res.status = 'success';
    return res;
  }
  
  get locations() {
    return this.#locations;
  }

  get areAllSunk(): boolean {
    // Check every placed ship's sunk status
    return this.#locations.every((loc) => loc.ship.isSunk);
  }
}
