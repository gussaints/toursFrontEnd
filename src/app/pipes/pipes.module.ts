import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ImagesPipe
} from './pipes.index';

@NgModule({
  imports: [],
  declarations: [
    ImagesPipe
  ],
  exports: [
    ImagesPipe
  ]
})
export class PipesModule {
  static forRoot() {
    return {
        ngModule: PipesModule,
        providers: [],
    };
 }
}
