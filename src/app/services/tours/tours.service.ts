import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class ToursService {

  constructor(
    public http: HttpClient,
    public router: Router
  ) { }

  getTours(params?: any) {
    const url = params ? `http://127.0.0.1:8888/api/v1/tours${params}` : `http://127.0.0.1:8888/api/v1/tours`;
    console.log( 'checando url BOOKING', url );
    return this.http.get(url, { withCredentials: true }).pipe(
      map( ( resp: any ) => {
        console.log(resp);
        return resp;
      }),
      catchError( ( err: HttpErrorResponse ) => {
        this.router.navigate(['/store']);
        console.log( 'recuento', err );

        const msg = err.error ? err.error.message : err.message;
        swal( 'Error 🗼', msg, 'error' );
        return throwError( err );
      })
    );
  }

  getOneTour(oneTour: any) {
    const url = `http://127.0.0.1:8888/api/v1/tours/${oneTour}`;
    return this.http.get(url, { withCredentials: true }).pipe(
      map( (resp: any) => {
        return resp;
      }),
      catchError( (err: HttpErrorResponse) => {
        this.router.navigate(['/store']);
        swal('Error 🌋', err.error.message, 'error');
        return throwError(err);
      })
    );
  }

  getMyBookingTours() {
    const url = `http://127.0.0.1:8888/api/v1/tours/my-tours`;
    return this.http.get(url).pipe(
      map( (resp: any) => {
        return resp;
      }),
      catchError( (err: HttpErrorResponse) => {
        this.router.navigate(['/store/me/settings']);
        swal('Error 🌋', err.error.message, 'error');
        return throwError(err);
      })
    );
  }

  saveBus(newBus: any) {
    const url = `http://127.0.0.1:8888/api/v1/tours/bus`;
    return this.http.post(url, newBus).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError((err: HttpErrorResponse) => {
        const errmsg = err.error ? err.error.message : err.message;
        swal('Server Error 🍖', errmsg, 'error');
        return throwError(err);
      })
    );
  }
}
