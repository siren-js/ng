import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SireNgModule } from '@siren-js/ng';

import { AppComponent } from './app.component';
import { ActionFormComponent } from './action-form/action-form.component';
import { DefaultInputControlComponent } from './default-input-control/default-input-control.component';
import { CheckboxControlComponent } from './checkbox-control/checkbox-control.component';
import { FileUploadControlComponent } from './file-upload-control/file-upload-control.component';
import { RadioButtonControlComponent } from './radio-button-control/radio-button-control.component';
import { SelectControlComponent } from './select-control/select-control.component';
import { TextareaControlComponent } from './textarea-control/textarea-control.component';
import { InputControlComponent } from './input-control/input-control.component';

@NgModule({
  declarations: [
    AppComponent,
    ActionFormComponent,
    DefaultInputControlComponent,
    CheckboxControlComponent,
    FileUploadControlComponent,
    RadioButtonControlComponent,
    SelectControlComponent,
    TextareaControlComponent,
    InputControlComponent,
  ],
  imports: [BrowserModule, ReactiveFormsModule, SireNgModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
