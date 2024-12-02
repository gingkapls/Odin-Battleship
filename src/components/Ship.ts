/**
 * @property {number} Length of ship 
 */
const SHIP_TYPE = {
  Carrier: 5,
  Battleship: 4,
  Destroyer: 3,
  Submarine: 3,
  PatrolBoat: 2,
} as const;

type ObjectValues<T> = T[keyof T];

export type ShipType = keyof typeof SHIP_TYPE; 


export class Ship {
  length: number;
  #hits: number;

  constructor(type: ShipType) {
    this.length = SHIP_TYPE[type];
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
