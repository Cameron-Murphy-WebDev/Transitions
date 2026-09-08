import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { existsSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = dirname(fileURLToPath(import.meta.url))

// Folders that never hold a page.
const IGNORE = new Set(['node_modules', 'shared', 'dist', 'sass'])

// Folders that group pages rather than being one. Each is scanned a level down,
// and the folder itself holds no index.html.
const GROUPS = ['demos', 'css']

// A page is any folder holding an index.html — at the root (colors/) or one
// level inside a group folder. Read once at startup — restart the dev server
// after adding a new folder.
function pagesIn(dir, prefix = '') {
  return readdirSync(resolve(root, dir), { withFileTypes: true })
    .filter((e) => e.isDirectory() && !e.name.startsWith('.') && !IGNORE.has(e.name))
    .map((e) => `${prefix}${e.name}`)
    .filter((p) => existsSync(resolve(root, p, 'index.html')))
}

const pages = [
  ...pagesIn('.'),
  ...GROUPS.flatMap((group) => pagesIn(group, `${group}/`)),
]

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@shared': resolve(root, 'shared'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        index: resolve(root, 'index.html'),
        ...Object.fromEntries(
          pages.map((p) => [
            p.replace('/', '-'),
            resolve(root, p, 'index.html'),
          ]),
        ),
      },
    },
  },
})
