import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Marcador } from '../classes/marcador.class';
import { Observable } from 'rxjs';
import { Mark } from '../components/mapa/mapa.component';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MarcadorService {

  constructor(private http: HttpClient) { }

  getMarcadores():Observable< Marcador[]>{
    return this.http.get< Marcador[]>(`${environment.backendAPI}`);
  }

  guardarMarcadores(marcador: Mark[]):Observable< Marcador[]>{
    console.log('entra a guardar ',JSON.stringify(marcador));
    return this.http.put<Marcador[]>(`${environment.backendAPI}/guardar-marcador/`, marcador)
  }

  ventas():Observable<Ventas[]>{
    return this.http.post<Ventas[]>(`${environment.backendAPI}/ventas/`,'');
  }
}



export interface Ventas {

  mes:string;
  cantInmuebles:string;
  totalVentas:string;
  
}