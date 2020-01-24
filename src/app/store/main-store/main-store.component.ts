import { Component, OnInit } from '@angular/core';
import {
  ToursService
} from 'src/app/services/services.index';
import swal from 'sweetalert';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main-store',
  templateUrl: './main-store.component.html',
  styleUrls: ['./main-store.component.sass']
})
export class MainStoreComponent implements OnInit {
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
  ) {
    console.log('Called Constructor');
    this.route.queryParams.subscribe(params => {
        this.tour = params.ta;
        this.user = params.iu;
        this.price = params.ma;
        console.log( this.user, this.tour, this.price );
        if ( this.user && this.tour && this.price ) {
          this.router.navigate(['/store']);
          this.gettingTours(this.tour, this.user, this.price);
        }
    });
  }

  ngOnInit() {
    this.gettingTours();
  }

  gettingTours(tour?: any, user?: any, price?: any) {
    const queryParams = tour ? `?tour=${tour}&user=${user}&price=${price}` : null;
    this.received = false;
    this._toursSrvc.getTours(queryParams).subscribe( ( info: any ) => {
      if ( !queryParams ) {
        console.log( 'los datos si fueron actualizados', queryParams );
        this.received = true;
        this.myTours = info.data;
      } else {
        console.log( 'los datos no fueron actualizados por existencia de queryParams', queryParams );
      }
      console.log( 'since component main-store',  info );
      // swal( 'Success 🛩', 'Data arriving', 'success' );
    });
  }

  getStartLocation(tour: any, prop: any) {
    const msg = tour.startLocations ? tour.startLocations[prop] : 'Not found';
    return msg;
  }

}
