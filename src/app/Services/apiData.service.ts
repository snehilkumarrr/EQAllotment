import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Utils } from '../Shared/Utils';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as constants from '../Shared/constants';
import { CryptoService } from './crypto.service';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {

  constructor(private http: HttpClient, private cryptoService: CryptoService) {}

  postAuth(data:any, path:any){
    const encryptedData = this.cryptoService.encrypt(data);
    const url = constants.BASE_URL + `${path}`;
    console.log(url)
    return this.http.post(url, encryptedData)
  }


 getNoAuth(queryParams:any, path:any){
    const url = constants.BASE_URL + `${path}`;
    return this.http.get(url,{ headers: Utils.getHeader(), params: queryParams })
  }

  
  postQuotaRequest(data: any): Observable<any> {
    return of({ personId: 123 }); 
    // const url = constants.BASE_URL + `/quota/request`; // Adjust this path as needed
   //  return this.http.post(url, data, { headers: Utils.getHeader() });
  }

  getPersonDetails(id: number): Observable<any> {
    const mockPerson = {
      name: 'Shivam',
      age: 28,
      phone: '9876543210',
      email: 'shivamsingh@gmail.com',
      NoofSeats: 4
    };
    return of(mockPerson);
    // const url = constants.BASE_URL + `/person/${id}`;
    //return this.http.get(url, { headers: Utils.getHeader() });
  }
}
