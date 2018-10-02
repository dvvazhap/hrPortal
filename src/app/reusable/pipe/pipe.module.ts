import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppPropertiesPipe } from './app-properties.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AppPropertiesPipe],
  exports: [AppPropertiesPipe]
})
export class PipeModule { }
