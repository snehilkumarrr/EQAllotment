import { Component, Input, SimpleChanges } from '@angular/core';
import { AlertToast } from 'src/app/Model/alertToast';
import { Toast } from 'bootstrap';

@Component({
  selector: 'app-alert-toast-modal',
  templateUrl: './alert-toast-modal.component.html',
  styleUrls: ['./alert-toast-modal.component.css']
})
export class AlertToastModalComponent {

  @Input() alertToastModalForModal:AlertToast={type:"",message:""};
  typeClass:string='';

  ngOnChanges(changes: SimpleChanges) {
    let change = changes['alertToastModalForModal'];
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
    if(this.alertToastModalForModal.message!=""&&this.alertToastModalForModal.type!=""){
      const liveToastModal = document.getElementById('liveToastModal');
      if (liveToastModal) {
        const toast = new Toast(liveToastModal);
        toast.show();
      }
    }
  }
}
