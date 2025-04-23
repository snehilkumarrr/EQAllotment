import { Component } from '@angular/core';

@Component({
  selector: 'app-rb-admin-homepage',
  templateUrl: './rb-admin-homepage.component.html',
  styleUrls: ['./rb-admin-homepage.component.css']
})
export class RbAdminHomepageComponent {
  eqRequestReport:any[] =[{

  }];
  currentPage = 1;  
pageSize = 10;
userType:any;
loaderButton: boolean = false;

deleteData(index:any){
  if(confirm("Do you want to Delete this Data?")){
  }

}

editPage(index:any){
    
  }


}
