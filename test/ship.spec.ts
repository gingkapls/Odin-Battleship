import { beforeEach, describe, expect, it } from '@jest/globals';
import { Ship } from '../src/components/Ship';
import repeatCall from './repeatCall';

describe('hit()', () => {
  it('takes 1 hit', () => {
    const ship = new Ship(5);
    ship.hit();
    expect(ship.hits).toBe(1);
  });

  it('takes 2 hits', () => {
    const numHits = 2;
    const ship = new Ship(5);
    repeatCall(() => ship.hit(), numHits);

    expect(ship.hits).toBe(numHits);
  });

  it('takes no more than length hits', () => {
    const length = 5;
    const ship = new Ship(length);
    repeatCall(() => ship.hit(), length + 1);

    expect(ship.hits).toBe(length);
  });
});

describe('sink()', () => {
  it('does not sink by default', () => {
    expect(new Ship(3).isSunk).toBe(false);
  });

  it('does not sink with less than length hits', () => {
    const length = 3;
    const ship = new Ship(length);
    ship.hit();
    expect(ship.isSunk).toBe(false);
  });

  it('sinks with enough hits', () => {
    const length = 3;
    const ship = new Ship(length);
    repeatCall(() => ship.hit(), length + 1);

    expect(ship.isSunk).toBe(true);
  });
});
