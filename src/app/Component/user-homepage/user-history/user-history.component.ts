import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiDataService } from 'src/app/Services/apiData.service';
import { CryptoService } from 'src/app/Services/crypto.service';


@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit {
  userHistory: any[] = [];
  userID = '1';

  constructor(private apiDataservice: ApiDataService, private cryptoService: CryptoService) {}

  ngOnInit(): void {
    this.loadUserHistory(); 
  }

  loadUserHistory(): void {
    const dummyHistory = [
      { id: 1, name: 'John Doe', action: 'Login', date: '2025-04-08' },
      { id: 2, name: 'Jane Smith', action: 'Logout', date: '2025-04-08' },
      { id: 3, name: 'Bob Johnson', action: 'Password Change', date: '2025-04-07' },
      { id: 4, name: 'Alice Williams', action: 'Login', date: '2025-04-06' },
      { id: 5, name: 'Michael Brown', action: 'Logout', date: '2025-04-05' },
      { id: 6, name: 'Emily Davis', action: 'Profile Update', date: '2025-04-04' },
      { id: 7, name: 'David Wilson', action: 'Login', date: '2025-04-03' },
      { id: 8, name: 'Sarah Miller', action: 'Login', date: '2025-04-02' },
      { id: 9, name: 'Daniel Anderson', action: 'Password Reset', date: '2025-04-01' },
      { id: 10, name: 'Laura Moore', action: 'Logout', date: '2025-03-31' }
    ];

    // creating the api which will 1st go to api data service then form there it will access the dummy data and give the response
      this.apiDataservice.fetchUserHistory(this.userID).subscribe(
        (response) => {
          console.log('Response from service:', response);
          if(this.cryptoService.decrypt(response) === '1')
            this.userHistory = dummyHistory; // Show the same dummy data 
        },
        (error) => {
          console.error('Error in API simulation:', error);
      }
    );
  }
}
