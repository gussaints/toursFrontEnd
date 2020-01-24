import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, Route } from '@angular/router';
import { UsersService } from '../users/users.service';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class CheckTokenGuard implements CanActivate {
  constructor(
    public authSrvc: AuthService,
    public http: HttpClient,
    public router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.authSrvc.checkToken().pipe(
      map( (resp: any) => {
        this.authSrvc.isLoggedIn = true;
        console.log( 'volviendo de /me', resp.data );
        return true;
      }),
      catchError( ( err: HttpErrorResponse ) => {
        this.authSrvc.logout().subscribe((resp: any) => {
          swal( 'Error 🎈', err.error.message, 'warning' );
          return resp;
        });
        return throwError(err);
      })
    );

  }

}
