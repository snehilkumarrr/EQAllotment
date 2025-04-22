import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiDataService } from '../../../Services/apiData.service'; // Adjust path as needed

@Component({
  selector: 'app-apply-quota',
  templateUrl: './apply-quota.component.html',
  styleUrls: ['./apply-quota.component.css', '../../../Shared/shared_card_styles.css']
})
export class ApplyQuotaComponent {
  quotaForm: FormGroup;
  personReport: any = null;

  constructor(private fb: FormBuilder, private apiService: ApiDataService) {
    this.quotaForm = this.fb.group({
      quota: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{10}$/)  // Exactly 10 digits
        ]
      ]
    });
  }

  onSubmit() {
    if (this.quotaForm.valid) {
      const requestData = {
        pnr: this.quotaForm.value.quota // Assuming the backend expects "pnr"
      };

      // Call the postQuotaRequest method in the ApiDataService
      this.apiService.postQuotaRequest(requestData).subscribe({
        next: (response: any) => {
          const personId = response.personId; // Simulated response (personId: 123)
          this.fetchPersonDetails(personId); // Fetch details using personId
        },
        error: (err) => {
          console.error('Quota request failed:', err);
          alert('Failed to apply quota.');
        }
      });
    }
  }

  fetchPersonDetails(id: number) {
    this.apiService.getPersonDetails(id).subscribe({
      next: (data) => {
        this.personReport = data; // Save the person details
      },
      error: (err) => {
        console.error('Error fetching person details:', err);
        alert('Could not retrieve person information.');
      }
    });
  }

  get quota() {
    return this.quotaForm.get('quota');
  }
}
