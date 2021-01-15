import SessionStorage, { sessionStorageMap } from './session-storage';
import LocalStorage, { localStorageMap } from './local-storage';

const sessionStorageInstance = new SessionStorage();

global.sessionStorage = new Proxy(sessionStorageInstance, {
  set: (object, prop, value) => {
    if (Object.prototype.hasOwnProperty.call(SessionStorage.prototype, prop)) {
      sessionStorageInstance[prop.toString()] = value;
    } else {
      sessionStorageInstance.setItem(prop.toString(), value);
    }

    return true;
  },

  get: (target, name) => {
    if (Object.prototype.hasOwnProperty.call(SessionStorage.prototype, name)) {
      return sessionStorageInstance[name.toString()];
    }

    if (sessionStorageMap.has(name)) {
      return sessionStorageInstance.getItem(name.toString());
    }
  }
});

const localStorageInstance = new LocalStorage();

global.localStorage = new Proxy(localStorageInstance, {
  set: (object, prop, value) => {
    if (Object.prototype.hasOwnProperty.call(SessionStorage.prototype, prop)) {
      localStorageInstance[prop.toString()] = value;
    } else {
      localStorageInstance.setItem(prop.toString(), value);
    }

    return true;
  },

  get: (target, name) => {
    if (Object.prototype.hasOwnProperty.call(SessionStorage.prototype, name)) {
      return localStorageInstance[name.toString()];
    }

    if (localStorageMap.has(name)) {
      return localStorageInstance.getItem(name.toString());
    }
  }
});
