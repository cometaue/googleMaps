import { Component } from '@angular/core';
import { Marcador } from '../../classes/marcador.class';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import { MapaEditarComponent } from './mapa-editar.component';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent {

  marcadores: Marcador[] = [];
  public lat = 51.678418;
  public lng = 7.809007;
  constructor(private snackBar: MatSnackBar, public dialog: MatDialog) {
        if (localStorage.getItem('marcadores')) {
            this.marcadores = JSON.parse(localStorage.getItem('marcadores'));
        }
  }
  agregarMarcador(e) {
   const coords: {lat: number, lng: number} = e.coords;
   const nuevoMarcador = new Marcador(coords.lat, coords.lng );
   this.marcadores.push(nuevoMarcador);
   this.guardarStorage();
  }
  borrarLoc(i) {
    this.marcadores.splice(i, 1);
    this.guardarStorage();
    this.snackBar.open('Ubicación Borrada')._dismissAfter(2000);
  }
  guardarStorage() {
    localStorage.setItem('marcadores', JSON.stringify(this.marcadores));
    this.snackBar.open('Ubicación Guardada')._dismissAfter(2000);
  }
  editarMarcador(loc: Marcador) {
    const dialogRef = this.dialog.open(MapaEditarComponent, {
      width: '250px',
      data: {titulo: loc.titulo, descripción: loc.desc}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (!result) {
       return;
      }
      loc.titulo = result.titulo;
      loc.desc = result.desc;
      localStorage.setItem('marcadores', JSON.stringify(this.marcadores));
      this.snackBar.open('Descripción Actualizada')._dismissAfter(2000);
    });
  }

}
