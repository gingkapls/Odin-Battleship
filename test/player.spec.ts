import { describe, expect, it, jest } from '@jest/globals';
import { Player } from '../src/components/Player';
import { Gameboard, Location } from '../src/components/Gameboard';

const locationMockArray: Location[] = [];

const gbPlaceShipMock = jest
  .spyOn(Gameboard.prototype, 'placeShip')
  .mockImplementation(
    (ship) => void locationMockArray.push({ ship, start: [0, 0], end: [0, 0] }),
  );

// Mocking locations
jest
  .spyOn(Gameboard.prototype, 'locations', 'get')
  .mockImplementation(() => locationMockArray);

const setup = () => {
  const player = new Player(new Gameboard(), 'player1', 3);
  const ship1 = player.ships[0];
  const ship2 = player.ships[1];
  const ship3 = player.ships[2];
  // Emptying location array before every test
  locationMockArray.splice(0, locationMockArray.length);

  return { player, ship1, ship2, ship3 };
};

describe('placeShip()', () => {
  it('places a ship', () => {
    const { player, ship1 } = setup();
    const [row, col] = [0, 0];
    expect(player.placeShip(ship1, [row, col])).toEqual([row, col]);
    expect(gbPlaceShipMock).toHaveBeenCalled();
  });
});

describe('isReady', () => {
  it('returns false if only one ship is placed', () => {
    const { player, ship1 } = setup();
    const [row, col] = [0, 0];
    player.placeShip(ship1, [row, col]);
    expect(player.isReady).toBe(false);
  });

  it('returns false if all ships are not placed', () => {
    const { player, ship1, ship2 } = setup();
    const [row1, col1] = [0, 0];
    const [row2, col2] = [5, 5];
    player.placeShip(ship1, [row1, col1]);
    player.placeShip(ship2, [row2, col2]);
    expect(player.isReady).toBe(false);
  });

  it('returns true if all ships are placed', () => {
    const { player, ship1, ship2, ship3 } = setup();
    const [row1, col1] = [0, 0];
    const [row2, col2] = [5, 5];
    const [row3, col3] = [7, 7];
    player.placeShip(ship1, [row1, col1]);
    player.placeShip(ship2, [row2, col2]);
    player.placeShip(ship3, [row3, col3]);
    expect(player.isReady).toBe(true);
  });
});
