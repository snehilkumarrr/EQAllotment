import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Utils } from '../Shared/Utils';
import { HttpClient } from '@angular/common/http';
import * as constants from '../Shared/constants';
import { CryptoService } from './crypto.service';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {

  constructor(private http: HttpClient, private cryptoService : CryptoService) { }

  postLogin( data:any) {

    const encryptedData = this.cryptoService.encrypt(data);
    
     const url = constants.BASE_URL + `/user/`;
     console.log("ecnryptedData" + encryptedData);
     return this.http.post(url, encryptedData, { headers: Utils.getHeader() })
  }

  // new api call GET

  fetchUserHistory(data: any): Observable<any> {
    const encryptedData = this.cryptoService.encrypt(data);
    console.log("ecnryptedData" + encryptedData);
    return of(encryptedData);   
  }
}