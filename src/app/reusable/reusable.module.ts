import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { Routes, RouterModule } from "@angular/router";
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { NgTableComponent, NgTableFilteringDirective, NgTablePagingDirective, NgTableSortingDirective } from 'ng2-table/ng2-table';

import { AppPropertiesPipe } from './app-properties.pipe';
import { HeaderComponent } from './header/header.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    AngularMultiSelectModule,
    ModalModule.forRoot(),
    AngularFontAwesomeModule,
    DataTablesModule,
  ],
  declarations: [AppPropertiesPipe,HeaderComponent,FeedbackComponent,SettingsComponent],
  providers: [],
  exports: [AppPropertiesPipe,HeaderComponent,FeedbackComponent,SettingsComponent]
})
export class ReusableModule { 
  directives: [
    NgTableComponent,
    NgTableFilteringDirective,
    NgTableSortingDirective,
    NgTablePagingDirective
  ]
}
