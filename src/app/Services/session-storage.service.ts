import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {

  
  // Save a string value
  setItem(key: string, value: string): void {
    sessionStorage.setItem(key, value);
  }

  // Get a string value
  getItem(key: string): string | null {
    return sessionStorage.getItem(key);
  }

  // Remove a key
  removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  // Clear all keys
  clear(): void {
    sessionStorage.clear();
  }

  // Save object as JSON string
  setObject(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  // Get object from JSON string
  getObject(key: string): any {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
}
