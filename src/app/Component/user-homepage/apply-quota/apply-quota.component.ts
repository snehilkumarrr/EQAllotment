import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiDataService } from 'src/app/Services/apiData.service';
import { CryptoService } from 'src/app/Services/crypto.service';
import * as constants from 'src/app/Shared/constants';

@Component({
  selector: 'app-apply-quota',
  templateUrl: './apply-quota.component.html',
  styleUrls: ['./apply-quota.component.css', '../../../Shared/shared_card_styles.css']
})
export class ApplyQuotaComponent {
  quotaForm: FormGroup;
  personReport: any = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiDataService,
    private cryptoService: CryptoService
  ) {
    this.quotaForm = this.fb.group({
      quota: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      noOfPassengers: ['', Validators.required],
      remarks: ['']
    });
  }

  onSubmit() {
    if (this.quotaForm.get('quota')?.invalid) {
      this.quotaForm.get('quota')?.markAsTouched();
      return;
    }

    const requestData = {
      pnr: this.quotaForm.value.quota
    };

    this.apiService.getNoAuth(requestData, constants.api.authPnr).subscribe({
      next: (response: any) => {
        console.log("Raw response:", response);
        this.personReport = response;

        // Reset the additional fields
        this.quotaForm.patchValue({
          noOfPassengers: '',
          remarks: ''
        });
      },
      error: (err) => {
        console.error("🚨 Error from API:", err);
        alert("Something went wrong while fetching data.");
      }
    });
  }

  submitQuotaRequest() {
    if (this.quotaForm.get('noOfPassengers')?.invalid) {
      this.quotaForm.get('noOfPassengers')?.markAsTouched();
      return;
    }

    const payload = {
      pnr: this.quotaForm.value.quota,
      noOfPassengers: this.quotaForm.value.noOfPassengers,
      remarks: this.quotaForm.value.remarks
    };

    this.apiService.postAuth(payload, constants.api.saveEqRequest).subscribe({
      next: (res) => {
        console.log("Quota request submitted successfully:", res);
        alert("Quota request submitted successfully.");
      },
      error: (err) => {
        console.error("🚨 Error submitting quota request:", err);
        alert("Something went wrong while submitting the quota request.");
      }
    });
  }

  get quota() {
    return this.quotaForm.get('quota');
  }

  get noOfPassengers() {
    return this.quotaForm.get('noOfPassengers');
  }

  get remarks() {
    return this.quotaForm.get('remarks');
  }
}
