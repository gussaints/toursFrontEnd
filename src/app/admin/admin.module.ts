import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin.routing.module';
// import { AdminComponent } from './admin.component';
import { MainAdminComponent } from './admin.index';

@NgModule({
  declarations: [
    MainAdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
