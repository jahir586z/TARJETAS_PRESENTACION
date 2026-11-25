import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/** Tarjeta de Jahir Moroles (jahir/index.html + jahir/style.css). */
@Component({
  selector: 'app-presentacion-jahir',
  imports: [RouterLink],
  templateUrl: './jahir.component.html',
  styleUrl: './jahir.component.css',
  host: { class: 'jahir' },
})
export class JahirComponent {}
