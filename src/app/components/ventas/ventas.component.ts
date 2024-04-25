import { Component } from '@angular/core';
import { MarcadorService, Ventas } from 'src/app/services/marcador.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent {

  ventas: Ventas[] =[];

  constructor(public services:MarcadorService){

    services.ventas().subscribe(v=>{
      console.log('ventas '+v)
      this.ventas=v
    })

  }
  
}
