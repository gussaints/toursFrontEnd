import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import {
  AuthService
} from '../../services/services.index';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  oneForm: any = { };

  constructor(
    // tslint:disable-next-line: variable-name
    public _authSrvc: AuthService
  ) {
    this.makeLoginForm();
  }

  ngOnInit() {
  }

  makeLoginForm() {
    this.oneForm = { };
    // tslint:disable-next-line: prefer-const
    let ownSync: any[] = [];
    ownSync.push( Validators.required );
    this.oneForm.email = new FormControl( '', Validators.compose([
      Validators.required,
      // tslint:disable-next-line: max-line-length
      Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    ]) );
    this.oneForm.password = new FormControl( '', ownSync );
    this.loginForm = new FormGroup( this.oneForm );
  }

  sendLogin() {
    console.log( this.loginForm.value );
    const user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
    this._authSrvc.login( user, false ).subscribe(( info: any ) => {
      console.log( 'login regresando', info );
    });
  }

}
