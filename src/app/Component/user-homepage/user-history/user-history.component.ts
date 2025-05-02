import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiDataService } from 'src/app/Services/apiData.service';
import { CryptoService } from 'src/app/Services/crypto.service';
import * as constants from 'src/app/Shared/constants';
import { UserHistoryDTO } from 'src/app/Model/user-history.dto';
import { LoginResponse } from 'src/app/Model/loginResponse';
import { SharedDataService } from 'src/app/Services/sharedData.service';
declare var $: any;
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';



@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent {
  initDataTable() {
    setTimeout(() => {
      $('#myTable').DataTable();
    }, 0);
  }
  
 
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
        if(this.responseRole == "ROLE_AA") this.requestType = constants.api.aaSendRequest;
        if(this.responseRole == "ROLE_RAILWAY") this.requestType = constants.api.railGetAllEqRequest;
        
      }
      
    });
  }

  ngOnInit(){
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
              this.initDataTable();
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
exportToExcel(): void {
  const element = document.getElementById('myTable');
  const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, 'UserData.xlsx');
}

exportToPDF(): void {
  const doc = new jsPDF();
  autoTable(doc, { html: '#myTable' });
  doc.save('UserData.pdf');
}
}
