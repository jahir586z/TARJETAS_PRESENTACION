import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { JahirComponent } from './integrantes/jahir/jahir.component';
import { RodrigoComponent } from './integrantes/rodrigo/rodrigo.component';
import { ChristianComponent } from './integrantes/christian/christian.component';
import { JaimeComponent } from './integrantes/jaime/jaime.component';
import { EduardoComponent } from './integrantes/eduardo/eduardo.component';

export const routes: Routes = [
  { path: '', component: InicioComponent, title: 'Tarjetas de Presentación | Nuestro Equipo' },
  { path: 'jahir', component: JahirComponent, title: 'Jahir Moroles' },
  { path: 'rodrigo', component: RodrigoComponent, title: 'Rodrigo Mendez' },
  { path: 'christian', component: ChristianComponent, title: 'Christian Saucedo' },
  { path: 'jaime', component: JaimeComponent, title: 'Jaime Escobedo | Presentación' },
  { path: 'eduardo', component: EduardoComponent, title: 'Eduardo Adame Venancio · Tarjeta de presentación' },
  { path: '**', redirectTo: '' },
];
