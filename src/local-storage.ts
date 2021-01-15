import Storage from './storage';

export let localStorageMap = new Map();

class LocalStorage extends Storage {
  get length(): number {
    return this._length();
  }

  _length(): number {
    return super._length(localStorageMap);
  }

  clear(): void {
    localStorageMap = super.clear(localStorageMap) as Map<any, any>;
  }

  getItem(key: string): string | null {
    return super.getItem(key, localStorageMap);
  }

  key(index: number): string | null {
    return super.key(index, localStorageMap);
  }

  removeItem(key: string): void {
    localStorageMap = super.removeItem(key, localStorageMap) as Map<any, any>;
  }

  setItem(key: string, value: string): void {
    localStorageMap = super.setItem(key, value, localStorageMap) as Map<any, any>;
  }
}

export default LocalStorage;
