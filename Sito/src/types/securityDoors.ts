export type SecurityDoorSystemId =
  'tls-90' | 'multiframe' | 'pivot' | 'hinges-concealed' | 'hinges-visible'
export type SecurityDoorPhotoStatus = 'loading' | 'ready' | 'failed'

export interface SecurityDoorSystem {
  id: SecurityDoorSystemId
  name: string
  eyebrow: string
  headline: string
  description: string
  catalogDescription: string
  photoAlt: string
  configurator?: string
  catalog: string
}

export interface SecurityDoorMaterial {
  id: 'aluminium' | 'steel'
  label: string
  brand: 'TEHNi' | 'Effepi'
  photoDirectory: 'tehni' | 'effepi'
  catalogFormat: 'PDF' | 'Online'
  catalogIndex: string
  systems: readonly [SecurityDoorSystem, ...SecurityDoorSystem[]]
}

export interface SecurityDoorPhotoProps {
  system: SecurityDoorSystem
  material: SecurityDoorMaterial
}
