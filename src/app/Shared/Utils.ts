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

    ;
  }
  
}