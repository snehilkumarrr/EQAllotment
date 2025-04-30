import { Component, Input, SimpleChanges } from '@angular/core';
import { AlertToast } from 'src/app/Model/alertToast';
import { Toast } from 'bootstrap';
@Component({
  selector: 'app-alert-toast',
  templateUrl: './alert-toast.component.html',
  styleUrls: ['./alert-toast.component.css']
})

export class AlertToastComponent {
  @Input() alertToastModal:AlertToast={type:"",message:""};
  typeClass:string='';

  ngOnChanges(changes: SimpleChanges) {
    let change = changes['alertToastModal'];
    switch (change.currentValue.type) {
      case 'error': 
        this.typeClass="bg-danger";
        break;
      case 'success': 
        this.typeClass="bg-success";
        break;
      case 'warning': 
        this.typeClass="bg-warning";
        break;
      default:
        this.typeClass="";
    }
    if(this.alertToastModal.message!=""&&this.alertToastModal.type!=""){
      const liveToast = document.getElementById('liveToast');
      if (liveToast) {
        const toast = new Toast(liveToast);
        toast.show();
      }
      
    }
  }
}
