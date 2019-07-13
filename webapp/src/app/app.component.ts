import { Component } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, OnDestroy} from '@angular/core';
import { UserService } from "./user.service";
import { DomSanitizer } from '@angular/platform-browser';
import { User } from './user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Booking Manager';

  currUser: User = null;
  photoUrl;
  isLoggedIn;

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private userService: UserService, private sanitizer: DomSanitizer) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  signInWithGoogle(): void {
    this.userService.signIn();
  }

  signOut(): void {
    this.userService.signOut();
  }

  ngOnInit() {
    this.userService.currentUser.subscribe(user => {
      this.currUser = user;
      if (this.currUser && this.currUser.email) {
        console.log("user logged in", this.currUser);
        this.isLoggedIn = true;
        //this.photoUrl = this.sanitizer.bypassSecurityTrustUrl(this.currUser.photoUrl);
      }
      else {
        this.isLoggedIn = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
