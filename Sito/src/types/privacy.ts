export interface PrivacyDetails {
  controller: string
  address: string
  contact: string
  providers: string | null
  transfers: string | null
  technicalRetention: string | null
  contactRetention: string | null
  publishedContent: string | null
  legitimateInterests: string | null
}

export interface PageMetadata {
  title: string
  description: string
  robots?: string
}
