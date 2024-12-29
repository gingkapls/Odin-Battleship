import { describe, expect, it } from '@jest/globals';
import { Gameboard } from '../src/components/Gameboard';
import { Ship, ShipType, ShipOrientation } from '../src/components/Ship';

const setup = (
  type: ShipType = 'Submarine',
  orientation: ShipOrientation = 'horizontal',
) => ({
  gameboard: new Gameboard(),
  ship: new Ship(type, orientation),
});

describe('place()', () => {
  it('places a ship horizontally', () => {
    const { gameboard, ship } = setup('Destroyer', 'horizontal');
    expect(gameboard.placeShip(ship, [0, 0])).toBe(true);

    expect(gameboard.board[0][0].ship).toBe(ship);
    expect(gameboard.board[0][1].ship).toBe(ship);
    expect(gameboard.board[0][2].ship).toBe(ship);

    // Does not place more than length
    expect(gameboard.board[0][3].ship).toBe(null);
    expect(gameboard.board[1][0].ship).toBe(null);
  });

  it('places a ship vertically', () => {
    const { gameboard, ship } = setup('Destroyer', 'vertical');
    expect(gameboard.placeShip(ship, [5, 0])).toBe(true);

    expect(gameboard.board[5][0].ship).toBe(ship);
    expect(gameboard.board[6][0].ship).toBe(ship);
    expect(gameboard.board[7][0].ship).toBe(ship);

    // Does not place more than length
    expect(gameboard.board[8][0].ship).toBe(null);
    expect(gameboard.board[5][1].ship).toBe(null);
  });

  it('does not place a ship out of bounds', () => {
    const { gameboard, ship } = setup('Destroyer', 'horizontal');
    expect(gameboard.placeShip(ship, [10, 11])).toBe(false);
  });

  it('does not place on same cell twice', () => {
    const { gameboard } = setup();
    const coords: [number, number] = [3, 3];

    expect(
      gameboard.placeShip(new Ship('PatrolBoat', 'horizontal'), coords),
    ).toBe(true);
    expect(gameboard.placeShip(new Ship('Carrier', 'horizontal'), coords)).toBe(
      false,
    );
  });

  it('does not overlap ships', () => {
    const { gameboard } = setup();
    const ship1 = new Ship('Destroyer', 'horizontal');
    const ship2 = new Ship('Carrier', 'horizontal');
    const coords1: [number, number] = [3, 3];
    const coords2: [number, number] = [3, 4];

    expect(gameboard.placeShip(ship1, coords1)).toBe(true);

    expect(gameboard.placeShip(ship2, coords2)).toBe(false);

    expect(gameboard.board[3][4].ship).not.toBe(ship2);
    expect(gameboard.board[3][5].ship).not.toBe(ship2);
    expect(gameboard.board[3][6].ship).not.toBe(ship2);
  });
});

describe('receiveAttack()', () => {
  it('receives an attack', () => {
    const { gameboard, ship } = setup('Destroyer', 'horizontal');
    gameboard.placeShip(ship, [0, 0]);
    expect(gameboard.receiveAttack([0, 0]).status).toBe('success');
    expect(gameboard.board[0][0].isHit).toBe(true);

    expect(gameboard.board[0][1].ship.hits).toBe(1);
  });

  it('does not receive an out of bound attack', () => {
    const { gameboard } = setup('Destroyer', 'horizontal');
    expect(gameboard.receiveAttack([11, 10]).status).toBe('invalid');
  });

  it('does not receive attacks on the same cell more than once', () => {
    const { gameboard, ship } = setup('Destroyer', 'horizontal');
    gameboard.placeShip(ship, [0, 0]);
    expect(gameboard.receiveAttack([0, 0]).status).toBe('success');
    expect(gameboard.receiveAttack([0, 0]).status).toBe('invalid');
    expect(gameboard.board[0][2].ship.hits).toBe(1);
  });

  it('receives multiple attacks', () => {
    const { gameboard, ship } = setup('Destroyer', 'horizontal');
    gameboard.placeShip(ship, [0, 0]);

    expect(gameboard.receiveAttack([0, 0]).status).toBe('success');
    expect(gameboard.receiveAttack([0, 1]).status).toBe('success');
    expect(gameboard.board[0][0].ship.hits).toBe(2);
  });
});

describe('removeShip', () => {
  it('removes a ship', () => {
    const { gameboard, ship } = setup('Destroyer', 'horizontal');
    gameboard.placeShip(ship, [0, 0]);

    gameboard.removeShip([0, 0]);
    expect(gameboard.board[0][0].ship).toBe(null);
    expect(gameboard.board[0][1].ship).toBe(null);
    expect(gameboard.board[0][2].ship).toBe(null);
  });

  it('returns a location object with the ship details', () => {
    const { gameboard, ship } = setup('Destroyer', 'horizontal');
    gameboard.placeShip(ship, [0, 0]);

    expect(gameboard.removeShip([0, 0])).toEqual({
      ship,
      start: [0, 0],
      end: [0, 2],
    });
  });
});

