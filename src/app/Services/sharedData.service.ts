import { Injectable } from '@angular/core';
import { HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private loginCredential = new BehaviorSubject<any | null>(null);
  private captachEncryption = new BehaviorSubject<any | null>(null);

  public loginCredentialData: Observable<any | null> = this.loginCredential.asObservable();
  public captachEncryptionData: Observable<any | null> = this.captachEncryption.asObservable();

  setLoginCredentialData(data: any) {
    this.loginCredential.next(data);
  }

  setCaptachEncryptionData(data: any) {
    this.captachEncryption.next(data);
  }
}
