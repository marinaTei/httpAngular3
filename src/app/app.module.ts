import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TableOfUsersComponent } from './table-of-users/table-of-users.component';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [
    AppComponent,
    TableOfUsersComponent,
    FormComponent
  ],
  imports: [
      BrowserModule,
      FormsModule,
      HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
