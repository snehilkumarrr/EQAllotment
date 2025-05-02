import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SessionStorageService } from 'src/app/Services/session-storage.service';
import { Router } from '@angular/router';
import { ApiDataService } from 'src/app/Services/apiData.service';
import { CryptoService } from 'src/app/Services/crypto.service';
import * as constants from 'src/app/Shared/constants';
import { UserHistoryDTO } from 'src/app/Model/user-history.dto';
import { LoginResponse } from 'src/app/Model/loginResponse';
import { SharedDataService } from 'src/app/Services/sharedData.service';
declare var $: any;



@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements AfterViewInit{
  employees = [
    { name: 'John Doe', position: 'Developer', office: 'New York', age: 30, startDate: '2020-01-01' },
    { name: 'Jane Smith', position: 'Designer', office: 'London', age: 28, startDate: '2021-03-15' },
    // Add more rows here
  ];

  ngAfterViewInit() {
    $('#myTable').DataTable();
  }
  userHistory: UserHistoryDTO[] = [];
  loginResponse: LoginResponse | null = null;
  responseRole: String = "";
  historyType: string = "P";
  requestType: any;
 
  constructor(private apiService: ApiDataService, private router: Router, private sharedDataService: SharedDataService,private sessionStorageService: SessionStorageService) {
  }

  ngOnInit() {
    const role = this.sessionStorageService.getObject('authorities');
    if (role && role[0]) {
      this.responseRole = role[0];
      if (this.responseRole === 'ROLE_MP') this.requestType = constants.api.sendRequest;
      if (this.responseRole === 'ROLE_AA') this.requestType = constants.api.aaSendRequest;
      if (this.responseRole === 'ROLE_RAILWAY') this.requestType = constants.api.railGetAllEqRequest;
    }
    this.loadUserHistory();
  }
loadUserHistory(): void {
  const HistoryQueryParam = {
    status: this.historyType
  };
    
    this.apiService.get(HistoryQueryParam, this.requestType).subscribe({
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
takeAction(id: any): void {
  this.router.navigate(['/rb-admin'], {
    state: {
      id: id,
    }
  });      
}

}
