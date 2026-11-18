import { defineConfig } from 'vite'
import { readdirSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'

const root = fileURLToPath(new URL('.', import.meta.url))

/**
 * Permite reutilizar fragmentos de HTML (header, footer, sprite de iconos)
 * con la sintaxis: <!-- @include archivo.html -->
 */
function htmlPartials() {
  return {
    name: 'html-partials',
    transformIndexHtml(html) {
      return html.replace(/<!--\s*@include\s+([\w./-]+)\s*-->/g, (_, file) =>
        readFileSync(resolve(root, 'src/partials', file), 'utf8')
      )
    },
  }
}

const pages = Object.fromEntries(
  readdirSync(root)
    .filter((file) => file.endsWith('.html'))
    .map((file) => [file.replace(/\.html$/, ''), resolve(root, file)])
)

export default defineConfig({
  // Rutas relativas: funciona en GitHub Pages (usuario.github.io/repo/)
  // y también en Netlify, Vercel o un dominio propio.
  base: './',
  plugins: [htmlPartials()],
  server: {
    open: true,
  },
  build: {
    rollupOptions: {
      input: pages,
    },
  },
})
