import { Gameboard } from './Gameboard';

export class Player {
  board: Gameboard;
  name: string;
  isTurn: boolean;

  constructor(board: Gameboard, name: string) {
    this.board = board;
    this.name = name;
    this.isTurn = false;
  }
}
