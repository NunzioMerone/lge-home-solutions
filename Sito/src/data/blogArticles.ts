import type { BlogArticleContent } from '../types/blog'

// Original draft copy for local review; no publication dates or invented authors.
export const blogArticles: Readonly<Record<string, BlogArticleContent>> = {
  'come-scegliere-infissi': {
    introduction:
      'Scegliere una finestra significa pensare a come vuoi stare in casa. Il panorama che vuoi lasciare entrare, il tavolo vicino al vetro, la luce del pomeriggio: sono questi dettagli a dare una direzione al progetto, prima ancora di sfogliare un catalogo.',
    sections: [
      {
        id: 'partire-dagli-ambienti',
        title: 'Prima di tutto, osserva le tue stanze.',
        paragraphs: [
          'Una camera da letto, una cucina e un soggiorno affacciato sul terrazzo hanno abitudini diverse. Annota cosa vorresti migliorare in ciascun ambiente e cosa, invece, funziona già bene.',
          'Può essere utile pensare a una giornata normale: quando apri la finestra, dove arriva il sole e quali mobili si trovano vicino all’anta. Queste informazioni rendono più concreto il confronto tra le soluzioni.',
        ],
      },
      {
        id: 'scegliere-apertura',
        title: 'L’apertura fa parte dell’arredo.',
        paragraphs: [
          'Un’anta a battente ruota dentro la stanza; uno scorrevole si sposta lateralmente. Il movimento cambia lo spazio da lasciare libero e il modo di raggiungere balconi e giardini.',
          'Le grandi vetrate dai profili sottili, come quelle della linea Alwo Luce Metal Slim, valorizzano la vista verso l’esterno. La possibilità di inserirle dipende però dall’apertura e dal progetto della casa.',
        ],
      },
      {
        id: 'materiali-e-contesto',
        title: 'Materiale e finitura, nel loro contesto.',
        paragraphs: [
          'PVC, alluminio e legno alluminio sono punti di partenza per confrontare modelli concreti. Guarda un campione accanto al pavimento, alle pareti e alle porte: una finitura cambia molto con la luce della stanza.',
          'Per le prestazioni, chiedi i dati della configurazione proposta e come verrà realizzata la posa. Il solo nome del materiale non racconta l’intero serramento.',
        ],
      },
      {
        id: 'domande-utili',
        title: 'Tre cose da portare al primo incontro.',
        paragraphs: [
          'Non serve avere già deciso tutto. Comincia da ciò che conosci meglio: la tua casa.',
        ],
        checklist: [
          'Gli ambienti in cui vorresti intervenire e le difficoltà che noti.',
          'Il modo in cui usi le aperture e lo spazio vicino alle finestre.',
          'I colori e le finiture che vuoi conservare o cambiare.',
        ],
      },
    ],
    takeaway: 'La scelta giusta comincia da come abiti, prima che da un catalogo.',
    solution: { label: 'Esplora le nostre soluzioni per gli infissi', path: '/prodotti/infissi' },
    sources: [
      { label: 'COSMET · Alwo Luce Metal Slim', url: 'https://cosmetgroup.it/luce-metal-slim/' },
    ],
  },
  'pergola-o-tenda-da-sole': {
    introduction:
      'A volte basta un po’ d’ombra per riscoprire un terrazzo. Altre volte desideri un vero spazio da arredare e abitare. Prima di scegliere una struttura, immagina un momento che vorresti vivere fuori: una colazione lenta, una cena con gli amici o una pausa nel pomeriggio.',
    sections: [
      {
        id: 'uso-dello-spazio',
        title: 'Parti da quello che vorresti fare.',
        paragraphs: [
          'Dove metteresti il tavolo? Quale zona vuoi lasciare libera? In quali ore senti più bisogno di ombra? Sono domande semplici che aiutano a dare una funzione precisa allo spazio.',
          'Osserva anche il percorso del sole. Una copertura sopra la testa e una schermatura laterale rispondono a esigenze diverse: il progetto deve considerare l’esposizione reale.',
        ],
      },
      {
        id: 'tenda-da-sole',
        title: 'La tenda: ombra quando serve.',
        paragraphs: [
          'Una tenda a bracci estende il telo senza sostegni a terra e si raccoglie quando vuoi riaprire la vista verso il cielo. È una possibilità da valutare quando desideri ombreggiare una zona mantenendo libero il pavimento.',
          'Il punto di fissaggio, l’esposizione e le condizioni d’uso vanno verificati per il modello scelto. Una tenda da sole non va considerata automaticamente una copertura adatta a ogni condizione atmosferica.',
        ],
      },
      {
        id: 'pergola',
        title: 'La pergola: uno spazio da progettare.',
        paragraphs: [
          'Una pergola definisce una zona dell’outdoor con una struttura dedicata. Nei modelli bioclimatici, le lame orientabili permettono di modulare luce e passaggio dell’aria; in altre soluzioni, la copertura è in tessuto retrattile.',
          'Oltre all’aspetto, considera gli ingombri, il rapporto con la facciata e gli arredi. Fattibilità e modalità di installazione si valutano sul posto, in base alla soluzione e al contesto.',
        ],
      },
    ],
    takeaway: 'Non esiste un outdoor uguale per tutti. Esiste il tuo modo di viverlo.',
    solution: { label: 'Entra nel mondo Atelier Gibus', path: '/atelier-gibus' },
    sources: [
      {
        label: 'Gibus · Pergole e tende da sole',
        url: 'https://www.gibus.com/it/pergole-e-tende-da-sole/',
      },
      {
        label: 'Gibus · Tende a bracci',
        url: 'https://www.gibus.com/it/prodotti/tende-da-sole/tende-a-bracci/',
      },
    ],
  },
  'porte-interne-spazi-e-finiture': {
    introduction:
      'Le porte accompagnano il passaggio da una stanza all’altra. Possono diventare una presenza discreta o un elemento che dà carattere agli interni. Per sceglierle, vale la pena guardare oltre il singolo modello e immaginare la casa nel suo insieme.',
    sections: [
      {
        id: 'apertura-e-passaggi',
        title: 'Prima la comodità del passaggio.',
        paragraphs: [
          'Pensa al movimento che fai entrando in ogni stanza e alla posizione dei mobili. Una porta a battente ha bisogno dello spazio di rotazione; una scorrevole richiede di valutare la parete lungo cui passa o la possibilità di un controtelaio interno.',
          'Segnare sulla pianta il verso di apertura aiuta a vedere le interferenze prima di scegliere maniglie e colori. Anche interruttori, armadi e porte vicine fanno parte del progetto.',
        ],
      },
      {
        id: 'finiture',
        title: 'Metti le finiture una accanto all’altra.',
        paragraphs: [
          'Un bianco può essere caldo o freddo; un effetto legno può dialogare con il pavimento oppure creare un contrasto. Confrontare i campioni nello stesso momento rende più facile capire l’effetto finale.',
          'Le collezioni I-PEA comprendono laccati, laminati e vetro. Parti dall’atmosfera che cerchi, poi approfondisci le caratteristiche del modello e la finitura disponibile.',
        ],
      },
      {
        id: 'luce-e-privacy',
        title: 'La luce può collegare due ambienti.',
        paragraphs: [
          'Una porta vetrata può accompagnare la luce tra stanze vicine. Trasparenza e privacy vanno però pensate insieme, in base alla funzione degli ambienti e alla tipologia di vetro.',
          'Per un risultato più discreto, considera anche l’allineamento con la parete e il disegno dei coprifili. Il filo parete è una scelta da coordinare con le opere e le finiture previste, non soltanto con il colore dell’anta.',
        ],
      },
    ],
    takeaway:
      'Una porta funziona bene quando appartiene alla stanza, nei gesti e nelle proporzioni.',
    solution: { label: 'Scopri porte, finiture e aperture', path: '/prodotti/porte-interne' },
    sources: [
      {
        label: 'I-PEA Porte Design · Cataloghi',
        url: 'https://www.ipeaportedesign.com/scaricailcatalogo',
      },
    ],
  },
  'condensa-sui-vetri': {
    introduction:
      'Le goccioline sulla finestra attirano subito l’attenzione, ma da sole non raccontano tutta la situazione. Il primo passo è osservare: su quale lato del vetro compaiono, in quale stanza e in quale momento della giornata?',
    sections: [
      {
        id: 'come-si-forma',
        title: 'Umidità e superfici fredde si incontrano.',
        paragraphs: [
          'La condensa può formarsi quando l’aria umida incontra una superficie abbastanza fredda. Cucinare, fare la doccia e stendere il bucato negli ambienti interni contribuiscono alla presenza di vapore nell’aria.',
          'Le gocce sul lato interno non dimostrano, da sole, un difetto della finestra. Temperatura, umidità e ventilazione dell’ambiente vanno considerate insieme.',
        ],
      },
      {
        id: 'osservare',
        title: 'Riconosci quando e dove compare.',
        paragraphs: [
          'Nota se il fenomeno segue una doccia, la preparazione dei pasti o una notte con la stanza chiusa. Un ricambio d’aria regolare aiuta a smaltire l’umidità prodotta in casa.',
          'Se compare spesso, raccogli qualche informazione prima di chiedere una valutazione: è più utile descrivere il comportamento nel tempo che affidarsi a una sola fotografia.',
        ],
        checklist: [
          'La stanza e il momento in cui noti le gocce.',
          'Il lato interno, esterno o lo spazio tra i vetri.',
          'L’eventuale presenza di macchie o acqua anche intorno al telaio.',
        ],
      },
      {
        id: 'valutare-il-caso',
        title: 'Ogni situazione merita uno sguardo completo.',
        paragraphs: [
          'Acqua persistente, tracce intorno al serramento o appannamento tra le lastre richiedono una verifica specifica. Non tutte le situazioni si risolvono con lo stesso intervento.',
          'Prima di pensare alla sostituzione degli infissi, fai valutare il serramento insieme all’ambiente e alle modalità con cui si manifesta il problema.',
        ],
      },
    ],
    takeaway: 'Osservare bene è il primo passo per scegliere un intervento sensato.',
    solution: { label: 'Approfondisci il comfort degli infissi', path: '/prodotti/infissi' },
    sources: [
      {
        label: 'VELUX · Condensa: cause e soluzioni',
        url: 'https://www.velux.it/assistenza/wiki/condensa-finestra-velux-cause-soluzioni',
      },
    ],
  },
  'scegliere-zanzariere': {
    introduction:
      'La zanzariera è un piccolo elemento che usi ogni giorno. Sceglierla significa pensare a come apri una finestra, esci sul balcone o attraversi una portafinestra con le mani occupate. La praticità nasce proprio da questi gesti.',
    sections: [
      {
        id: 'tipo-di-apertura',
        title: 'Finestra o passaggio verso l’esterno?',
        paragraphs: [
          'I sistemi verticali e quelli laterali hanno movimenti differenti. Nei primi la rete si svolge dall’alto; nei secondi la barra si sposta orizzontalmente. Esistono anche soluzioni a telaio.',
          'La frequenza di passaggio e la comodità di utilizzo aiutano a orientare la scelta. Per una portafinestra molto usata, prova a immaginare il gesto di apertura e chiusura più volte durante la giornata.',
        ],
      },
      {
        id: 'ingombri',
        title: 'Lo spazio disponibile conta.',
        paragraphs: [
          'Tra infisso, tapparella o persiana può esserci poco margine. Le dimensioni del vano e lo spazio per guide e cassonetto vanno rilevati prima di scegliere il modello.',
          'La presenza di una guida sul pavimento è un altro aspetto da valutare insieme alle esigenze di chi attraversa il passaggio. Soluzioni e ingombri cambiano da prodotto a prodotto.',
        ],
      },
      {
        id: 'uso-quotidiano',
        title: 'Scegli anche pensando alla cura.',
        paragraphs: [
          'La rete raccoglie polvere e va trattata con delicatezza. Segui le istruzioni del modello per la pulizia e per l’eventuale manutenzione delle guide, senza applicare prodotti generici ai meccanismi.',
          'Al primo confronto racconta come vivi la stanza e chi utilizzerà il passaggio. Misure, apertura e abitudini sono un buon punto di partenza per valutare le alternative.',
        ],
      },
    ],
    takeaway: 'La soluzione più comoda è quella che si integra nei movimenti di ogni giorno.',
    solution: { label: 'Parliamone in showroom', path: '/#contatti' },
    sources: [
      {
        label: 'Bettio · Tipologie, uso e manutenzione',
        url: 'https://www.bettio.it/consigli/faq-consumer/',
      },
      {
        label: 'Bettio · Guida alla scelta',
        url: 'https://www.bettio.it/prodotti/strumenti-di-marketing/brochure-bettio/',
      },
    ],
  },
  'manutenzione-infissi-pvc': {
    introduction:
      'Prendersi cura delle finestre non significa intervenire sui meccanismi. La manutenzione quotidiana comincia da una pulizia adatta al materiale e dall’attenzione a piccoli cambiamenti nel funzionamento. Il manuale del tuo serramento rimane il riferimento.',
    sections: [
      {
        id: 'pulizia',
        title: 'Comincia con una pulizia delicata.',
        paragraphs: [
          'Per la pulizia ordinaria dei profili in PVC, VEKA indica acqua tiepida, un panno morbido e detergente neutro. Prodotti aggressivi e materiali abrasivi possono danneggiare le superfici.',
          'Prima di usare un prodotto nuovo, verifica che sia indicato per la finitura del tuo infisso. Non tutte le superfici e i rivestimenti richiedono lo stesso trattamento.',
        ],
      },
      {
        id: 'guarnizioni-e-scarichi',
        title: 'Guarnizioni e scarichi meritano attenzione.',
        paragraphs: [
          'Osserva lo stato delle guarnizioni e puliscile con delicatezza. Se sono fuori sede o danneggiate, chiedi una verifica senza tirarle o modificarle.',
          'Controlla anche che le aperture di drenaggio accessibili non siano ostruite da residui. Non sigillarle: servono al deflusso dell’acqua previsto dal serramento.',
        ],
      },
      {
        id: 'quando-chiedere-aiuto',
        title: 'Se il movimento cambia, non forzarlo.',
        paragraphs: [
          'Una maniglia più dura o un’anta che sfrega sono segnali da far controllare. Regolazioni e interventi sulla ferramenta vanno affidati a personale competente.',
          'Anche la lubrificazione deve seguire il manuale del produttore: punto di applicazione e prodotto compatibile contano. Una buona abitudine è conservare le istruzioni insieme ai documenti di acquisto.',
        ],
      },
    ],
    takeaway: 'Pulire con delicatezza, osservare e intervenire nel modo giusto.',
    solution: {
      label: 'Conosci meglio le nostre soluzioni per gli infissi',
      path: '/prodotti/infissi',
    },
    sources: [
      {
        label: 'VEKA · Cura e manutenzione dei serramenti in PVC',
        url: 'https://www.veka.it/gruppi-target/cliente-privato/prodotti/mantenere-i-serramenti/',
      },
    ],
  },
}
