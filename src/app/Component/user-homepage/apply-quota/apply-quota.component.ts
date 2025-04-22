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
      quota: [
        '',
        [Validators.required, Validators.pattern(/^\d{10}$/)]
      ]
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
        console.log("🔐 Raw response:", response);

        if (response?.success && response?.encdata) {
          try {
            const decryptedData = this.cryptoService.decrypt(response.encdata);
            console.log("✅ Decrypted:", decryptedData);
            this.personReport = decryptedData; // Save to show in the table
          } catch (e) {
            console.error("❌ Decryption error:", e);
            alert("Error while decrypting the response.");
          }
        } else {
          alert("API did not return expected data.");
        }
      },
      error: (err) => {
        console.error("🚨 Error from API:", err);
        alert("Something went wrong while fetching data.");
      }
    });
  }

  get quota() {
    return this.quotaForm.get('quota');
  }
}
