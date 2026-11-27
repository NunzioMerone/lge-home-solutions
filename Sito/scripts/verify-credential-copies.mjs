import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFile, readdir } from 'node:fs/promises'
import { basename, join } from 'node:path'
import { fileURLToPath, URL } from 'node:url'

const references = fileURLToPath(new URL('../references/', import.meta.url))

async function verifyDirectory(directory, expected) {
  // Reject extra files too, including a private PDF placed next to a safe preview.
  const entries = await readdir(directory, { withFileTypes: true })
  assert.deepEqual(
    entries.map(({ name }) => name).sort(),
    Object.keys(expected).sort(),
    `Unexpected certificate inventory in ${directory}`,
  )
  for (const entry of entries) {
    assert.ok(entry.isFile(), `Invalid certificate file: ${entry.name}`)
    const bytes = await readFile(join(directory, entry.name))
    assert.equal(
      createHash('sha256').update(bytes).digest('hex'),
      expected[entry.name],
      `Unreviewed certificate copy: ${entry.name}`,
    )
  }
}

export async function verifyCredentialCopies(output) {
  const manifest = JSON.parse(
    await readFile(join(references, 'credential-supplied-derivatives.json'), 'utf8'),
  )
  const sources = {}
  const documents = { ...manifest.thermographyFiles }
  for (const image of manifest.images) {
    sources[basename(image.sourcePath)] = image.sourceSha256
    documents[basename(image.fullPath)] = image.fullSha256
    documents[basename(image.thumbnailPath)] = image.thumbnailSha256
  }
  await verifyDirectory(join(references, 'credentials-supplied'), sources)
  await verifyDirectory(join(output, 'documents/competencies'), documents)
}
