import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { windowMaterials } from '../../data/infissi'
import { interiorDoorOpenings } from '../../data/interiorDoors'
import { shutterGroups } from '../../data/shutters'
import { InteriorDoorOpenings } from '../../pages/InteriorDoors/InteriorDoorOpenings'
import { WindowCollection } from '../../pages/ProductDetail/WindowCollection'
import { ShutterShowcase } from '../../pages/Shutters/ShutterShowcase'
import { MotionProvider } from './MotionProvider'

describe('product choices in the static page', () => {
  it.each([
    {
      name: 'windows',
      element: <WindowCollection />,
      descriptions: windowMaterials.flatMap(({ models }) =>
        Object.values(models).map((model) => model.description),
      ),
    },
    {
      name: 'shutters',
      element: <ShutterShowcase />,
      descriptions: shutterGroups.flatMap(({ overview, options }) => [
        ...(overview ? [overview.detail] : []),
        ...options.map((option) => option.detail),
      ]),
    },
    {
      name: 'interior doors',
      element: <InteriorDoorOpenings />,
      descriptions: interiorDoorOpenings.map((option) => option.detail),
    },
  ])(
    'ships readable information for every option in $name and only the initial photo',
    ({ element, descriptions }) => {
      const html = renderToStaticMarkup(<MotionProvider>{element}</MotionProvider>)
      expect(html.match(/<summary>/g)).toHaveLength(descriptions.length)
      for (const description of descriptions) expect(html).toContain(description)
      expect(html.match(/<img\b/g)).toHaveLength(1)
    },
  )
})
