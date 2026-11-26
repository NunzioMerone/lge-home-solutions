import { ProjectClosing } from '../../components/sections/Gallery/ProjectClosing'
import { gallery } from '../../data/gallery'

const featuredWork = gallery.find((photo) => photo.id === 'lge-4460a88d')

export function WorksContact() {
  return (
    <ProjectClosing
      titleId="works-contact-title"
      photo={featuredWork}
      title={
        <>
          La prossima realizzazione <em>potrebbe essere la tua.</em>
        </>
      }
      description="Raccontaci il tuo progetto, le tue esigenze e cosa vorresti migliorare nella tua casa. Troviamo insieme la soluzione più adatta a te."
    />
  )
}
