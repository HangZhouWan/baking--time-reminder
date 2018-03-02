import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatIconModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatGridListModule,
  MatListModule,
  MatCardModule,
  MatTableModule,
  MatFormFieldModule
} from '@angular/material';


import {AppComponent} from './app.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    MatIconModule,
    MatToolbarModule,
    BrowserModule,
    MatCheckboxModule,
    MatButtonModule,
    MatGridListModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
