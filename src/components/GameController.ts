import { AttackResult, Pos } from './Gameboard';
import { callbackType, Observable } from './Observable';
import { Player } from './Player';

export type GameEvent =
  | 'attack'
  | 'changeTurn'
  | 'gameStart'
  | 'gameEnd'
  | 'shipSunk'
  | 'reset';

export class GameController {
  static #instance: GameController;
  #observer: Observable<GameEvent>;
  #player1: Player;
  #player2: Player;
  #currentTurn: Player;

  constructor(player1: Player, player2: Player) {
    if (GameController.#instance) {
      return GameController.#instance;
    }
    this.#player1 = player1;
    this.#player2 = player2;
    this.#observer = new Observable<GameEvent>();
    GameController.#instance = this;
  }

  isPlayerReady(player: Player): boolean {
    return player.ships.length === player.gameboard.locations.length;
  }

  get isGameReady(): boolean {
    const isPlayer1Ready = this.isPlayerReady(this.#player1);
    const isPlayer2Ready = this.isPlayerReady(this.#player2);

    return isPlayer1Ready && isPlayer2Ready;
  }

  startGame(): void {
    this.#observer.notifySubscribers('gameStart');
  }

  endGame(): void {
    this.#observer.notifySubscribers('gameEnd', { loser: this.#currentTurn });
  }

  toggleTurn(): Player {
    this.#currentTurn =
      this.currentTurn === this.#player1 ? this.#player2 : this.#player1;
    this.#observer.notifySubscribers('changeTurn', this.currentTurn);
    return this.currentTurn;
  }

  attackCurrentPlayer([row, col]: Pos): AttackResult {
    const result = this.currentTurn.gameboard.receiveAttack([row, col]);
    this.#observer.notifySubscribers('attack', result);

    // Check if ship is sunk
    const attackedShip = this.currentTurn.gameboard.board[row][col].ship;
    if (attackedShip.isSunk) {
      this.#observer.notifySubscribers('shipSunk', attackedShip);
    }

    // Notify game end
    if (this.currentTurn.gameboard.areAllSunk) {
      this.endGame();
    }

    return result;
  }

  subscribe(event: GameEvent, func: callbackType): callbackType {
    return this.#observer.addSubscriber(event, func);
  }

  unsubscribe(event: GameEvent, func: callbackType): boolean {
    return this.#observer.removeSubscriber(event, func);
  }

  get currentTurn(): Player {
    return this.#currentTurn;
  }

  get player1(): Player {
    return this.#player1;
  }

  get player2(): Player {
    return this.#player2;
  }
}
