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
  additionalForm: FormGroup; // ✅ New form for dropdown and remarks
  personReport: any = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiDataService,
    private cryptoService: CryptoService
  ) {
    this.quotaForm = this.fb.group({
      quota: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });

    this.additionalForm = this.fb.group({
      numPassengers: ['', Validators.required],
      remarks: [''] // Optional field
    });
  }

  onSubmit() {
    if (this.quotaForm.invalid) {
      this.quotaForm.markAllAsTouched();
      return;
    }

    const requestData = {
      pnr: this.quotaForm.value.quota
    };

    this.apiService.getNoAuth(requestData, constants.api.authPnr).subscribe({
      next: (response: any) => {
        console.log("Raw response:", response);
        this.personReport = response;
        // Reset and enable the additional form
        this.additionalForm.reset();
      },
      error: (err) => {
        console.error("🚨 Error from API:", err);
        alert("Something went wrong while fetching data.");
      }
    });
  }

  // ✅ Handle submit for dropdown + remarks form
  onAdditionalSubmit() {
    if (this.additionalForm.invalid) {
      this.additionalForm.markAllAsTouched();
      return;
    }

    const selectedPassengers = this.additionalForm.value.numPassengers;
    const remarks = this.additionalForm.value.remarks;

    console.log("🚀 Additional form submitted:");
    console.log("Selected No. of Passengers:", selectedPassengers);
    console.log("Remarks:", remarks);

    // TODO: Send this data to backend or handle as needed
    alert(`Submitted:\nNo. of Passengers: ${selectedPassengers}\nRemarks: ${remarks}`);
  }

  get quota() {
    return this.quotaForm.get('quota');
  }
}
