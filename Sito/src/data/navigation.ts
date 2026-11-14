import { competenciesPage } from '../config/competencies'
import { worksPage } from '../config/works'
import { blogPage } from '../config/blog'

export const navigation = {
  home: { label: 'Home', path: '/#inizio' },
  work: { label: 'I nostri lavori', path: worksPage.path },
  blog: { label: 'Blog', path: blogPage.path },
  competencies: { label: 'Competenze', path: competenciesPage.path },
  reviews: { label: 'Recensioni', path: '/#recensioni' },
  contact: { label: 'Contatti', path: '/#contatti' },
} as const
