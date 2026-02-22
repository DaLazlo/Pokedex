

export type CacheEntry<T> = {
    createdAt: number;
    val: T;
}

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(interval: number) {
    this.#interval = interval;
    this.#startReapLoop();
  }

  add<T>(key: string, val: T): void {
    this.#cache.set(key, { createdAt: Date.now(), val: val});
  }

  get<T>(key: string): T | undefined {
      const foo = this.#cache.get(key);
      if (foo === undefined) {
          return undefined;
      } else {
          return foo.val;
      }
  }

  #reap(): void {
    for (const key of this.#cache.keys()) {
      const foo = this.#cache.get(key);
      if (foo === undefined) {
          return;
      }
      if ((Date.now() - foo.createdAt) >= this.#interval) {
          this.#cache.delete(key);
      }
    }
  }

  #startReapLoop(): void {
    this.#reapIntervalId = setInterval(() => { this.#reap();}, this.#interval);
  }

  stopReapLoop(): void {
    clearInterval(this.#reapIntervalId);
    this.#reapIntervalId = undefined;
  }

}

