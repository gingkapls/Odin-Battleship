export type callbackType = (arg?: unknown) => unknown;

export class Observable<T = string> {
  #subscribers: Map<T, callbackType[]>;

  constructor() {
    this.#subscribers = new Map<T, callbackType[]>();
  }

  addSubscriber(event: T, func: callbackType): callbackType {
    if (!this.#subscribers.has(event)) {
      this.#subscribers.set(event, []);
    }

    this.#subscribers.get(event).push(func);
    return func;
  }

  removeSubscriber(event: T, func: callbackType): boolean {
    const index = this.#subscribers.get(event).indexOf(func);
    if (index === -1) {
      throw new Error('Subscriber does not exist');
    }

    this.#subscribers.get(event).slice(index, 1);
    return true;
  }

  notifySubscribers(event: T, message?: unknown): void {
    if (!this.#subscribers.has(event)) {
      this.#subscribers.set(event, []);
      return;
    }

    const subscribers = this.#subscribers.get(event);
    subscribers.forEach((func) => func(message));
  }
}
