import type { ProductFaqContent } from '../types/productFaq'

export const productFaqId = 'domande-frequenti'

export const windowFaq: ProductFaqContent = {
  title: 'Domande sugli infissi',
  questions: [
    {
      question: 'Meglio il PVC, l’alluminio o il legno-alluminio per le mie finestre?',
      answer:
        'Il PVC richiede poca manutenzione. L’alluminio permette di realizzare vetrate ampie con telai sottili. Se ami il legno a vista, con il legno-alluminio hai il legno dentro casa e l’alluminio sul lato esposto alle intemperie.',
      guide: { slug: 'come-scegliere-infissi', label: 'Leggi la guida alla scelta degli infissi' },
    },
    {
      question: 'Per cambiare le finestre bisogna rompere i muri?',
      answer:
        'Non sempre. Se il vecchio telaio è saldo e in buono stato, il posatore può valutare se montare la nuova finestra su quello esistente e quanto spazio resterebbe per il vetro.',
    },
    {
      question: 'Da cosa dipende il prezzo dei nuovi infissi?',
      answer:
        'Contano le dimensioni, il materiale, il vetro, il tipo di apertura e il lavoro di posa. Per una prima stima, prepara il numero di finestre da cambiare, le misure indicative e qualche foto.',
    },
  ],
}

export const shutterFaq: ProductFaqContent = {
  title: 'Domande sugli oscuranti',
  questions: [
    {
      question: 'Che differenza c’è tra tapparelle e persiane?',
      answer:
        'La tapparella sale nel cassonetto e lascia liberi i lati della finestra. Le persiane a battente hanno ante che si aprono verso l’esterno. Con le lamelle orientabili puoi regolare luce e aria anche ad ante chiuse.',
    },
    {
      question: 'Posso rendere elettriche le tapparelle che ho già?',
      answer:
        'Spesso sì. Il motore si inserisce nel rullo che avvolge la tapparella. Per capire se puoi tenere il telo attuale, si controllano il suo peso, le dimensioni del rullo e come alimentare il motore.',
    },
    {
      question: 'Se cambio la tapparella devo cambiare anche il cassonetto?',
      answer:
        'Puoi tenere il cassonetto se è in buono stato e c’è spazio per la nuova tapparella tutta avvolta. Lo sportello deve potersi aprire per accedere al rullo.',
    },
  ],
}

export const entranceDoorFaq: ProductFaqContent = {
  title: 'Domande sulle porte d’ingresso',
  questions: [
    {
      question: 'Come capisco quanto è sicura una porta blindata?',
      answer:
        'Cerca la classe antieffrazione nella scheda della porta. Una porta RC4, per esempio, supera prove di resistenza più severe di una RC3. La classe si riferisce alla porta completa nella versione che scegli.',
    },
    {
      question: 'Quale porta d’ingresso scegliere se è esposta al sole e alla pioggia?',
      answer:
        'Scegli un modello con un rivestimento adatto all’esterno. Se l’ingresso è senza tettoia, controlla anche la tenuta all’acqua dichiarata per la porta e come verrà protetta la soglia dalla pioggia.',
    },
    {
      question: 'La porta può avere un colore diverso dentro e fuori?',
      answer:
        'Sì, nei modelli con rivestimenti personalizzabili sui due lati. Puoi riprendere il colore delle altre porte sul pianerottolo e scegliere per l’interno una finitura che si abbini alla tua casa.',
    },
  ],
}

export const interiorDoorFaq: ProductFaqContent = {
  title: 'Domande sulle porte interne',
  questions: [
    {
      question: 'Posso mettere una porta scorrevole senza aprire il muro?',
      answer:
        'Sì, con una scorrevole esterno muro. L’anta scorre su un binario davanti alla parete. Accanto al vano serve un tratto libero almeno quanto l’anta, senza mobili o termosifoni che ne blocchino il passaggio.',
      guide: { slug: 'porte-interne-spazi-e-finiture', label: 'Leggi la guida alle porte interne' },
    },
    {
      question: 'Che differenza c’è tra una porta laccata e una in laminato?',
      answer:
        'La porta laccata ha una superficie verniciata, opaca o lucida. Il laminato è un rivestimento che può riprodurre anche le venature del legno. Accostare i campioni al pavimento aiuta a scegliere la finitura.',
    },
    {
      question: 'Se rifaccio il pavimento, quando devo scegliere le porte?',
      answer:
        'Scegli prima dei lavori come si apriranno, soprattutto se vuoi una scorrevole a scomparsa e devi preparare la parete. Per ordinare le porte, le misure definitive devono tenere conto dell’altezza del pavimento finito.',
    },
  ],
}

export const outdoorFaq: ProductFaqContent = {
  title: 'Domande su pergole e tende',
  questions: [
    {
      question: 'Per fare ombra sul terrazzo è meglio una tenda da sole o una pergola?',
      answer:
        'Una tenda a bracci fa ombra quando la apri e lascia libero il pavimento. Una pergola ha una struttura che resta in posizione, con un telo retrattile o con lamelle che puoi inclinare per regolare luce e aria.',
      guide: { slug: 'pergola-o-tenda-da-sole', label: 'Confronta pergola e tenda nella guida' },
    },
    {
      question: 'Una pergola bioclimatica ripara anche dalla pioggia?',
      answer:
        'Sì. Nelle pergole bioclimatiche Gibus, le lamelle chiuse convogliano l’acqua negli scarichi della struttura. Se i lati sono aperti, il vento può comunque spingere la pioggia sotto la copertura.',
    },
    {
      question: 'Servono permessi per mettere una pergola sul terrazzo?',
      answer:
        'Una tenda a pergola con copertura mobile può rientrare nell’edilizia libera. Prima di ordinarla, verifica con l’ufficio tecnico del Comune se il progetto rispetta le regole locali e gli eventuali vincoli paesaggistici. In condominio controlla anche il regolamento.',
    },
  ],
}
