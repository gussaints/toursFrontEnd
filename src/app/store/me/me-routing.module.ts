import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  SettingsMeComponent,
  BookingsMeComponent,
  MakeBusComponent
} from './me.index';


const routes: Routes = [
  {
    path: 'settings',
    component: SettingsMeComponent
  },
  {
    path: 'bookings',
    component: BookingsMeComponent
  },
  {
    path: 'manage-bus',
    component: MakeBusComponent
  },
  {
    path: '',
    redirectTo: 'settings',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'settings',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeRoutingModule { }
