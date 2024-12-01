export class Ship {
  length: number;
  #hits: number;

  constructor(length: number) {
    this.length = length;
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