import { Component, OnInit } from '@angular/core';
import {
  ToursService
} from 'src/app/services/services.index';
import swal from 'sweetalert';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bookings-me',
  templateUrl: './bookings-me.component.html',
  styleUrls: ['./bookings-me.component.sass']
})
export class BookingsMeComponent implements OnInit {

  received = false;
  myTours = [ ];
  tour: any;
  user: any;
  price: any;

  constructor(
    // tslint:disable-next-line: variable-name
    public _toursSrvc: ToursService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.gettingToursBooking();
  }

  gettingToursBooking(tour?: any, user?: any, price?: any) {
    this.received = false;

    this._toursSrvc.getMyBookingTours().subscribe( ( info: any ) => {
        this.received = true;
        this.myTours = info.data;
        console.log( 'since component booking-me',  info );
      // swal( 'Success 🛩', 'Data arriving', 'success' );
    });
  }

  getStartLocation(tour: any, prop: any) {
    const msg = tour.startLocations ? tour.startLocations[prop] : 'Not found';
    return msg;
  }

}
