import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

// import {NgxPaginationModule} from 'ngx-pagination';

import {AppComponent} from './app.component';
import {TableOfUsersComponent} from './table-of-users/table-of-users.component';
import {FormComponent} from './form/form.component';
import {GlobalService} from './services/global.service';
import { PostComponent } from './components/post/post.component';
import { PutComponent } from './components/put/put.component';
import { DeleteComponent } from './components/delete/delete.component';

@NgModule({
  declarations: [
    AppComponent,
    TableOfUsersComponent,
    FormComponent,
    PostComponent,
    PutComponent,
    DeleteComponent
  ],
  imports: [
      BrowserModule,
      FormsModule,
      HttpClientModule,
      // NgxPaginationModule
  ],
  providers: [GlobalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
