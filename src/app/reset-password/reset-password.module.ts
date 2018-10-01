import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from "@angular/router";
import { ReusableModule } from './../reusable/reusable.module';

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
    ReusableModule,
    RouterModule.forChild(resetRoutes)
  ],
  declarations: [ResetPasswordComponent]
})
export class ResetPasswordModule { }
