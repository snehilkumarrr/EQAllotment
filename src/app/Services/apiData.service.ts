import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Utils } from '../Shared/Utils';
import { HttpClient } from '@angular/common/http';
import * as constants from '../Shared/constants';

@Injectable()
export class ApiDataService {

  constructor(private http: HttpClient) { }

  private selectedAmenityId: number | null = null;
  
  private stationName = new BehaviorSubject<any | null>(null);

  public stationNameData: Observable<any | null> = this.stationName.asObservable();

  private passengers: any[] = [];

  setPassengers(passengers: any[]) {
    this.passengers = passengers;
  }

  getPassengers() {
    return this.passengers;
  }

  getMonthWiseEarningReport( locationFlag:string,toDate:string, fromDate:string, location:string) {
    // const formattedDate1 = this.formatDate(fromDate);
    // const formattedDate2 = this.formatDate(toDate);
    // const url = constants.BASE_URL + `/report/getMonthWiseBookingAndEarningSummaryReport?locationFlag=${encodeURIComponent(locationFlag)}&fromDate=${encodeURIComponent(formattedDate1)}&toDate=${encodeURIComponent(formattedDate2)}&location=${encodeURIComponent(location)}`;
    // console.log('Request URL:', url);
    // return this.http.get(url, { headers: Utils.getHeader() })
  }
      
}