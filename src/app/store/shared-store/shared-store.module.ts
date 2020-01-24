import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../../pipes/pipes.module';

import {
  HeaderStoreComponent,
  FooterStoreComponent
} from './shared-store.index';

@NgModule({
  declarations: [HeaderStoreComponent, FooterStoreComponent],
  exports: [HeaderStoreComponent, FooterStoreComponent],
  imports: [
    CommonModule,
    PipesModule
  ]
})
export class SharedStoreModule { }
