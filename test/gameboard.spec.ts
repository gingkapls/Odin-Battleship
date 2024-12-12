import { describe, expect, it } from '@jest/globals';
import { Gameboard, shipOrientation } from '../src/components/Gameboard';
import { Ship, ShipType } from '../src/components/Ship';

const setup = (
  type: ShipType = 'Submarine',
  orientation: shipOrientation = 'horizontal',
) => ({
  gameboard: new Gameboard(),
  ship: new Ship(type),
  orientation,
});

describe('place()', () => {
  it('places a ship horizontally', () => {
    const { gameboard, ship, orientation } = setup('Destroyer', 'horizontal');
    expect(gameboard.placeShip(ship, [0, 0], orientation)).toBe(true);

    expect(gameboard.board[0][0].ship).toBe(ship);
    expect(gameboard.board[0][1].ship).toBe(ship);
    expect(gameboard.board[0][2].ship).toBe(ship);

    // Does not place more than length
    expect(gameboard.board[0][3].ship).toBe(null);
    expect(gameboard.board[1][0].ship).toBe(null);
  });

  it('places a ship vertically', () => {
    const { gameboard, ship, orientation } = setup('Destroyer', 'vertical');
    expect(gameboard.placeShip(ship, [5, 0], orientation)).toBe(true);

    expect(gameboard.board[5][0].ship).toBe(ship);
    expect(gameboard.board[6][0].ship).toBe(ship);
    expect(gameboard.board[7][0].ship).toBe(ship);

    // Does not place more than length
    expect(gameboard.board[8][0].ship).toBe(null);
    expect(gameboard.board[5][1].ship).toBe(null);
  });

  it('does not place a ship out of bounds', () => {
    const { gameboard, ship, orientation } = setup('Destroyer', 'horizontal');
    expect(gameboard.placeShip(ship, [10, 11], orientation)).toBe(false);
  });

  it('does not place on same cell twice', () => {
    const { gameboard, orientation } = setup();
    const coords: [number, number] = [3, 3];

    expect(
      gameboard.placeShip(new Ship('PatrolBoat'), coords, orientation),
    ).toBe(true);
    expect(gameboard.placeShip(new Ship('Carrier'), coords, orientation)).toBe(
      false,
    );
  });

  it('does not overlap ships', () => {
    const { gameboard, orientation } = setup();
    const ship1 = new Ship('Destroyer');
    const ship2 = new Ship('Carrier');
    const coords1: [number, number] = [3, 3];
    const coords2: [number, number] = [3, 4];

    expect(gameboard.placeShip(ship1, coords1, orientation)).toBe(true);

    expect(gameboard.placeShip(ship2, coords2, orientation)).toBe(false);

    expect(gameboard.board[3][4].ship).not.toBe(ship2);
    expect(gameboard.board[3][5].ship).not.toBe(ship2);
    expect(gameboard.board[3][6].ship).not.toBe(ship2);
  });
});

describe('receiveAttack()', () => {
  it('receives an attack', () => {
    const { gameboard, ship, orientation } = setup('Destroyer', 'horizontal');
    gameboard.placeShip(ship, [0, 0], orientation);
    expect(gameboard.receiveAttack([0, 0])).toBe(true);
    expect(gameboard.board[0][0].isHit).toBe(true);

    expect(gameboard.board[0][1].ship.hits).toBe(1);
  });

  it('does not receive an out of bound attack', () => {
    const { gameboard } = setup('Destroyer', 'horizontal');
    expect(gameboard.receiveAttack([11, 10])).toBe(false);
  });

  it('does not receive attacks on the same cell more than once', () => {
    const { gameboard, ship, orientation } = setup('Destroyer', 'horizontal');
    gameboard.placeShip(ship, [0, 0], orientation);
    expect(gameboard.receiveAttack([0, 0])).toBe(true);
    expect(gameboard.receiveAttack([0, 0])).toBe(false);
    expect(gameboard.board[0][2].ship.hits).toBe(1);
  });

  it('receives multiple attacks', () => {
    const { gameboard, ship, orientation } = setup('Destroyer', 'horizontal');
    gameboard.placeShip(ship, [0, 0], orientation);

    expect(gameboard.receiveAttack([0, 0])).toBe(true);
    expect(gameboard.receiveAttack([0, 1])).toBe(true);
    expect(gameboard.board[0][0].ship.hits).toBe(2);
  });
});

