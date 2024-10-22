import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./data-sensors.component').then(m => m.DataSensorsComponent),
    data: {
      title: $localize`Data Sensors`
    }
  }
];
