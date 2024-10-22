import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./action-history.component').then(m => m.ActionHistoryComponent),
    data: {
      title: $localize`Action History`
    }
  }
];
