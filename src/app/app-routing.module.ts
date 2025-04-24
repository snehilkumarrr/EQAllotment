import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Component/login/login.component';
import { ApplyQuotaComponent } from './Component/user-homepage/apply-quota/apply-quota.component';
import { UserHistoryComponent } from './Component/user-homepage/user-history/user-history.component'; 

import { OtpPageComponent } from './Component/otp-page/otp-page.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'apply-quota', component: ApplyQuotaComponent },
  { path: 'otp-page', component: OtpPageComponent },
  { path: 'user-history', component: UserHistoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
