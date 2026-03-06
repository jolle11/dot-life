# dot life

Visualize your life as a grid of dots. Each dot represents a week, a month, or a year of your life.

**Live:** [dotlife.vercel.app](https://dotlife.vercel.app)

## What is it

A web app that displays your life as an interactive dot grid. Enter your birth date, adjust your life expectancy, and see at a glance how much you've lived and how much is left.

## Features

- **Life grid** — View weeks, months, or years as dots. Lived ones are filled, future ones are empty.
- **Milestones** — Mark important moments in your life with colors. Click any dot to quickly add one.
- **Stats** — Panel showing data about time lived and remaining.
- **Share** — Generate a link to share your grid with others (read-only view).
- **Export** — Download your grid as a PNG image.
- **Light/dark theme** — Respects system preference with manual toggle.
- **Multilanguage** — Available in 12 languages: ES, EN, CA, FR, DE, PT, IT, JA, KO, ZH, AR, HI.
- **Local persistence** — Configuration is saved in localStorage.

## Tech stack

- **Next.js 16** with App Router and React 19
- **Tailwind CSS 4**
- **Framer Motion** for animations
- **Phosphor Icons**
- **html-to-image** for PNG export
- **Biome** for linting and formatting
- **pnpm** as package manager

## Development

```bash
pnpm install
pnpm dev
```

Open [localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Development server |
| `pnpm build` | Production build |
| `pnpm start` | Serve the build |
| `pnpm lint` | Check code with Biome |
| `pnpm format` | Format code with Biome |

## Structure

```
app/           Pages and layout (App Router)
components/    React components (DotGrid, StatsPanel, MilestoneEditor, etc.)
lib/           Business logic, types, i18n, and utilities
```

## Author

Jordi Olle Balleste
