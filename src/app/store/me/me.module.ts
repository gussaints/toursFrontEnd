import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MeRoutingModule } from './me-routing.module';
import { PipesModule } from '../../pipes/pipes.module';
import {
  SettingsMeComponent,
  BookingsMeComponent,
  MakeBusComponent
} from './me.index';


@NgModule({
  declarations: [
    SettingsMeComponent,
    BookingsMeComponent,
    MakeBusComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MeRoutingModule,
    PipesModule
  ]
})
export class MeModule { }
