import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppPropertiesPipe } from './app-properties.pipe';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AppPropertiesPipe],
  providers: [],
  exports: [AppPropertiesPipe]
})
export class ReusableModule { }
