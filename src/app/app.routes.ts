import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout/default-layout';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/routes').then((m) => m.routes)
      },
      {
        path: 'data-sensors',
        loadChildren: () => import('./views/data-sensors/routes').then((m) => m.routes)
      },
      {
        path: 'action-history',
        loadChildren: () => import('./views/action-history/routes').then((m) => m.routes)
      },
      {
        path: 'profile',
        loadChildren: () => import('./views/profile/routes').then((m) => m.routes)
      },
      
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];
