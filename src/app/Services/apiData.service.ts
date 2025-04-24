import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Utils } from '../Shared/Utils';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as constants from '../Shared/constants';
import { CryptoService } from './crypto.service';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {
  constructor(private http: HttpClient, private cryptoService: CryptoService) {}

  postAuth(data: any, path: any): Observable<any> {
    const encryptedData = this.cryptoService.encrypt(data);
    const url = constants.BASE_URL + `${path}`;
    return this.http.post(url, encryptedData).pipe(
      map((response: any) => {
        if (response.success && response.encdata) {
          return this.cryptoService.decrypt(response.encdata);
        } else {
          alert(response.message);
          throw new Error(response.message); 
        }
      })
    );
  }  

  getNoAuth(queryParams: any, path: any): Observable<any> {
    const url = constants.BASE_URL + `${path}`;
    return this.http.get(url, { headers: Utils.getHeader(), params: queryParams }).pipe(
      map((response: any) => {
        if (response.success && response.encdata) {
          return this.cryptoService.decrypt(response.encdata);
        } else {
          throw new Error('API call failed or missing encrypted data');
        }
      })
    ); 
  }

}
