import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { HttpModule } from '@angular/http';
// import { HttpRequestInterceptor } from './interceptor/interceptor.service';
// const myInterceptor = [
//   {
//     provide: HTTP_INTERCEPTORS,
//     useClass: HttpRequestInterceptor,
//     multi: true
//   }
// ];

import {
  ToursService,
  AuthService,
  UsersService,
  BookingService
} from './services.index';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    // myInterceptor,
    ToursService,
    AuthService,
    UsersService,
    BookingService
  ]
})
export class ServicesModule { }
