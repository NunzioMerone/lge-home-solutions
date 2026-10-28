import { copyFile, mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath, URL } from 'node:url'
import process from 'node:process'
import { products } from '../src/data/products.ts'

const output = new URL('../dist/', import.meta.url)
const homepage = new URL('index.html', output)

// Static entry points let GitHub Pages serve direct visits to the existing routes.
for (const product of products) {
  const directory = new URL(`${product.path.slice(1)}/`, output)
  await mkdir(directory, { recursive: true })
  await copyFile(homepage, new URL('index.html', directory))
}

await writeFile(new URL('.nojekyll', output), '')
process.stdout.write(`GitHub Pages entry points prepared in ${fileURLToPath(output)}\n`)
