import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = dirname(fileURLToPath(import.meta.url))

// Folders that group pages. Each is scanned a level down, and the folder itself
// holds no index.html. Order here is the order the home page lists them in.
const GROUPS = ['demos/transitions', 'demos/css', 'docs', 'tools']

// A page is any folder holding an index.html one level inside a group folder.
// Its link text is the part of its <title> before the " — ". Read once at
// startup — restart the dev server after adding a new folder.
function pagesIn(group) {
  return readdirSync(resolve(root, group), { withFileTypes: true })
    .filter((e) => e.isDirectory() && !e.name.startsWith('.'))
    .map((e) => `${group}/${e.name}`)
    .filter((p) => existsSync(resolve(root, p, 'index.html')))
    .map((path) => {
      const html = readFileSync(resolve(root, path, 'index.html'), 'utf8')
      const title = html.match(/<title>(.*?)<\/title>/)?.[1] ?? path
      return { group, path, name: title.split(' — ')[0] }
    })
}

const pages = GROUPS.flatMap(pagesIn)

export default defineConfig({
  plugins: [react(), svgr()],
  define: {
    __PAGES__: JSON.stringify(pages),
  },
  resolve: {
    alias: {
      '@shared': resolve(root, 'shared'),
      '@sass': resolve(root, 'sass'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        index: resolve(root, 'index.html'),
        ...Object.fromEntries(
          pages.map(({ path }) => [
            path.replaceAll('/', '-'),
            resolve(root, path, 'index.html'),
          ]),
        ),
      },
    },
  },
})
