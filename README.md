# VERIFAI

VERIFAI is a static React application for organizing human-led review of AI generated information. It stores work in the current browser with versioned LocalStorage and uses the public Crossref REST API for DOI metadata lookup.

## Development

```sh
npm install
npm run dev
```

## GitHub Pages

The GitHub Actions workflow in `.github/workflows/deploy.yml` builds and deploys the static site whenever `main` is updated. In the GitHub repository, set **Settings → Pages → Build and deployment → Source** to **GitHub Actions**. The workflow configures the Vite base path and a Pages fallback for client-side routes.

## Checks

```sh
npm run typecheck
npm run lint
npm run build
```

No backend, database, authentication server, or API key is required. Browser data is not encrypted or synchronized; export a JSON backup regularly and avoid sensitive information.
