import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { ShareComponent } from './share.component'

const shareRoutes: Routes = [
  {
    path: '',
    component: ShareComponent
  }, {
    path: ':id',
    component: ShareComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(shareRoutes)
  ],
  declarations: [ShareComponent]
})
export class ShareModule { }
