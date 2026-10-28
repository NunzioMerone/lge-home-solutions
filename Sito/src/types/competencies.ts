import type { IconName } from './content'

export interface Credential {
  id: string
  title: string
  label: string
  icon: IconName
  description: string
  source: 'document' | 'company'
}
