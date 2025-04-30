import { Component } from '@angular/core';
import * as constants from '../../../Shared/constants';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from 'src/app/Services/sharedData.service';
import { ApiDataService } from 'src/app/Services/apiData.service';
import { LoginApiDataService } from 'src/app/Services/loginApiData.service';
import { LoginResponse } from 'src/app/Model/loginResponse';

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
 allotment:any[] = [{"name":"ALLOTTED"}, {"name":"REJECTED"}]
  remarks:string='';
  status:string ='';
  forwardDivId:any;
  loginResponse:any
  currentPage = 1;  
pageSize = 10;
userType:any;
loaderButton: boolean = false;
showZones:boolean=false;
acceptedPassengers: any = 1;
requestId:any
roleAa:boolean =false;
roleRail:boolean =false;
path:any;
constructor(private router: Router, private apiDataservice: ApiDataService, private sharedDataService: SharedDataService, private route: ActivatedRoute
) {

  }

ngOnInit(){

  this.sharedDataService.loginUserData.subscribe((loginResponse) => {
    if (loginResponse) {
      this.loginResponse = loginResponse;
    }
  });
  if(constants.RoleName.roleAa == this.loginResponse.authorities[0]){
    this.roleAa =true
  }else if(constants.RoleName.roleRail == this.loginResponse.authorities[0]){
    this.roleRail=true
  }
  const state = window.history.state;

  this.requestId = state.id;
  this.loadUserRequest()
  this.loadZone()
}

loadZone(){
  let queryparams =null
  this.apiDataservice.getAuth(queryparams, constants.api.getAllZones).subscribe({
      next: (response: any) => {

        this.allZones = response

      },
      error: (err) => {
        console.error("Response error occured", err);
        alert("error in loading zone");
      }
    }
  );
}
onZoneChange(event :any){
  const zoneId = event .target.value;
  this.fetchDivison(zoneId)
}

onApprovalChange(event :any){
  const status = event .target.value;
  if(status=="APPROVED"){
this.showZones = true
  }else if(status=="REJECTED"){
    this.showZones =false;
  }

}

fetchDivison(zoneId:any){
  const url = `${constants.api.getDivisionByCode}/${zoneId}`
  this.apiDataservice.getAuth( null,url).subscribe({
      next: (response: any) => {

        this.division = response

      },
      error: (err) => {
        console.error("Response error occured", err);
        alert("error in the division api");
      }
    }
  );
}
loadUserRequest(){
  const id ={
    id:this.requestId
  }

  if(this.roleAa){
 this.path = constants.api.aaGetEqRequest
  }else{
this.path =constants.api.railGetEqRequest
  }
  this.apiDataservice.getAuth(id, this.path).subscribe({
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
  if (this.status == 'APPROVED') {
    if (!this.forwardDivId) {
      alert('Zone and Division are required when status is Approved.');
      return;
    }
  }
  const data:any={
    "id":this.requestId,
    "status":this.status,
    "acceptedPassengers":this.acceptedPassengers,
    "remarks":this.remarks,

  }

  if(this.roleAa==true){
    data.forwardDivId = this.forwardDivId;
  }

  const path = this.roleAa==true? constants.api.aaTakeAction:  constants.api.railTakeAction;

  this.apiDataservice.postAuth(data, path).subscribe({
    next: (response: any) => {

      console.log("Decrypted data:", JSON.stringify(response));
      alert(JSON.stringify(response));
      this.router.navigate(['/user-history']);  

    },
    error: (err) => {
      console.error("Response error occured", err);
      alert("error in the Submit api");
    }
  }
);


  console.log("data---" +JSON.stringify(data))
}

submitApproval(){

}



}
