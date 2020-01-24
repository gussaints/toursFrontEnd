import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/services.index';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.sass']
})
export class StoreComponent implements OnInit {

  constructor(
    public authSrvc: AuthService,
    public cookieSrvc: CookieService
  ) {

    // this.authSrvc.loggedInChange.subscribe(value => {
    //   console.log( value, 'checking  isLoggedIn' );
    // });
    // this.authSrvc.goldenEyeChange.subscribe(value => {
    //   console.log( value, 'checking  goldenEye' );
    // });
  }

  ngOnInit() {
    const jwt = this.cookieSrvc.get('jwt') ? true : false;
    console.log(jwt, 'jwt');
    this.authSrvc.changingLoggedIn(jwt);

    const gold = this.cookieSrvc.get('goldeneye') ? 'epom' : '';
    console.log(gold, 'gold');
    this.authSrvc.changingGoldenEye(gold);
  }

}
