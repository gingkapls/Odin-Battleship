import { beforeEach, describe, expect, it } from '@jest/globals';
import createShip from '../src/components/Ship';

const repeatCall = (fn: () => void, times: number): void =>
  Array.from({ length: times }).forEach(fn);

describe('hit()', () => {
  it('takes 1 hit', () => {
    const ship = createShip(5);
    ship.hit();
    expect(ship.hits).toBe(1);
  });

  it('takes 2 hits', () => {
    const numHits = 2;
    const ship = createShip(5);
    repeatCall(() => ship.hit(), numHits);

    expect(ship.hits).toBe(numHits);
  });

  it('takes no more than length hits', () => {
    const length = 5;
    const ship = createShip(length);
    repeatCall(() => ship.hit(), length + 1);

    expect(ship.hits).toBe(length);
  });
});

describe('sink()', () => {
  it('does not sink by default', () => {
    expect(createShip(3).isSunk).toBe(false);
  });

  it('does not sink with less than length hits', () => {
    const length = 3;
    const ship = createShip(length);
    ship.hit();
    expect(ship.isSunk).toBe(false);
  });

  it('sinks with enough hits', () => {
    const length = 3;
    const ship = createShip(length);
    repeatCall(() => ship.hit(), length + 1);

    expect(ship.isSunk).toBe(true);
  });
});
