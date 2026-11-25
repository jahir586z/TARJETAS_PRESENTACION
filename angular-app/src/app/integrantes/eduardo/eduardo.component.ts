import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Tarjeta de Eduardo Adame (eduardo/index.html + eduardo/style.css).
 * El <script> del HTML original (inclinación 3D al mover el mouse)
 * se pasó a los métodos mover() y salir().
 */
@Component({
  selector: 'app-presentacion-eduardo',
  imports: [RouterLink],
  templateUrl: './eduardo.component.html',
  styleUrl: './eduardo.component.css',
})
export class EduardoComponent {
  @ViewChild('stage', { static: true }) stage!: ElementRef<HTMLElement>;
  @ViewChild('card', { static: true }) card!: ElementRef<HTMLElement>;

  private readonly calm = window.matchMedia('(prefers-reduced-motion: reduce)');

  mover(e: PointerEvent): void {
    if (this.calm.matches || e.pointerType !== 'mouse') return;
    const r = this.stage.nativeElement.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    const card = this.card.nativeElement;
    card.style.setProperty('--ry', (x * 10).toFixed(2) + 'deg');
    card.style.setProperty('--rx', (-y * 8).toFixed(2) + 'deg');
    card.style.setProperty('--gx', ((x + 0.5) * 100).toFixed(1) + '%');
    card.style.setProperty('--gy', ((y + 0.5) * 100).toFixed(1) + '%');
  }

  salir(): void {
    const card = this.card.nativeElement;
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
  }
}
