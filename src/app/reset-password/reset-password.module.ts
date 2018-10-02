import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from "@angular/router";
import { LogoModule } from './../reusable/logo/logo.module';

import { ResetPasswordComponent } from './reset-password.component';
const resetRoutes: Routes = [
  {
    path: '',
    component: ResetPasswordComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LogoModule,
    RouterModule.forChild(resetRoutes)
  ],
  declarations: [ResetPasswordComponent]
})
export class ResetPasswordModule { }