describe('moveShip()', () => {
  it('removes the ship from original coords', () => {
    const { gameboard, ship } = setup('Destroyer', 'horizontal');

    gameboard.placeShip(ship, [0, 0]);

    expect(gameboard.moveShip([0, 0], [5, 5])).toBe(true);

    expect(gameboard.board[0][0].ship).toBe(null);
    expect(gameboard.board[0][1].ship).toBe(null);
    expect(gameboard.board[0][2].ship).toBe(null);
  });

  it('moves the ship to the new coords', () => {
    const { gameboard, ship } = setup('Destroyer', 'horizontal');

    gameboard.placeShip(ship, [0, 0]);

    expect(gameboard.moveShip([0, 0], [5, 5])).toBe(true);

    expect(gameboard.board[5][5].ship).toBe(ship);
    expect(gameboard.board[5][6].ship).toBe(ship);
    expect(gameboard.board[5][7].ship).toBe(ship);
  });

  it('moves a ship one square over', () => {
    const { gameboard, ship } = setup('Destroyer', 'horizontal');

    gameboard.placeShip(ship, [0, 0]);

    expect(gameboard.moveShip([0, 0], [0, 1])).toBe(true);

    expect(gameboard.board[0][1].ship).toBe(ship);
    expect(gameboard.board[0][2].ship).toBe(ship);
    expect(gameboard.board[0][3].ship).toBe(ship);
  });

  it('does not move a ship out of bounds', () => {
    const { gameboard, ship } = setup('Destroyer', 'horizontal');

    gameboard.placeShip(ship, [0, 0]);

    expect(gameboard.moveShip([0, 0], [15, 15])).toBe(false);
  });

  it('does not move ship in case of unsuccessful move', () => {
    const { gameboard, ship } = setup('Destroyer', 'horizontal');

    gameboard.placeShip(ship, [0, 0]);

    expect(gameboard.moveShip([0, 0], [15, 15])).toBe(false);

    expect(gameboard.board[0][0].ship).toBe(ship);
    expect(gameboard.board[0][1].ship).toBe(ship);
    expect(gameboard.board[0][2].ship).toBe(ship);
  });

  it('does not overlap ships', () => {
    const { gameboard, ship } = setup('Destroyer', 'horizontal');
    const ship2 = new Ship('Carrier', 'horizontal');

    gameboard.placeShip(ship, [0, 0]);
    gameboard.placeShip(ship2, [5, 5]);

    expect(gameboard.moveShip([0, 0], [5, 5])).toBe(false);
    expect(gameboard.moveShip([0, 0], [5, 6])).toBe(false);
  });
});

describe('rotateShip()', () => {
  it('rotates a ship vertically', () => {
    const { gameboard, ship } = setup('Destroyer', 'horizontal');
    gameboard.placeShip(ship, [0, 0]);
    expect(gameboard.rotateShip([0, 0])).toBe(true);

    // New coords
    expect(gameboard.board[0][0].ship).toBe(ship);
    expect(gameboard.board[1][0].ship).toBe(ship);
    expect(gameboard.board[2][0].ship).toBe(ship);

    // Original coords
    expect(gameboard.board[0][1].ship).toBe(null);
    expect(gameboard.board[0][2].ship).toBe(null);
  });

  it('rotates a ship horizontally', () => {
    const { gameboard, ship } = setup('Destroyer', 'vertical');
    gameboard.placeShip(ship, [0, 0]);
    expect(gameboard.rotateShip([0, 0])).toBe(true);

    // New coords
    expect(gameboard.board[0][0].ship).toBe(ship);
    expect(gameboard.board[0][1].ship).toBe(ship);
    expect(gameboard.board[0][2].ship).toBe(ship);

    // Original coords
    expect(gameboard.board[1][0].ship).toBe(null);
    expect(gameboard.board[2][0].ship).toBe(null);
  });

  it('does not rotate ship when there is not enough space', () => {
    const { gameboard, ship } = setup('Destroyer', 'horizontal');
    const ship2 = new Ship('Destroyer', 'horizontal');
    gameboard.placeShip(ship, [0, 0]);
    gameboard.placeShip(ship2, [2, 0]);

    expect(gameboard.rotateShip([0, 0])).toBe(false);
    // Original coordinates
    expect(gameboard.board[0][0].ship).toBe(ship);
    expect(gameboard.board[0][1].ship).toBe(ship);
    expect(gameboard.board[0][2].ship).toBe(ship);

    // New coordinates
    expect(gameboard.board[1][0].ship).toBe(null);
    expect(gameboard.board[2][0].ship).toBe(ship2);
  });
});

// TODO: add tests
describe('allSunk()', () => {
  it('returns false when no ships are sunk', () => {
    const { gameboard, ship } = setup('Destroyer', 'horizontal');
    gameboard.placeShip(ship, [0, 3]);
    expect(gameboard.areAllSunk).toBe(false);
  });

  it('returns true when the only ship is sunk', () => {
    const { gameboard, ship } = setup('Destroyer', 'horizontal');
    gameboard.placeShip(ship, [0, 0]);

    gameboard.receiveAttack([0, 0]);
    gameboard.receiveAttack([0, 1]);
    gameboard.receiveAttack([0, 2]);
    expect(gameboard.areAllSunk).toBe(true);
  });

  it('returns true when the all the ships are sunk', () => {
    const { gameboard, ship } = setup('Destroyer', 'horizontal');
    const ship2 = new Ship('Destroyer', 'horizontal');
    gameboard.placeShip(ship, [0, 0]);
    gameboard.placeShip(ship2, [2, 0]);

    // Sinking ship 1
    gameboard.receiveAttack([0, 0]);
    gameboard.receiveAttack([0, 1]);
    gameboard.receiveAttack([0, 2]);

    // Sinking ship 2
    gameboard.receiveAttack([2, 0]);
    gameboard.receiveAttack([2, 1]);
    gameboard.receiveAttack([2, 2]);

    expect(gameboard.areAllSunk).toBe(true);
  });
});
