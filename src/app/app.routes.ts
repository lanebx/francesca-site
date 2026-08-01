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
        path: 'works',
        title: 'Works | Francesca Cho',
        loadComponent: () =>
          import('./pages/works/works.component').then(
            (component) => component.WorksComponent,
          ),
      },
      {
        path: 'works/:slug',
        title: 'Artwork | Francesca Cho',
        loadComponent: () =>
          import('./pages/artwork-detail/artwork-detail.component').then(
            (component) => component.ArtworkDetailComponent,
          ),
      },
      {
        path: 'gallery',
        pathMatch: 'full',
        redirectTo: 'works',
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
        path: 'exhibitions/:slug',
        title: 'Exhibition | Francesca Cho',
        loadComponent: () =>
          import(
            './pages/exhibition-detail/exhibition-detail.component'
          ).then((component) => component.ExhibitionDetailComponent),
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
