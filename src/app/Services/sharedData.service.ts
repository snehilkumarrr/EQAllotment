import { Injectable } from '@angular/core';
import { HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class SharedDataService {
  private loginResponse = new BehaviorSubject<any | null>(null);

  public loginResponseData: Observable<any | null> = this.loginResponse.asObservable();

  setLoginResponseData(data: any) {
    this.loginResponse.next(data);
  }
}
