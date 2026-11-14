export type GibusCatalogGroupId = 'pergole' | 'tende' | 'vetrate'

export interface GibusCatalogGroupDefinition {
  id: GibusCatalogGroupId
  title: string
  solutionIds: readonly string[]
}
