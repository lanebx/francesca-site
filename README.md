# Francesca — Angular site

Clean Angular 17 foundation for the new Francesca website. The project does not
contain code, styles, images, or other assets from the previous website.

## Requirements

- Node.js 18.13 or newer
- npm 9 or newer

## Local development

```bash
npm install
npm start
```

The development server is available at `http://localhost:4200`.

## Routes

| URL | Page component |
| --- | --- |
| `/` | Home |
| `/about` | About |
| `/gallery` | Gallery |
| `/exhibitions` | Exhibitions |
| `/contact` | Contact |
| any unknown URL | Not found |

All page components are lazy-loaded.

## Images and other assets

Add source files to the appropriate folder:

```text
src/assets/
├── fonts/
├── icons/
└── images/
    ├── artist/
    ├── paintings/
    └── site/
```

Files placed in `src/assets` are copied into the production build without
modification. Prefer descriptive lowercase filenames with hyphens, for example
`blue-landscape-2025.webp`.

## Production build

```bash
npm run build:production
```

The upload-ready website is generated in:

```text
dist/francesca-site/browser/
```

For Hostinger shared hosting, upload the **contents** of that folder to
`public_html`. The production output includes `.htaccess`, which redirects
Angular routes to `index.html` while preserving requests for existing files.

## Project structure

```text
src/app/
├── core/
│   ├── layout/
│   ├── models/
│   └── services/
├── pages/
│   ├── about/
│   ├── contact/
│   ├── exhibitions/
│   ├── gallery/
│   ├── home/
│   └── not-found/
└── shared/
    ├── components/
    ├── directives/
    └── pipes/
```

The page HTML and SCSS files are intentionally empty. Visual design and content
will be added only after approval.
