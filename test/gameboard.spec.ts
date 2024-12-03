import { describe, expect, it } from '@jest/globals';
import { Gameboard, shipOrientation } from '../src/components/Gameboard';
import { Ship, ShipType } from '../src/components/Ship';
import repeatCall from './repeatCall';

const setup = (type: ShipType = "Submarine", orientation: shipOrientation = "horizontal") => ({
  gameboard: new Gameboard(),
  ship: new Ship(type),
  orientation,
});

describe('place()', () => {
  it('places a ship horizontally', () => {
    const { gameboard, ship, orientation } = setup('Submarine', 'horizontal');
    expect(gameboard.placeShip(ship, [0, 0], orientation)).toBe(true);

    expect(gameboard.board[0][0].ship).toBe(ship);
    expect(gameboard.board[0][1].ship).toBe(ship);
    expect(gameboard.board[0][2].ship).toBe(ship);
    // (l: number) => expect(gameboard.board[0][0 + l].ship).toBe(ship),
    // ship.length,
    // );
  });

  it('places a ship vertically', () => {
    const { gameboard, ship, orientation } = setup('Submarine', 'vertical');
    expect(gameboard.placeShip(ship, [5, 0], orientation)).toBe(true);

    expect(gameboard.board[5][0].ship).toBe(ship);
    expect(gameboard.board[6][0].ship).toBe(ship);
    expect(gameboard.board[7][0].ship).toBe(ship);

    // repeatCall(
    // (l: number) => expect(gameboard.board[5 + l][0].ship).toBe(ship),
    // ship.length,
    // );
  });

  it('does not place a ship out of bounds', () => {
    const { gameboard, ship, orientation } = setup('Submarine', 'horizontal');
    expect(
      gameboard.placeShip(ship, [10, 11], orientation),
    ).toBe(false);
  });

  it('does not place on same cell twice', () => {
    const { gameboard, orientation } = setup();
    const coords: [number, number] = [3, 3];

    expect(gameboard.placeShip(new Ship('PatrolBoat'), coords, orientation)).toBe(true);
    expect(gameboard.placeShip(new Ship('Carrier'), coords, orientation)).toBe(false);
  });

  it('does not overlap ships', () => {
    const { gameboard, orientation } = setup();
    const ship1 = new Ship('Submarine');
    const ship2 = new Ship('Carrier');
    const coords1: [number, number] = [3, 3];
    const coords2: [number, number] = [3, 4];

    expect(gameboard.placeShip(ship1, coords1, orientation)).toBe(true);

    expect(gameboard.placeShip(ship2, coords2, orientation)).toBe(false);
    repeatCall(
      (n: number) => expect(gameboard.board[3][4 + n].ship).not.toBe(ship2),
      ship2.length,
    );
  });
});

describe('receiveAttack()', () => {
  it('receives an attack', () => {
    const { gameboard, ship, orientation } = setup("Submarine", "horizontal");
    gameboard.placeShip(ship, [0, 0], orientation);
    expect(gameboard.receiveAttack([0, 0])).toBe(true);
    expect(gameboard.board[0][0].isHit).toBe(true);
    expect(gameboard.board[0][2].ship.hits).toBe(1);
  });

  it('does not receive an out of bound attack', () => {
    const { gameboard } = setup("Submarine", "horizontal");
    expect(gameboard.receiveAttack([11, 10])).toBe(false);
  });

  it('does not receive attacks on the same cell more than once', () => {
    const { gameboard, ship, orientation } = setup("Submarine", "horizontal");
    gameboard.placeShip(ship, [0, 0], orientation);
    expect(gameboard.receiveAttack([0, 0])).toBe(true);
    expect(gameboard.receiveAttack([0, 0])).toBe(false);
    expect(gameboard.board[0][2].ship.hits).toBe(1);
  });

  it('receives multiple attacks', () => {
    const { gameboard, ship, orientation } = setup("Submarine", "horizontal");
    gameboard.placeShip(ship, [0, 0], orientation);
    repeatCall((i: number) => {
      expect(gameboard.receiveAttack([0, 0 + i])).toBe(true);
    }, ship.length);
  });
});

// TODO: add tests
describe.skip('allSunk()', () => {
  it('returns false when no ships are sunk', () => {
    const { gameboard, ship, orientation } = setup("Submarine", "horizontal");
    gameboard.placeShip(ship, [0, 3], orientation);
    expect(gameboard.allSunk).toBe(false);
  });

  it('returns false when one ship is sunk', () => {
    const { gameboard, ship, orientation } = setup("Submarine", "horizontal");
    gameboard.placeShip(ship, [0, 3], orientation);
    repeatCall((i) => gameboard.receiveAttack([0, 3 + i]), ship.length);
    expect(gameboard.allSunk).toBe(false);
  });
});
