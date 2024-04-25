import { Component,OnInit, ViewChild,  } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Marcador } from 'src/app/classes/marcador.class';
import { MapaEditarComponent } from './mapa-editar.component';
import { MarcadorService } from 'src/app/services/marcador.service';

//import { MatDialog, MatDialogRef } from '@angular/material';

interface MarkerProperties {
  position: {
    lat: number;
    lng: number;
  }
};

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})


export class MapaComponent implements OnInit {


  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;

  marcadores:Marcador[]=[];
  marcadoresLocalStore:Mark[]=[];
  posicionMap: number;
  
  zoom = 12;
  center: google.maps.LatLngLiteral ;
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 10,
    minZoom: 8,
  };
  
  
 
  ngOnInit() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      console.log('latitud '+position.coords.latitude);
      console.log('longitu '+position.coords.longitude);

    });
    //this.addMarker();
    //this.addmarcas();
  }
 
  constructor(public snackBar: MatSnackBar,
              public dialog: MatDialog,
              public services:MarcadorService
              ){

    this.services.getMarcadores().subscribe(mar =>{
      console.log('respuesta services' + JSON.stringify(mar))
      mar.forEach(mar =>{
        const nuevoMarcador= new Marcador(mar.lat,mar.lng);
        this.marcadores.push(nuevoMarcador);

        const mark={lat:mar.lat,lng:mar.lng}
        this.marcadoresLocalStore.push(mark);
        
      })
    })



  }
  zoomIn() {
    if (this.zoom < this.options.maxZoom) this.zoom++;
  }
 
  zoomOut() {
    if (this.zoom > this.options.minZoom) this.zoom--;
  }

  click(event: google.maps.MapMouseEvent) {
    const posicion:{lat:number, lng:number} = event.latLng.toJSON()
    console.log(event.latLng.toJSON());
    console.log('latitud: '+ posicion.lat);
    console.log('evento: '+ JSON.stringify(event));
    //this.marcadoresLocalStore.set(posicion.lat,posicion.lng);    
    const nuevoMarcador= new Marcador(posicion.lat,posicion.lng);
    this.marcadores.push(nuevoMarcador);

    let mark={lat:posicion.lat,lng:posicion.lng}

    this.marcadoresLocalStore.push(mark);
    console.log('son los marcadores '+JSON.stringify( this.marcadoresLocalStore));
    this.guardarStorage();
    //this.services.guardarMarcadores(this.marcadoresLocalStore);
    this.snackBar.open('Marcador agregado', 'Cerrar', { duration: 3000 });
  }

  public openInfoWindow(marker: MapMarker, i: number) {
    //this.marker = marker.marker;
    console.log(marker);
    console.log(i);
    this.infoWindow.open(marker);
    this.posicionMap =i;
  }

  guardarStorage() {
   
    //localStorage.setItem('marcadores', JSON.stringify( this.marcadoresLocalStore ) );
    this.services.guardarMarcadores(this.marcadoresLocalStore).subscribe(r=>{
      r.forEach(mar =>{
        const nuevoMarcador= new Marcador(mar.lat,mar.lng);
        this.marcadores.push(nuevoMarcador);

        const mark={lat:mar.lat,lng:mar.lng}
        this.marcadoresLocalStore.push(mark);
        
      })
    });

  }

  borrarMarcador(){
    console.log(this.posicionMap);
    this.marcadores.splice(this.posicionMap,1);
    this.marcadoresLocalStore.splice(this.posicionMap,1);
    this.guardarStorage();
    this.snackBar.open('Marcador borrado', 'Cerrar', { duration: 3000 });
  }

  editarMarcador( marcador: Marcador ) {
    const dialogRef = this.dialog.open( MapaEditarComponent , {
      width: '250px',
      data: { titulo: marcador.titulo, desc: marcador.desc }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      if ( !result ) {
        return;
      }
      console.log(result);
      marcador.titulo = result.titulo;
      marcador.desc = result.desc;

      this.guardarStorage();
      this.snackBar.open('Marcador actualizado', 'Cerrar', { duration: 3000 });

    });

  }

     
}

export interface Mark {
  lat:number;
  lng:number;
}
