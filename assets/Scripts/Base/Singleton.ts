export class Singleton {
  private static _instance = null;

  protected static getInstance<T>(): T {
    if (!this._instance) {
      this._instance = new this();
    }
    return this._instance;
  }

  protected constructor() {}
}
