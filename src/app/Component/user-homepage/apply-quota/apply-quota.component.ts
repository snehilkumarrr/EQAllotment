import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-apply-quota',
  templateUrl: './apply-quota.component.html',
  styleUrls: ['./apply-quota.component.css' ,'../../../Shared/shared_card_styles.css']
})
export class ApplyQuotaComponent {
  quotaForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.quotaForm = this.fb.group({
      quota: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{10}$/)  // 💥 Exactly 10 digits
        ]
      ]
    });

}
onSubmit() {
  if (this.quotaForm.valid) {
    console.log("Quota Applied:", this.quotaForm.value.quota);
    alert('Quota applied successfully!');
  }
}

get quota() {
  return this.quotaForm.get('quota');
}
}
