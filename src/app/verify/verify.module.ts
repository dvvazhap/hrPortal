import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { VerifyComponent } from './verify.component'

const verifyRoutes: Routes = [
  {
    path: '',
    component: VerifyComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(verifyRoutes)
  ],
  declarations: [VerifyComponent]
})
export class VerifyModule { }
