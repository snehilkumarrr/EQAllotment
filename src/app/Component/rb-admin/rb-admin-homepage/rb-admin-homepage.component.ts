import { Component } from '@angular/core';
import { SessionStorageService } from 'src/app/Services/session-storage.service';
import * as constants from '../../../Shared/constants';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiDataService } from 'src/app/Services/apiData.service';

@Component({
  selector: 'app-rb-admin-homepage',
  templateUrl: './rb-admin-homepage.component.html',
  styleUrls: ['./rb-admin-homepage.component.css', '../../../Shared/shared_card_styles.css']
})
export class RbAdminHomepageComponent {
  eqRequestReport: any;
  allZones: any[] = [];
  division: any[] = [];
  approval: any[] = [{ "name": "APPROVED" }, { "name": "REJECTED" }];
  allotment: any[] = [{ "name": "ALLOTTED" }, { "name": "REJECTED" }];
  remarks: string = '';
  status: string = '';
  forwardDivId: any;
  currentPage = 1;
  pageSize = 10;
  loaderButton: boolean = false;
  showZones: boolean = false;
  acceptedPassengers: any = 1;
  requestId: any;
  roleAa: boolean = false;
  roleRail: boolean = false;
  path: any;
  showAfterSubmission:boolean=false;
  successMessage:any;


  username: string = '';
  authorities: string[] = [];

  constructor(
    private router: Router,
    private apiDataservice: ApiDataService,
    private route: ActivatedRoute,
    private sessionStorageService: SessionStorageService
  ) { }

  ngOnInit() {
    this.username = this.sessionStorageService.getItem('username') || '';
    this.authorities = this.sessionStorageService.getObject('authorities') || [];

    if (this.authorities.length > 0) {
      if (constants.RoleName.roleAa === this.authorities[0]) {
        this.roleAa = true;
      } else if (constants.RoleName.roleRail === this.authorities[0]) {
        this.roleRail = true;
      }
    }

    const state = window.history.state;
    this.requestId = state.id;

    this.loadUserRequest();
    this.loadZone();
  }

  loadZone() {
    this.apiDataservice.get(null, constants.api.getAllZones).subscribe({
      next: (response: any) => {
        this.allZones = response;
      },
      error: (err) => {
        console.error("Error loading zone", err);
        alert("Error in loading zone");
      }
    });
  }

  onZoneChange(event: any) {
    const zoneId = event.target.value;
    this.fetchDivison(zoneId);
  }

  onApprovalChange(event: any) {
    const status = event.target.value;
    this.showZones = status === "APPROVED";
  }

  fetchDivison(zoneId: any) {
    const url = `${constants.api.getDivisionByCode}/${zoneId}`;
    this.apiDataservice.get(null, url).subscribe({
      next: (response: any) => {
        this.division = response;
      },
      error: (err) => {
        console.error("Error fetching division", err);
        alert("Error in the division API");
      }
    });
  }

  loadUserRequest() {
    const id = { id: this.requestId };
    this.path = this.roleAa ? constants.api.aaGetEqRequest : constants.api.railGetEqRequest;

    this.apiDataservice.get(id, this.path).subscribe({
      next: (response: any) => {
        this.eqRequestReport = response;
        console.log("Decrypted data:", JSON.stringify(this.eqRequestReport));
      },
      error: (err) => {
        console.error("Error loading user request", err);
        alert("Error in the user-history API");
      }
    });
  }

  submitRequest() {
    if (this.status === 'APPROVED' && !this.forwardDivId) {
      alert('Zone and Division are required when status is Approved.');
      return;
    }

    const data: any = {
      id: this.requestId,
      status: this.status,
      acceptedPassengers: this.acceptedPassengers,
      remarks: this.remarks
    };


    if (this.roleAa == true) {
      data.forwardDivId = this.forwardDivId;
    }

    const missingFields: string[] = [];

    if (!data.id) missingFields.push('id');
    if (!data.status) missingFields.push('Approval');
    if (!data.acceptedPassengers) missingFields.push('acceptedPassengers');

    if (this.roleAa === true && !data.forwardDivId) {
      missingFields.push('Div/Zone');
    }

    if (missingFields.length > 0) {
      console.error('Missing required fields:', missingFields);
      alert(`Missing required fields: ${missingFields}`);
      return;
    }

    const path = this.roleAa == true ? constants.api.aaTakeAction : constants.api.railTakeAction;

    this.apiDataservice.post(data, path).subscribe({
      next: (response: any) => {

        console.log("Decrypted data:", JSON.stringify(response));
        alert(JSON.stringify(response));
        this.showAfterSubmission = true
        this.successMessage = response.message;
        setTimeout(() => {
          this.router.navigate(['/user-history']);
        }, 5000);



      },
      error: (err) => {
        console.error("Response error occured", err);
        alert("error in the Submit api");
      }
    });
  }
}
