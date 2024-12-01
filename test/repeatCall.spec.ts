import { describe, it, test, jest, expect, beforeEach } from '@jest/globals';
import repeatCall from './repeatCall';

describe('repeatCall()', () => {
  let fn = jest.fn();

  beforeEach(() => {
    fn = jest.fn((x?: number) => 1 + (x ?? 0));
  });

  it('calls a function once', () => {
    repeatCall(fn, 1);
    expect(fn.mock.calls).toHaveLength(1);
  });

  it('calls a function multiple times', () => {
    const numCalls = 5;
    repeatCall(fn, numCalls);
    expect(fn.mock.calls).toHaveLength(numCalls);
  });

  it('passes in the call index to the function', () => {
    const numCalls = 5;
    repeatCall(fn, numCalls);
    expect(fn).toHaveBeenCalledWith(0);
    expect(fn).toHaveBeenCalledWith(2);
    expect(fn).toHaveBeenLastCalledWith(4);
  });
});
