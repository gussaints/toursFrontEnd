import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainAdminComponent } from './admin.index';


const routes: Routes = [
  {
    path: '', component: MainAdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

