import process from 'node:process'
import { assertPrivacyReady } from './privacy-review.mjs'

try {
  assertPrivacyReady()
  process.stdout.write('Privacy Policy: dati compilati e revisione confermata.\n')
} catch (error) {
  process.stderr.write(`${error.message}\n`)
  process.exitCode = 1
}
