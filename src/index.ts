// import { Computer } from './components/Computer';
import { DOMBoardSetup } from './components/DOMBoardSetup';
import { DragAndDropHandler } from './components/DragAndDropHandler';
import { Gameboard } from './components/Gameboard';
import { Player } from './components/Player';
import './style.css';

const player1Container: HTMLElement = document.querySelector(
  '#player1.player-container',
);

const player2Container: HTMLElement = document.querySelector(
  '#player2.player-container',
)

const player1 = new Player(new Gameboard(), 'gin');
const handler = new DragAndDropHandler(player1);
const board1 = new DOMBoardSetup(
  player1,
  handler,
  player1Container,
);

const player2 = new Player(new Gameboard(), 'gin');
const handler2 = new DragAndDropHandler(player1);
const board2 = new DOMBoardSetup(
  player2,
  handler2,
  player2Container,
)
