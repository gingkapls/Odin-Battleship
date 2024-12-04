/**
 * @property {number} Length of ship 
 */
const SHIP_LENGTH = {
  Carrier: 5,
  Battleship: 4,
  Destroyer: 3,
  Submarine: 2,
  PatrolBoat: 1,
} as const;

export type ShipType = keyof typeof SHIP_LENGTH; 

export class Ship {
  length: number;
  #hits: number;

  constructor(type: ShipType) {
    this.length = SHIP_LENGTH[type];
    this.#hits = 0;
  }

  hit(): void {
    this.#hits = this.#hits < this.length ? this.#hits + 1 : this.#hits;
  }

  get isSunk(): boolean {
    return this.#hits === this.length;
  }

  get hits(): number {
    return this.#hits;
  }
}
