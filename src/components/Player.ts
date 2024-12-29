import { Gameboard, Pos } from './Gameboard';
import { Ship } from './Ship';

export class Player {
  #gameboard: Gameboard;
  name: string;
  #ships: Ship[];

  constructor(gameboard: Gameboard, name: string, numShips: number = 10) {
    this.#gameboard = gameboard;
    this.name = name;
    this.#ships = this.#initShips(numShips);
  }

  #initShips(num: number): Ship[] {
    return [
      new Ship('Battleship', 'horizontal'),
      new Ship('Destroyer', 'horizontal'),
      new Ship('Destroyer', 'horizontal'),
      new Ship('Submarine', 'horizontal'),
      new Ship('Submarine', 'horizontal'),
      new Ship('Submarine', 'horizontal'),
      new Ship('PatrolBoat', 'horizontal'),
      new Ship('PatrolBoat', 'horizontal'),
      new Ship('PatrolBoat', 'horizontal'),
      new Ship('PatrolBoat', 'horizontal'),
    ].toSpliced(num); 
  }

  get ships() {
    return this.#ships;
  }

  get gameboard() {
    return this.#gameboard;
  }

  get isReady(): boolean {
    return this.#ships.length === this.#gameboard.locations.length;
  }

  placeShip(ship: Ship, [row, col]: Pos): Pos {
    const shipIndex = this.#ships.indexOf(ship);
    const shipToPlace = this.#ships.at(shipIndex);
    this.gameboard.placeShip(shipToPlace, [row, col]);
    return [row, col];
  }
}
