export class Flags<T extends { [key: string]: number }> {
  #flags: number;
  #knownFlags: T;

  constructor(knownFlags: T, flags = 0) {
    this.#knownFlags = knownFlags;
    this.#flags = flags;
  }

  knows(flag: number | string): flag is T[keyof T] {
    return typeof flag === "string"
      ? Object.keys(this.#knownFlags).includes(flag)
      : Object.values(this.#knownFlags).includes(flag);
  }

  enable(flag: T[keyof T]) {
    if (!this.knows(flag)) throw new Error(`Unknown flag: ${flag}`);
    this.#flags |= flag;
  }

  disable(flag: T[keyof T]) {
    if (!this.knows(flag)) throw new Error(`Unknown flag: ${flag}`);
    this.#flags &= ~flag;
  }

  isEnabled(flag: T[keyof T]) {
    if (!this.knows(flag)) throw new Error(`Unknown flag: ${flag}`);
    return (this.#flags & flag) === flag;
  }

  get map() {
    return Object.entries(this.#knownFlags).reduce((acc, [key]) => {
      if (!this.knows(key)) return acc;

      acc[key] = this.isEnabled(this.#knownFlags[key]);

      return acc;
    }, {} as { [key in keyof T]: boolean });
  }

  get value() {
    return this.#flags;
  }
}
