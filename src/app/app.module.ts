import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  MatButtonModule,
  MatIconModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatGridListModule,
  MatListModule,
  MatCardModule,
  MatTableModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';


import {AppComponent} from './app.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    FormsModule,
    MatIconModule,
    MatToolbarModule,
    BrowserModule,
    MatCheckboxModule,
    MatButtonModule,
    MatGridListModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
