import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
  },
  {
    name: 'Dashboard 2',
    url: '/dashboard2',
    iconComponent: { name: 'cil-speedometer' },
  },
  {
    name: 'Data Sensors',
    url: '/data-sensors',
    iconComponent: { name: 'cil-chart' },
  },
  {
    name: 'Action History',
    url: '/action-history',
    iconComponent: { name: 'cil-pencil' },
  },
  {
    name: 'Profile',
    url: '/profile',
    iconComponent: { name: 'cil-user' },
  },
];
