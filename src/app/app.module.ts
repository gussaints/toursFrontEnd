import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
// Routing Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreComponent } from './store/store.component';
import { AdminComponent } from './admin/admin.component';
// Modules Shared
import { SharedStoreModule } from './store/shared-store/shared-store.module';
import { SharedAdminModule } from './admin/shared-admin/shared-admin.module';
import { ServicesModule } from './services/services.module';
// import { PipesModule } from './pipes/pipes.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { HttpModule } from '@angular/http';
import {
  HttpRequestInterceptor,
  CheckTokenGuard
} from './services/services.index';
import { PipesModule } from './pipes/pipes.module';

const myInterceptor = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpRequestInterceptor,
    multi: true
  }
];


@NgModule({
  declarations: [
    AppComponent,
    StoreComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedAdminModule,
    SharedStoreModule,
    ServicesModule,
    PipesModule
  ],
  providers: [
    myInterceptor,
    CheckTokenGuard,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
