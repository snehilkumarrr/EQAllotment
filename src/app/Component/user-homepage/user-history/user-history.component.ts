import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiDataService } from 'src/app/Services/apiData.service';
import { CryptoService } from 'src/app/Services/crypto.service';
import * as constants from 'src/app/Shared/constants';
import { UserHistoryDTO } from 'src/app/Model/user-history.dto';



@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit {
  userHistory: UserHistoryDTO[] = [];
  responseData: any = "";
  historyType: string = "P";
  constructor(private apiDataservice: ApiDataService, private cryptoService: CryptoService, private apiService: ApiDataService) {}

  ngOnInit(): void {
    this.loadUserHistory(); 
  }

  loadUserHistory(): void {
    const HistoryQueryParam = {
      status: this.historyType
    };
    
    this.apiService.getAuth(HistoryQueryParam, constants.api.sendRequest).subscribe({
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
}
