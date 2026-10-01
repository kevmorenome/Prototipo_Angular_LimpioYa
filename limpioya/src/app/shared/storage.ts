import { signal } from "@angular/core";
export class LocalStore<T> {
  readonly records;
  constructor(
    private key: string,
    seed: T[],
  ) {
    let values = seed;
    try {
      const raw = localStorage.getItem(key);
      if (raw) values = JSON.parse(raw);
    } catch {}
    this.records = signal<T[]>(values);
  }
  save(values: T[]) {
    this.records.set(values);
    localStorage.setItem(this.key, JSON.stringify(values));
  }
  add(value: T) {
    this.save([...this.records(), value]);
  }
}
