export type ShipOrientation = 'vertical' | 'horizontal';
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
  #id: string;
  #orientation: ShipOrientation;

  constructor(type: ShipType, orientation: ShipOrientation) {
    this.length = SHIP_LENGTH[type];
    this.#hits = 0;
    this.#id = `S-${Math.floor(Math.random() * 1024).toString(16)}`;
    this.#orientation = orientation;
  }

  hit(): void {
    this.#hits = this.#hits < this.length ? this.#hits + 1 : this.#hits;
  }

  get isSunk(): boolean {
    return this.#hits === this.length;
  }

  get id(): string {
    return this.#id;
  }

  get hits(): number {
    return this.#hits;
  }

  get orientation(): ShipOrientation {
    return this.#orientation;
  }

  toggleOrientation(): ShipOrientation {
    return (this.#orientation =
      this.#orientation === 'horizontal' ? 'vertical' : 'horizontal');
  }
}
