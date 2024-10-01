import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  // To use ngModel
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';  // Reference to the root component

@NgModule({
  declarations: [
    AppComponent  // Declare your AppComponent here
  ],
  imports: [
    BrowserModule,
    FormsModule,   // Import FormsModule for two-way data binding with ngModel
    HttpClientModule  // If you're making HTTP calls, this is needed
  ],
  providers: [],
  bootstrap: [AppComponent]  // Bootstrap the application with AppComponent
})
export class AppModule { }
