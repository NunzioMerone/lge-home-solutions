interface ProductQuestion {
  question: string
  answer: string
  guide?: { slug: string; label: string }
}

export interface ProductFaqContent {
  title: string
  questions: readonly [ProductQuestion, ProductQuestion, ProductQuestion]
}
