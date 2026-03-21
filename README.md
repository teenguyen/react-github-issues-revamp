# Github Issues Tracker

A [Next.js](https://nextjs.org) app for tracking Github issues.

## Prerequisites

- [Docker](https://www.docker.com/get-started) (with Compose v2.16+)

## Getting Started

Build the Docker image and start the dev server:

```bash
yarn build
```

This runs `docker compose up --build`, which builds the image and starts the container.

Once running, open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

After the initial build, start the dev server with file watching (hot reload):

```bash
yarn start
```

This runs `docker compose up --watch`, which syncs file changes into the container automatically. Changing `package.json` triggers a full rebuild.

## Scripts

| Command | Description |
|---|---|
| `yarn start` | Start the dev server with hot reload (`docker compose up --watch`) |
| `yarn build` | Build the image and start the container (`docker compose up --build`) |
| `yarn ndev` | Run the Next.js dev server directly (without Docker) |
| `yarn nbuild` | Build the Next.js app for production |
| `yarn nstart` | Start the Next.js production server |
