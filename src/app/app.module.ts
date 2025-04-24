import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Component/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavBarComponent } from './Component/nav-bar/nav-bar.component';
import { FooterComponent } from './Component/footer/footer.component';
import { NavBarHomeComponent } from './Component/nav-bar-home/nav-bar-home.component';
import { ApplyQuotaComponent } from './Component/user-homepage/apply-quota/apply-quota.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiDataService } from './Services/apiData.service';
import { SharedDataService } from './Services/sharedData.service';
import { CryptoService } from './Services/crypto.service';
import { HttpClientModule } from '@angular/common/http';
import { NoSpecialCharsDirective } from './Directive/no-special-chars.directive';
import { OtpPageComponent } from './Component/otp-page/otp-page.component';
import { UserHistoryComponent } from './Component/user-homepage/user-history/user-history.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    NoSpecialCharsDirective,
    AppComponent,
    LoginComponent,
    NavBarComponent,
    FooterComponent,
    NavBarHomeComponent,
    ApplyQuotaComponent,
    OtpPageComponent,
    UserHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
