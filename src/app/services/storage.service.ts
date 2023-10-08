import { Injectable } from '@angular/core';
import { Names } from '../constants';
import {IAuthorizationData} from "./authentication.service";

export enum StorageType {
  Local = 'localStorage',
  Session = 'sessionStorage'
}

export interface IGlobalStateInfo {
  prefix: string;
  name: string;
}

export interface IOriginalStateInfo {
  url: string;
}

type Defaults = { [name: string]: any };

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  localStorage: Storage;
  sessionStorage: Storage;

  constructor() {
    this.localStorage = window.localStorage;
    this.sessionStorage = window.sessionStorage;
  }

  isStorageSupported(storageType: StorageType | undefined): boolean {
    return !!this.getStorageByType(storageType);
  }

  getStorageByType(storageType?: StorageType) {
    return storageType === StorageType.Session ?
      this.sessionStorage
      : this.localStorage;
  }

  getValue<T>(key: string, storageType: StorageType = StorageType.Local, deserialize = true): T | null {
    if (this.isStorageSupported(storageType)) {
      const storageValue = this.getStorageByType(storageType).getItem(key);
      // bulletproofing parsing the JSON no matter what is in localstorage
      if (deserialize) {
        try {
          // @ts-ignore
          return JSON.parse(storageValue);
        } catch (e) {
          return null;
        }
      } else {
        return storageValue as any;
      }
    }
    return null;
  }

  setValue<T>(key: string, value: any, storageType: StorageType = StorageType.Local, serialize = true): boolean {
    if (this.isStorageSupported(storageType)) {
      // Still store the value as 'false' if receiving a boolean value. Otherwise, store whatever value is received.
      if ((typeof value === 'boolean' && !value) || value) {
        const storageValue = serialize ? JSON.stringify(value) : value.toString();
        this.getStorageByType(storageType).setItem(key, storageValue);
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  removeValue(key: string, storageType: StorageType = StorageType.Local): boolean {
    if (this.isStorageSupported(storageType)) {
      this.getStorageByType(storageType).removeItem(key);
      return true;
    }
    return false;
  }

  clearLocalStorage(): void {
    this.localStorage.clear();
  }

  clearSessionStorage(): void {
    this.sessionStorage.clear();
  }

  clearAll() {
    this.localStorage.clear();
    this.sessionStorage.clear();
  }

  isLoggedInAsAnother(): boolean {
    return !!this.getValue(Names.GlobalStateKeys.orignalAuthorization, StorageType.Session);
  }

  private getParamKey(key: string): string {
    if (this.isLoggedInAsAnother()) {
      return key + '.other';
    }
    return key;
  }

  setStateByPrefix(pageReport: IGlobalStateInfo) {
    return this.setValue<string>(pageReport.prefix, pageReport.name, StorageType.Session);
  }

  getStateByPrefix(prefix: string) {
    return this.getValue<string>(prefix, StorageType.Session);
  }

  setOriginalState(originalState: IOriginalStateInfo) {
    this.setValue<IOriginalStateInfo>(Names.GlobalStateKeys.originalState, {
      url: originalState.url
    }, StorageType.Local);
  }

  getOriginalState(): IOriginalStateInfo {
    return <IOriginalStateInfo>this.getValue<IOriginalStateInfo>(this.getParamKey(Names.GlobalStateKeys.originalState), StorageType.Local);
  }
}
