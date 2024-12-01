import { describe, expect, it } from '@jest/globals';
import { Gameboard } from '../src/components/gameboard';
import { Ship } from '../src/components/Ship';
import repeatCall from './repeatCall';

describe('place()', () => {
  it('places 1 ship', () => {
    const gameboard: Gameboard = new Gameboard();
    const ship = new Ship(3);
    expect(gameboard.placeShip(ship, [0, 5])).toBe(true);

    repeatCall(
      (l: number) => expect(gameboard.board[0][5 + l]).toBe(ship),
      ship.length,
    );
  });

  it('does not place a ship out of bounds', () => {
    const gameboard = new Gameboard();
    expect(gameboard.placeShip(new Ship(3), [10, 11])).toBe(false);
  });

  it('does not place on same cell twice', () => {
    const gameboard = new Gameboard();
    const coords: [number, number] = [3, 3];

    expect(gameboard.placeShip(new Ship(2), coords)).toBe(true);
    expect(gameboard.placeShip(new Ship(5), coords)).toBe(false);
  });

  it('does not overlap ships', () => {
    const gameboard = new Gameboard();
    const ship1 = new Ship(3);
    const ship2 = new Ship(5);
    const coords1: [number, number] = [3, 3];
    const coords2: [number, number] = [3, 4];

    expect(gameboard.placeShip(ship1, coords1)).toBe(true);

    expect(gameboard.placeShip(ship2, coords2)).toBe(false);
    repeatCall(
      (n: number) => expect(gameboard.board[3][4 + n].ship).not.toBe(ship2),
      ship2.length,
    );
  });
});

describe('receiveAttack()', () => {
  it('receives an attack', () => {
    const gameboard = new Gameboard();
    const ship = new Ship(3);
    gameboard.placeShip(ship, [0, 0]);
    expect(gameboard.receiveAttack([0, 0])).toBe(true);
    expect(gameboard.board[0][3].isHit).toBe(true);
    expect(gameboard.board[0][3].ship.hits).toBe(1);
  });

  it('does not receieve an out of bound attack', () => {
    const gameboard = new Gameboard();
    expect(gameboard.receiveAttack([11, 10])).toBe(false);
  });

  it('does not receives attacks on the same cell more than once', () => {
    const gameboard = new Gameboard();
    const ship = new Ship(3);
    gameboard.placeShip(ship, [0, 0]);
    expect(gameboard.receiveAttack([0, 0])).toBe(true);
    expect(gameboard.receiveAttack([0, 0])).toBe(false);
    expect(gameboard.board[0][3].ship.hits).toBe(1);
  });

  it('receives multiple attacks', () => {
    const gameboard = new Gameboard();
    const ship = new Ship(3);
    gameboard.placeShip(ship, [0, 0]);
    repeatCall((i: number) => {
      expect(gameboard.receiveAttack([0, 0 + i])).toBe(true);
    }, ship.length);
  });
});