describe('removeShip', () => {
  it('removes a ship', () => {
    const { gameboard, ship, orientation } = setup('Destroyer', 'horizontal');
    gameboard.placeShip(ship, [0, 0], orientation);

    gameboard.removeShip([0, 0]);
    expect(gameboard.board[0][0].ship).toBe(null);
    expect(gameboard.board[0][1].ship).toBe(null);
    expect(gameboard.board[0][2].ship).toBe(null);
  });

  it('returns a location object with the ship details', () => {
    const { gameboard, ship, orientation } = setup('Destroyer', 'horizontal');
    gameboard.placeShip(ship, [0, 0], orientation);

    expect(gameboard.removeShip([0, 0])).toEqual({
      ship,
      start: [0, 0],
      end: [0, 2],
    });
  });
});

describe('moveShip()', () => {
  it('removes the ship from original coords', () => {
    const { gameboard, ship, orientation } = setup('Destroyer', 'horizontal');

    gameboard.placeShip(ship, [0, 0], orientation);

    expect(gameboard.moveShip([0, 0], [5, 5])).toBe(true);

    expect(gameboard.board[0][0].ship).toBe(null);
    expect(gameboard.board[0][1].ship).toBe(null);
    expect(gameboard.board[0][2].ship).toBe(null);
  });

  it('moves the ship to the new coords', () => {
    const { gameboard, ship, orientation } = setup('Destroyer', 'horizontal');

    gameboard.placeShip(ship, [0, 0], orientation);

    expect(gameboard.moveShip([0, 0], [5, 5])).toBe(true);

    expect(gameboard.board[5][5].ship).toBe(ship);
    expect(gameboard.board[5][6].ship).toBe(ship);
    expect(gameboard.board[5][7].ship).toBe(ship);
  });

  it('moves a ship one square over', () => {
    const { gameboard, ship, orientation } = setup('Destroyer', 'horizontal');

    gameboard.placeShip(ship, [0, 0], orientation);

    expect(gameboard.moveShip([0, 0], [0, 1])).toBe(true);

    expect(gameboard.board[0][1].ship).toBe(ship);
    expect(gameboard.board[0][2].ship).toBe(ship);
    expect(gameboard.board[0][3].ship).toBe(ship);
  });

  it('does not move a ship out of bounds', () => {
    const { gameboard, ship, orientation } = setup('Destroyer', 'horizontal');

    gameboard.placeShip(ship, [0, 0], orientation);

    expect(gameboard.moveShip([0, 0], [15, 15])).toBe(false);
  });

  it('does not move ship in case of unsuccessful move', () => {
    const { gameboard, ship, orientation } = setup('Destroyer', 'horizontal');

    gameboard.placeShip(ship, [0, 0], orientation);

    expect(gameboard.moveShip([0, 0], [15, 15])).toBe(false);

    expect(gameboard.board[0][0].ship).toBe(ship);
    expect(gameboard.board[0][1].ship).toBe(ship);
    expect(gameboard.board[0][2].ship).toBe(ship);
  });

  it('does not overlap ships', () => {
    const { gameboard, ship, orientation } = setup('Destroyer', 'horizontal');
    const ship2 = new Ship('Carrier');

    gameboard.placeShip(ship, [0, 0], orientation);
    gameboard.placeShip(ship2, [5, 5], orientation);

    expect(gameboard.moveShip([0, 0], [5, 5])).toBe(false);
    expect(gameboard.moveShip([0, 0], [5, 6])).toBe(false);
  });
});

// TODO: add tests
describe.skip('allSunk()', () => {
  it('returns false when no ships are sunk', () => {
    const { gameboard, ship, orientation } = setup('Destroyer', 'horizontal');
    gameboard.placeShip(ship, [0, 3], orientation);
    expect(gameboard.allSunk).toBe(false);
  });

  it('returns false when one ship is sunk', () => {
    const { gameboard, ship, orientation } = setup('Destroyer', 'horizontal');
    gameboard.placeShip(ship, [0, 3], orientation);
    gameboard.receiveAttack([0, 3]);
    gameboard.receiveAttack([0, 4]);
    gameboard.receiveAttack([0, 5]);
    expect(gameboard.allSunk).toBe(false);
  });
});
