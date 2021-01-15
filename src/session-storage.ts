import Storage from './storage';

export let sessionStorageMap = new Map();

class SessionStorage extends Storage {
  get length(): number {
    return this._length();
  }

  _length(): number {
    return super._length(sessionStorageMap);
  }

  clear(): void {
    sessionStorageMap = super.clear(sessionStorageMap) as Map<any, any>;
  }

  getItem(key: string): string | null {
    return super.getItem(key, sessionStorageMap);
  }

  key(index: number): string | null {
    return super.key(index, sessionStorageMap);
  }

  removeItem(key: string): void {
    sessionStorageMap = super.removeItem(key, sessionStorageMap) as Map<any, any>;
  }

  setItem(key: string, value: string): void {
    sessionStorageMap = super.setItem(key, value, sessionStorageMap) as Map<any, any>;
  }
}

export default SessionStorage;
