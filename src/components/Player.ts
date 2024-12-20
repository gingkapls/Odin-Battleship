import { Gameboard, Pos } from './Gameboard';
import { Ship } from './Ship';

export class Player {
  #gameboard: Gameboard;
  name: string;
  ships: Ship[];

  constructor(gameboard: Gameboard, name: string) {
    this.#gameboard = gameboard;
    this.name = name;
    this.ships = [
      new Ship('Carrier', 'horizontal'),
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
    ];
  }

  get gameboard() {
    return this.#gameboard;
  }

  placeShip(ship: Ship, [row, col]: Pos) {
    const shipIndex = this.ships.indexOf(ship);
    // const [shipToPlace] = this.ships.splice(shipIndex, 1);
    const shipToPlace = this.ships.at(shipIndex);
    this.gameboard.placeShip(shipToPlace, [row, col]);
    console.log(this.gameboard);
  }

}
