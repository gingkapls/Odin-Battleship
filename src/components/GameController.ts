import { Computer } from './Computer';
import { AttackResult, Gameboard, Pos } from './Gameboard';
import { callbackType, Observable } from './Observable';
import { Player } from './Player';

export type GameEvent =
  | 'attack'
  | 'playerReady'
  | 'changeTurn'
  | 'gameStart'
  | 'gameEnd'
  | 'shipSunk'
  | 'reset';

export interface GameResult {
  winner: Player;
  loser: Player;
}

class GameController {
  static #instance: GameController;
  #observer: Observable<GameEvent>;
  #player1: Player;
  #player2: Player;
  #currentTurn: Player;
  #isGameEnded: boolean;
  #isComputerEnabled: boolean;
  #computer: Computer;

  constructor() {
    if (GameController.#instance) {
      return GameController.#instance;
    }
    this.#player1 = new Player(new Gameboard(), 'Player 1');
    this.#player2 = new Player(new Gameboard(), 'Player 2');
    this.#computer = new Computer(this.#player2, this.#player1);
    this.#observer = new Observable<GameEvent>();

    this.#currentTurn = this.#player1;
    this.#isGameEnded = false;
    this.#isComputerEnabled = true;

    GameController.#instance = this;
  }

  get isGameReady(): boolean {
    return this.#player1.isReady && this.#player2.isReady;
  }

  get isGameEnded(): boolean {
    return this.#isGameEnded;
  }

  get computer(): Computer {
    return this.#computer;
  }

  readyPlayer(player: Player) {
    if (!player.isReady) return;
    this.#observer.notifySubscribers('playerReady', player);
  }

  startGame(): void {
    this.#currentTurn = this.#player1;
    this.#observer.notifySubscribers('gameStart', this.#currentTurn);
  }

  endGame(): void {
    this.#observer.notifySubscribers('gameEnd', {
      winner: this.#currentTurn,
      loser: this.nextTurn,
    });
    this.#isGameEnded = true;
  }

  toggleComputer(): boolean {
    return (this.#isComputerEnabled = !this.#isComputerEnabled);
  }

  get isComputerEnabled(): boolean {
    return this.#isComputerEnabled;
  }

  toggleTurn(): Player {
    this.#currentTurn = this.nextTurn;
    this.#observer.notifySubscribers('changeTurn', this.#currentTurn);
    return this.currentTurn;
  }

  attackPlayer(player: Player, [row, col]: Pos): AttackResult {
    const result = player.gameboard.receiveAttack([row, col]);
    this.#notifyAttackResult(player, result);
    return result;
  }

  #notifyAttackResult(player: Player, result: AttackResult) {
    const [row, col] = result.pos;
    this.#observer.notifySubscribers('attack', result);

    if (result.status === 'invalid') return result;
    if (result.status === 'miss') return result;

    // Check if ship is sunk
    const attackedShip = player.gameboard.board[row][col].ship;
    if (attackedShip.isSunk) {
      this.#observer.notifySubscribers('shipSunk', attackedShip);
    }

    // Notify game end
    if (player.gameboard.areAllSunk) {
      this.endGame();
    }

    return result;
  }

  playComputerTurn(): AttackResult {
    const result = this.computer.attackRandomCoord();
    this.#notifyAttackResult(this.computer.opponent, result);
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

  get nextTurn(): Player {
    return this.#currentTurn === this.#player1 ? this.#player2 : this.#player1;
  }

  get player1(): Player {
    return this.#player1;
  }

  get player2(): Player {
    return this.#player2;
  }
}

export const gameController = new GameController();
