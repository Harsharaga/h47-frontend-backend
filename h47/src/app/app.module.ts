import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component'; // AppComponent should be standalone.
import { HttpClientModule, HttpClient } from '@angular/common/http';
@NgModule({
  imports: [
    BrowserModule, // Only core modules required here.
    HttpClientModule,
    HttpClient,
  ],
  bootstrap: [AppComponent], // Define the bootstrap component.
})
export class AppModule {}
