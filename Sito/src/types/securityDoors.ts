export type SecurityDoorSystemId = 'tls-90' | 'multiframe' | 'pivot'
export type SecurityDoorPhotoStatus = 'loading' | 'ready' | 'failed'

export interface SecurityDoorSystem {
  id: SecurityDoorSystemId
  name: string
  eyebrow: string
  headline: string
  description: string
  catalogDescription: string
  photoAlt: string
  configurator: string
  catalog: string
}

export interface SecurityDoorPhotoProps {
  system: SecurityDoorSystem
}
