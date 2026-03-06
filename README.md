# dot life

Visualiza tu vida en un grid de puntos. Cada punto representa una semana, un mes o un ano de tu vida.

**Live:** [dotlife.vercel.app](https://dotlife.vercel.app)

## Que es

Una aplicacion web que muestra tu vida como un grid interactivo de puntos. Introduces tu fecha de nacimiento, ajustas la esperanza de vida y ves de un vistazo cuanto has vivido y cuanto te queda.

## Funcionalidades

- **Grid de vida** — Visualiza semanas, meses o anos como puntos. Los vividos se rellenan, los futuros quedan vacios.
- **Milestones** — Marca momentos importantes en tu vida con colores. Click en cualquier punto para anadir uno rapido.
- **Estadisticas** — Panel con datos sobre el tiempo vivido y restante.
- **Compartir** — Genera un enlace para compartir tu grid con otros (vista de solo lectura).
- **Exportar** — Descarga tu grid como imagen PNG.
- **Tema claro/oscuro** — Respeta la preferencia del sistema con toggle manual.
- **Multiidioma** — Disponible en 12 idiomas: ES, EN, CA, FR, DE, PT, IT, JA, KO, ZH, AR, HI.
- **Persistencia local** — La configuracion se guarda en localStorage.

## Tech stack

- **Next.js 16** con App Router y React 19
- **Tailwind CSS 4**
- **Framer Motion** para animaciones
- **Phosphor Icons**
- **html-to-image** para la exportacion PNG
- **Biome** para linting y formateo
- **pnpm** como gestor de paquetes

## Desarrollo

```bash
pnpm install
pnpm dev
```

Abre [localhost:3000](http://localhost:3000).

### Scripts

| Comando | Descripcion |
| --- | --- |
| `pnpm dev` | Servidor de desarrollo |
| `pnpm build` | Build de produccion |
| `pnpm start` | Sirve el build |
| `pnpm lint` | Comprueba el codigo con Biome |
| `pnpm format` | Formatea el codigo con Biome |

## Estructura

```
app/           Paginas y layout (App Router)
components/    Componentes React (DotGrid, StatsPanel, MilestoneEditor, etc.)
lib/           Logica de negocio, tipos, i18n y utilidades
```

## Autor

Jordi Olle Balleste
