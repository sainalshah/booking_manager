import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule, MatSidenavModule} from '@angular/material';
import {MatFormFieldModule, MatSelectModule, MatInputModule} from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material';
import {MatListModule} from '@angular/material/list';
import { UserService } from "./user.service";
import { BookingService } from './booking.service';
import { HomeComponent } from './home/home.component';
import { GroupService } from './group.service';
import { AccessGuard } from './user.service';
import { BookingComponent } from './booking/booking.component';
import { AddBookingComponent } from './add-booking/add-booking.component';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { AddGroupComponent } from './add-group/add-group.component';

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("454779948179-9u9alokjcbvpdv0nokutm32v94g0rpf8.apps.googleusercontent.com")
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    HomeComponent,
    BookingComponent,
    AddBookingComponent,
    AddGroupComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    MatButtonModule, MatCheckboxModule,
    MatIconModule, MatToolbarModule,
    MatSidenavModule, MatListModule,
    MatCardModule, MatTableModule,
    MatFormFieldModule, MatSelectModule,
    MatDialogModule,
    MatInputModule,
    AppRoutingModule,
    SocialLoginModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule
  ],
  entryComponents: [
    AddBookingComponent,
    AddGroupComponent
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    UserService, GroupService, AccessGuard, BookingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
