import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Component/login/login.component';
import { ApplyQuotaComponent } from './Component/user-homepage/apply-quota/apply-quota.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'apply-quota', component: ApplyQuotaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
