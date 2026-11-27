import { assetUrl } from '../utils/assetUrl'

export const site = {
  name: 'LGE Home Solutions',
  title: 'Serramenti, porte e outdoor a Monte di Procida — LGE',
  description:
    'Scopri infissi, oscuranti, porte e pergole di LGE. Visita su appuntamento lo showroom in via Roma 29 a Monte di Procida, nei Campi Flegrei.',
  logo: assetUrl('img/brand/lge-navbar-864.webp'),
  colorLogo: assetUrl('img/brand/lge-horizontal-color.webp'),
  whiteLogo: assetUrl('img/brand/lge-footer-white-official.png'),
  sections: [
    { id: 'prodotti', label: 'Soluzioni' },
    { id: 'competenze', label: 'Competenze' },
    { id: 'lavori', label: 'I nostri lavori' },
    { id: 'recensioni', label: 'Recensioni' },
    { id: 'contatti', label: 'Contatti' },
  ],
} as const
