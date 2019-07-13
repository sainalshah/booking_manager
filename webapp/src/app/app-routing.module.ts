import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { AccessGuard } from './user.service';
import { BookingComponent } from './booking/booking.component';

const routes: Routes = [{ path: '',
component: LoginComponent,
pathMatch: 'full'
},
{ path: 'home', component: HomeComponent, data: { requiresLogin: true }, canActivate: [ AccessGuard ] },
{ path: 'booking', component: BookingComponent, data: { requiresLogin: true }, canActivate: [ AccessGuard ] },
{ path: '**', component: PageNotFoundComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
