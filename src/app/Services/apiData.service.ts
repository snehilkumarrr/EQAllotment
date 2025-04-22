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
     const url = constants.BASE_URL + `/auth/captcha`;
     return this.http.post(url, encryptedData)
  }

  postLoginCaptcha( data:any) {

    const encryptedData = this.cryptoService.encrypt(data);
     const url = constants.BASE_URL + `/auth/login`;
     return this.http.post(url, encryptedData)
  }
      
}