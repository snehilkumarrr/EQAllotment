import { Component } from '@angular/core';
import * as constants from '../../../Shared/constants';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from 'src/app/Services/sharedData.service';
import { ApiDataService } from 'src/app/Services/apiData.service';
import { LoginApiDataService } from 'src/app/Services/loginApiData.service';

@Component({
  selector: 'app-rb-admin-homepage',
  templateUrl: './rb-admin-homepage.component.html',
  styleUrls: ['./rb-admin-homepage.component.css', '../../../Shared/shared_card_styles.css']
})
export class RbAdminHomepageComponent {
  eqRequestReport:any;
  allZones :any[]=[];
 division:any[]=[];
 approval:any[] = [{"name":"APPROVED"}, {"name":"REJECTED"}]
  remarks:string='';
  status:string ='';
  forwardDivId:any;
  currentPage = 1;  
pageSize = 10;
userType:any;
loaderButton: boolean = false;
acceptedPassengers: any = 1;
requestId:any

constructor(private router: Router, private apiDataservice: ApiDataService, private sharedDataService: SharedDataService, private route: ActivatedRoute
) {
}

ngOnInit(){
  this.loadUserRequest()
  this.loadZone()
}

loadZone(){
  let queryparams =null
  this.apiDataservice.getAuth(queryparams, constants.api.getAllZones).subscribe({
      next: (response: any) => {

        this.allZones = response
        console.log("Decrypted data111:", JSON.stringify(this.eqRequestReport));

      },
      error: (err) => {
        console.error("Response error occured", err);
        alert("error in the user-history api");
      }
    }
  );
}
onZoneChange(event :any){
  const zoneId = event .target.value;
  this.fetchDivison(zoneId)
}

fetchDivison(zoneId:any){
  const url = `${constants.api.getDivisionByCode}/${zoneId}`
  this.apiDataservice.getAuth( null,url).subscribe({
      next: (response: any) => {

        this.division = response

      },
      error: (err) => {
        console.error("Response error occured", err);
        alert("error in the user-history api");
      }
    }
  );
}
loadUserRequest(){
  this.requestId="2"
  const id ={
    id:this.requestId
  }
  this.apiDataservice.getAuth(id, constants.api.getEqRequest).subscribe({
      next: (response: any) => {

        this.eqRequestReport = response
        console.log("Decrypted data:", JSON.stringify(this.eqRequestReport));

      },
      error: (err) => {
        console.error("Response error occured", err);
        alert("error in the user-history api");
      }
    }
  );
}

submitRequest(){
  
}





}
