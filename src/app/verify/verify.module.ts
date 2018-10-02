import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { VerifyComponent } from './verify.component'
import { LogoModule } from './../reusable/logo/logo.module';

const verifyRoutes: Routes = [
  {
    path: '',
    component: VerifyComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    LogoModule,
    RouterModule.forChild(verifyRoutes)
  ],
  declarations: [VerifyComponent]
})
export class VerifyModule { }
