import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppPropertiesPipe } from './app-properties.pipe';
import { HeaderComponent } from './header/header.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [AppPropertiesPipe,HeaderComponent,FeedbackComponent,SettingsComponent],
  providers: [],
  exports: [AppPropertiesPipe,HeaderComponent,FeedbackComponent,SettingsComponent]
})
export class ReusableModule { }
