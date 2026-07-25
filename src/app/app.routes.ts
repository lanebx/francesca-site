import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./core/layout/site-layout/site-layout.component').then(
        (component) => component.SiteLayoutComponent,
      ),
    children: [
      {
        path: '',
        title: 'Francesca',
        loadComponent: () =>
          import('./pages/home/home.component').then(
            (component) => component.HomeComponent,
          ),
      },
      {
        path: 'about',
        title: 'About | Francesca',
        loadComponent: () =>
          import('./pages/about/about.component').then(
            (component) => component.AboutComponent,
          ),
      },
      {
        path: 'gallery',
        title: 'Gallery | Francesca',
        loadComponent: () =>
          import('./pages/gallery/gallery.component').then(
            (component) => component.GalleryComponent,
          ),
      },
      {
        path: 'exhibitions',
        title: 'Exhibitions | Francesca',
        loadComponent: () =>
          import('./pages/exhibitions/exhibitions.component').then(
            (component) => component.ExhibitionsComponent,
          ),
      },
      {
        path: 'contact',
        title: 'Contact | Francesca',
        loadComponent: () =>
          import('./pages/contact/contact.component').then(
            (component) => component.ContactComponent,
          ),
      },
    ],
  },
  {
    path: '**',
    title: 'Page not found | Francesca',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        (component) => component.NotFoundComponent,
      ),
  },
];
