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

  #findShipByPos([x, y]: Pos): Location {
    return this.locations.find(
      (loc) =>
        Gameboard.#isInRange(x, [loc.start[0], loc.end[0] + 1]) && // +1 because upper bound is exclusive
        Gameboard.#isInRange(y, [loc.start[1], loc.end[1] + 1]), // x,y coords of ship
    );
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
    [x, y]: Pos,
    orientation: shipOrientation,
  ) {
    const vectorized: { horizontal: Pos; vertical: Pos } = {
      horizontal: [x, y + length - 1],
      vertical: [x + length - 1, y],
    };

    return {
      areaStart: [x, y] as Pos,
      areaEnd: vectorized[orientation] as Pos,
    };
  }

  placeShip(ship: Ship, [x, y]: Pos, orientation: shipOrientation): boolean {
    const { areaStart, areaEnd } = Gameboard.#vectorizeCoords(
      ship.length,
      [x, y],
      orientation,
    );

    // length - 1 because our board is 0 indexing
    if (!this.isAreaEmpty(areaStart, areaEnd)) return false;

    for (let row = areaStart[0]; row <= areaEnd[0]; ++row) {
      for (let col = areaStart[1]; col <= areaEnd[1]; ++col) {
        this.#board.at(row).at(col).ship = ship;
      }
    }

    this.#registerShip(ship, areaStart, areaEnd);
    return true;
  }

  // TODO: do something about orientation
  removeShip([x, y]: Pos): Location {
    const location = this.#findShipByPos([x, y]);

    const [xStart, yStart] = location.start;
    const [xEnd, yEnd] = location.end;

    // remove ship from board
    for (let row = xStart; row <= xEnd; ++row) {
      for (let col = yStart; col <= yEnd; ++col) {
        this.#board.at(row).at(col).ship = null;
      }
    }

    // remove ship from location array
    this.#deregisterShip(location.ship);
    return location;
  }

  static #getShipOrientation(
    [xStart, yStart]: Pos,
    [xEnd, yEnd]: Pos,
  ): shipOrientation {
    const length = Math.abs(xEnd - xStart);
    const breadth = Math.abs(yEnd - yStart);

    return length > breadth ? 'horizontal' : 'vertical';
  }

  moveShip([xSrc, ySrc]: Pos, [xDest, yDest]: Pos): boolean {
    // Fetch ship details
    const { ship, start, end } = this.#findShipByPos([xSrc, ySrc]);
    const orientation = Gameboard.#getShipOrientation(start, end);

    // Early return if destination area isn't empty
    const { areaStart, areaEnd } = Gameboard.#vectorizeCoords(
      ship.length,
      [xDest, yDest],
      orientation,
    );
    if (this.isAreaEmpty(areaStart, areaEnd) === false) {
      return false;
    }

    this.removeShip([xSrc, ySrc]);
    this.placeShip(ship, [xDest, yDest], orientation);
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
