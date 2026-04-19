# 1846: The Race for the Midwest - Companion App

A web-based companion app for the board game [**1846: The Race for the Midwest**](https://boardgamegeek.com/boardgame/17405/1846-the-race-to-the-midwest). It handles stock market bookkeeping and dividend calculations so players can focus on the game.

## Features

- **Game Setup** - Configure 3–5 players and choose which railroad companies are in play.
- **Stock Round** - Track share purchases, float new companies, and manage treasury shares.
- **Operating Round** - Enter company revenue and instantly see the three dividend payout options (full, half, witheld) with per-player breakdowns.
- **Persistent State** - Game state is saved to `localStorage`, so you can close the tab and resume later.

## Tech Stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [React Router](https://reactrouter.com/)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |
