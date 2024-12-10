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

interface Location {
  ship: Ship;
  start: Pos;
  end: Pos;
}

export class Gameboard {
  #board: Cell[][];
  #rows: number;
  #cols: number;
  locations: Location[];

  constructor([rows, cols]: [number, number] = [10, 10]) {
    this.#rows = rows;
    this.#cols = cols;

    this.#board = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => new Cell()),
    );
    this.locations = [];
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

  #findShipByPos([row, col]: Pos): Location {
    return this.locations.find(
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
    this.locations.push({ ship, start, end } as Location);
  }

  #deregisterShip(ship: Ship): void {
    const idx = this.locations.findIndex((location) =>
      Object.is(location.ship, ship),
    );
    this.locations = this.locations.toSpliced(idx, 1);
  }

  static #vectorizeCoords(
    length: number,
    [row, col]: Pos,
    orientation: shipOrientation,
  ) {
    const vectorized: { horizontal: Pos; vertical: Pos } = {
      horizontal: [row, col + length - 1],
      vertical: [row + length - 1, col],
    };

    return {
      areaStart: [row, col] as Pos,
      areaEnd: vectorized[orientation] as Pos,
    };
  }

  placeShip(
    ship: Ship,
    [row, col]: Pos,
    orientation: shipOrientation,
  ): boolean {
    const { areaStart, areaEnd } = Gameboard.#vectorizeCoords(
      ship.length,
      [row, col],
      orientation,
    );

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

  static #getShipOrientation(
    [rowStart, colStart]: Pos,
    [rowEnd, colEnd]: Pos,
  ): shipOrientation {
    const height = Math.abs(rowEnd - rowStart);
    const width = Math.abs(colEnd - colStart);

    return height < width ? 'horizontal' : 'vertical';
  }

  moveShip([rowSrc, colSrc]: Pos, [rowDest, colDest]: Pos): boolean {
    // Fetch ship details
    const { ship, start, end } = this.#findShipByPos([rowSrc, colSrc]);
    const orientation = Gameboard.#getShipOrientation(start, end);

    // Remove ship to handle the case where we overlap it with its original position
    this.removeShip([rowSrc, colSrc]);

    const { areaStart, areaEnd } = Gameboard.#vectorizeCoords(
      ship.length,
      [rowDest, colDest],
      orientation,
    );

    // Early return if destination area isn't empty
    // Replace ship at original position
    if (this.isAreaEmpty(areaStart, areaEnd) === false) {
      this.placeShip(ship, start, orientation);
      return false;
    }

    this.placeShip(ship, [rowDest, colDest], orientation);
    return true;
  }

  receiveAttack([row, col]: Pos): boolean {
    // TODO: indicate missed hits
    if (!this.#isValidPos([row, col])) return false;

    const cell = this.#board[row][col];

    if (cell.isHit) return false;

    cell.isHit = true;
    if (cell.ship === null) return false;
    cell.ship.hit();
    return true;
  }

  allSunk(): boolean {
    // TODO: implement
    // There exists a ship that isn't sunk
    // return this.ships.some((ship) => !ship.isSunk);
    return false;
  }
}
