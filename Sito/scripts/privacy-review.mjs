import { privacyContent, privacyPage, privacyReview } from '../src/config/privacy.ts'

export function assertPrivacyReady() {
  const pending = Object.values(privacyReview)
    .filter(({ value }) => !value?.trim())
    .map(({ label }) => label)
  if (/da completare/i.test(privacyContent.hostingNotice) || !privacyContent.hostingNotice.trim())
    pending.push("completare il testo pubblico sull'hosting")
  if (!privacyPage.approved) pending.push('confermare la revisione del titolare')
  if (pending.length) throw new Error(`Privacy Policy in bozza:\n- ${pending.join('\n- ')}`)
}
