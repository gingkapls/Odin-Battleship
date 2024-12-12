import { describe, expect, it } from '@jest/globals';
import { Ship, ShipType } from '../src/components/Ship';
import repeatCall from './repeatCall';

const setup = (type: ShipType, hits: number = 0) => {
  const ship = new Ship(type);
  return {
    ship,
    length: ship.length,
    hits,
  };
};

describe('hit()', () => {
  it('takes 1 hit', () => {
    const { ship } = setup('Submarine');
    ship.hit();
    expect(ship.hits).toBe(1);
  });

  it('takes 2 hits', () => {
    const { ship, hits } = setup('Submarine');
    repeatCall(() => ship.hit(), hits);

    expect(ship.hits).toBe(hits);
  });

  it('takes no more than length hits', () => {
    const { length, ship } = setup('Carrier');
    repeatCall(() => ship.hit(), length + 1);

    expect(ship.hits).toBe(length);
  });
});

describe('sink()', () => {
  it('does not sink by default', () => {
    expect(new Ship('Submarine').isSunk).toBe(false);
  });

  it('does not sink with less than length hits', () => {
    const { ship } = setup('Carrier');
    ship.hit();
    expect(ship.isSunk).toBe(false);
  });

  it('sinks with enough hits', () => {
    const { length, ship } = setup('Carrier');
    repeatCall(() => ship.hit(), length);

    expect(ship.isSunk).toBe(true);
  });
});
