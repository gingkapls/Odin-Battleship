export default <T>(fn: (v?: T) => void, times: number): void =>
  void Array.from({ length: times }, fn);
