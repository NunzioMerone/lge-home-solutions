import type { WorkCaseStudy } from '../types/works'
import { featuredWorkPhotos } from './homeGallery'

// Editorial examples for the public preview. Each photo illustrates a hypothetical brief.
export const workCaseStudyDrafts: readonly WorkCaseStudy[] = [
  {
    id: 'luce-in-cucina',
    category: 'infissi',
    title: 'Affacciarsi dalla cucina',
    need: 'Aprire verso l’esterno senza intralciare il passaggio tra il tavolo e il piano di lavoro.',
    solution:
      'Una portafinestra con una superficie vetrata ampia e una maniglia raggiungibile anche con le sedie attorno al tavolo.',
    installation:
      'La manovra dell’anta andrebbe provata con gli arredi in posizione. La soglia richiederebbe un raccordo con i due pavimenti.',
    contribution:
      'In questo scenario LGE confronterebbe i sensi di apertura insieme al cliente e segnerebbe gli ingombri in pianta prima dell’ordine.',
    result: 'Chi cucina potrebbe raggiungere l’esterno lasciando il tavolo apparecchiato.',
    photos: [featuredWorkPhotos.kitchenWindow],
  },
  {
    id: 'schermare-zona-pranzo',
    category: 'oscuranti',
    title: 'Dosare la luce sul tavolo',
    need: 'Evitare che il sole arrivi direttamente sul tavolo da pranzo e conservare la vista verso l’esterno.',
    solution:
      'Una schermatura regolabile che permetta di scegliere quanta parte della vetrata lasciare libera durante il giorno.',
    installation:
      'Per il posizionamento si valuterebbero lo spazio dedicato alla raccolta e l’accesso al comando dalla zona pranzo.',
    contribution:
      'LGE potrebbe mostrare in showroom la manovra e confrontare l’effetto di diverse aperture con il cliente.',
    result:
      'L’ombra sul tavolo si potrebbe regolare senza rinunciare ogni volta all’intero affaccio.',
    photos: [featuredWorkPhotos.seaShading],
  },
  {
    id: 'soglia-di-ingresso',
    category: 'porte-e-sicurezza',
    title: 'Ridisegnare la soglia di casa',
    need: 'Dare all’ingresso un carattere riconoscibile mantenendo un passaggio comodo tra il pianerottolo e l’interno.',
    solution:
      'Un pannello dalle linee piane, con maniglia a contrasto e una finitura scelta accanto ai materiali del vano.',
    installation:
      'Gli spazi di apertura e la continuità delle finiture lungo la soglia sarebbero verificati in fase di rilievo.',
    contribution:
      'LGE potrebbe accompagnare la scelta della ferramenta e concordare come raccordare il nuovo telaio alle spallette.',
    result:
      'Il punto di presa sarebbe facile da individuare e l’ingresso manterrebbe il passaggio desiderato.',
    photos: [featuredWorkPhotos.greyEntrance],
  },
  {
    id: 'porta-sulla-scala',
    category: 'porte-interne',
    title: 'Una porta accanto alla scala',
    need: 'Chiudere un ambiente di servizio senza interrompere il disegno della parete lungo la scala.',
    solution: 'Una porta a filo parete rifinita nello stesso colore della muratura.',
    installation:
      'Il montaggio del telaio andrebbe coordinato con la finitura della parete, verificando la corsa dell’anta rispetto al primo gradino.',
    contribution:
      'In questo esempio LGE definirebbe il verso di apertura con il cliente e le quote del telaio con chi prepara la parete.',
    result: 'A porta chiusa, il disegno della scala resterebbe in primo piano.',
    photos: [featuredWorkPhotos.flushDoor],
  },
  {
    id: 'ombra-in-terrazza',
    category: 'atelier-gibus',
    title: 'Pranzare sotto la pergola',
    need: 'Trovare un posto riparato dal sole per il tavolo della terrazza, conservando spazio per muoversi attorno alle sedute.',
    solution: 'Una pergola a lame orientabili disposta attorno alla zona pranzo.',
    installation:
      'L’ingombro dei montanti sarebbe confrontato con l’apertura della portafinestra e il percorso tra interno ed esterno.',
    contribution:
      'LGE potrebbe tracciare a terra la posizione della struttura e provare con il cliente diverse disposizioni del tavolo.',
    result: 'La zona pranzo avrebbe un’ombra modulabile e un percorso di accesso libero.',
    photos: [featuredWorkPhotos.whitePergola],
  },
]
