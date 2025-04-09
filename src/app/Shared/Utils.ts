import { HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import * as constants from '../Shared/constants';
@Injectable({ providedIn: 'root' })
export class Utils {
  
  static getHeader(): HttpHeaders {
    return new HttpHeaders()
      .append("Content-Type", "application/json")
      .append("Authorization", "Bearer " + localStorage.getItem("accessToken"));
  }
  
  // constructor(private http: HttpClient) { } 
  // getConnectedData(indicatorId: string, divisionId: string): Observable<any> {
  //   return this.http.get(`${constants.BASE_URL}/getallpisreportbydivision?reportType=${indicatorId}&divisionCode=${divisionId}`);
  // }

  // getWarrantyData(indicatorId: string, divisionId: string): Observable<any> {
  //   return this.http.get(`${constants.BASE_URL}/warrantyData?indicatorId=${indicatorId}&divisionId=${divisionId}`);
  // }

  // getRdsoVersionData(indicatorId: string, divisionId: string): Observable<any> {
  //   return this.http.get(`${constants.BASE_URL}/rdsoVersionData?indicatorId=${indicatorId}&divisionId=${divisionId}`);
  // }

  static fetchDataFromResponse(response: any): any {
    return response.data.data;
  }

  static fetchOtherDataFromResponse(data: any): any {
    return data.data.data;
  }

  static fetchData(response: any): any {
    return response.data;
  }

  static fetchMessage(response: any): any {
    return response.message;
  }

  static handleError(error: any): any {
    let errorMessage = "Some Error Occured!"
    if (error.error !== undefined && error.error != null) {
      let errorBody = error.error;
      if (errorBody.error !== undefined && errorBody.error != null && errorBody.error == true && errorBody.message.length) {
        errorMessage = errorBody.message
      } else if (errorBody.status !== undefined && errorBody.status != null) {
        if (errorBody.message !== undefined && errorBody.message != null && Array.isArray(errorBody.message)) {
          if (errorBody.message[0].value !== undefined && errorBody.message[0].value != null) {
            errorMessage = errorBody.message[0].value;
          }
        }
      }
    }
    return errorMessage;
  }
}