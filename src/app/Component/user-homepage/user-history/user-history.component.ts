import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from 'src/app/Services/session-storage.service';
import { ApiDataService } from 'src/app/Services/apiData.service';
import { CryptoService } from 'src/app/Services/crypto.service';
import * as constants from 'src/app/Shared/constants';
import { UserHistoryDTO } from 'src/app/Model/user-history.dto';
import { LoginResponse } from 'src/app/Model/loginResponse';
import { SharedDataService } from 'src/app/Services/sharedData.service';
import { ChangeDetectorRef } from '@angular/core';
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

  userHistory: UserHistoryDTO[] = [];
  loginResponse: LoginResponse | null = null;
  responseRole: String = "";
  historyType: string = "P";
  requestType: any;
  tableInitialized = false;

  constructor(private apiService: ApiDataService, private router: Router, private sharedDataService: SharedDataService, private sessionStorageService: SessionStorageService, private cdr: ChangeDetectorRef) {}

  ngOnInit(){
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
    this.tableInitialized = false;
  if ($.fn.DataTable.isDataTable('#myTable')) {
    $('#myTable').DataTable().clear().destroy();
    }
    this.apiService.get(HistoryQueryParam, this.requestType).subscribe({
        next: (response: any) => {
          console.log("Decrypted data:", response);
            try {
              this.userHistory = response as UserHistoryDTO[];
              this.cdr.detectChanges();
              setTimeout(() => {
                this.tableInitialized = true;
                setTimeout(() => {
                  $('#myTable').DataTable();
                }, 0);
              }, 0);
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
  console.log(type);
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
  const element = document.getElementById('myTable') as HTMLTableElement;
  if (!element) return;

  const clonedTable = element.cloneNode(true) as HTMLTableElement;

  
  if (this.responseRole === 'ROLE_AA' || this.responseRole === 'ROLE_RAILWAY') {
      clonedTable.querySelectorAll('thead tr').forEach(row => {
      row.removeChild(row.lastElementChild!);
    });
    clonedTable.querySelectorAll('tbody tr').forEach(row => {
      row.removeChild(row.lastElementChild!);
    });
  }

  clonedTable.style.display = 'none';
  clonedTable.id = 'tempExcelTable';
  document.body.appendChild(clonedTable);

  const tempTable = document.getElementById('tempExcelTable');
  const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(tempTable);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
  document.body.removeChild(clonedTable);
  XLSX.writeFile(wb, 'UserData.xlsx');
}

exportToPDF(): void {
  const doc = new jsPDF('landscape');
  const table = document.getElementById('myTable') as HTMLTableElement;
  if (!table) return;

  const clonedTable = table.cloneNode(true) as HTMLTableElement;
  if (this.responseRole === 'ROLE_AA' || this.responseRole === 'ROLE_RAILWAY') {
      clonedTable.querySelectorAll('thead tr').forEach(row => {
      row.removeChild(row.lastElementChild!);
    });

    clonedTable.querySelectorAll('tbody tr').forEach(row => {
      row.removeChild(row.lastElementChild!);
    });
  }


  clonedTable.style.display = 'none';
  clonedTable.id = 'tempPdfTable';
  document.body.appendChild(clonedTable);

  autoTable(doc, {
    html: '#tempPdfTable',
    styles: {
      fontSize: 6,
      cellPadding: 1
    },
    margin: { top: 10 }
  });

  // Remove it after generating PDF
  document.body.removeChild(clonedTable);

  doc.save('UserData.pdf');
}
}
