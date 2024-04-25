import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { GoogleMapsModule } from '@angular/google-maps'
import { MaterialModule } from './material.module';
import { MapaComponent } from './components/mapa/mapa.component';
import { MapaEditarComponent } from './components/mapa/mapa-editar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { VentasComponent } from './components/ventas/ventas.component';

const googleMapsParams = {
  apiKey: 'AIzaSyCOaSWdmqmM6mvV-5MInBbrysF1zWRLJ7Q',
  libraries: ['places'],
  language: 'en',
  // region: 'DE'
};

@NgModule({
  
  declarations: [
    AppComponent,
    MapaComponent,
    MapaEditarComponent,
    VentasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //AgmCoreModule.forRoot(googleMapsParams),
    GoogleMapsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
