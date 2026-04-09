# dot life

Aplicación web para visualizar la vida como una cuadrícula de puntos. Cada punto representa una semana, un mes o un año. La idea es convertir el tiempo en algo tangible: ver de un vistazo cuánto has vivido, cuánto te queda según una esperanza de vida estimada y qué hitos han marcado tu recorrido.

**Demo:** [dotlifeapp.vercel.app](https://dotlifeapp.vercel.app)

## Qué es el producto

`dot life` es un "life calendar" interactivo:

- Introduces tu fecha de nacimiento.
- Ajustas una esperanza de vida.
- Eliges si quieres ver la vida en semanas, meses o años.
- La app pinta una cuadrícula donde lo vivido aparece marcado y lo futuro queda pendiente.
- Puedes añadir hitos personales con color para convertir la cuadrícula en una línea temporal visual.

No es una herramienta médica ni una calculadora demográfica. La esperanza de vida es un valor manual que usa la app para construir la visualización.

## Qué incluye

- Vista en `weeks`, `months` o `years`.
- Selector de forma de punto: `circle`, `square`, `diamond`.
- Hitos puntuales o por rango de fechas.
- Panel de estadísticas con métricas básicas y métricas "fun stats".
- Exportación de la cuadrícula a PNG.
- Enlace compartible en modo solo lectura.
- Tema claro/oscuro con preferencia del sistema.
- Interfaz traducida a 12 idiomas: `es`, `ca`, `en`, `fr`, `de`, `pt`, `it`, `ja`, `ko`, `zh`, `ar`, `hi`.
- Atajos de teclado para cambiar de vista y abrir ayuda.

## Cómo funciona

La app no depende de backend. Todo ocurre en cliente:

- La configuración principal se guarda en `localStorage`.
- El tema y el idioma también se guardan en `localStorage`.
- Cuando compartes una vista, el estado relevante se serializa en la URL.
- Si se abre una URL compartida, la app entra en modo compartido y muestra esa configuración en solo lectura.

Esto hace que el producto sea simple de desplegar, barato de operar y bastante portable.

## Persistencia y privacidad

Datos guardados en navegador:

| Clave | Contenido |
| --- | --- |
| `dot-life-config` | Fecha de nacimiento, esperanza de vida, modo de vista, hitos y forma del punto |
| `dot-life-theme` | Preferencia de tema (`light` o `dark`) |
| `dot-life-locale` | Idioma seleccionado |

Consideraciones importantes:

- No hay cuentas de usuario.
- No hay base de datos.
- No hay API propia.
- La fecha de nacimiento y los hitos no salen del navegador salvo que el usuario comparta la URL.
- Las vistas compartidas se marcan con `noindex` para evitar indexación en buscadores.

## Configuración por defecto

La app arranca con estos valores base:

| Campo | Valor |
| --- | --- |
| `birthDate` | `""` |
| `lifeExpectancy` | `80` |
| `viewMode` | `weeks` |
| `milestones` | `[]` |
| `dotShape` | `circle` |

No hay variables de entorno requeridas en este proyecto.

## Stack técnico

- `Next.js 16` con App Router
- `React 19`
- `TypeScript`
- `Tailwind CSS 4`
- `Framer Motion`
- `@phosphor-icons/react`
- `html-to-image` para exportación PNG
- `Biome` para lint y format

En `next.config.ts` está activado `reactCompiler: true`.

## Requisitos

- `Node.js` 20 o superior recomendado
- `pnpm` recomendado

El repositorio también incluye `package-lock.json`, así que puedes usar `npm`, pero el proyecto está planteado principalmente para `pnpm`.

## Desarrollo local

```bash
pnpm install
pnpm dev
```

La app quedará disponible en [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando | Descripción |
| --- | --- |
| `pnpm dev` | Arranca el servidor de desarrollo |
| `pnpm build` | Genera la build de producción |
| `pnpm start` | Sirve la build de producción |
| `pnpm lint` | Ejecuta `biome check` |
| `pnpm format` | Formatea el código con Biome |

## Estructura del proyecto

```text
app/           Rutas, layout global, metadata, sitemap, manifest e imágenes sociales
components/    UI principal: grid, paneles, drawers, formularios y diálogos
lib/           Tipos, cálculos, i18n, persistencia, share y utilidades
public/        Assets estáticos
```

Piezas importantes:

- `components/HomeClient.tsx`: orquestación principal de estado, carga local, tema, idioma, export y share.
- `components/DotGrid.tsx`: renderizado de la cuadrícula y lógica visual de puntos e hitos.
- `components/StatsPanel.tsx`: métricas de vida vivida/restante.
- `components/SettingsDrawer.tsx`: configuración principal.
- `lib/storage.ts`: persistencia local.
- `lib/share.ts`: serialización/deserialización del modo compartido.
- `lib/calculations.ts`: cálculos de fechas, unidades y estadísticas.
- `lib/i18n/`: traducciones.

## Compartir vistas

Cuando el usuario genera un enlace:

- Se codifican `viewMode`, `lifeExpectancy`, `birthDate` y los hitos.
- Los hitos se guardan como offsets respecto a la fecha de nacimiento.
- La vista compartida reconstruye una configuración equivalente en cliente.

Eso permite compartir una versión fiel de la cuadrícula sin necesidad de persistencia en servidor.

## UX y accesibilidad

Atajos disponibles:

- `W`: vista por semanas
- `M`: vista por meses
- `Y`: vista por años
- `?`: abrir/cerrar ayuda
- `Esc`: cerrar ayuda o drawer

Además:

- El drawer lateral soporta gestos táctiles.
- Los modales usan focus trap.
- Los puntos tienen etiquetas accesibles para lector de pantalla.

## Despliegue

El proyecto se puede desplegar tal cual en Vercel o en cualquier entorno capaz de servir una app Next.js.

Build de producción:

```bash
pnpm build
pnpm start
```

No requiere secretos ni configuración especial para arrancar.

## Notas operativas

- El layout carga un script externo de analítica desde `https://assets.onedollarstats.com/stonks.js`.
- La exportación PNG se hace en cliente usando `html-to-image`.
- Sin JavaScript, la app muestra un fallback informativo, pero la funcionalidad principal requiere JS.

## Autor

Jordi Ollé Ballesté
