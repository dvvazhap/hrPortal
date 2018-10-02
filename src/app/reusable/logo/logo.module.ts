import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoDirective } from './logo.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LogoDirective],
  providers: [],
  exports: [LogoDirective]
})
export class LogoModule { }
