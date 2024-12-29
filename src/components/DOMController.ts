import { DOMBoard } from './DOMBoard';
import { AttackResult } from './Gameboard';
import { gameController, GameResult } from './GameController';
import { Player } from './Player';

export class DOMController {
  container: HTMLElement;
  statusbar: HTMLElement;
  player1Board: DOMBoard;
  player2Board: DOMBoard;
  btnMode: HTMLInputElement;

  constructor(
    statusbar: HTMLElement,
    btnMode: HTMLInputElement,
    player1Board: DOMBoard,
    player2Board: DOMBoard,
  ) {
    this.statusbar = statusbar;
    this.player1Board = player1Board;
    this.player2Board = player2Board;
    this.displayTurn(player1Board.player);
    this.btnMode = btnMode;
    this.btnMode.addEventListener('click', this.toggleMode.bind(this));
    this.displayMode();
  }

  displayTurn(currentPlayer: Player): void {
    const currentPlayerName = currentPlayer.name;

    if (gameController.isGameReady) {
      this.statusbar.textContent = `${currentPlayerName}'s turn to attack`;
      this.toggleBoardOpacity(currentPlayer);
    } else {
      this.statusbar.textContent = `${currentPlayerName}'s turn to place ships`;
    }
  }

  #getBoardByPlayer(player: Player): DOMBoard {
    switch (player) {
      case this.player1Board.player:
        return this.player1Board;

      case this.player2Board.player:
        return this.player2Board;

      default:
        return this.player1Board;
    }
  }

  toggleBoardOpacity(currentPlayer: Player) {
    console.log(currentPlayer);
    const currentBoard = this.#getBoardByPlayer(currentPlayer);
    const otherBoard = this.#getBoardByPlayer(gameController.nextTurn);

    otherBoard.boardEl.classList.add('turn');
    currentBoard.boardEl.classList.remove('turn');
  }

  displayAttackStatus(result: AttackResult): void {
    if (result.status === 'success') {
      this.statusbar.textContent = 'A successful hit!';
    } else if (result.status === 'miss') {
      this.statusbar.textContent = 'That was a miss!';
    }
  }

  displayWinner(winner: Player): void {
    this.statusbar.textContent = `${winner.name} has won!`;
  }

  handleReady() {
    if (gameController.isGameReady) {
      this.player2Board.removeExtraElements();
      this.player2Board.hideBoard();

      this.player1Board.showBoard();

      if (gameController.isComputerEnabled)
        this.player1Board.boardEl.style.pointerEvents = 'none';

      this.player2Board.showBoard();
      gameController.startGame();
      return;
    }

    if (this.player1Board.player.isReady) {
      this.player1Board.removeExtraElements();
      this.player1Board.hideBoard();
      this.btnMode.parentElement.style.display = 'none';
      
      if (gameController.isComputerEnabled) {
        gameController.computer.placeAllShips();
        gameController.readyPlayer(gameController.computer.player);
        console.log(gameController.isGameReady);
      } else {
        this.player2Board.showBoard();
      }
    }
  }

  handleAttack(result: AttackResult) {
    const board: DOMBoard = this.#getBoardByPlayer(gameController.nextTurn);

    const [row, col] = result.pos;
    if (result.status === 'invalid') return;

    const cell: HTMLElement = board.boardEl.querySelector(
      `.grid-cell[data-row='${row}'][data-col='${col}']`,
    );

    switch (result.status) {
      case 'success':
        cell.classList.add('hit-success');
        break;
      case 'miss':
        cell.classList.add('hit-miss');
        break;
      default:
      // Do nothing
    }
  }

  handleGameEnd(result: GameResult) {
    this.player1Board.disableBoard();
    this.player2Board.disableBoard();
    this.displayWinner(result.winner);
  }

  toggleMode() {
    const computerEnabled = gameController.toggleComputer();
    this.player2Board.player.name = computerEnabled ? "Computer" : "Player 2";
    console.log("computer is enabled: ", computerEnabled);
    // this.btnMode.textContent = newMode === false ? '1P' : '2P';
  }
  
  displayMode() {
    this.btnMode.checked = !gameController.isComputerEnabled;
  }

  hideOtherElements(container: HTMLElement) {
    const elementsToHide: NodeListOf<HTMLElement> = container.querySelectorAll(
      '.ship-container, .button, .board',
    );

    elementsToHide.forEach((el) => (el.style.display = 'none'));
  }
}
