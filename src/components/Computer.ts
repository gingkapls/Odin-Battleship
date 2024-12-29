import { AttackResult, Pos } from './Gameboard';
import { Player } from './Player';
import { Ship } from './Ship';

export class Computer {
  #hitList: Map<string, AttackResult['status']>;
  player: Player;
  opponent: Player;

  constructor(player: Player, opponent: Player) {
    this.player = player;
    this.player.name = 'Computer';
    this.opponent = opponent;
    this.#hitList = new Map<string, AttackResult['status']>();
  }

  get gameboard() {
    return this.player.gameboard;
  }

  get opponentBoard() {
    return this.opponent.gameboard;
  }

  generateRandomCoords(): Pos {
    return [
      Math.round(Math.random() * (this.gameboard.rows - 1)),
      Math.round(Math.random() * (this.gameboard.cols - 1)),
    ];
  }

  attackRandomCoord(): AttackResult {
    let [row, col]: Pos = [0, 0];
    // Generate random coords that arent already attacked
    do {
      [row, col] = this.generateRandomCoords();
    } while (this.#hitList.has(`${row},${col}`));

    // const result = gameController.attackPlayer(this.opponent, [row, col]);
    const result = this.opponent.gameboard.receiveAttack([row, col]);
    this.#hitList.set(`${row},${col}`, result.status);

    return result;
  }

  randomizeAllShipOrientations() {
    this.player.ships.forEach((ship) => {
      if (Math.random() > 0.5) ship.toggleOrientation();
    });
  }

  placeShipRandom(ship: Ship): Pos {
    let [row, col]: Pos = [0, 0];
    do {
      [row, col] = this.generateRandomCoords();
    } while (!this.gameboard.canPlaceShip(ship, [row, col]));

    this.player.placeShip(ship, [row, col]);
    return [row, col];
  }

  placeAllShips(): Pos[] {
    this.randomizeAllShipOrientations();
    return this.player.ships.map((ship) => this.placeShipRandom(ship));
  }
}
