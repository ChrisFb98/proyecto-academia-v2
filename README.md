# Academia Conquer — v2

Rediseño del sitio estático de **Academia Conquer** con una estética *space / IA*:
fondo profundo, verde suave (`#9defc5`), cian (`#7ce7f4`) y azul mate (`#718cff`).

**Sitio publicado:** https://chrisfb98.github.io/proyecto-academia-v2/

Construido con **Vite + SASS**, HTML semántico, iconografía SVG y diseño
responsive *mobile-first*. Mantiene las 13 páginas y los contenidos del sitio original.

## Requisitos

- Node.js 18 o superior
- npm 9 o superior

## Puesta en marcha

```bash
npm install
npm run dev       # servidor de desarrollo con recarga en caliente
npm run build     # compila el sitio en dist/
npm run preview   # sirve la versión de producción
```

El servidor de desarrollo se abre por defecto en `http://localhost:5173`.

## Estructura

```
.
├── *.html                  # 13 páginas del sitio
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/img/         # imágenes originales
│   ├── js/main.js          # menú móvil, filtros, formularios, revelado…
│   ├── partials/
│   │   ├── icons.html      # sprite SVG (<symbol> + <use>)
│   │   ├── header.html
│   │   └── footer.html
│   └── scss/
│       ├── abstracts/      # variables y mixins
│       ├── base/           # reset, tipografía, base
│       ├── layout/         # contenedor, secciones y grids
│       ├── components/     # botones, tarjetas, header, footer, formularios…
│       ├── pages/          # estilos específicos por página
│       └── main.scss       # punto de entrada
└── vite.config.js
```

### Parciales HTML

Para no duplicar el header y el footer, las páginas usan un pequeño plugin de Vite:

```html
<!-- @include header.html -->
```

El plugin `htmlPartials()` de `vite.config.js` sustituye esos comentarios por el
contenido de `src/partials/`. También se incluye el sprite de iconos una vez por página.

## Páginas

| Archivo | Contenido |
| --- | --- |
| `index.html` | Inicio |
| `quienes-somos.html` | Equipo, misión y valores |
| `cursos.html` | Catálogo de cursos |
| `curso1.html` | Curso Full-Stack |
| `curso2.html` | Curso de IA |
| `blog.html` | Blog con filtros por categoría |
| `noticia1.html` | Artículo: empezar a programar |
| `noticia2.html` | Artículo: tendencias 2025 |
| `registro.html` | Registro de usuario |
| `login.html` | Inicio de sesión |
| `contacto.html` | Contacto y mapa |
| `aviso-legal.html` | Aviso legal |
| `politica-privacidad.html` | Política de privacidad |

## Interacciones

- Menú móvil accesible (`aria-expanded`, cierre con `Escape` y clic fuera).
- Filtros del blog por categoría con `aria-pressed`.
- Mostrar / ocultar contraseña.
- Revelado progresivo al hacer scroll (respeta `prefers-reduced-motion`).
- Botón “volver arriba”.
- Formularios de demostración: validan y muestran un mensaje, sin backend.

## Notas de diseño

- Tipografías: **Space Grotesk** (títulos), **Inter** (texto) y **JetBrains Mono** (etiquetas).
- Iconos SVG propios definidos en `src/partials/icons.html`.
- Todos los estilos viven en SASS: no hay CSS inline en el HTML salvo variables
  de animación (`--delay`) y espaciado de `flow` (`--flow-space`).
- Las imágenes bajo el pliegue usan `loading="lazy"` y `decoding="async"`.

## Despliegue en GitHub Pages

El proyecto incluye el workflow `.github/workflows/deploy.yml`, que compila el
sitio y lo publica automáticamente en GitHub Pages.

1. Sube el repositorio a GitHub con la rama principal `main`.
2. En el repositorio: **Settings → Pages → Build and deployment**.
3. Selecciona **Source: GitHub Actions**.
4. Cada push a `main` compilará el sitio y lo publicará en:
   `https://<usuario>.github.io/<repositorio>/`.

Vite usa `base: './'`, por lo que los assets funcionan tanto en GitHub Pages
como en un dominio propio o en Netlify/Vercel sin cambios adicionales.

