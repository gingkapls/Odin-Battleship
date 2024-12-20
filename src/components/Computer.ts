import { AttackResult, Gameboard, Pos } from './Gameboard';
import { Player } from './Player';
import { Ship } from './Ship';

export class Computer {
  #hitList: Map<string, AttackResult>;
  player: Player;

  constructor(player: Player) {
    this.player = player;
    this.#hitList = new Map<string, AttackResult>();
  }
  
  get gameboard() {
    return this.player.gameboard;
  }

  #generateRandomCoords(): Pos {
    return [
      Math.floor(Math.random() * this.gameboard.rows),
      Math.floor(Math.random() * this.gameboard.cols),
    ];
  }

  attackRandomCoord(): Pos {
    let [row, col]: Pos = [0, 0];
    // Generate random coords that arent already attacked
    do {
      [row, col] = this.#generateRandomCoords();
    } while (!this.#hitList.has(`${row},${col}`));

    const status = this.gameboard.receiveAttack([row, col]);
    this.#hitList.set(`${row},${col}`, status);

    return [0, 0];
  }

  placeRandomShip(ship: Ship): Pos {
    let areaStart: Pos;
    let areaEnd: Pos;
    let [row, col]: Pos = [0, 0];
    do {
      [row, col] = this.#generateRandomCoords();
      ({ areaStart, areaEnd } = Gameboard.vectorizeCoords(ship, [row, col]));
    } while (!this.gameboard.isAreaEmpty(areaStart, areaEnd));
    
    this.player.placeShip(ship, [row, col]);
    return [row, col];
  }
}
