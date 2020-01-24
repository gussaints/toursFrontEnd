import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreComponent } from './store/store.index';
import { AdminComponent } from './admin/admin.index';

const routes: Routes = [
  {
    path: 'store', component: StoreComponent,
    loadChildren: './store/store.module#StoreModule'
  },
  {
    path: 'nodemyadmin', component: AdminComponent,
    loadChildren: './admin/admin.module#AdminModule'
  },
  {
    path: '',
    redirectTo: '/store',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/store',
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false, anchorScrolling:
      'enabled', scrollPositionRestoration: 'enabled'
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
