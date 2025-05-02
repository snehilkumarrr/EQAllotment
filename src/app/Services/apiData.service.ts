import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Utils } from '../Shared/Utils';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as constants from '../Shared/constants';
import { CryptoService } from './crypto.service';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {
  constructor(private http: HttpClient, private cryptoService: CryptoService) {}



  fetchHeader(path: string)
  {
    var header={}
      if(path.startsWith('/auth'))
      {
         header=Utils.getHeader().append("withCredentials", "true");
      }
      else{
        header=new HttpHeaders().append("withCredentials", "true");
              
      }
     
      return header;
  }

  post(data: any, path: any): Observable<any> {
    const encryptedData = this.cryptoService.encrypt(data);
    const url = constants.BASE_URL + `${path}`;
    
    return this.http.post(url, encryptedData,{ headers: this.fetchHeader(path)}).pipe(
      map((response: any) => {
        if(response.success){
        if (response.encdata) {
          return this.cryptoService.decrypt(response.encdata);
        }
        else{
          return response.success ;
        }
       } else {
          alert(response.message);
          throw new Error(response.message); 
        }
      })
    );
  }  

  get(queryParams: any, path: any): Observable<any> {
    const url = constants.BASE_URL + `${path}`;
    return this.http.get(url, { headers: this.fetchHeader(path), params: queryParams }).pipe(
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
