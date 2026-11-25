import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/** Tarjeta de Rodrigo Mendez (rodrigo/index.html + rodrigo/style.css). */
@Component({
  selector: 'app-presentacion-rodrigo',
  imports: [RouterLink],
  templateUrl: './rodrigo.component.html',
  styleUrl: './rodrigo.component.css',
  host: { class: 'rodrigo' },
})
export class RodrigoComponent {}
