import { Injectable } from '@angular/core';

const USER_KEY = 'auth';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  clean(): void {
    localStorage.clear();
  }

  public saveUser(user: any): void {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public updateImageUrl(imageUrl: string): void {
    const user = this.getUser();
    user.imageUrl = imageUrl;
    this.saveUser(user);
  }

  public getUser(): any {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public isLoggedIn(): boolean {
    const user = localStorage.getItem(USER_KEY);
    return !!user;
  }

  public clear(): void {
    sessionStorage.clear();
    localStorage.clear();
  }
}
