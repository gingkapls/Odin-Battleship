import { describe, it, test, jest, expect } from '@jest/globals';
import repeatCall from './repeatCall';

describe('repeatCall()', () => {
  const fn = jest.fn((x?: number) => 1 + (x ?? 0));
  it('calls a function once', () => {
    repeatCall(fn, 1);
    expect(fn.mock.calls).toHaveLength(1);
  });

  it('calls a function multiple times', () => {
    const numCalls = 5;
    repeatCall(fn, numCalls);
    expect(fn.mock.calls).toHaveLength(numCalls);
  });
});
