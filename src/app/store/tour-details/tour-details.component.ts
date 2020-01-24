import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  ToursService,
  AuthService,
  BookingService
} from '../../services/services.index';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import swal from 'sweetalert';
import { CookieService } from 'ngx-cookie-service';
declare var stripe: any;
declare var elements: any;

@Component({
  selector: 'app-tour-details',
  templateUrl: './tour-details.component.html',
  styleUrls: ['./tour-details.component.sass']
})
export class TourDetailsComponent implements OnInit {
  // tslint:disable-next-line: variable-name
  _id = '';
  isLoggedIn = false;
  myUser: any = {};
  goldenEye = '';
  map: mapboxgl.Map;
  style = 'mapbox://styles/gussaints/ck57iko6e0bto1cl94sf36ttn';
  // 'mapbox://styles/jonasschmedtmann/cjnxfn3zk7bj52rpegdltx58h';
  lat = 37.75;
  lng = -122.41;
  currentTour: any = {};
  founded = false;
  myFeatures: any = [];
  myCoordinates: any = [];

  constructor(
    // tslint:disable-next-line: variable-name
    public _toursSrvc: ToursService,
    public activeroute: ActivatedRoute,
    public authSrvc: AuthService,
    public router: Router,
    public cookieSrvc: CookieService,
    public bookSrvc: BookingService
  ) {
    activeroute.params.subscribe((params: any) => {
      const _id = params._id;
      if ( _id !== 'nuevo' ) {
        this._id = _id;
        this.oneTour(this._id);
      }
    });
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
    console.log( 'stripe', stripe, 'elements', elements );
  }

  // tslint:disable-next-line: variable-name
  oneTour(_id: any) {
    this.founded = false;
    this._toursSrvc.getOneTour(_id).subscribe((resp: any) => {
      this.founded = true;
      // swal('Success 🎠', 'Tour is founded!', 'success');
      console.log( resp );
      this.currentTour = resp.data;
      this.makeMap();
    });
  }

  getStartLocation(tour: any, prop: any) {
    const msg = tour.startLocations ? tour.startLocations[prop] : 'Not found';
    return msg;
  }

  checkRating(rating: any, star: any) {
    const answer = rating ? rating : 1;
    // console.log( rating, answer, star );
    return answer >= star ? true : false;
  }

  makeMap() {
    this.myFeatures = [];
    this.myCoordinates = [];
    (mapboxgl as typeof mapboxgl).accessToken = environment.mapbox.accessToken;
    // tslint:disable-next-line: new-parens
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      scrollZoom: false
    });

    this.myFeatures = [
      {
        type: 'Feature',
        geometry: {
            type: this.currentTour.startLocations.type,
            coordinates: this.currentTour.startLocations.coordinates
        },
        properties: {
            description: this.currentTour.startLocations.description
        }
      }
    ];

    this.myCoordinates = [
      this.currentTour.startLocations.coordinates
    ];

    this.currentTour.locations.map( (tour: any) => {
      const oneFeature = {
        type: 'Feature',
        geometry: {
            type: tour.type,
            coordinates: tour.coordinates
        },
        properties: {
            description: tour.description
        }
      };
      this.myFeatures.push(oneFeature);
      this.myCoordinates.push(tour.coordinates);
    });

    const geojson = {
      type: 'FeatureCollection',
      features: this.myFeatures
    };

    const bounds = new mapboxgl.LngLatBounds();

    geojson.features.forEach((marker) => {
      const el = document.createElement('div');
      el.className = 'marker';

      new mapboxgl.Marker({
              element: el,
              anchor: 'bottom'
          })
          .setLngLat(marker.geometry.coordinates)
          .addTo(this.map);

      new mapboxgl.Popup({
              offset: 30,
              closeOnClick: false
          })
          .setLngLat(marker.geometry.coordinates)
          .setHTML('<p>' + marker.properties.description + '</p>')
          .addTo(this.map);

      bounds.extend(marker.geometry.coordinates);
    });

    this.map.fitBounds(bounds, {
      padding: {
          top: 200,
          bottom: 150,
          left: 50,
          right: 50
      }
    });

    this.map.on('load', () => {
      this.map.addLayer({
          id: 'route',
          type: 'line',
          source: {
              type: 'geojson',
              data: {
                  type: 'Feature',
                  properties: {},
                  geometry: {
                      type: 'LineString',
                      coordinates: this.myCoordinates
                  }
              }
          },
          layout: {
              'line-join': 'round',
              'line-cap': 'round'
          },
          paint: {
              'line-color': '#55c57a',
              'line-opacity': 0.6,
              'line-width': 3
          }
      });
    });
  }

  goToUrl( url: any ) {
    this.router.navigate([url]);
  }

  generateSession( idTour: any ) {
    console.log( 'validando id tour', idTour );
    this.bookSrvc.bookTourStripe(idTour).subscribe((resp: any) => {
      swal( 'Success 🌹', 'Session completed very well', 'success' );
      stripe.redirectToCheckout({
        sessionId: resp.session.id
      });
    });
  }

}
