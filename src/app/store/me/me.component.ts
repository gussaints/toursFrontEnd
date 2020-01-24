import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/services.index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.sass']
})
export class MeComponent implements OnInit {
  user: any = {};

  constructor(
    public authSrvc: AuthService,
    public router: Router
  ) {
    this.user = JSON.parse(this.authSrvc.myUser);
    console.log( 'Dios es maravilloso', this.user );

    this.authSrvc.userChange.subscribe(value => {
      console.log( value, 'checking  user' );
      this.user = value ? JSON.parse(value) : {};
    });

  }

  ngOnInit() {
  }

  sendRoute(ruta: any) {
    this.router.navigate([ruta]);
  }

}
