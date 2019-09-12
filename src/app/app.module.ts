import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { AgmCoreModule } from "@agm/core";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoogleMapComponent } from './google-map/google-map.component';

@NgModule({
  declarations: [
    AppComponent,
    GoogleMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA_v4w6zUDwK8s0rs-zGqTaY6nzR_Niz3c'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
