import type { ProductFaqContent } from '../types/productFaq'

export const productFaqId = 'domande-frequenti'

export const windowFaq: ProductFaqContent = {
  title: 'Domande sugli infissi',
  questions: [
    {
      question: 'La camera dà sulla strada. Oltre al vetro, cosa conta per ridurre il rumore?',
      answer:
        'Controlla la tenuta delle guarnizioni e il raccordo tra il telaio e il muro. Anche il cassonetto della tapparella può lasciar passare rumore a finestra chiusa.',
    },
    {
      question: 'Ho il tavolo vicino alla portafinestra. Quale apertura mi lascia più spazio?',
      answer:
        'L’anta scorrevole si muove di lato e lascia libero lo spazio davanti al vetro. Se preferisci un’anta a battente, misura la distanza dal tavolo con le sedie scostate, come quando ti alzi.',
    },
    {
      question: 'Come pulisco i profili in PVC se abito vicino al mare?',
      answer:
        'Risciacqua i depositi di sale con acqua dolce e passa un panno morbido. Per scegliere il detergente e la frequenza di pulizia, segui le indicazioni del produttore per la tua finitura.',
      guide: {
        slug: 'manutenzione-infissi-pvc',
        label: 'Leggi la guida alla cura degli infissi in PVC',
      },
    },
  ],
}

export const shutterFaq: ProductFaqContent = {
  title: 'Domande sugli oscuranti',
  questions: [
    {
      question: 'Posso motorizzare le tapparelle che ho già?',
      answer:
        'Spesso sì. Il peso del telo, il diametro del rullo e l’alimentazione disponibile determinano quale motore si può montare e quali componenti si possono mantenere.',
    },
    {
      question: 'Come posso far entrare luce e aria con le persiane chiuse?',
      answer:
        'Scegli una persiana con lamelle orientabili. Anche ad ante chiuse puoi regolarne l’inclinazione per far circolare l’aria e schermare il sole nelle diverse ore del giorno.',
    },
    {
      question: 'Se cambio la tapparella devo sostituire anche il cassonetto?',
      answer:
        'Puoi conservare il cassonetto se è in buone condizioni e contiene il rullo con il nuovo telo completamente avvolto. Lo sportello deve restare accessibile per la manutenzione.',
    },
  ],
}

export const entranceDoorFaq: ProductFaqContent = {
  title: 'Domande sulle porte d’ingresso',
  questions: [
    {
      question: 'La porta d’ingresso è esposta alla pioggia. Cosa devo controllare?',
      answer:
        'Verifica che il rivestimento sia adatto all’esposizione diretta. Guarda anche la tenuta all’acqua dichiarata per il modello e come verrà realizzata la soglia, soprattutto se l’ingresso è senza portico.',
    },
    {
      question: 'Dove trovo la classe antieffrazione di una porta blindata?',
      answer:
        'Nella documentazione della porta, accanto alla sigla RC. Controlla che la classe si riferisca alla porta completa nella configurazione che hai scelto, compresi eventuali inserti in vetro.',
    },
    {
      question: 'Quanto spazio resta per passare con una porta a bilico?',
      answer:
        'L’anta ruota su un perno arretrato rispetto al bordo e, aprendosi, occupa una parte del vano. Per confrontarla con una porta a battente, chiedi la larghezza libera di passaggio a porta aperta.',
    },
  ],
}

export const interiorDoorFaq: ProductFaqContent = {
  title: 'Domande sulle porte interne',
  questions: [
    {
      question: 'Posso inserire una porta scorrevole a scomparsa nella parete che ho già?',
      answer:
        'Serve un tratto di parete abbastanza lungo e spesso per il controtelaio che accoglie l’anta. Prima di scegliere, verifica se in quel tratto passano tubi o cavi.',
    },
    {
      question: 'Come scelgo il verso di apertura di una porta a battente?',
      answer:
        'Segna sulla pianta l’arco che descrive l’anta quando si apre. Controlla se riesci a raggiungere l’interruttore entrando e se la porta interferisce con un armadio o con un’altra porta vicina.',
    },
    {
      question: 'Quale vetro porta luce in corridoio e lascia un po’ di privacy?',
      answer:
        'Il vetro satinato diffonde la luce e rende meno nitidi i dettagli della stanza. In controluce le sagome possono vedersi, soprattutto da vicino. Guarda un campione con una luce simile a quella di casa.',
    },
  ],
}

export const outdoorFaq: ProductFaqContent = {
  title: 'Domande su pergole e tende',
  questions: [
    {
      question: 'Sul terrazzo il sole arriva di lato nel pomeriggio. Quale tenda fa ombra?',
      answer:
        'Per il sole basso è utile una tenda a caduta, che scende in verticale sul lato esposto. Una foto all’ora in cui usi il terrazzo aiuta a scegliere dove posizionare il telo.',
    },
    {
      question: 'Per pranzare all’aperto mi conviene una tenda a bracci o una pergola?',
      answer:
        'Una tenda a bracci si apre sopra il tavolo e si raccoglie a parete, lasciando libero il pavimento. Una pergola crea una zona coperta stabile e, nei modelli bioclimatici, puoi orientare le lamelle per dosare luce e ventilazione.',
      guide: { slug: 'pergola-o-tenda-da-sole', label: 'Confronta pergola e tenda nella guida' },
    },
    {
      question: 'Quali misure servono per valutare una pergola sul mio terrazzo?',
      answer:
        'Per un primo confronto annota larghezza e profondità della zona da coprire. Se vuoi addossare la pergola alla casa, aggiungi l’altezza disponibile sulla parete e una foto che mostri porte, persiane e pluviali.',
    },
  ],
}
