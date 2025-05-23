import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Utils } from '../Shared/Utils';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import * as constants from '../Shared/constants';
import { CryptoService } from './crypto.service';
import { map, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {
  constructor(private http: HttpClient, 
    private cryptoService: CryptoService,private toastr: ToastrService,private sessionStorageService: SessionStorageService,
    private router: Router) {}



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
        if (response.success) {
          return this.cryptoService.decrypt(response.encdata);
        } else {
          throw new HttpErrorResponse({
            status: 200,
            statusText: 'Error',
            error: { message: response.message },
            url: url
          });
        }
       
      }), catchError((error) => {return this.handleError(error);
        
       } 
    ));
   
  }  

  get(queryParams: any, path: any): Observable<any> {
    const url = constants.BASE_URL + `${path}`;
    return this.http.get(url, { headers: this.fetchHeader(path), params: queryParams }).pipe(
      map((response: any) => {
        console.log(response);
        if (response.success) {
          return this.cryptoService.decrypt(response.encdata);
        } else {
          throw new HttpErrorResponse({
            status: 200,
            statusText: 'Error',
            error: { message: response.message },
            url: url
          });
         
        }
      }), catchError((error) => {
        return this.handleError(error);
       
       
       } 
    ));
  }

  handleError(error:any)
  {
    console.log(error);
    if(error.status != '200'){
    let message = 'Something went wrong';
    if (error.error?.message || error.message) {
      message = error.error.message || error.message;
    } 
    if(error.status !='403')
    {      
    this.toastr.error(message, 'Error');
    }
    else{
      this.sessionStorageService.removeItem('username');
      this.sessionStorageService.removeItem('authorities');
      localStorage.removeItem('accessToken');
      this.router.navigate(['/'], );   
      this.toastr.error("Please login again.", 'Error'); 
    }
    return of(null);
  }
  else {
    return throwError(() => error);
  }
  }

}
