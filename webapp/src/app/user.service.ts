import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService, SocialUser } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import {User} from "./user";


import { environment } from '../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Group } from './group';

import {map, catchError} from 'rxjs/operators';
import { Observable, throwError } from "rxjs";

import {CanActivate, ActivatedRouteSnapshot, Router} from  '@angular/router';

const API_URL = environment.apiUrl;

@Injectable()
export class UserService {

  // initialize with empty object
  userBS = new BehaviorSubject<User>(null);
  currentUser = this.userBS.asObservable();

  private isLoggedIn = false;

  constructor(private authService: AuthService, private http: HttpClient, private router: Router) {
    this.authService.authState.subscribe(async (user) => {
      console.log("user logged in", user);
      if ( user ){
        console.log("saving user");
        this.updateUser(await this.saveUser(user));
        this.isLoggedIn = true;
        this.router.navigate(['home']);
      } else {
        // invalidate user login
        this.updateUser(null);
        this.isLoggedIn = false;
        this.router.navigate(['']);
      }
    });
  }

  updateUser(user: User) {
    this.userBS.next(user);
  }

  signIn(): void {
    console.log("trying to sign in with google");
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

  public isUserLoggedIn(): boolean{
    return this.isLoggedIn;
  }

  async saveUser(user: SocialUser): Promise<User> {
    return await this.http.post<User>( API_URL + '/users', user).toPromise();
  }

  // API: GET /users/all
  public async getAllUsers(): Promise<[User]> {
    // will use this.http.get()
    const users = await this.http.get<[User]>( API_URL + '/users/all').toPromise();
    console.log(users);
    return users;
  }

}

@Injectable()
export class AccessGuard implements CanActivate {

  constructor(private userService: UserService){}

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const requiresLogin = route.data.requiresLogin || false;
    console.log("checking requires login", requiresLogin);

    return requiresLogin? this.userService.isUserLoggedIn(): true;
  }
}
