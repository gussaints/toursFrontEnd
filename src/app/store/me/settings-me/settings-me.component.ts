import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/services.index';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-settings-me',
  templateUrl: './settings-me.component.html',
  styleUrls: ['./settings-me.component.sass']
})
export class SettingsMeComponent implements OnInit {
  user: any = {};
  meForm: FormGroup;
  oneForm: any = { };
  passForm: FormGroup;
  twoForm: any = { };
  imagenSubir: File = null;
  fileInfo: any;

  constructor(
    public authSrvc: AuthService,
    public http: HttpClient,
    public cookieSrvc: CookieService
  ) {
    this.user = JSON.parse(this.authSrvc.myUser);
    console.log( 'Dios es maravilloso', this.user );

    this.authSrvc.userChange.subscribe(value => {
      console.log( value, 'checking  user' );
      this.user = value ? JSON.parse(value) : {};
    });

    this.makeMeForm();
    this.makePasswordForm();
  }

  makeMeForm() {
    this.oneForm = { };
    // tslint:disable-next-line: prefer-const
    let ownSync: any[] = [];
    ownSync.push( Validators.required );
    this.oneForm.email = new FormControl( '', Validators.compose([
      Validators.required,
      // tslint:disable-next-line: max-line-length
      Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    ]) );
    this.oneForm.name = new FormControl( '', ownSync );
    this.oneForm.photo = new FormControl(null, ownSync );
    this.meForm = new FormGroup( this.oneForm );
  }

  sendFormEmail() {
    const user: any = {
      email: this.meForm.value.email,
      name: this.meForm.value.name
    };

    if ( this.imagenSubir ) {
      user.photo = this.imagenSubir;
    }

    this.authSrvc.updateUser(user).then(( resp: any ) => {
      this.cookieSrvc.set( 'myuser', JSON.stringify(resp.data) );
      this.authSrvc.changingUser( JSON.stringify(resp.data) );
      swal('Success 🦊', 'User updated', 'success');
    }).catch(err => {
      console.log( err );
      console.log('auch!');
      const msg = err.error ? err.error.message : err.message;
      swal('Error 👀', msg, 'error');
    });

  }

  makePasswordForm() {
    this.twoForm = { };
    // tslint:disable-next-line: prefer-const
    let ownSync: any[] = [];
    ownSync.push( Validators.required );
    this.twoForm.passwordCurrent = new FormControl( '', ownSync );
    this.twoForm.password = new FormControl( '', ownSync );
    this.twoForm.passwordConfirm = new FormControl( '', ownSync );
    this.passForm = new FormGroup( this.twoForm );
  }

  sendFormPassword() {
    const user = {
      passwordCurrent: this.passForm.value.passwordCurrent,
      password: this.passForm.value.password,
      passwordConfirm: this.passForm.value.passwordConfirm
    };
    this.authSrvc.updatePassword( user ).subscribe(( info: any ) => {
      swal('Success 👸🏻', 'Password User updated', 'success');
      console.log( 'updatePassword regresando', info );

      this.passForm.reset();

      Object.keys(this.passForm.controls).forEach(key => {
        this.passForm.get(key).setErrors(null) ;
      });
    });
  }

  ngOnInit() {
  }

  selectFile( eva: File ) {
    if ( !eva ) {
      this.imagenSubir = null;
      return ;
    }

    if ( eva.type.indexOf('image') < 0 ) {
      this.imagenSubir = null;
      swal('Just images', 'Selected file is not an image', 'error');
      return ;
    }

    this.imagenSubir = eva;
    // this.meForm.get('photo').setValue(eva);

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL( eva );
    reader.onloadend = ( ) => {
      console.log( 'urlImagenTemp', urlImagenTemp );
      console.log( 'reader', reader );
      this.fileInfo = reader.result;
    };
  }

}
