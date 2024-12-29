// import { Computer } from './components/Computer';
import { DOMBoard } from './components/DOMBoard';
import { DOMController } from './components/DOMController';
import { EventController } from './components/EventController';
import { AttackResult } from './components/Gameboard';
import { gameController, GameResult } from './components/GameController';
import { Player } from './components/Player';
import './style.css';

const statusbar: HTMLElement = document.querySelector('.statusbar');
const btnMode: HTMLInputElement = document.querySelector('#btn-mode');

const player1Container: HTMLElement = document.querySelector(
  '#player1.player-container > .board-container',
);
const handler1 = new EventController(gameController.player1);
const board1 = new DOMBoard(gameController.player1, handler1, player1Container);

const player2Container: HTMLElement = document.querySelector(
  '#player2.player-container > .board-container',
);
const handler2 = new EventController(gameController.player2);
const board2 = new DOMBoard(gameController.player2, handler2, player2Container);

const viewController = new DOMController(statusbar, btnMode, board1, board2);

gameController.subscribe('playerReady', () => {
  viewController.handleReady();
});

gameController.subscribe('changeTurn', (player: Player) => {
  viewController.displayTurn(player);
});

gameController.subscribe('gameEnd', (result: GameResult) => {
  viewController.handleGameEnd(result);
});

gameController.subscribe('attack', (result: AttackResult) => {
  viewController.handleAttack(result);
})

gameController.subscribe('changeTurn', (player: Player) => {
  if (!gameController.isGameReady) return;
  if (!gameController.isComputerEnabled) return;
  if (player !== gameController.computer.player) return;

  setTimeout(() => {

  gameController.playComputerTurn()
  gameController.toggleTurn();

  }, 500)
})

// TODO: Display attack status and turn at same time
// gameController.subscribe('attack', (status: AttackResult) => {
// viewController.displayAttackStatus(status);
// })
