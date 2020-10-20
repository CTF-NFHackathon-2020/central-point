import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TextboxComponent } from './textbox/textbox.component';
import { AutofocusDirective } from './autofocus.directive';
import { FormsModule } from '@angular/forms';
import { TextPreviewComponent } from './text-preview/text-preview.component';

import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [
    AppComponent,
    TextboxComponent,
    AutofocusDirective,
    TextPreviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
