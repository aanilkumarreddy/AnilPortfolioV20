import { Routes } from '@angular/router';
import { Overview } from './overview/overview';
import { Experience } from './experience/experience';

export const routes: Routes = [
  { path: '', redirectTo: '/overview', pathMatch: 'full' },
  { path: 'overview', component: Overview },
  {
    path: 'experience',
    loadComponent: () =>
      import('./experience/experience').then((m) => m.Experience),
  },
  {
    path: 'education',
    loadComponent: () =>
      import('./education/education').then((m) => m.Education),
  },
  {
    path: 'projects',
    loadComponent: () => import('./projects/projects').then((m) => m.Projects),
  },
  {
    path: 'about',
    loadComponent: () => import('./about/about').then((m) => m.About),
  },
  {
    path: 'contact',
    loadComponent: () => import('./contact/contact').then((m) => m.Contact),
  },
  {
    path: 'volunteering',
    loadComponent: () =>
      import('./volunteering/volunteering').then((m) => m.Volunteering),
  },
];
