import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FooterAdminComponent,
  HeaderAdminComponent
} from './shared-admin.index';

@NgModule({
  declarations: [FooterAdminComponent, HeaderAdminComponent],
  exports: [FooterAdminComponent, HeaderAdminComponent],
  imports: [
    CommonModule
  ]
})
export class SharedAdminModule { }
