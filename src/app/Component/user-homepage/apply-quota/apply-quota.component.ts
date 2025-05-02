import { Component } from '@angular/core';
import { SessionStorageService } from 'src/app/Services/session-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonReport } from 'src/app/Model/pnr-enquiry';
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
  personReport: PersonReport| null = null;
  isSubmitted: boolean = false; // Flag to track if the form has been submitted
  errorMessage: string | null = null; // To store any error messages
  successMessage: string | null = null;
  userName: string = '';
  roles: string[] = [];




  constructor(
    private fb: FormBuilder,
    private apiService: ApiDataService,
    private cryptoService: CryptoService,
    private sessionStorageService: SessionStorageService
  ) {
    this.quotaForm = this.fb.group({
      quota: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      noOfPassengers: ['', Validators.required],
      remarks: ['']
    });
  }
  ngOnInit(): void {
    // ✅ Read session storage values
    this.userName = this.sessionStorageService.getItem('username') || '';
    this.roles = this.sessionStorageService.getObject('authorities') || [];
  }

  onSubmit() {
    this.isSubmitted = true;
    this.successMessage = null; // clear success message on new PNR check
  
    if (this.quotaForm.get('quota')?.invalid) {
      this.quotaForm.get('quota')?.markAsTouched();
      return;
    }
  
    const requestData = { pnr: this.quotaForm.value.quota };
  
    this.apiService.get(requestData, constants.api.authPnr).subscribe({
      next: (response: any) => {
        // You may need to adjust this condition based on your API's actual response structure
        if (!response || !response.pnrNumber || response.passengerList?.length === 0) {
          this.errorMessage = response.errorMessage;
          this.personReport = null;
          return;
        }
  
        this.personReport = response;
        this.errorMessage = null;
        this.successMessage = null; // in case it's still set
  
        // Reset additional form fields
        this.quotaForm.patchValue({
          noOfPassengers: '',
          remarks: ''
        });
      },
      error: (err) => {
        this.errorMessage = err.error?.errorMessage || 'Something went wrong while fetching data.';
        this.personReport = null;
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
      requestPassengers: this.quotaForm.value.noOfPassengers,
      remarks: this.quotaForm.value.remarks
    };
  
    this.apiService.post(payload, constants.api.saveEqRequest).subscribe({
      next: (res) => {
       // console.log("Quota request submitted successfully:", res);
  
        // Reset everything
        this.quotaForm.reset();
        this.personReport = null;
        this.errorMessage = null;
        this.successMessage = JSON.stringify(res.message);
        this.isSubmitted = false;
      },
      error: (err) => {
        console.error("🚨 Error submitting quota request:", err);
        // alert("Something went wrong while submitting the quota request.");
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
