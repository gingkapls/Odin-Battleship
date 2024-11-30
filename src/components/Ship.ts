interface Ship {
  length: number;
  hits: number;
  hit(): void;
  isSunk: boolean;
}

const shipProto = {
  hit(): void {
    this.hits = this.hits < this.length ? this.hits + 1 : this.hits;
  },
  get isSunk(): boolean {
    return this.hits === this.length;
  },
};

const createShip = (length: number): Ship => {
  const ship = Object.create(shipProto);
  ship.length = length;
  ship.hits = 0;
  return ship;
};

export default createShip;
