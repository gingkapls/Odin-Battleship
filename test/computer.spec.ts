import { describe, expect, it, jest } from '@jest/globals';
import { Player } from '../src/components/Player';
import { Gameboard } from '../src/components/Gameboard';
import { Computer } from '../src/components/Computer';
import { Ship } from '../src/components/Ship';

// mocks
const gbPlaceShipMock = jest
  .spyOn(Player.prototype, 'placeShip')
  .mockImplementation(() => undefined);

const playerShipsMock = jest
  .spyOn(Player.prototype, 'ships', 'get')
  .mockImplementation(() => [
    new Ship('Destroyer'),
    new Ship('Submarine'),
    new Ship('Destroyer'),
  ]);

const gbAttackMock = jest
  .spyOn(Gameboard.prototype, 'receiveAttack')
  .mockImplementation(([row, col]) => ({ pos: [row, col], status: 'success' }));

const setup = () => {
  const player1 = new Player(new Gameboard(), 'Player 1');
  const player2 = new Player(new Gameboard(), 'Player 2');
  const comp = new Computer(player2, player1);

  return comp;
};

describe('placeRandomShip()', () => {
  it('places a single ship', () => {
    const computer = setup();
    const ship = computer.player.ships[0];
    computer.placeShipRandom(ship);
    expect(gbPlaceShipMock).toHaveBeenCalled();
  });

  it('places two ships', () => {
    const computer = setup();
    const ship1 = computer.player.ships[0];
    const ship2 = computer.player.ships[1];
    computer.placeShipRandom(ship1);
    computer.placeShipRandom(ship2);

    expect(gbPlaceShipMock).toHaveBeenCalledTimes(2);
  });

  it('places two ships on different positions', () => {
    const computer = setup();
    const ship1 = computer.player.ships[0];
    const ship2 = computer.player.ships[1];
    const [row1, col1] = computer.placeShipRandom(ship1);
    const [row2, col2] = computer.placeShipRandom(ship2);

    expect([row1, col1]).not.toBe([row2, col2]);
  });
});

describe('placeAllShips()', () => {
  it('places all ships', () => {
    const comp = setup();
    expect(comp.placeAllShips().length).toBe(3);
    expect(gbPlaceShipMock).toHaveBeenCalledTimes(3);
  });
});

describe('generateRandomCoords()', () => {
  it('generates random valid coords', () => {
    const computer = setup();
    const [randomRow, randomCol] = computer.generateRandomCoords();
    expect(randomRow).toBeGreaterThanOrEqual(0);
    expect(randomRow).toBeLessThanOrEqual(9);

    expect(randomCol).toBeGreaterThanOrEqual(0);
    expect(randomCol).toBeLessThanOrEqual(9);
  });
});

describe('attackRandomCoord()', () => {
  it('attacks a random coordinate once', () => {
    const comp = setup();
    comp.attackRandomCoord();
    expect(gbAttackMock).toHaveBeenCalled();
  });

  it('attacks random coordinates multiple times', () => {
    const comp = setup();
    comp.attackRandomCoord();
    comp.attackRandomCoord();

    expect(gbAttackMock).toHaveBeenCalledTimes(2);
  });
});
