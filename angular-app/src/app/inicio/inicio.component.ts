import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/** Página principal: index.html + style.css de la raíz del repositorio. */
@Component({
  selector: 'app-inicio',
  imports: [RouterLink],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent {}
