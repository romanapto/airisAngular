import { Component,Inject,OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mapa-editar',
  templateUrl: './mapa-editar.component.html',
  styleUrls: ['./mapa-editar.component.css']
})
export class MapaEditarComponent implements OnInit {

  forma: FormGroup;

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<MapaEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      console.log( data  );
      this.forma = fb.group({
        'titulo': data.titulo,
        'desc' : data.desc
      });

    }

    ngOnInit() {
    }
  
    guardarCambios() {
      console.log(this.forma.value);
      this.dialogRef.close(this.forma.value);
  
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }

}
