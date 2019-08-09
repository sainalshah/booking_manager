import { Component, OnInit } from '@angular/core';

import { AuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { UserService } from "../user.service";


@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  title = 'Booking Manager';

  private user: SocialUser;
  public loggedIn: boolean;

  ngOnInit(): void {
    this.userService.currentUser.subscribe((user) => {
      console.log("user logged in", user);
      this.user = user;
      this.loggedIn = (user && user.email)? true: false;
    });
  }

  constructor(private userService: UserService) { }

  signInWithGoogle(): void {
    this.userService.signIn();
  }

  signOut(): void {
    this.userService.signOut();
  }

}
