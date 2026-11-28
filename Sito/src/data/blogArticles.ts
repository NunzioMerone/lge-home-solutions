import type { BlogArticleContent } from '../types/blog'

// Original draft copy for local review; no publication dates or invented authors.
export const blogArticles: Readonly<Record<string, BlogArticleContent>> = {
  'spifferi-dalle-finestre': {
    introduction:
      'Sul divano vicino alla finestra senti aria fredda alle caviglie. In un’altra stanza avverti un soffio proprio accanto alla maniglia, soprattutto quando tira vento. La sensazione è simile, ma per capire come intervenire conta il punto da cui parte.',
    sections: [
      {
        id: 'individuare-il-punto',
        title: 'Dove senti muovere l’aria?',
        paragraphs: [
          'Con la finestra ben chiusa, avvicina il dorso della mano al bordo dell’anta. Segui il perimetro, poi passa lungo il punto in cui il telaio incontra la parete. Se hai una tapparella, controlla anche vicino allo sportello del cassonetto. Annota dove senti il soffio e se aumenta nelle giornate ventose.',
          'Se il freddo si sente soprattutto in basso davanti a una grande vetrata, può trattarsi dell’aria della stanza che si raffredda a contatto con il vetro e scende verso il pavimento. La posizione della corrente è un indizio utile da riferire al serramentista.',
        ],
      },
      {
        id: 'anta-e-guarnizioni',
        title: 'Se il soffio viene dal bordo dell’anta',
        paragraphs: [
          'Apri la finestra e guarda la striscia di gomma lungo il bordo. Una guarnizione ripiegata, un tratto lacerato o sporco rimasto nella battuta possono lasciare un varco. Richiudi normalmente e nota se l’anta sfrega o la maniglia oppone resistenza.',
          'Per un po’ di sporco basta seguire le istruzioni di pulizia del produttore. Se la guarnizione è danneggiata o l’anta chiude male, il serramentista può verificare il ricambio adatto o regolare la chiusura.',
        ],
      },
      {
        id: 'telaio-e-cassonetto',
        title: 'Se l’aria arriva dal muro o dal cassonetto',
        paragraphs: [
          'A volte il soffio si sente sul davanzale, accanto alla cornice fissa, oppure sopra la finestra. Sono punti distinti dal bordo dell’anta. Il tecnico può verificare il collegamento tra telaio e muro oppure la tenuta dello sportello della tapparella.',
          'Per chiedere una verifica, fotografa la finestra per intero e indica il punto preciso in cui senti l’aria. Specifica se succede con un particolare vento e se, chiudendo la finestra, noti attrito o rumori insoliti.',
        ],
      },
    ],
    takeaway:
      'Un soffio vicino all’anta indirizza il controllo verso guarnizioni e chiusura. Se arriva sopra la finestra o lungo il muro, il controllo va esteso al cassonetto e alla posa.',
    solution: { label: 'Esplora le soluzioni per gli infissi', path: '/prodotti/infissi' },
    sources: [
      {
        label: 'Finstral · Uso, manutenzione e problemi di chiusura delle finestre',
        url: 'https://www.finstral.com/files/content/1167113_53067_2_0/istruzioni-d-uso-e-avvertenze-per-la-sicurezza.finestre.pdf',
      },
      {
        label: 'PosaClima · Tenuta dei giunti tra telaio, cassonetto e parete',
        url: 'https://posaclima.it/products/barriera-vapore-renova/',
      },
      {
        label: 'U.S. Department of Energy · Comfort vicino alle vetrate (guida in inglese)',
        url: 'https://www1.eere.energy.gov/buildings/publications/pdfs/building_america/measure_guide_windows.pdf',
      },
    ],
  },
  'come-scegliere-porta-blindata': {
    introduction:
      'Su un preventivo leggi «classe 3», su un altro «classe 4». Entrambe le porte possono avere lo stesso aspetto. La differenza emerge nelle prove di resistenza e conta in modo diverso per un ingresso sul pianerottolo o per uno che dà direttamente sulla strada.',
    sections: [
      {
        id: 'leggere-la-classe',
        title: 'Che cosa indica la sigla RC?',
        paragraphs: [
          'RC sta per Resistance Class, cioè classe di resistenza all’effrazione. La norma UNI EN 1627 classifica la porta completa. Anta, telaio, serratura ed eventuali inserti in vetro fanno parte della configurazione a cui si riferisce il risultato.',
          'I livelli sono numerati da 1 a 6. Salendo di classe aumentano le sollecitazioni previste dalle prove. Puoi così confrontare una RC2 con una RC3, o valutare una RC5 se il tuo progetto richiede una resistenza superiore alla RC4. Chiedi sempre il documento della porta nella versione proposta.',
        ],
      },
      {
        id: 'differenza-rc3-rc4',
        title: 'Che cosa cambia tra classe 3 e classe 4?',
        paragraphs: [
          'Nella prova manuale il tempo di lavoro effettivo è di cinque minuti per la RC3 e di dieci per la RC4. Per la RC4 cambiano anche gli strumenti previsti dalla prova. Questi valori servono a confrontare le porte secondo criteri di laboratorio ripetibili. In un’abitazione le condizioni possono essere molto diverse.',
          'Per scegliere, considera come si raggiunge il tuo ingresso. In un condominio con portone comune puoi partire dal confronto con una RC3. Se la porta è direttamente accessibile dalla strada e cerchi più resistenza, chiedi anche una proposta in RC4. Contano l’accesso concreto e il livello di protezione che desideri.',
        ],
      },
      {
        id: 'verificare-il-preventivo',
        title: 'Cosa chiedere prima dell’ordine',
        paragraphs: [
          'Metti a confronto due porte con le misure e gli accessori che userai davvero. Se ti piace un inserto in vetro o vuoi una seconda anta, fai indicare per iscritto la classe prevista per quella versione.',
        ],
        checklist: [
          'Quale documento riporta la classe RC del modello proposto?',
          'La configurazione comprende il vetro, la serratura e il numero di ante che ho scelto?',
          'Il mio vano è adatto e come verrà fissato il telaio al muro secondo le istruzioni del produttore?',
        ],
      },
    ],
    takeaway:
      'Confronta le classi sul modello che monterai a casa, poi verifica insieme al posatore che il vano sia adatto a quella porta.',
    solution: {
      label: 'Confronta le porte d’ingresso e le blindate',
      path: '/prodotti/porte-e-sicurezza',
    },
    sources: [
      {
        label: 'UNI · Norma EN 1627 sulla resistenza all’effrazione',
        url: 'https://unistore.uni.com/uni-en-1627-2021',
      },
      {
        label: 'Metalport · Come cambiano le prove tra classe 3 e classe 4',
        url: 'https://www.metalportblindate.it/post/classe-3-e-classe-4-differenze-nelle-porte-blindate',
      },
      {
        label: 'Effepi · Classi di sicurezza delle porte blindate',
        url: 'https://www.effepisecuritydoors.com/sicurezza',
      },
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
    solution: { label: 'Scopri le soluzioni outdoor', path: '/atelier-gibus' },
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
  'condensa-sui-vetri': {
    introduction:
      'La mattina trovi la finestra appannata. Passi un panno sul lato della stanza e il vetro torna limpido. Altre volte l’alone resta dov’è. Capire su quale superficie si raccoglie l’acqua aiuta a decidere se arieggiare, aspettare che il vetro si scaldi o chiamare un tecnico.',
    sections: [
      {
        id: 'come-si-forma',
        title: 'Le gocce sono sul lato della stanza',
        paragraphs: [
          'Se il panno asciuga le gocce dall’interno, il vapore presente in casa si è condensato sul vetro freddo. Può capitare in cucina dopo aver scolato la pasta, in bagno dopo una doccia o in camera da letto al risveglio.',
          'Asciuga l’acqua anche sul davanzale e apri bene la finestra per qualche minuto per far uscire l’aria umida. Se le gocce tornano spesso o si bagnano anche le pareti attorno alla finestra, annota quando succede. Una verifica può riguardare sia il ricambio d’aria sia la temperatura di quelle superfici.',
        ],
      },
      {
        id: 'osservare',
        title: 'Il vetro si appanna all’esterno al mattino',
        paragraphs: [
          'Dopo una notte serena e umida, la lastra esterna può essere abbastanza fredda da raccogliere la rugiada, come il parabrezza di un’auto. Può accadere anche con una finestra ben isolata, perché dall’interno arriva poco calore a scaldare la lastra esterna.',
          'Osserva il vetro più tardi. Se le gocce scompaiono quando la superficie si scalda, il comportamento è tipico della condensa esterna occasionale.',
        ],
      },
      {
        id: 'valutare-il-caso',
        title: 'L’alone resta tra le due lastre',
        paragraphs: [
          'Se entrambe le superfici accessibili sono asciutte e vedi ancora goccioline dentro un doppio vetro sigillato, l’umidità potrebbe essere entrata nello spazio tra le lastre. Arieggiare la stanza agisce solo sull’aria di casa.',
          'Fotografa l’alone quando si vede bene e chiedi di controllare la tenuta del vetrocamera, cioè l’insieme delle lastre sigillate. Se occorre sostituirlo, il serramentista può verificare se il telaio esistente si può conservare.',
        ],
      },
    ],
    takeaway:
      'Gocce sul lato interno dopo una doccia? Arieggia. Rugiada all’esterno al mattino? Osserva se si asciuga. Umidità intrappolata nel doppio vetro? Fai controllare il vetrocamera.',
    solution: { label: 'Scopri gli infissi e le opzioni di vetro', path: '/prodotti/infissi' },
    sources: [
      {
        label: 'VELUX · Condensa in casa e ricambio d’aria',
        url: 'https://www.velux.it/assistenza/wiki/condensa-finestra-velux-cause-soluzioni',
      },
      {
        label: 'Nuova Termovetro · Condensa sulle superfici e tra le lastre',
        url: 'https://www.termovetro.it/pdf/Manuale_Termovetro.pdf#page=16',
      },
      {
        label: 'Pilkington · Domande sulla condensa nelle vetrate isolanti (in inglese)',
        url: 'https://www.pilkington.com/en/gbl/architectural-and-technical-glass/glass-applications/window/window-faqs',
      },
    ],
  },
  'come-scegliere-avvolgibili-di-sicurezza': {
    introduction:
      'Davanti a una portafinestra sul giardino, la stessa tapparella svolge due compiti. Al mattino vuoi far passare luce e aria. Quando esci vuoi sapere quanta protezione offre da chiusa. Per scegliere, verifica in quale posizione il modello ha ottenuto la sua classe di resistenza.',
    sections: [
      {
        id: 'motore-e-sicurezza',
        title: 'Una tapparella elettrica è anche di sicurezza?',
        paragraphs: [
          'Il motore serve ad alzare e abbassare il telo con un comando. Anche una normale tapparella può essere elettrica. Per sapere quanto resiste a un tentativo di effrazione, cerca nella documentazione una classe indicata dalla sigla RC seguita da un numero.',
          'La norma UNI EN 1627 stabilisce come classificare la resistenza all’effrazione anche per gli oscuranti. Il risultato riguarda il prodotto nelle condizioni di prova indicate. Chiedi che sul preventivo compaiano il nome esatto della versione e la classe documentata per la configurazione proposta.',
        ],
      },
      {
        id: 'luce-e-protezione',
        title: 'Quanta luce entra a tapparella abbassata?',
        paragraphs: [
          'In un avvolgibile frangisole, la distanza fra le stecche cambia quanta luce e aria passano. In camera da letto può interessarti soprattutto il buio della sera. In cucina potresti preferire una schermatura che al mattino lasci filtrare la luce.',
          'Un esempio è Ibrida 2.0 EvoLine di Sikur Home. La gamma prevede diverse distanze fra le stecche e il produttore pubblica documenti distinti per le versioni RC3 e RC4. Quando guardi un campione, chiedi di vedere sia la posizione che useresti per arieggiare sia quella prevista per ottenere la protezione dichiarata.',
        ],
      },
      {
        id: 'cassonetto-esistente',
        title: 'Posso tenere il cassonetto che ho già?',
        paragraphs: [
          'In alcuni casi sì. Sopra la finestra deve esserci spazio per il nuovo telo completamente avvolto. Il posatore controlla anche le guide laterali, il rullo e il peso che può sostenere il motore. Due tapparelle della stessa larghezza possono avere ingombri e pesi diversi.',
          'Per un primo confronto, scatta una foto che mostri la finestra, il cassonetto e le guide. Chiedi quali pezzi si possono conservare e quali andranno sostituiti per rispettare la configurazione certificata.',
        ],
      },
    ],
    takeaway:
      'Prima dell’ordine, fatti mostrare il documento della versione scelta e la posizione in cui vale la classe RC. Prova anche la posizione che useresti ogni giorno per fare ombra o far passare aria.',
    solution: { label: 'Scopri gli avvolgibili e le persiane', path: '/prodotti/oscuranti' },
    sources: [
      {
        label: 'UNI · Classificazione della resistenza all’effrazione, UNI EN 1627',
        url: 'https://store.uni.com/uni-en-1627-2021',
      },
      {
        label: 'Sikur Home · Avvolgibile frangisole Ibrida 2.0 EvoLine',
        url: 'https://www.sikurhome.it/prodotti/tapparella-frangisole-avvolgibile-di-sicurezza/',
      },
      {
        label: 'Sikur Home · Certificazioni delle versioni EvoLine',
        url: 'https://www.sikurhome.it/certificazioni/',
      },
    ],
  },
  'porta-ingresso-isolamento-termico': {
    introduction:
      'D’inverno senti freddo davanti alla porta di casa? Se l’anta è fredda al tatto, può interessarti quanto isola la porta nel suo insieme. Se senti aria alle caviglie nelle giornate di vento, vale la pena far controllare anche la soglia. Sono due domande diverse da fare davanti a un preventivo.',
    sections: [
      {
        id: 'trasmittanza-della-porta',
        title: 'Il valore Ud della porta completa',
        paragraphs: [
          'Ud indica la trasmittanza termica della porta. In inverno descrive quanto facilmente il calore passa dall’interno riscaldato verso l’esterno attraverso la porta chiusa. Si esprime in W/(m²·K). A parità di dimensioni e temperature, una porta con Ud più basso disperde meno calore.',
          'Se trovi due valori, controlla a cosa si riferiscono. Il pannello isolante è una parte dell’anta. Per confrontare i preventivi, chiedi l’Ud della porta completa, con il suo telaio, le dimensioni che ti servono e gli eventuali inserti in vetro.',
        ],
      },
      {
        id: 'taglio-termico-e-spifferi',
        title: 'Profili a taglio termico e spifferi',
        paragraphs: [
          'In un portoncino in alluminio a taglio termico, un elemento isolante separa la parte interna del profilo metallico da quella esterna e riduce il passaggio del calore. Il dato che ti aiuta a confrontare il risultato resta l’Ud.',
          'Se invece senti un filo d’aria quando tira vento, segnala il punto preciso. La corrente può passare sotto la soglia, tra anta e telaio o nel raccordo con il muro. Chiedi la prestazione di permeabilità all’aria della porta e come verranno sigillati i giunti durante la posa.',
        ],
      },
      {
        id: 'esposizione-ingresso',
        title: 'Se l’ingresso è esposto alla pioggia',
        paragraphs: [
          'Un portoncino sotto un portico e uno affacciato sul giardino senza riparo ricevono pioggia e vento in modo diverso. Per il secondo, controlla la tenuta all’acqua dichiarata e chiedi come verrà raccordata la soglia al pavimento esterno.',
          'Se vuoi anche una porta blindata, chiedi sullo stesso preventivo il valore Ud e la classe antieffrazione RC della versione scelta. Puoi così confrontare, una per una, le prestazioni che ti servono.',
        ],
      },
    ],
    takeaway:
      'Porta al primo incontro una foto dell’ingresso da fuori e indica dove senti freddo. Chi ti segue potrà valutare insieme isolamento della porta, tenuta e posa della soglia.',
    solution: {
      label: 'Esplora i portoncini e le porte d’ingresso',
      path: '/prodotti/porte-e-sicurezza',
    },
    sources: [
      {
        label: 'Effepi · Trasmittanza e prestazioni di aria, acqua e vento',
        url: 'https://www.effepisecuritydoors.com/qualita_prodotto',
      },
      {
        label: 'TEHNi · Dati tecnici del sistema per portoncini TLS 90',
        url: 'https://tehni.eu/it/product-showcase/tls-90/',
      },
    ],
  },
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
