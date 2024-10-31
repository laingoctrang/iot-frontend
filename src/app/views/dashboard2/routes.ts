import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard2.component').then(m => m.Dashboard2Component),
    data: {
      title: $localize`Dashboard2`
    }
  }
];

