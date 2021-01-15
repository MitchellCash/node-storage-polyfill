class Storage {
  [name: string]: any;

  _length(storageMap: Map<any, any>): number {
    return storageMap.size;
  }

  clear(storageMap: Map<any, any>): Map<any, any> | void {
    storageMap.clear();
    return storageMap;
  }

  getItem(key: string, storageMap: Map<any, any>): string | null {
    const stringKey = String(key);

    if (storageMap.has(key)) {
      return String(storageMap.get(stringKey));
    }

    return null;
  }

  key(index: number, storageMap: Map<any, any>): string | null {
    if (index === undefined) {
      // This is the TypeError implemented in Chrome, Firefox throws "Storage.key: At least 1
      // argument required, but only 0 passed".
      throw new TypeError(
        "Failed to execute 'key' on 'Storage': 1 argument required, but only 0 present."
      );
    }

    const keys = [...storageMap.keys()];

    if (index >= keys.length) {
      return null;
    }

    return keys[index];
  }

  removeItem(key: string, storageMap: Map<any, any>): Map<any, any> | void {
    storageMap.delete(key);
    return storageMap;
  }

  setItem(key: string, value: string, storageMap: Map<any, any>): Map<any, any> | void {
    return storageMap.set(String(key), String(value));
  }
}

export default Storage;
