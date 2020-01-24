import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckTokenGuard } from '../services/services.index';
import {
  MainStoreComponent,
  TourDetailsComponent,
  LoginComponent,
  MeComponent
} from './store.index';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'me',
    component: MeComponent,
    canActivate: [CheckTokenGuard]
  },
  {
    path: 'me',
    component: MeComponent,
    canActivate: [CheckTokenGuard],
    loadChildren: './me/me.module#MeModule'
  },
  {
    path: ':_id',
    component: TourDetailsComponent,
    canActivate: [CheckTokenGuard]
  },
  {
    path: '',
    component: MainStoreComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
