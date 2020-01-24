import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreRoutingModule } from './store.routing.module';
import { PipesModule } from '../pipes/pipes.module';

import {
  MainStoreComponent,
  TourDetailsComponent,
  LoginComponent,
  MeComponent
} from './store.index';

@NgModule({
  declarations: [
    MainStoreComponent,
    TourDetailsComponent,
    LoginComponent,
    MeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StoreRoutingModule,
    PipesModule.forRoot()
  ]
})
export class StoreModule { }
