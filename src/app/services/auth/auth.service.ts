import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { map, catchError, retry } from 'rxjs/operators';
import { throwError, Observable, Subject } from 'rxjs';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { UsersService } from '../users/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  loggedInChange: Subject<boolean> = new Subject<boolean>();
  goldenEye = '';
  goldenEyeChange: Subject<string> = new Subject<string>();
  myUser = '';
  userChange: Subject<string> = new Subject<string>();

  constructor(
    public http: HttpClient,
    public cookieSrvc: CookieService,
    public router: Router,
    public userSrvc: UsersService
  ) {
    this.loggedInChange.subscribe((value: any) => {
      this.isLoggedIn = value;
    });
    this.goldenEyeChange.subscribe((value: any) => {
      this.goldenEye = value;
    });
    this.userChange.subscribe((value: any) => {
      console.log( 'gus is here', value );
      this.myUser = value;
    });
    const jwt = this.cookieSrvc.get('jwt') ? true : false;
    const gold = this.cookieSrvc.get('goldeneye') ? 'epom' : '';
    const user = this.cookieSrvc.get('myuser') ? this.cookieSrvc.get('myuser') : '';
    console.log(gold, jwt, user);
    this.changingGoldenEye(gold);
    this.changingLoggedIn(jwt);
    this.changingUser(user);
  }


  changingLoggedIn( bolo: any ) {
    this.loggedInChange.next(bolo);
  }

  changingGoldenEye( bolo: any ) {
    this.goldenEyeChange.next(bolo);
  }

  changingUser( bolo: any ) {
    this.userChange.next(bolo);
  }

  login( user: any, recordar: boolean = false ) {
    const url = `http://127.0.0.1:8888/api/v1/users/login`;
    return this.http.post(url, user, { withCredentials: true }).pipe(
      map( ( resp: any ) => {
        const expire0 = new Date().getTime();
        const expire1 = expire0 + (1000 * 10);

        this.cookieSrvc.set( 'jwt', resp.token, expire1 );
        this.cookieSrvc.set( 'goldeneye', 'epom', expire1 );
        this.cookieSrvc.set( 'myuser', JSON.stringify(resp.data) );

        this.changingLoggedIn( true );
        this.changingGoldenEye( 'epom' );
        this.changingUser( JSON.stringify(resp.data) );

        this.router.navigate(['/store']);
        // this.userSrvc.myUser = resp.data;
        console.log( 'mi amor es Dios', this.myUser );
        swal( 'Success 🛎', 'You are logged in successfully!', 'success' );
        return resp;
      }),
      catchError( ( err: HttpErrorResponse ) => {
        this.changingLoggedIn( false );
        this.changingGoldenEye( '' );
        this.changingUser( '' );

        swal('Error 🌡', err.error.message, 'warning');
        return throwError(err);
      })
    );
  }

  logout() {
    const url = `http://127.0.0.1:8888/api/v1/users/logout`;
    return this.http.get(url).pipe(
      map( ( resp: any ) => {
        console.log( 'jajajajajaja', resp );
        this.cookieSrvc.delete('jwt', '/');
        this.cookieSrvc.delete('goldeneye', '/');
        this.cookieSrvc.delete('myuser', '/');
        this.cookieSrvc.deleteAll('../');

        this.changingLoggedIn( false );
        this.changingGoldenEye( '' );
        this.router.navigate(['/store']);
        swal( 'Success 🔐', 'You are logged out successfully!', 'success' );
        return resp;
      }),
      catchError( ( err: HttpErrorResponse ) => {
        swal('Error 🔒', err.error.message, 'warning');
        return throwError(err);
      })
    );

  }

  updateUser( user: any ) {
    return new Promise( ( resolve, reject ) => {
      const url = `http://127.0.0.1:8888/api/v1/users/updateMe`;
      const formData = new FormData();
      const xhr = new XMLHttpRequest();
      if (user.photo) { formData.append('photo', user.photo); }
      formData.append('email', user.email);
      formData.append('name', user.name);
      const info: any = this.cookieSrvc.getAll();
      console.log( info, formData );

      xhr.open('PATCH', url, true);
      xhr.setRequestHeader('authorization', `Bearer ${info.jwt}`);
      xhr.send( formData );
      // tslint:disable-next-line: only-arrow-functions
      xhr.onreadystatechange = function() {
        if ( xhr.status !== 200 ) {
          console.log( '444', xhr );
          reject({status: 444, info: xhr});
        } else {
          const resp = JSON.parse(xhr.responseText);
          resolve(resp);
        }
      };
    });

  }

  updatePassword(user: any) {
    const url = `http://127.0.0.1:8888/api/v1/users/updateMyPassword`;

    return this.http.patch<any>(url, user).pipe(
      map(( resp: any ) => {
        this.cookieSrvc.set( 'myuser', JSON.stringify(resp.data) );
        this.changingUser( JSON.stringify(resp.data) );
        return resp;
      }),
      catchError( (err: HttpErrorResponse) => {
        const msg = err.error ? err.error.message : err.message;
        swal('Error 👀', msg, 'error');
        return throwError(err);
      })
    );
  }

  checkToken() {
    const url = `http://127.0.0.1:8888/api/v1/users/me`;
    return this.http.get(url);
  }


}
