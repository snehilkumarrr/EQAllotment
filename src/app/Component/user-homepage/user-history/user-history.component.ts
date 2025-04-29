import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiDataService } from 'src/app/Services/apiData.service';
import { CryptoService } from 'src/app/Services/crypto.service';
import * as constants from 'src/app/Shared/constants';
import { UserHistoryDTO } from 'src/app/Model/user-history.dto';
import { LoginResponse } from 'src/app/Model/loginResponse';
import { SharedDataService } from 'src/app/Services/sharedData.service';



@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent {
  
  userHistory: UserHistoryDTO[] = [];
  loginResponse: LoginResponse | null = null;
  responseRole: String = "";
  historyType: string = "P";
  requestType: any;
 
  constructor(private apiService: ApiDataService, private router: Router, private sharedDataService: SharedDataService,) {
    this.sharedDataService.loginUserData.subscribe((loginResponse) => {
      if (loginResponse) {
        this.loginResponse = loginResponse;
        this.responseRole = loginResponse.authorities[0];
        console.log('login response:', loginResponse.authorities[0]);
        if(this.responseRole == "ROLE_MP") this.requestType = constants.api.sendRequest;
        if(this.responseRole == "ROLE_AA") this.requestType = constants.api.AaSendRequest;
        this.loadUserHistory(); 
      }
      else {
        alert("response in not availabe at history page")
      }
    });
  }



loadUserHistory(): void {
  const HistoryQueryParam = {
    status: this.historyType
  };
    
    this.apiService.getAuth(HistoryQueryParam, this.requestType).subscribe({
        next: (response: any) => {
          console.log("Decrypted data:", response);
            try {
              this.userHistory = response as UserHistoryDTO[];
            } catch (e) {
              console.error("Failed to put data in the model", e);
              this.userHistory = [];
            }
          
        },
        error: (err) => {
          console.error("Response error occured", err);
          alert("error in the user-history api");
        }
      }
    );
 }
 onHistoryTypeChange(type: string): void {
  console.log("before value" + this.historyType);
  this.historyType = type;
  this.loadUserHistory();
}
takeAction(id: number): void {
  console.log('Take action clicked for ID:', id);
}

}
