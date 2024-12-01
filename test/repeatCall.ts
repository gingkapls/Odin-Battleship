export default (fn: (v?: number) => void, times: number): void =>
  void Array.from({ length: times }, (_, i) => fn(i));
