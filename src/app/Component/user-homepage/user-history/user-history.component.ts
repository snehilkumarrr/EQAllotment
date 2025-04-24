import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiDataService } from 'src/app/Services/apiData.service';
import { CryptoService } from 'src/app/Services/crypto.service';
import * as constants from 'src/app/Shared/constants';
import { UserHistoryDTO } from 'src/app/models/user-history.dto';



@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit {
  userHistory: UserHistoryDTO[] = [];
  userID = 'ganesh';
  responseData: any = "";

  constructor(private apiDataservice: ApiDataService, private cryptoService: CryptoService, private apiService: ApiDataService) {}

  ngOnInit(): void {
    this.loadUserHistory(); 
  }

  loadUserHistory(): void {
    this.apiService.getNoAuthNoParam(constants.api.sendRequest).subscribe({
        next: (response: any) => {
          console.log("Raw response:", response);
          
          if (response && response.success && response.encdata) {
            const decrypted = this.cryptoService.decrypt(response.encdata);
            console.log("Decrypted Data:", decrypted);
            try {
              const parsedData = JSON.parse(decrypted);
              this.userHistory = parsedData as UserHistoryDTO[];
            } catch (e) {
              console.error("Failed to put data in the variable", e);
              this.userHistory = [];
            }
          } else {
            console.warn("Response missing encdata");
            this.userHistory = [];
          }
        },
        error: (err) => {
          console.error("Response error occured", err);
          alert("Something went wrong while fetching data.");
        }
      }
    );
 }
}
