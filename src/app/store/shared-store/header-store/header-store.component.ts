import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '../../../services/services.index';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header-store',
  templateUrl: './header-store.component.html',
  styleUrls: ['./header-store.component.sass']
})
export class HeaderStoreComponent implements OnInit {
  isLoggedIn = false;
  myUser: any = {};
  goldenEye = '';
  tourinfo: any = {
    data: 'jajajaja'
  };

  constructor(
    public router: Router,
    public activeRoute: ActivatedRoute,
    public authSrvc: AuthService,
    public cookieSrvc: CookieService
  ) {
    this.authSrvc.loggedInChange.subscribe(value => {
      console.log( value, 'checking  isLoggedIn' );
      this.isLoggedIn = value;
    });
    this.authSrvc.goldenEyeChange.subscribe(value => {
      console.log( value, 'checking  goldenEye' );
      this.goldenEye = value;
    });
    this.authSrvc.userChange.subscribe(value => {
      console.log( value, 'checking  user' );
      this.myUser = value ? JSON.parse(value) : {};
    });
  }

  ngOnInit() {
    const gold = this.cookieSrvc.get('goldeneye') || false;
    const jwt = this.cookieSrvc.get('jwt') || '';
    const user = this.cookieSrvc.get('myuser') || '';
    this.authSrvc.changingGoldenEye(gold);
    this.authSrvc.changingLoggedIn(jwt);
    this.authSrvc.changingUser(user);
    console.log( 'this.myUser =header', this.myUser );
  }

  sendRoute(ruta: any) {
    this.router.navigate([ruta]);
  }

  logout() {
    this.authSrvc.logout().subscribe(resp => console.log(resp));
  }

  returnPhoto( photo: any ) {
    const url = photo ? `../../../../assets/img/users/${photo}` : `../../../../assets/img/users/default.jpg`;
    return url;
  }


}
