import { Ship } from './Ship';

export class Cell {
  ship: Ship;
  isHit: boolean;

  constructor() {
    this.ship = null;
    this.isHit = false;
  }
}
