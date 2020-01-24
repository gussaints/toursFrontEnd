import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(
    public http: HttpClient
  ) { }

  bookTourStripe( idTour: any ) {
    const url = `http://127.0.0.1:8888/api/v1/bookings/checkout-session/${idTour}`;
    return this.http.get(url).pipe(
      map(( resp: any ) => {
        console.log( resp );
        return resp;
      }),
      catchError(( err: HttpErrorResponse ) => {
        const msg = err.error ? err.error.message : err.message;
        swal('Error 🦀', msg, 'error');
        return throwError(err);
      })
    );
  }

}
