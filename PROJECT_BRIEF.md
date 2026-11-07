# LGE Home Solutions — Project brief

Documento di riferimento per il contesto aziendale, la direzione artistica, le funzionalità e il percorso di sviluppo del sito.

Le regole operative per lo sviluppo sono definite in [AGENTS.md](./AGENTS.md). Le proposte e le decisioni ancora aperte sono indicate esplicitamente: non costituiscono funzionalità già approvate da implementare.

## 1. Stato e organizzazione del progetto

**Fluidità del visualizzatore — 7 novembre 2026.** L’utente chiede di togliere le frecce su mobile e risolvere gli inceppamenti quando le foto successive non sono ancora caricate, con pubblicazione immediata dopo la verifica. Si rimuovono comandi e spazio inferiore sui telefoni; le frecce rimangono desktop/tablet. Carosello con misure numeriche, senza ricalcolo al completamento delle immagini, e Virtual nelle raccolte grandi. Due foto preparate per lato, con anteprima leggera e dettaglio decodificato prima della comparsa. Cornice stabile in rapporto alla foto, 960 px su mobile e risoluzione completa desktop. Prove con download artificialmente ritardati: lo swipe 1 → 2 avanza con dettaglio in attesa; il completamento delle immagini non cambia la geometria. Report e server di prova locali in `Sito/references/coverflow-preview/`.

**Coverflow fotografico — 7 novembre 2026.** L’utente richiede l’effetto Coverflow del demo ufficiale Swiper nelle foto aperte, su cellulare e desktop con frecce, e ne autorizza la pubblicazione. Il visualizzatore condiviso di home e Lavori usa il solo modulo EffectCoverflow, caricato all’apertura. Foto attiva intera e vicine inclinate; tre immagini montate a riposo e fino a sei mentre scorrono, conservando le vicine uscenti. Restano frecce tonde vicine alle foto, X senza bordo, tastiera, Esc, safe area e focus. Movimento ridotto senza prospettiva e con transizioni istantanee. Gli altri caroselli mantengono Embla. Nessuna nuova rotta pubblica; pagina locale di verifica in `Sito/references/coverflow-preview/`. Commit, push e workflow Pages esistente richiesti.

**Ultima richiesta — 6 novembre 2026.** L’utente autorizza ora commit, push e pubblicazione dell’intero checkpoint corrente, comprese le revisioni precedentemente locali del 6 novembre. Hero video Rev12 a 60 fps, correzioni alle transizioni, skeleton, showroom e pagina Lavori sono inclusi. La selezione della home comprende esclusivamente le 11 immagini fornite nella cartella `LGE_foto_lavori_home`; la raccolta completa conserva le 101 foto originali. L’anteprima resta non indicizzata e la Privacy Policy mantiene lo stato reale. Le indicazioni di sola prova locale nei paragrafi storici non si applicano a questa consegna.

**Fluidità video — 6 novembre 2026.** L’utente chiede di correggere i piccoli scatti nei movimenti laterali e pubblicare il risultato. Rev12 mantiene selezione e tempi di Rev11, ricostruendo dalle fonti 3536 fotogrammi a 60 fps. I tre spostamenti aggiunti al crop mobile sono rimossi; nell’ultima scena resta privilegiato l’oscurante. Nessuna modifica a layout, testi, colori o animazioni della hero. Ricetta e verifiche dedicate in `Sito/references/hero-video-fluidity/`. La pubblicazione usa il workflow Pages esistente.

**Decisione corrente — 3 novembre 2026.** La versione con la grande fotografia è l’unica versione ufficiale. La precedente hero minimalista e il confronto fra due siti sono conclusi. Tutto lo sviluppo continua in `Sito/`, pacchetto `lge-home-solutions`, porta 5175, repository personale `NunzioMerone/lge-home-solutions` e sito `https://nunziomerone.github.io/lge-home-solutions/`. La cartella duplicata viene rimossa; il repository di confronto è conservato come archivio con Pages disattivato. Le cronologie di entrambi i repository sono riunite nel repository principale. Questa decisione sostituisce le indicazioni storiche sulle due applicazioni indipendenti.

Dal 5 novembre 2026 la homepage sostituisce la fotografia della hero con il montaggio video, ora alla revisione Rev12 autorizzata alla pubblicazione, nelle varianti desktop, tablet e mobile. L’ultima revisione mantiene i testi HTML a sinistra e il finale del titolo in corsivo Sabbia `#EDD5B3`, scelto dall’utente dopo il confronto sul filmato, sostituendo la macchina da scrivere con una dissolvenza leggera da sinistra a destra, senza cursore. L’ultima richiesta sostituisce l’overlay bianco con un velo antracite leggero sull’intero lato sinistro, sfumato a zero al 65% della larghezza, senza fascia attorno alle scritte; prefisso e sottotitolo sono chiari, mentre la frase ciclica usa l’accento caldo Sabbia, distinto dal bianco. Il blu del marchio rimane negli altri accenti del sito. Nella prova mobile successiva, sotto 700 px, il testo è allineato a sinistra ma ancorato in basso, con blocco più largo, titolo più grande e sfumatura antracite dal basso; un velo superiore tenue accompagna il logo. Desktop e tablet mantengono la composizione precedente. Il link WhatsApp e il comando pausa video sono rimossi dalla hero su richiesta dell’utente. Le cinque categorie sono nella sezione «Le nostre soluzioni», seguita da partner, competenze, lavori, recensioni e contatti. Il checkpoint corrente è autorizzato al push e alla pubblicazione sull’anteprima personale.

- Fase attuale, aggiornata al 5 novembre 2026: unico sito in `Sito/`; l’utente autorizza ora commit, push su `main` e pubblicazione del checkpoint corrente, inclusi hero video Rev07, testi mobile in basso, pagina Infissi completa e correzioni responsive elencate nell’ultimo aggiornamento. Il link principale `lge-home-solutions` resta un’anteprima non indicizzata in attesa di hosting definitivo e completamento della revisione privacy.
- Workspace attuale: `LgeHomeSolutions/`.
- Directory dell'applicazione: `Sito/`, richiesta esplicitamente dal prompt aggiornato del 23 ottobre 2026. La precedente cartella vuota `Sito_web/` è conservata.
- Documentazione generale: nella radice del workspace.
- Codice, configurazioni, dipendenze e asset dell'applicazione: esclusivamente in `Sito/`. Prompt completo e documentazione operativa sono in `Sito/references/homepage-request.txt` e `Sito/README.md`.
- Eccezione autorizzata successivamente: `Hero_test/` contiene il prototipo indipendente della sola hero, con dipendenze e asset propri. `Sito_web/` resta intatta.
- Seconda proposta autorizzata: `Hero_Test2/` contiene una hero basata sulla registrazione video fornita dall'utente, con navbar e contenuti LGE a destra della pergola su desktop. Riproduzione automatica silenziosa a velocità originale, con pausa/replay e adattamento mobile. Il primo prototipo e i test Blender rimangono intatti. Dettagli, asset e verifiche sono documentati in `Hero_Test2/README.md`.
- Navbar della seconda proposta: fissa e trasparente all'inizio con il logo orizzontale bianco fornito dall'utente; durante lo scroll diventa bianca e usa la variante colorata. Il filmato non cambia.

Il brief iniziale riportava `Desktop/projects/LGE/Sito/`. La predisposizione trovata inizialmente sul computer era `Desktop/Project/LgeHomeSolutions/Sito_web/`. Il nuovo prompt richiede espressamente `Sito/`: l'applicazione è stata quindi creata in `Desktop/Project/LgeHomeSolutions/Sito/`, lasciando conservata la cartella vuota precedente.

La creazione iniziale di questi documenti non ha avviato lo sviluppo. Sono seguiti i due test della hero, conservati. Il prompt del 23 ottobre 2026 autorizza ora la homepage completa in `Sito/`, con CSS Modules al posto di Tailwind, una nuova hero fotografica a tre pannelli e le sole rotte prodotto bianche. Queste richieste prevalgono sulle proposte precedenti. I test restano intatti.

## 2. Azienda e posizionamento

**LGE Home Solutions** è un'azienda di Monte di Procida, in provincia di Napoli, con una tradizione familiare iniziata negli anni Ottanta e oggi portata avanti da tre fratelli.

Si occupa della vendita e dell'installazione di:

- Infissi e serramenti.
- Zanzariere.
- Avvolgibili.
- Porte interne.
- Porte blindate.
- Pergole bioclimatiche e soluzioni outdoor Gibus.

Payoff del marchio: **«Il DESIGN per il tuo benessere»**.

La comunicazione deve valorizzare il miglioramento degli ambienti attraverso comfort, luce, design, sicurezza e vivibilità. L'identità deve trasmettere professionalità, eleganza, cura del dettaglio, affidabilità e attenzione al cliente.

LGE è indicata nel materiale fornito come rivenditore e installatore Gibus e come appartenente alla rete Gibus Atelier. Denominazione ufficiale del rapporto e autorizzazioni all'uso del marchio devono essere verificate prima della pubblicazione.

**Gibus è una priorità commerciale**: deve avere visibilità nella hero, nelle soluzioni e in un approfondimento dedicato, mantenendo riconoscibili tutte le altre attività LGE.

## 3. Obiettivi del sito

- Presentare LGE come interlocutore qualificato per soluzioni abitative curate e su misura.
- Rendere comprensibile l'offerta e accompagnare verso la soluzione pertinente.
- Valorizzare l'outdoor e il mondo Gibus.
- Costruire fiducia attraverso lavori autentici, storia familiare, persone e recensioni.
- Favorire richieste di consulenza e preventivo.
- Offrire un'esperienza responsive per desktop, tablet e smartphone.

Il prodotto è un sito web, non un'applicazione mobile nativa.

## 4. Direzione artistica

Estetica premium, contemporanea, minimalista e accogliente, vicina all'architettura, all'interior design e alle abitazioni di fascia alta. Evitare un'impostazione industriale o eccessivamente futuristica.

### Palette indicativa

| Ruolo      | Colore        | Valore    |
| ---------- | ------------- | --------- |
| Principale | Blu del logo  | `#014380` |
| Accento UI | Blu           | `#205D9B` |
| Principale | Grigio LGE    | `#6B6B6B` |
| Supporto   | Antracite     | `#2F343A` |
| Supporto   | Bianco caldo  | `#FCFCFB` |
| Supporto   | Greige        | `#EDE9E3` |
| Supporto   | Azzurro tenue | `#E8F0F8` |

I valori sono provvisori e saranno perfezionati partendo dal logo originale e verificando il contrasto nelle combinazioni effettivamente usate.

### Principi visivi

Aggiornamento colore del 27 ottobre: il fondo chiaro globale è `#FCFCFB`, meno avorio del precedente `#FAF9F6`. Il testo ciclico della hero usa `--color-brand-blue: #014380`, campionato come blu dominante e mediano nei pixel blu opachi del logo lineare originale. Gli altri accenti continuano a usare `--color-blue`. La navbar usa `lge-navbar-horizontal-flat.webp`; gli originali precedenti restano conservati.

Aggiornamento del 27 ottobre 2026: Hero chiara e minimale, senza fotografia di sfondo. Logo originale immediatamente visibile a sinistra della navbar e tutte le voci a destra, con più spazio tra i gruppi. Nessuna introduzione con logo che sale. «Il design che» entra con una dissolvenza dal basso di 0,95 secondi e poi resta fisso; cinque finali si scrivono, si cancellano e ruotano con cursore lampeggiante, su una sola riga da 700 px e con disposizione su più righe sui telefoni. Il sottotitolo completo «Ogni ambiente merita di essere vissuto al meglio.» entra con dissolvenza dal basso e resta statico. Spazio riservato per tutte le frasi; nessun controllo pausa/riprendi nella hero. Resta rispettato il movimento ridotto e si evitano aggiornamenti fuori vista o a scheda nascosta. Sotto: carosello Embla di Infissi, Oscuranti, Porte e sicurezza, Porte interne e Atelier Gibus, con ingresso delle card dal basso in 1,8 secondi, a intervalli di 0,18 secondi. Foto locali, proporzioni 4:5, angoli di 8 px, pannello chiaro e zoom interno del 3,5% in hover/focus, dimensioni esterne fisse. Su touch e sotto 700 px il pannello è già visibile. Frecce circolari sottili nel blu LGE affiancano gli indicatori da 700 px quando il contenuto è scorrevole; ai limiti del carosello sono disabilitate. Swipe e tastiera restano disponibili. Le piccole frecce interne ai pannelli identificano i link alle categorie. La sezione separata «I nostri prodotti» è stata eliminata: le cinque categorie restano soltanto nella hero. L’ancora #prodotti ora raggiunge il carosello della hero. Spazio maggiore sopra il titolo e sotto il sottotitolo; testi della navbar leggermente rientrati verso il centro. Il pannello delle card ha sfondo opaco costante e si anima soltanto con una traslazione, senza dissolvenze concorrenti; l’intera card mantiene una sola superficie di puntamento.

I titoli di apertura delle sezioni della homepage sono centrati e uniformi per dimensioni, così come i titoli H3 delle card. È mantenuto un solo H1 nella hero. Etichette introduttive e Lorem ipsum a fianco dei titoli sono stati eliminati; il testo della hero è più vicino al logo. La navbar segnala l'ancora selezionata con una linea blu LGE e sottolinea Soluzioni durante l'apertura del menu.

Rifinitura del 24 ottobre: i titoli delle sezioni sono più piccoli e accompagnati da una linea blu animata. Il fondo dei prodotti usa il greige `#EDE9E3` delle Competenze, mentre hero e partner restano in `#FAF9F6`. Il titolo dei prodotti è avvicinato allo stacco superiore; gli ingressi delle card sono più lenti e avvengono una sola volta, senza nascondere i contenuti quando si risale. Card prodotto più verticali (3:4), angoli appena arrotondati, descrizioni dedicate e centrate, ingressi alternati dall'alto e dal basso; eliminati “Scopri di più” e bordo inferiore. I partner usano una selezione di loghi reali dai siti dei produttori, con ingresso da destra, esplicitamente dimostrativa fino alla conferma dei marchi LGE.

Rifinitura attuale: fondo caldo schiarito a `#FAF9F6`; titoli sui fondi chiari in antracite `#252A30`, leggermente più scuro del footer `#2F343A`. Dal 28 ottobre l’H1 della hero usa Cormorant Garamond con peso 400, prefisso antracite e finale in corsivo nel blu del logo #014380.

- Linee nette e bordi prevalentemente squadrati; evitare pulsanti eccessivamente arrotondati.
- Ampi spazi bianchi e gerarchia tipografica chiara.
- Fotografie architettoniche di qualità, viste ambientate e dettagli delle finiture.
- Blu come accento misurato.
- Composizioni coerenti, con variazioni motivate tra le sezioni.
- Testi leggibili e fotografie libere da sovrapposizioni invasive.
- Animazioni fluide, eleganti e funzionali.
- Nuovo riferimento richiesto per la pulizia del design: [Apple](https://www.apple.com/it/). La hero usa titolo e sottotitolo sans serif di sistema, gerarchia più compatta e ingressi delle sezioni più lenti; il logo mantiene la propria identità, nella posizione fissa iniziale della navbar.
- Cura del layout mobile fin dalle prime sezioni.

Gli originali sono conservati in `img/`: `Logo LGE Casa e Benessere.png` (quadrato, precedente) e `Logo LGE_ il design per il tuo benessere.png` (orizzontale, fornito il 27 ottobre). La navbar usa la versione lineare, mantenendo colori, trasparenza e proporzioni originali 3:1. La copia ottimizzata lossless del sito è `Sito/public/img/brand/lge-navbar-horizontal-flat.webp`. Non alterare o sovrascrivere i loghi originali.

## 5. Riferimento Sicilinfissi

Riferimento analizzato: [sicilinfissi.it](https://sicilinfissi.it/).

L'analisi ha riguardato la homepage e i contenuti di pagine dedicate a pergole, realizzazioni, azienda e marchio partner, con osservazione visiva di sezioni e transizioni nel browser. Non è stato svolto un audit completo di accessibilità, performance o di tutti i formati di schermo.

### Spunti utili

- Fotografie dei prodotti inseriti in ambienti abitati.
- Respiro dei layout e alternanza di fondi chiari.
- Gerarchia tra intestazioni introduttive, titoli e descrizioni.
- Categorie fotografiche collegate a pagine dedicate.
- Alternanza di fotografia e testo per storia e approfondimenti.
- Realizzazioni esplorabili per categoria.
- Presenza di persone, marchi partner e recensioni per costruire fiducia.
- Inviti alla consulenza inseriti nel percorso di lettura.

### Interpretazione proposta per LGE

- Linguaggio più architettonico ed essenziale, con palette e geometrie proprie.
- Navigazione compatta e maggiore evidenza di Gibus.
- Selezione curata dei lavori, con eventuali didascalie basate su dati reali.
- Contenuti specifici per ogni categoria, evitando blocchi generici ripetuti.
- Ingressi animati leggeri e controllati, senza eccessivi spostamenti laterali.
- Uso misurato di caroselli, CTA e strumenti flottanti.
- Racconto autentico dei tre fratelli e della continuità familiare.

Queste sono indicazioni progettuali da sviluppare nelle rispettive fasi. Non copiare testi, immagini, marchi, layout distintivi o animazioni del riferimento. La hero cinematografica LGE richiede un progetto e asset propri.

## 6. Architettura dei contenuti

### Navigazione attuale

- Logo orizzontale originale fornito il 27 ottobre 2026, a sinistra e subito visibile; tutte le voci sono allineate a destra. Le proporzioni 3:1 restano intatte; la navigazione desktop compare da 1100 px per lasciare spazio al marchio completo.
- A destra del logo: Home, Soluzioni e I nostri lavori, seguiti da Competenze, Recensioni e Contatti. Soluzioni apre le cinque categorie esistenti.
- A destra: Competenze apre `/competenze`; Recensioni e Contatti raggiungono le rispettive sezioni della homepage.

Dal 27 ottobre 2026 la navbar è immediatamente disponibile, con logo a sinistra e navigazione a destra. La barra trasparente iniziale è alta 112 px su desktop e 96 px sul telefono; durante lo scroll diventa bianca traslucida e si compatta come in precedenza. Il menu mobile mantiene hamburger animato, chiusura con Esc, focus e blocco dello sfondo. Le pagine prodotto mostrano navbar, footer, titolo e messaggio di preparazione.

### Homepage prevista

1. **Hero**: Hero chiara e minimale, senza fotografia di sfondo. Logo originale immediatamente visibile a sinistra della navbar e tutte le voci a destra, con più spazio tra i gruppi. Nessuna introduzione con logo che sale. «Il design che» entra con una dissolvenza dal basso di 0,95 secondi e poi resta fisso; cinque finali si scrivono, si cancellano e ruotano con cursore lampeggiante, su una sola riga da 700 px e con disposizione su più righe sui telefoni. Il sottotitolo completo «Ogni ambiente merita di essere vissuto al meglio.» entra con dissolvenza dal basso e resta statico. Spazio riservato per tutte le frasi; nessun controllo pausa/riprendi nella hero. Resta rispettato il movimento ridotto e si evitano aggiornamenti fuori vista o a scheda nascosta. Sotto: carosello Embla di Infissi, Oscuranti, Porte e sicurezza, Porte interne e Atelier Gibus, con ingresso delle card dal basso in 1,8 secondi, a intervalli di 0,18 secondi. Foto locali, proporzioni 4:5, angoli di 8 px, pannello chiaro e zoom interno del 3,5% in hover/focus, dimensioni esterne fisse. Su touch e sotto 700 px il pannello è già visibile. Frecce circolari sottili nel blu LGE affiancano gli indicatori da 700 px quando il contenuto è scorrevole; ai limiti del carosello sono disabilitate. Swipe e tastiera restano disponibili. Le piccole frecce interne ai pannelli identificano i link alle categorie. La sezione separata «I nostri prodotti» è stata eliminata: le cinque categorie restano soltanto nella hero. L’ancora #prodotti ora raggiunge il carosello della hero. Spazio maggiore sopra il titolo e sotto il sottotitolo; testi della navbar leggermente rientrati verso il centro. Il pannello delle card ha sfondo opaco costante e si anima soltanto con una traslazione, senza dissolvenze concorrenti; l’intera card mantiene una sola superficie di puntamento.
2. **I nostri partner:** Dodici marchi indicati dal titolare: Atelier Gibus, Bettio, VEKA, ALWO, Fideal, New Solar, SikurHome, EFFEPI, TEHNi, DoorArreda, I-PEA e VELUX. Loghi originali ospitati localmente e fonti in `Sito/references/partner-logo-sources.json`. Griglia con divisori sottili: quattro colonne su desktop, tre su tablet, due su smartphone. Restano fondo greige e titolo con «partner» in corsivo blu, senza effetti luminosi.
3. **Competenze:** Sintesi sul fondo antracite con titolo centrato «La qualità nasce dalla competenza», sottotitolo breve e tre elementi con icone: Posa qualificata (UNI 11673-2 · EQF 4), PosaClima e Termografia di I e II livello. Ogni descrizione è contenuta e il collegamento «Scopri le nostre competenze» è evidenziato da un pulsante con bordo chiaro. La griglia dei riconoscimenti è presente soltanto nella pagina `/competenze`, insieme agli approfondimenti e ai sette documenti autorizzati. La homepage mantiene l’ancora `/#competenze` e le animazioni di ingresso condivise. EQF 4 Caposquadra e termografia II restano qualifiche confermate dall’utente, distinte dai documenti DEKRA senior e ITC categoria 1; provenienza e scadenze in `Sito/references/competency-evidence.json`.
4. **I nostri lavori:** La home presenta 15 fotografie autentiche, tre per ciascuna delle cinque categorie, alternate nel carosello per variare le soluzioni mostrate. Restano coverflow, autoplay, swipe, tastiera, frecce da tablet, finestra di cinque indicatori e apertura della fotografia intera. Il collegamento «Esplora tutti i lavori» apre `/lavori`. La pagina dedicata rende disponibili tutte le 101 fotografie: Infissi (32), Oscuranti (16), Porte e sicurezza (11), Porte interne (16), Atelier Gibus / Outdoor (26). L’indice filtra tramite `?categoria=…`, preservando link diretti e cronologia. Dal 6 novembre la vista Tutti alterna le categorie in una galleria unica, senza suddivisioni ripetute; le raccolte partono da 18 foto e aggiungono le successive a gruppi di 18. Filtri, titolo persistente e immagini seguono la revisione locale descritta in fondo al brief. Nessuna foto omessa o duplicata tra le raccolte. Foto ottimizzate esistenti e originali invariati; selezione e classificazione in `Sito/src/data/works.ts`, fonti in `Sito/references/gallery-real-sources.json`.
5. **Cosa dicono di noi**: titolo centrato senza linea, con «noi» in corsivo blu LGE e sottotitolo breve. Card bianche più compatte, con Google, voto, stelle, citazione serif, autore e data; quattro card da 1100 px e cinque da 1600 px, una centrata sui telefoni. Il carosello Embla con lieve enfasi centrale usa il motore useLoopCarousel condiviso con la galleria: avanzamento dopo 6,5 secondi di sosta, swipe e tastiera; al massimo cinque indicatori visibili in una finestra che scorre con animazione, con pallini più piccoli ai bordi e selezione attiva allungata. Si montano al massimo sette indicatori, includendo quelli di transizione, anche con centinaia di recensioni. Frecce circolari sottili nel blu LGE affiancano gli indicatori su tablet e desktop da 700 px; sui telefoni rimangono soltanto indicatori e swipe. Movimento interrotto durante lettura e interazioni, fuori vista, a scheda nascosta e con movimento ridotto. Riepilogo Google a destra su desktop e sotto il titolo sui dispositivi più piccoli. Commenti oltre quattro righe espandibili con «Leggi di più / Leggi di meno»; nessun messaggio sostitutivo per commenti assenti. Dati ricontrollati il 27 ottobre 2026: nove recensioni autentiche, media 5,0/5, tutte inserite. Le quattro nuove sono mostrate prima delle cinque storiche; testo italiano originale e assenza di commenti conservati. Provenienza e verifica manuale documentate in references/google-reviews.md (dentro Sito/). Nessun aggiornamento automatico, chiave Places o nuovo servizio esterno.
6. **Contatti:** sezione «Vieni a trovarci» su fondo greige come i Partner. Il titolo è nel pannello introduttivo, con la scala tipografica condivisa delle sezioni e «trovarci» in corsivo blu. Da 1000 px la colonna sinistra contiene introduzione, azioni, indirizzo e Instagram; a destra resta la mappa. Sotto 1000 px l’ordine è introduzione con azioni, indirizzo, mappa, Instagram. Il dettaglio indirizzo rimane nel pannello; gli orari sono rimossi su richiesta del 5 novembre 2026. Il pulsante blu «Prenota su WhatsApp» usa il simbolo bianco derivato dal marchio ufficiale locale; «Chiamaci» è un collegamento testuale. Il titolare ha confermato il 29 ottobre 2026 il numero +39 334 600 8313 per telefono e WhatsApp, condiviso anche con il footer, e il profilo ufficiale @atelier_gibus_campiflegrei, collegato senza parametri di tracciamento. L’email info@lgesolutions.it, confermata dal titolare il 29 ottobre 2026, è configurata con collegamento mailto e condivisa con il footer. La mappa OpenStreetMap con Leaflet 1.9.4 resta differita, con marcatore blu, zoom sottile e attribuzione essenziale invariati; la cornice bianca riporta «LGE Home Solutions» e il link «Apri le indicazioni» verso Google Maps. L’indirizzo Via Roma 29, 80070 Monte di Procida (NA) resta quello verificato il 27 ottobre 2026. Ingressi morbidi compatibili con le preferenze di movimento; nessun modulo. Fonti in `Sito/references/contact-sources.md`.
7. **Footer**: aggiornato al riferimento del 29 ottobre 2026, con fondo antracite e tre colonne da 1000 px: identità e recapiti, «Soluzioni» ed «Esplora». Il logo bianco ufficiale conserva asset e geometria originali; il CSS ritaglia soltanto i margini trasparenti per allinearlo ai recapiti. I gruppi di navigazione non hanno più lineette blu. Su mobile identità e recapiti precedono le due colonne di link; la fascia inferiore raccoglie social circolari da 44 px e copyright automatico con new Date().getFullYear(). Telefono e WhatsApp usano +39 334 600 8313, Instagram il profilo ufficiale @atelier_gibus_campiflegrei. L’email info@lgesolutions.it è stata confermata dal titolare il 29 ottobre 2026. I recapiti compaiono nell’ordine telefono, indirizzo, email, con testo da 13 px su mobile/tablet e 14 px su desktop. Il link «Privacy Policy» apre la pagina locale `/privacy-policy`, predisposta come bozza non approvata e non pubblicata. Nessun reveal, Lorem Ipsum, dicitura legale provvisoria o controllo «Riduci le animazioni». Restano rispettate le preferenze di movimento del sistema.

Quest'ordine è richiesto esplicitamente e non va cambiato senza accordo. L'immagine di riferimento è estetica, non un layout da copiare rigidamente. La hero contiene una prima proposta di testi significativi, richiesta durante la rifinitura; le altre sezioni mantengono i testi descrittivi provvisori.

### Pagine interne

**Competenze — autorizzata il 29 ottobre 2026.** La pagina `/competenze` sviluppa il mockup approvato: tre approfondimenti tecnici, cinque riconoscimenti e sette documenti reali visualizzabili. Navbar e footer sono condivisi; la voce Competenze e il collegamento nella sezione della homepage aprono la nuova pagina. L’ancora `/#competenze` rimane disponibile. I due PDF originali sono conservati senza modifiche; le foto possono essere raddrizzate e ripulite dai riflessi solo mantenendo leggibili e inalterati contenuti, firme e timbri. I documenti di posa senior e termografia di categoria 1 sono distinti dai livelli EQF 4 e II confermati dall’utente. Sono previsti metadati dedicati e un ingresso statico per l’accesso diretto su GitHub Pages, senza pubblicazione automatica.

**I nostri lavori — autorizzata il 29 ottobre 2026.** Pagina `/lavori` con navbar/footer condivisi, titolo serif con corsivo blu, cinque categorie separate e navigazione funzionante. Griglie fotografiche adattive, lieve zoom interno e ingressi da 1,4 secondi; nessuna ricostruzione o modifica delle foto. Il visualizzatore riprende quello della home, con sola immagine e X, Esc, blocco dello scroll e ripristino del focus. Navbar desktop/mobile e footer aprono la pagina; `/#lavori` rimane l’ancora della selezione in home. Metadati e ingresso statico dedicati per GitHub Pages, senza pubblicazione automatica.

Per una fase futura restano proposte pagine dedicate alle singole soluzioni, all'azienda, a Gibus, alle realizzazioni e ai contatti. **Non sono autorizzate nella fase attuale:** le cinque rotte prodotto implementate mostrano soltanto navbar, footer, titolo e messaggio di preparazione, secondo la richiesta del 28 ottobre 2026.

Percorso editoriale proposto per le pagine soluzione: ambiente e beneficio, soluzioni disponibili, dettagli e personalizzazioni, lavori pertinenti, invito alla consulenza. I filtri delle realizzazioni sono ora implementati in `/lavori`; eventuali approfondimenti sui singoli interventi restano da definire in base al materiale disponibile.

**Privacy Policy — anteprima locale del 29 ottobre 2026.** La pagina `/privacy-policy`, collegata dal footer, condivide navbar e footer e un lieve ingresso CSS. Mantiene sette sezioni concise e la data del 29 ottobre 2026. Su richiesta dell’utente sono rimossi gli avvisi visibili di bozza o revisione, le formulazioni «da confermare» e le checklist; resta un unico paragrafo sull’hosting da completare alla scelta del fornitore definitivo. Denominazione «LGE Home Solutions S.a.s. di Schiano Lomoriello Lemuel», sede «Via Roma, 29 — 80070 Monte di Procida (NA)» ed email info@lgesolutions.it sono ora confermate direttamente dall’utente. L’utente precisa che Lemuel Schiano Lomoriello è amministratore e la società è titolare del trattamento: solo «Chi tratta i dati» usa +39 329 826 5371, mentre Contatti, footer e WhatsApp mantengono +39 334 600 8313. I precedenti riscontri nelle schede web commerciali restano documentati come evidenza storica, senza attribuire loro valore di visura. L’utente conferma fotografie proprie dei lavori dei clienti e richiesta preventiva del consenso per fotografare e pubblicare; non sono state esaminate liberatorie. WhatsApp resta un link esterno, senza invio automatico o raccolta dei messaggi nel frontend; le recensioni sono ancora copie statiche e l’API Google futura non è attiva. La conservazione è descritta con il criterio del tempo necessario per rispondere e gestire l’eventuale seguito, con ulteriori obblighi o tutela di diritti quando pertinenti, senza inventare durate o cancellazioni automatiche. La descrizione del caricamento automatico della mappa OSM resta corretta. Il riepilogo di GitHub Pages e dei trasferimenti è stato rimosso dall’anteprima; dettagli tecnici e fonti sono conservati in `Sito/references/privacy-audit.md`. La versione pubblica attuale usa GitHub Pages; l’hosting definitivo non è scelto. La pagina resta locale, non pubblicata e non certificata sul piano legale: `Sito/src/config/privacy.ts` mantiene nove campi di revisione interna e `approved: false`, con metadati `noindex, nofollow`. `Sito/scripts/check-privacy.mjs` blocca il deploy finché i campi e la revisione non sono completati, senza impedire la build locale. `prepare-pages.mjs` genera anche l’ingresso statico privacy e i relativi metadati per GitHub Pages; `App` e il relativo hook ripristinano i metadati a ogni cambio di rotta.

## 7. Hero cinematografica

**Homepage attuale:** la hero di `Sito/` usa il video Rev07 con testi a sinistra, nuova dissolvenza orizzontale del titolo e velo antracite leggero a sinistra, come descritto nell’aggiornamento del 5 novembre. I racconti 3D e video seguenti appartengono ai test antecedenti e non sono il requisito attuale della homepage.

### Sequenza desiderata

All'ingresso, il logo LGE è al centro. La vista si trova idealmente all'interno di una pergola bioclimatica e guarda verso le lame e il cielo.

Con l'avanzare dello scroll:

1. Le lame si aprono progressivamente.
2. Il cielo diventa più visibile.
3. I LED integrati si accendono gradualmente.
4. La telecamera arretra e cambia inquadratura, rivelando struttura e ambiente.
5. Si raggiunge una composizione panoramica finale.
6. Il logo si ridimensiona e si sposta in alto a sinistra nella navbar.
7. Compaiono gli elementi della navigazione.
8. Entrano i testi della hero.

Il movimento deve essere continuo, credibile e reversibile con lo scroll. Non deve apparire come una successione di fotografie scollegate.

### Decisioni aperte

Per il primo prototipo l'utente ha scelto una scena 3D procedurale realmente animabile. Le quattro reference sono disponibili e copiate in `Hero_test/public/assets/references/`; guidano composizione e materiali e non costituiscono una sequenza animata. Il prototipo predispone anche un renderer di frame per un eventuale futuro render continuo. I dettagli tecnici e di avvio sono documentati in `Hero_test/README.md`.

- Sequenza di frame prerenderizzati, video sincronizzato allo scroll oppure scena 3D.
- Disponibilità e produzione degli asset con continuità di camera, luce e geometria.
- Durata narrativa, distanza di scroll e tempi di ingresso di logo, navigazione e testi.
- Composizione e comportamento sui diversi formati di schermo.
- Strategie di caricamento, qualità e consumo di memoria.
- Esperienza alternativa con movimento ridotto e in caso di asset non disponibili.

La scelta dipenderà dalla qualità degli asset e dalla sostenibilità sui dispositivi di destinazione. Non simulare effetti fotorealistici complessi senza il materiale necessario. Navigazione e contenuti essenziali devono restare accessibili senza obbligare a completare l'animazione.

## 8. Stack e requisiti trasversali

Stack previsto:

- React.
- TypeScript in modalità strict.
- Vite.
- CSS Modules e CSS custom properties per `Sito/`; Tailwind rimane nei prototipi.
- GSAP con ScrollTrigger per animazioni complesse.
- React Router per le pagine.

Per il sito ufficiale Three.js resta un'opzione da valutare in base alla sostenibilità della hero; per il prototipo `Hero_test/` è stato esplicitamente scelto e autorizzato. Altre dipendenze richiedono una necessità concreta.

Requisiti presenti fin dall'inizio: responsive design, HTML semantico, accessibilità da tastiera, focus visibile, contrasto, rispetto di `prefers-reduced-motion`, performance e SEO.

La strategia SEO e l'eventuale necessità di prerendering, insieme alla destinazione di hosting, saranno valutate prima di consolidare l'architettura di pubblicazione. Il solo routing client non esaurisce le decisioni SEO.

## 9. Contenuti e asset

Materiale atteso:

- Eventuali varianti autorizzate del logo per altri fondi; l'originale è già disponibile in `img/`.
- Fotografie dei lavori LGE e, se disponibili, delle persone e dell'archivio familiare.
- Materiali dei fornitori utilizzabili con i diritti necessari.
- Loghi dei partner autorizzati.
- Recensioni autentiche.
- Dati aziendali, contatti e informazioni commerciali definitive.
- Testi e descrizioni dei prodotti.
- Asset dedicati alla hero.

Durante lo sviluppo si possono usare testi provvisori e Lorem ipsum quando necessario, identificandoli come tali. Distinguere sempre materiale provvisorio e definitivo.

Non inventare recensioni, partnership, certificazioni, prestazioni, servizi, promozioni o dati commerciali presentandoli come reali. I servizi descritti sul sito di riferimento non sono automaticamente servizi offerti da LGE.

Modalità di invio delle richieste, destinatari del modulo, aggiornamento automatico delle recensioni e altri strumenti esterni restano da definire. Il collegamento alla scheda Google reale e la trascrizione delle recensioni sono stati autorizzati; il dataset attuale contiene nove recensioni statiche e l’API Google futura non è attiva. Non aggiungere chat, analytics, blog o altre integrazioni senza una richiesta pertinente.

## 10. Roadmap

| Fase | Obiettivo                                                     | Stato                                                                                                   |
| ---- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| 1    | Comprensione, brief, analisi del riferimento e pianificazione | Completata per la homepage                                                                              |
| 2    | Setup tecnico iniziale                                        | Realizzato in `Sito/`                                                                                   |
| 3    | Realizzazione della hero                                      | Realizzata e verificata su desktop e smartphone                                                         |
| 4    | Navbar e navigazione                                          | Navbar traslucida, dropdown desktop e menu mobile animato implementati                                  |
| 5    | Sezioni della homepage                                        | Realizzate nell'ordine richiesto                                                                        |
| 6    | Pagine interne                                                | Pagine provvisorie con navigazione; contenuti completi da autorizzare                                   |
| 7    | Ottimizzazione delle animazioni                               | Implementata, con controlli di pausa e movimento ridotto                                                |
| 8    | Verifica e rifinitura responsive e accessibilità              | Controlli locali documentati; dispositivi fisici e audit completo da eseguire prima della pubblicazione |
| 9    | SEO, performance, testing e rifiniture finali                 | Verifiche locali implementate; hosting e SEO di produzione da definire                                  |

**Aggiornamento del 23 ottobre 2026:** setup, hero, sezioni della homepage, routing provvisorio, animazioni e verifiche locali della homepage sono stati realizzati in `Sito/`. La navbar è stata aggiunta su richiesta successiva, con la variante bianca traslucida indicata durante la verifica e il logo centrale condiviso con l’introduzione della hero. Le voci attuali sono Home, Soluzioni, I nostri lavori, Competenze, Recensioni e Contatti. Non sono state realizzate le pagine interne complete. Il dettaglio dei controlli, degli asset AI provvisori, dei limiti di verifica e delle informazioni mancanti è in `Sito/README.md`. Pubblicazione, dati aziendali, testi legali e contenuti definitivi rimangono da consolidare.

Ogni fase viene discussa, sviluppata e verificata prima di passare alla successiva. Responsive, accessibilità, SEO e performance sono criteri continui: le fasi finali ne approfondiscono la verifica.

Non generare l'intero sito in un'unica soluzione e non anticipare sezioni o funzionalità non richieste.

## 11. Decisioni da consolidare nelle prossime fasi

- Font e palette definitiva del sito ufficiale, a partire dal logo ora disponibile.
- Asset e tecnica della hero, con alternativa accessibile.
- Denominazione ufficiale e materiali autorizzati Gibus.
- Contenuti reali, riferimenti aziendali e marchi partner.
- Dettagli della richiesta di consulenza/preventivo e integrazione recensioni.
- Hosting, invio dei moduli e strategia SEO di pubblicazione.

Aggiornare questo documento quando vengono concordate decisioni che cambiano il progetto, mantenendo distinguibili requisiti, proposte e aspetti ancora aperti.

### Rifinitura visiva del 28 ottobre 2026

Titoli coerenti in Cormorant Garamond, parti in corsivo nel blu ufficiale `#014380`, eccetto il corsivo chiaro concordato per il titolo delle Competenze sul fondo scuro; `--color-blue` ora rimanda a `--color-brand-blue`. Hero con sottotitolo «Ogni ambiente merita di essere vissuto al meglio.». Ingresso della galleria esteso a 1,8 s, stagger 0,2 s, senza cambiare il carosello o il dialogo fotografico. Spazi verticali centralizzati in `--section-space: clamp(48px, 5.5vw, 80px)` e `--section-heading-gap: clamp(32px, 3.6vw, 52px)`; ridotti i margini interni inferiori dei caroselli, evitando spazio aggiuntivo tra Recensioni e Contatti.

Nel menu mobile eliminati «Esplora LGE» e la firma inferiore, peso delle voci 400 e chevron a 14 px dal testo. Restano focus, hamburger, sottomenu, Esc e blocco dello sfondo. Il footer usa `lge-footer-white.png`, originale trasparente 2171×724 copiato senza alterazioni; originale conservato anche in `img/Logo LGE bianco - lineare.png`.

Ultima precisazione concordata: titolo e sottotitolo delle Competenze sono entrambi sul fondo scuro, con «competenza» in corsivo chiaro. Il footer è stato arricchito con le cinque soluzioni e i recapiti sotto al logo; il controllo manuale per il movimento è stato eliminato su richiesta, lasciando il supporto a `prefers-reduced-motion`.

Foto hero aggiornate il 28 ottobre 2026 con i cinque file forniti dall’utente: infissi.jpg → Infissi; Oscuranti e sicurezza.png → Oscuranti; Ingresso moderno in legno e vetro.png → Porte e sicurezza; Soggiorno moderno con porta in legno.png → Porte interne; Pergola moderna al crepuscolo.png → Atelier Gibus. Immagini della hero separate dalla galleria, originali conservati in Sito/references/hero-supplied e varianti WebP 480/960 in Sito/public/img/hero. Inquadratura CSS dedicata alla porta interna e agli oscuranti, senza modifiche ai file originali.

Rifinitura del footer aggiornata al riferimento del 29 ottobre: logo bianco allineato ai recapiti eliminando soltanto lo spazio trasparente mediante CSS, senza modificare il file o le proporzioni; telefono, indirizzo ed email, in quest’ordine, con icone lineari in cerchi discreti e testo da 13 px su mobile/tablet e 14 px su desktop. Colonne «Soluzioni» ed «Esplora» senza i precedenti accenti blu, con cinque categorie e quattro collegamenti di sezione; nessuna voce «Chi siamo». Tre colonne da 1000 px; identità e recapiti affiancati sui tablet, gruppi di navigazione in due colonne sotto l’identità sui telefoni. Fascia inferiore più compatta, con social circolari da 44 px e copyright dinamico, disposto in fondo su mobile. Telefono e WhatsApp restano +39 334 600 8313 e Instagram resta collegato al profilo ufficiale @atelier_gibus_campiflegrei. L’email info@lgesolutions.it è stata confermata dal titolare il 29 ottobre 2026 ed è collegata tramite mailto. Il link «Privacy Policy» è ora presente e apre la bozza locale `/privacy-policy`, non ancora approvata né pubblicata. Sfondo antracite e assenza di reveal conservati.

Aggiornamento navbar del 28 ottobre 2026: «Soluzioni» non viene sottolineata nella homepage, neppure all’ancora #prodotti o durante l’apertura del menu. La linea indica esclusivamente una delle pagine prodotto associate, con lo stesso comportamento su desktop, tablet e smartphone. Le pagine prodotto mostrano navbar, footer, titolo e messaggio di preparazione.

Pubblicazione autorizzata il 28 ottobre 2026 nell’account GitHub personale verificato `NunzioMerone`: repository pubblico `lge-home-solutions`, con il sito attuale in `Sito/`, asset e documentazione. I prototipi storici restano separati e conservati localmente. GitHub Pages pubblica la homepage su `https://nunziomerone.github.io/lge-home-solutions/`; il workflow su `main` esegue controllo privacy, lint, test, build e deploy. Dal 29 ottobre la bozza privacy locale impedisce nuove pubblicazioni finché dati e revisione non sono completati, mentre il sito già pubblicato rimane invariato. I percorsi delle risorse e React Router rispettano il prefisso del repository, mantenendo lo sviluppo locale alla radice. Le cinque rotte prodotto hanno punti di ingresso statici per l’accesso diretto su Pages e mostrano navigazione, titolo e messaggio di preparazione.

Aggiornamento responsive del 28 ottobre 2026: tutte le frecce dei caroselli sono nascoste sotto 700 px e disponibili da tablet in su. La semplificazione iniziale dei lavori sui telefoni è stata superata il 29 ottobre 2026: anche sotto 700 px è ripristinato il coverflow, con fotografia centrale in evidenza e laterali più piccole. Le dimensioni delle slide restano stabili durante lo swipe; si animano soltanto scala e opacità delle fotografie interne. Le frecce restano nascoste sui telefoni e il movimento ridotto è rispettato. Il canvas del documento riprende l’antracite del footer per evitare una fascia chiara nell’area esposta dal browser mobile oltre il fondo, mentre il contenuto mantiene il fondo chiaro. Le cinque pagine prodotto condividono navbar e footer e mostrano titolo della categoria e testo di sezione in preparazione; i percorsi con slash finale sono riconosciuti anche su GitHub Pages.

### Materiali aziendali del 28 ottobre 2026

Il footer usa ora `lge-footer-white-official.png`, copia esatta del nuovo logo trasparente 1000×1000; originale archiviato anche in `img/Logo-LGE-(Png-Bianco).png`. Le cartelle originali `Attestati/` e `foto_lavori_lge/` sono conservate localmente ed escluse da Git: il sito contiene soltanto le immagini ottimizzate autorizzate e la sintesi editoriale dei documenti. Nella prima fase del 28 ottobre le scansioni non erano pubblicate; dal 29 ottobre l’utente autorizza l’inserimento dei sette documenti nella nuova pagina locale `/competenze`. Questa modifica non avvia un deploy.

Pagina Competenze, rifinitura del 29 ottobre: rimossa la navigazione «Home / Competenze»; testi ampliati sulla base degli attestati e spazi desktop riequilibrati. Le cinque nuove immagini PNG fornite dall’utente sostituiscono i precedenti derivati fotografici HEIC; i due PDF restano invariati. Apertura essenziale con sola immagine e X, ingresso graduale dei singoli blocchi e zoom interno lieve degli attestati in hover/focus.


Revisione visiva della pagina Lavori: su richiesta dell’utente viene sostituita l’estetica della prima implementazione. Nuova hero fotografica calda su fondo greige, con composizione outdoor/interno e titolo «Il nostro lavoro, la vostra casa.». Indice di categorie fotografiche senza numeri, gallerie con proporzioni originali e colonne stabili al caricamento progressivo. Sei anteprime per ciascuna categoria nella panoramica; raccolta completa filtrabile con URL e ancora dedicati. Tutte le foto restano autentiche e ingrandibili. Nessuna modifica alla selezione della homepage.


## Cronologia — confronto fra le hero, concluso il 3 novembre 2026

Il 29 ottobre 2026 l’utente autorizza la copia del sito locale attuale in `Sito_Hero_PT2/`, progetto indipendente nel repository personale `NunzioMerone/lge-home-solutions-hero-pt2`, con secondo sito GitHub Pages. La hero iniziale resta identica; i prossimi interventi riguarderanno soltanto la nuova hero e i collegamenti necessari. Il sito originale non viene sostituito. Identità e contenuti restano LGE Home Solutions: Hero PT2 distingue il progetto tecnico. Porta locale 5177. La copia viene pubblicata come demo non indicizzata, mantenendo la Privacy Policy in revisione; il workflow della sola demo segnala il controllo senza registrare un’approvazione legale fittizia.


Hero PT2 pubblicata sul repository personale `https://github.com/NunzioMerone/lge-home-solutions-hero-pt2`, commit iniziale `7cc93de`. GitHub Pages attivo su `https://nunziomerone.github.io/lge-home-solutions-hero-pt2/`. Build e 25 test passati anche su GitHub Actions; pagina iniziale e URL diretti Lavori/Privacy verificati nel browser. La hero e tutti gli asset restano identici alla copia iniziale. Il solo hook dei metadati conserva noindex nella demo. Il repository e il deploy originali non sono stati modificati.


### Hero fotografica PT2 e pubblicazione delle due versioni

L’utente chiede una hero fotografica esclusivamente in `Sito_Hero_PT2/`: prima immagine fornita su desktop, sfondo verticale pulito su mobile/tablet, titolo animato a sinistra, sottotitolo e link WhatsApp. Le card precedenti passano nella sezione «Le nostre soluzioni», prima dei partner. La revisione mobile abbassa il testo e aumenta le distanze, riservando una zona chiara a WhatsApp. La hero originale in `Sito/` resta invariata.

È richiesta la pubblicazione di tutte le modifiche accumulate anche sul primo sito, mantenendo le due cartelle e i due repository indipendenti. Entrambe le versioni GitHub Pages sono anteprime pubbliche non indicizzate; la Privacy Policy conserva lo stato reale di revisione, senza impostare approved fittiziamente. Il controllo viene eseguito come segnalazione consultiva nei workflow delle anteprime. Per una release definitiva sarà necessario completare la revisione e ripristinare il vincolo di pubblicazione pertinente.

### Nuovo montaggio video della hero — 5 novembre 2026

L’utente approva la direzione della prova con ambienti vissuti, persone in alcune scene, movimenti lenti e dissolvenze morbide. Chiede un montaggio più rappresentativo dell’intera offerta: infissi, oscuranti, porte interne, ingressi e outdoor, con minore predominanza di Gibus. Esclude il primo piano della donna che beve vino e la scena finale del ballo. Autorizza la ricerca ampia e il download gratuito dei filmati pertinenti dai siti e dai canali pubblici dei partner reali.

La revisione completa è preparata in `Sito/references/hero-video-final/`, con sorgenti documentate, montaggio riproducibile, master, versioni web e poster per desktop, tablet e mobile. Le due prove precedenti restano materiali locali di riferimento. L’utente approva Rev03 e ne richiede l’inserimento nella hero esclusivamente in locale. La revisione successiva rimuove WhatsApp e il comando pausa video dalla hero e sostituisce la macchina da scrivere con una dissolvenza morbida dell’intera frase da sinistra a destra. Dopo la prova dell’overlay bianco localizzato, l’utente richiede un velo scuro molto discreto sull’intero lato sinistro: antracite al 42% sul bordo, 30% al 26% della larghezza, 12% al 46% e trasparente al 65%, con testi chiari e ombra delicata. Nessuna fascia bianca attorno al testo. Ingresso in 1,6 secondi, lettura per 3,2 secondi e uscita in dissolvenza da 0,85 secondi, senza cursore. Gli asset web approvati sono copiati in `Sito/public/media/hero/`, con provenienza e hash in `Sito/references/hero-video-integration.json`. La selezione responsive carica un solo filmato; riproduzione silenziosa in loop, sospensione automatica fuori vista o a scheda nascosta, poster statico e titolo fermo con movimento ridotto. Nessuna pubblicazione viene avviata. Le scene dei produttori restano distinte dalle realizzazioni LGE; diritti di riutilizzo e modelli specifici devono essere verificati prima dell’impiego online.

### Revisione calda del video — Rev04, 5 novembre 2026

L’utente approva l’aspetto della hero e chiede un video più ispirante, più lento e più caldo. Chiede di togliere la donna al vetro e rivalutare gli interni, mantenendo le scene outdoor riuscite. La nuova proposta locale contiene sette scene: tavola sotto la tenda Gibus, finestra VEKA nella luce dorata, mansarda VELUX con legno e luce naturale, famiglia vicino alla vetrata, finestra con tende morbide, relax sotto la pergola e lettura con schermature. Rimossi gli estratti New Solar e gli inserti tecnici I-PEA, DoorArreda e TEHNi. La selezione privilegia finestre, schermature e outdoor e non pretende di mostrare tutte le categorie.

Le nuove ricerche comprendono i film residenziali VELUX da siti ufficiali e dalla produzione Social Content Factory, oltre al film Gibus della produzione Quasar; alternative e motivi delle esclusioni sono in `Sito/references/hero-video-warm/research.json`. Colore caldo tenue per ripresa, movimenti rallentati e interpolati, dissolvenze da 28 fotogrammi invece di 20. File da 820 fotogrammi a 24 fps (34,167 secondi), riprodotto nella hero a 0,85× per circa 40,2 secondi. Dimensioni responsive invariate, poster aggiornati e percorsi pubblici con suffisso `rev04`. Layout, overlay antracite, testi e animazione del titolo restano quelli approvati. Il montaggio precedente è conservato. Nessuna pubblicazione: la nuova selezione va valutata dall’utente nell’anteprima locale.

### Titolo più lento e logo adattivo — 5 novembre 2026

L’utente chiede di ripristinare il blu originale `#014380` nella frase ciclica, rimosso durante la revisione dell’overlay. Ingresso da sinistra a destra portato da 1,6 a 2,6 secondi, permanenza completa da 3,2 a 5,5 secondi, uscita da 0,85 a 1,6 secondi; pausa tra frasi da 0,22 a 0,3 secondi. Il logo orizzontale con scritta laterale diventa bianco sulla hero trasparente e torna colorato quando la navbar assume il fondo durante lo scroll (oltre 24 px). Anche il menu mobile aperto e le altre pagine usano la versione colorata. Il filtro CSS sulla stessa immagine nitida conserva alpha, forme e proporzioni; nessuna sostituzione con il vecchio derivato bianco di qualità inferiore. Il video Rev04 e l’overlay restano invariati. Modifica esclusivamente locale.

### Accento Sabbia e qualità video — Rev05, 5 novembre 2026

Dopo il confronto sul filmato reale fra blu chiaro, Sabbia e antracite, l’utente sceglie **Sabbia `#EDD5B3`** per la frase animata. Il token dedicato `--color-hero-accent` separa questo accento dal blu originale del marchio; prefisso, sottotitolo e logo restano bianchi sulla hero. L’overlay e i tempi del titolo approvati non cambiano. Questa scelta sostituisce il precedente ripristino del blu nella frase ciclica.

La prova Rev05 conserva sei delle sette scene Rev04 e sostituisce la famiglia presso la vetrata, disponibile solo a 1100×618, con la porta d’ingresso reale in legno TEHNi: movimento lento dal basso, senza dimostrazione della serratura né didascalie. Le due scene VEKA usano ora la copia pubblica 3840×2160 della medesima campagna. Export desktop 1920×1080 e tablet 1280×960; mobile resta 720×1280, con inquadrature dedicate. Interpolazione prima degli eventuali ingrandimenti, nessun filtro di sharpening. Restano limiti delle fonti Gibus 720p e la profondità di campo artistica delle finestre VEKA: un export maggiore non ripristina dettagli assenti.

Montaggio: 860 fotogrammi a 24 fps, 35,833 secondi; circa 42,2 secondi nella hero a 0,85×. Dissolvenze da 28 fotogrammi e raccordo del loop mantenuti. Le ricerche sulle porte interne non hanno prodotto una nuova ripresa di qualità coerente: esclusi render luminosi, dimostrazioni compresse e social verticali invadenti. Fonti e ragioni delle esclusioni in `Sito/references/hero-video-refinement/`; Rev04 resta conservata. Il colore è approvato, il nuovo montaggio è una prova locale da valutare. Nessuna pubblicazione o modifica dell’online.

### Porte interne da nuove fonti gratuite — Rev06, 5 novembre 2026

L’utente rifiuta l’alternativa DoorArreda girata in showroom e autorizza autonomamente altri download gratuiti per migliorare la selezione. Due scene stock Pexels native 3840×2160 vengono aggiunte alla Rev05: una porta bianca vetrata con maniglia in ottone e ambiente arredato (Taryn Elliott, 9583985) e un corridoio contemporaneo con porta scura, parquet e luce radente calda (Kindel Media, 7578548). Riprese reali con movimento lento, senza UI social, dimostrazioni tecniche o perimetri luminosi artificiali. Le licenze delle due schede e la Pexels License sono verificate: uso e montaggio gratuiti, senza attribuzione obbligatoria e senza implicare endorsement. Queste due scene sono d’atmosfera e non sono attribuite a prodotti dei partner, lavori o clienti LGE.

Restano tutte le scene Rev05 e l’aspetto approvato della hero: nove scene, 1080 fotogrammi a 24 fps, file da 45 secondi e giro da circa 52,94 secondi a 0,85×. Dissolvenze da 28 fotogrammi e raccordo del loop mantenuti. Export desktop 1920×1080, tablet 1280×960 e mobile 720×1280 con ritagli dedicati alle porte. Correzione lieve della dominante ciano della porta bianca verso neutri più caldi; il corridoio conserva la luce calda originale. Fonti, licenze, esclusioni e montaggio in `Sito/references/hero-video-interiors/`; Rev05 resta conservata in `hero-video-refinement/`. Il nuovo montaggio è una proposta locale da valutare, senza pubblicazione.

### Prova mobile con testi in basso — 5 novembre 2026

L’utente chiede di provare il testo della hero mobile in basso a sinistra e un parere sul risultato. Sotto 700 px il blocco usa la larghezza disponibile fino a 26rem, mantiene l’allineamento a sinistra e si appoggia al fondo con spazio da 32 a 56 px più safe area (24 px più safe area sui display bassi). Il titolo cresce a `clamp(2rem, 9.5vw, 2.65rem)`, evitando la precedente colonna stretta. L’overlay mobile passa a una sfumatura dal basso (58% al bordo, 40% al 28%, 15% al 48%, trasparente al 68%) e un velo superiore al 30% che sfuma entro il 24%, per accompagnare il logo. I testi, il colore Sabbia, l’animazione e il video Rev06 restano quelli esistenti; nessuna modifica ai layout da 700 px in su. È una prova locale da valutare, non un’approvazione definitiva e non una pubblicazione.

### Pubblicazione del checkpoint corrente — 5 novembre 2026

L’utente chiede di pubblicare tutto il lavoro sviluppato finora sul repository personale `NunzioMerone/lge-home-solutions` e ricevere il link aggiornato. Questa richiesta autorizza commit e push su `main`, attivando il workflow esistente `.github/workflows/deploy.yml`, e sostituisce i precedenti limiti alla sola prova locale per il checkpoint attuale. Sono inclusi la hero Rev06 responsive, il layout mobile con testo in basso a sinistra, titolo Sabbia e logo adattivo, la pagina Infissi completa e le transizioni fra card e pagina prodotto. Asset web ottimizzati, codice e documentazione vengono versionati; sorgenti pesanti, cache, pacchetti video e payload grezzi di ricerca restano locali. L’anteprima rimane non indicizzata e lo stato della Privacy Policy non viene alterato. Le fonti delle immagini e dei filmati restano documentate senza attribuire le scene stock a prodotti o lavori LGE.

### Correzioni mobile e riproduzione — Rev07, 5 novembre 2026

L’utente richiede tutte le correzioni e il push. Il montaggio conserva le nove scene, i colori e il ritmo approvati, ma incorpora il precedente rallentamento 0,85× negli originali interpolati: 1588 fotogrammi a 30 fps, 52,933 secondi a 1× nel browser. H.264 faststart con bitrate limitato per formato; i file pesano 20,20 MB desktop, 12,93 MB tablet e 9,27 MB mobile. Tutti i fotogrammi sono verificati mediante decodifica completa. Ricetta e risultati in `Sito/references/hero-video-playback/`; hash delle copie attive nel manifest di integrazione. Le fonti originali e Rev06 restano conservate.

La transizione attende la prima decodifica della foto, con fallback per errore o timeout; i cambi di altezza della barra del browser mobile non la annullano. Tutte le cinque soluzioni condividono l’espansione della stessa immagine verso la hero della relativa pagina. Sui telefoni le foto sono intere e le didascalie occupano lo spazio sotto l’immagine; le quattro pagine diverse da Infissi restano in preparazione sotto la nuova hero. I visualizzatori mantengono il ripristino del focus senza contorno da tastiera dopo un tap; passando alla tastiera l’indicatore resta visibile. Le competenze della homepage sono centrate su mobile e gli orari vengono rimossi dai contatti. Pubblicazione su `main` e GitHub Pages richiesta esplicitamente; l’anteprima rimane non indicizzata e la Privacy Policy conserva lo stato reale.

Verifica del checkpoint: 28 test in sette file, lint, typecheck e build per Pages superati; controlli nel browser a 390×844, 1024×768 e 1440×900. Verificate le cinque transizioni su mobile, le foto intere con didascalie separate, i visualizzatori foto e attestati/PDF (tap senza contorno e focus da tastiera visibile), centratura delle competenze e rimozione degli orari. Verificato il caricamento di ciascuna variante video a 1×. Nessuna misura prestazionale su telefoni fisici; il browser di verifica non espone i contatori dei frame persi. Le preferenze di movimento del sistema restano rispettate dal codice.


### Safari, card e navigazione conservata — Rev08, 5 novembre 2026

L’utente segnala ancora scatti su iPhone con Safari e precisa che le card non dovevano essere eliminate: deve vedersi il prodotto intero, anche su desktop, avvicinandolo se troppo distante. Si mantengono card compatte con bordo, immagine e didascalia nello spazio riservato al loro interno; inquadrature mirate per infisso, oscuranti e porte, senza richiedere l’intera foto d’ambiente. La home visitata resta montata e nascosta/inert durante le visite alle pagine interne: video sospeso, caroselli conservati, niente ripetizione degli ingressi. Indietro ripristina la posizione registrata, mentre i link espliciti Home e sezione raggiungono le rispettive ancore. Le pagine secondarie caricano codice e CSS su richiesta; le semplici entrate delle sezioni usano IntersectionObserver. Il bundle principale scende da 520,37 a circa 444,10 KB.

Il video conserva scene, ritmo, colori, dimensioni e sorgenti H.264/poster Rev07. Si aggiunge HEVC Main 8 bit hvc1 per il portrait, scelto dal browser se supportato: 6.070.748 byte, -34,53% rispetto al fallback H.264. 30 fps, 1588 fotogrammi, timebase 90 kHz, faststart, senza audio. VMAF campionato ogni cinque fotogrammi rispetto al precedente H.264: media 94,45. Le prove H.264 più compresse sono escluse perché perdevano troppo dettaglio. Su Safari macOS, in una prova portrait da 138,5 secondi, oltre due giri, sono osservati 4148 frame presentati, 1 perso, nessuna attesa dopo avvio e nessun intervallo fra frame oltre 100 ms. Non è una misura su iPhone fisico o rete mobile. Ricetta, confronto e prove in `Sito/references/hero-video-safari/`. Il fallback H.264 resta verificato nel browser in-app. Push e pubblicazione richiesti, anteprima non indicizzata e Privacy Policy invariata.

Verifica della revisione: 32 test, lint, typecheck e build superati. Navigazione mobile con tap reale sulle coordinate della card: scroll 487 px prima e dopo Indietro, quarta card conservata e video da 50,21 a 50,30 s, senza ricreazione del nodo; nessun overlay residuo. Pagina Competenze, Lavori e Privacy verificate dopo il caricamento differito. Prodotti visibili e didascalie separate dall’immagine all’interno delle card verificati a 390 e 1600 px; assenza di overflow orizzontale. Il bundle principale finale è 444,34 KB (143,97 KB gzip); ScrollTrigger resta nel solo chunk Competenze. Le sorgenti e i file H.264 precedenti restano invariati.


### Continuità delle immagini e skeleton — 6 novembre 2026, solo locale

L’utente segnala un salto di ritaglio nelle transizioni delle card Oscuranti e Porte e sicurezza, più ingrandite delle altre. La nuova transizione misura il rettangolo della foto effettivamente dipinta, compresi zoom e object-position, e anima posizione e dimensioni del bitmap dentro la cornice fino alla hero. Non ricalcola il ritaglio applicando una seconda scala alla copia. Gli altri comportamenti, il ritorno con Indietro e i dispositivi di destinazione restano quelli approvati.

La schermata di attesa testuale viene sostituita da skeleton responsive distinti: titolo centrato, testi e attestati per Competenze; composizione fotografica e categorie per Lavori; impaginazione testuale per Privacy. Navbar e footer restano disponibili. Skeleton anche per mappa, recensioni e prima immagine delle pagine prodotto; annuncio accessibile e rispetto del movimento ridotto. Nessun ritardo minimo viene aggiunto al caricamento. La pagina locale `Sito/references/loading-preview/` permette di vedere stabilmente le anteprime e controllare la copia al primo fotogramma. Richiesta limitata al locale sulla porta 5175: nessun push o deploy.

Verifiche locali: 36 test superati, lint, typecheck e build completati. Controllate le transizioni di Oscuranti e Porte e sicurezza a 390 e 1600 px, la rimozione delle copie a fine animazione e il focus sul titolo. Skeleton Competenze, Lavori e Privacy verificati su mobile senza overflow; controllato anche Competenze su desktop e il primo accesso reale alla pagina differita. Nessun errore o avviso nella console del browser durante la verifica.

### Sezione showroom e curve coerenti — 6 novembre 2026, solo locale

L’utente fornisce due riferimenti, desktop e mobile, per «Vieni a trovarci». Fondo caldo, etichetta «Il nostro showroom», titolo serif con accento blu e descrizione della visita. Su desktop la grande foto occupa la colonna destra; a sinistra si trovano introduzione, riquadro WhatsApp/su appuntamento e indirizzo con mappa. Sotto 1200 px la foto orizzontale segue il testo e precede i riquadri; sotto 600 px anche il riquadro prenotazione e quello delle indicazioni si dispongono verticalmente. Mappa Leaflet e contatti verificati restano reali; telefono, email e Instagram rimangono disponibili nel footer. Nessun ritorno degli orari.

Le fotografie sono porzioni delle immagini di riferimento fornite, provvisorie fino alla consegna di una foto reale dello showroom. Gli originali restano in `Sito/references/mockups/contacts/`; i due asset web sono viewport SVG autonomi con WebP incorporato, senza testi del mockup visibili e senza alterare la proporzione della foto. Si carica solo il formato appropriato, in modo differito e con skeleton fino al caricamento. La richiesta successiva uniforma la curvatura a quella delle card delle soluzioni: token condiviso `--radius: 8px` per foto, card, pannelli e pulsanti, inclusi i visualizzatori e le pagine secondarie; indicatori di posizione, avatar e simboli circolari conservano la loro forma. Correzione successiva dell’utente: anche le frecce di tutti i caroselli devono conservare la forma tonda originale, con `border-radius: 50%`, come eccezione al raggio condiviso. Revisione locale senza pubblicazione.

Verifiche: layout a 390, 1024 e 1440 px senza overflow orizzontale; sorgente fotografica corretta per ciascun formato, raggio calcolato di 8 px e mappa con segnaposto centrato anche dopo il resize. Controllati destinazioni WhatsApp e Google Maps, comandi della mappa da 44 px e caricamento delle tessere. 36 test, lint, typecheck e build superati. Nessun errore o avviso nella console durante la verifica locale.

### Inquadratura mobile dell’oscurante — Rev09, 6 novembre 2026, solo locale

L’utente chiede di dare risalto all’oscurante nella scena con l’uomo seduto. Solo l’ultimo segmento Gibus screens del video portrait viene rifatto dall’originale, spostando il punto focale da 0,60 → 0,65 a 0,14 → 0,18: schermatura in primo piano e uomo marginale. Le altre otto scene usano gli stessi segmenti preparati; ordine, ritmo, colori, dissolvenze, 30 fps e durata di 52,933 secondi restano invariati. Aggiornati sia H.264 sia HEVC Safari con nomi Rev09 per distinguere le risorse nella cache. Desktop, tablet e tutti i poster conservano gli hash precedenti. Ricetta, snapshot del manifest precedente e verifiche in `Sito/references/hero-video-mobile-shading/`. Nessun push o pubblicazione.

Entrambi gli export sono decodificati integralmente: 1588 fotogrammi, timestamp equidistanti su timebase 90 kHz, GOP massimo 60 e faststart. H.264 9.287.871 byte, HEVC 5.916.954 byte. Verificato il ritaglio ai secondi 45,3 e 48 nella hero reale in iframe 390 × 844 con il fallback H.264; la sorgente HEVC è verificata con FFmpeg. La pagina locale `preview.html` consente di controllare la scena senza attendere tutto il giro.

### Due video Pinterest e rimozione della porta datata — Rev10, 6 novembre 2026, solo locale

L’utente fornisce i Pin `https://pin.it/1VjhVbhGf` e `https://pin.it/1DQA2BczG` e chiede di eliminarne dal montaggio precedente la porta bianca vetrata con maniglia dorata. Il segmento Pexels 9583985 viene rimosso completamente, incluse le dissolvenze collegate. Dal primo Pin (titolo Domino Infissi / Ultraresina) si selezionano il dettaglio del profilo e il soggiorno con tende chiare; dal secondo la vetrata sul paesaggio con luce progressivamente calda. I tre inserti evitano tagli interni e la sigla finale del filmato. Non sono dichiarati prodotti, installazioni o partner LGE verificati. Fonti, selezioni e URL diretti in `Sito/references/hero-video-pinterest/`. Scaricamento e montaggio sono autorizzati per questa prova locale, senza nuova autorizzazione alla pubblicazione o licenza commerciale verificata.

I filmati consegnati da Pinterest sono 720×1280, malgrado i metadati nominali 1080×1920; controllate le playlist pubbliche H.264 e HEVC. I ritagli widescreen e tablet si eseguono alla risoluzione nativa utile prima dell’interpolazione e dell’ingrandimento. Il montaggio finale comprende undici scene e 1769 fotogrammi a 30 fps, per 58,967 secondi; dissolvenze da 41 fotogrammi, colore caldo naturale e loop continuo. Le otto scene mantenute conservano tempi, trattamento e sorgenti preparate, compreso il ritaglio Rev09 che privilegia l’oscurante su mobile. Aggiornati tutti i video a Rev10, con H.264 nei tre formati e HEVC portrait per Safari; poster invariati. Hero, testi, overlay, logo e layout non cambiano.

Verifiche Rev10: decodifica integrale dei quattro file, 1769 timestamp equidistanti, GOP massimo 60, faststart e assenza di audio. Dimensioni: H.264 desktop 22.324.920 byte, tablet 14.374.177 byte, mobile 10.314.103 byte; HEVC mobile 7.135.911 byte. Controllati nella hero reale i tre formati, tutti i nuovi inserti mobile e il ritaglio dell’oscurante. Riproduzione H.264 osservata dal secondo 14,60 al 30,73; nessuna misura nuova su iPhone fisico. Il video si rimonta anche al cambio URL della sorgente, così l’aggiornamento del file in locale non lascia attivo il vecchio filmato nelle schede aperte. 36 test, lint, typecheck e build superati.


### Selezione leggibile e qualità responsive — Rev11, 6 novembre 2026, solo locale

L’utente rifiuta il macro del profilo in legno Rev10 perché poco comprensibile e molto sgranato su web, chiedendo nuove selezioni ed export verificati per desktop, tablet e smartphone. Il macro e il precedente soggiorno scuro sono eliminati in tutti i formati. La porta bianca con vecchia maniglia dorata rimane esclusa. Per desktop e tablet landscape si selezionano due nuove riprese reali Pexels native 3840×2160 di Alef Morais: interno con grandi vetrate e ingresso in legno (40807450) e facciata vetrata nella luce del tramonto (40807486). Sono scene stock d’atmosfera, non installazioni o prodotti LGE verificati; licenza gratuita e possibilità di montaggio controllate sulle schede ufficiali e sulla Pexels License.

La versione portrait usa invece due inquadrature complete dai Pin forniti: lo scorrevole panoramico del secondo video (5,80–9,64 s) e la finestra con tende nella sala da pranzo del primo (23,96–25,92 s). Nessun macro, taglio interno o sigla. Sono mantenute a 720×1280 nativi, senza ricavarne ritagli widescreen. La ricerca degli originali comprende il film ufficiale Domino disponibile in 4K, scartato dopo l’ispezione perché composto da presentatrice e dimostrazioni showroom, e la pagina ufficiale Alsysco. Altri cinque stock 4K sono scartati per soggetto secondario, inclinazione della ripresa o controluce eccessivo. Fonti e motivi in `Sito/references/hero-video-quality/research.json`.

Dieci scene, 1768 fotogrammi e 58,933 secondi a 30 fps, con identiche durate nei tre montaggi, dissolvenze da 41 frame e loop raccordato. Le otto scene già approvate conservano gli stessi segmenti, compreso il crop Rev09 dell’oscurante. Export H.264 desktop 1920×1080, tablet 1280×960, mobile 720×1280; HEVC portrait hvc1 con fallback. CRF 19 desktop, 20 tablet/mobile e 21 HEVC, con bitrate limitato, faststart, GOP 60 e nessuna traccia audio. La compressione meno aggressiva conserva meglio i bordi, senza filtri di nitidezza o dettagli artificiali. I limiti nativi delle fonti Gibus 720p e Pinterest restano espliciti. Poster, testi, animazione Sabbia, logo e overlay conservati.

Tutti e quattro i file sono decodificati integralmente: 1768 timestamp equidistanti, dimensioni e codec corretti, faststart e nessun errore di decodifica. File H.264 desktop 33.985.042 byte, tablet 18.886.084 byte, mobile 11.745.488 byte; HEVC mobile 7.893.094 byte. Ricetta, controllo dei ritagli effettivi, esclusione degli estratti rifiutati e hash degli asset in `Sito/references/hero-video-quality/`; manifest di integrazione aggiornato. Rev10 e tutte le fonti restano conservate. 36 test, lint, typecheck e build superati. Nessun push o deploy.

Verifica nella hero reale a 360×780, 390×844, 430×932, 768×1024, 1024×768 e 1440×900: sorgenti responsive corrette, nessun overflow orizzontale, nuove finestre e crop dell’oscurante controllati visivamente. Misure H.264 nel browser in-app: mobile 115,1 s / 3453 frame / 2 loop, desktop 88,3 s / 2651 frame / 1 loop, tablet 75,6 s / 2270 frame / 1 loop. Nessun frame perso o intervallo di presentazione oltre 100 ms; intervallo massimo 67–69 ms. Rilevati rispettivamente 2/1/1 eventi waiting ai passaggi di loop e nessun evento stalled. Dati grezzi in `browser-verification.json`. La verifica non misura Safari su iPhone fisico o la rete mobile; HEVC verificato mediante decodifica completa.


### Dimensioni della sezione showroom — 6 novembre 2026, solo locale

L’utente chiede di allineare «Vieni a trovarci» alle proporzioni delle altre sezioni. Titolo con il token condiviso `--font-size-section-title`, descrizione 0.9rem, pulsanti 0.8125rem e WhatsApp alto 50 px. Etichette, icone, indirizzo e spaziature diventano più compatti; rimossi gli ingrandimenti specifici dei monitor grandi e il vincolo minimo della foto a 600 px. La foto desktop si adatta all’altezza dei contenuti.

La successiva prova a quattro foto viene annullata esplicitamente dall’utente. Si ripristinano la composizione precedente con una sola foto, il testo originale, i riquadri appuntamento e indicazioni e la mappa affiancata all’indirizzo su desktop, conservando le dimensioni appena uniformate. Nessuna variazione al video o al resto del sito. Solo locale, nessun push o deploy.


### Pagina Lavori fotografica e filtri persistenti — 6 novembre 2026, solo locale

L’utente fornisce un riferimento desktop/mobile e richiede le stesse fotografie delle soluzioni per i filtri, senza pannelli bianchi o icone, con selezione sfumata nel blu del logo. «Tutti i lavori» ha una copertina a mosaico di quattro cover. Le miniature hanno inquadrature dedicate al prodotto, riprendendo gli avvicinamenti delle card della home. La successiva richiesta le ingrandisce: 124×155 px su mobile, fino a circa 180×225 px sul desktop di verifica. La striscia mobile scorre orizzontalmente e mantiene il filtro selezionato interamente visibile, senza spostare verticalmente la pagina.

La hero usa lo stesso asset decorativo `hero-scene/desktop` già disponibile, distinto dalle fotografie reali dei lavori. Titolo «I nostri lavori», descrizione del riferimento, sfumatura chiara verso sinistra e maggiore altezza. Rimosse l’etichetta «Realizzazioni» e la linea. L’immagine passa sotto la navbar inizialmente trasparente; il comportamento chiaro durante lo scroll e il logo originale restano quelli condivisi.

Il titolo sotto i filtri contiene una parte persistente «I nostri lavori». Se la selezione è diversa da Tutti, si aggiunge a fianco il nome della categoria in corsivo blu con dissolvenza. Il titolo fisso è esterno al componente della griglia che cambia per selezione. Hero, filtri e titolo principale non vengono rimontati al cambio query; i nuovi link non aggiungono ancore che forzino lo scroll e conservano eventuali ancore già presenti. Link diretti e cronologia restano disponibili.

Tutte le 101 immagini originali restano accessibili. La vista Tutti alterna le cinque categorie; la galleria ha una colonna su smartphone, due su tablet e tre su desktop. La distribuzione bilancia le altezze ricavate dalle proporzioni originali, con piccoli sfalsamenti tra colonne. Le immagini rimangono intere; aggiungendo un gruppo di 18 non vengono riassegnate le foto già mostrate. Nessun conteggio visibile e nessuna didascalia inventata. «Altre fotografie» è un’azione testuale senza bordo.

Gli ingressi di hero, filtri, titolo, galleria e invito finale usano la stessa animazione della home. Il nome della categoria ha una dissolvenza autonoma, senza ripetere l’ingresso della parte fissa; la sola nuova galleria compare al cambio filtro. Rispetto del movimento ridotto, focus accessibile e cleanup anche in Strict Mode. Skeleton dedicati nell’attesa del codice della pagina e nel caricamento di hero, filtri, foto e immagine ingrandita. Il visualizzatore conserva foto intera, X, Esc e ripristino del focus e aggiunge navigazione tramite frecce tonde, tastiera e swipe per le raccolte; nessun contatore visibile.

Prova locale sulla porta 5175. Nessun nuovo download, dipendenza, commit, push o deploy; foto dei lavori e originali invariati. Riferimento e note in `Sito/references/mockups/works/`.

Verifiche della revisione Lavori: 38 test in nove file, lint, typecheck e build superati. Griglia, filtri e assenza di overflow controllati a 360, 390, 768, 1024 e 1440 px. Verificati navbar trasparente a scroll zero, sei filtri, titolo fisso con sola categoria in dissolvenza, immagini intere e filtro selezionato interamente visibile su mobile. L’aggiunta da 18 a 32 foto conserva gli elementi precedenti nelle stesse colonne. Il visualizzatore cambia immagine con pulsanti/tastiera e ripristina focus e scroll alla chiusura. Skeleton Lavori verificato con sei filtri e sei segnaposto fotografici, senza overflow. Le prove responsive sono nel browser in-app, non su un telefono fisico. Dati in `Sito/references/mockups/works/verification.json`.

### Rifinitura categoria, invito finale e visualizzatori — 6 novembre 2026, solo locale

La dissolvenza uniforme di 700 ms della categoria è sostituita dalla stessa maschera con bordo sfumato della home: comparsa da sinistra a destra in 2,6 secondi, avviata quando il nome è visibile. Il titolo «I nostri lavori» conserva la propria opacità e non viene rimontato al cambio filtro. Con movimento ridotto il testo è immediatamente leggibile. Etichette dei filtri aumentate a 14 px su mobile e 15 px da 900 px.

Il nuovo riferimento dell’utente guida la fascia dopo le fotografie: «La prossima realizzazione / potrebbe essere la tua.» e invito a raccontare il progetto. La vetrata moderna decorativa a destra sfuma nel fondo chiaro del testo, senza una card separata; su smartphone l’immagine prosegue sotto il testo con sfumatura verticale. Titolo con `--font-size-section-title`, corpo 0.9rem e pulsante 0.8125rem alto 50 px. «Parliamone insieme» apre `https://wa.me/393346008313`, lo stesso contatto della home. La fotografia è ricavata dal riferimento mediante viewport SVG; originale, provenienza e preparazione sono in `Sito/references/mockups/works/contact-source.json`. Non è presentata come un lavoro reale di LGE. Footer conservato.

Foto e attestati condividono la presentazione del dialogo. La X chiara, senza bordo o fondo, si trova sopra l’angolo destro del contenuto e conserva un’area interattiva di 44 px. Le frecce restano tonde e a 12 px dai lati della fotografia su desktop, subito sotto su smartphone; i controlli seguono le dimensioni dell’immagine. Immagini e documenti restano interi, con safe area, navigazione da tastiera, Esc e ripristino del focus. Nessuna nuova dipendenza o pubblicazione.

Verifiche della rifinitura: lint, typecheck/build, formattazione e 38 test superati. Controllate fascia finale a 360, 390, 768 e 1440 px, foto verticali su desktop/mobile, foto orizzontale a 1024 px e documenti portrait/mobile e landscape/desktop. Nessun overflow nelle viste controllate. Verificati cambio foto con pulsanti e tastiera, Esc, sblocco dello scroll e ritorno del focus senza contorno dopo tap. Acquisiti inizio/fine della maschera della categoria mantenendo l’opacità del titolo fisso a 1. Prove nel browser in-app; nessuna verifica su iPhone fisico né modifica della preferenza di movimento del sistema. Dettagli in `Sito/references/mockups/works/verification.json`.

### Selezione della home e navigazione fotografica — 6 novembre 2026, checkpoint autorizzato alla pubblicazione

Lo showroom usa il nuovo segnaposto orizzontale fornito dall’utente, mantenendo intera anche la scritta incorporata; rimossi l’etichetta «Il nostro showroom» e la relativa linea esterne alla foto. Tre WebP responsive sostituiscono le precedenti viewport SVG, archiviate localmente. Titolo, mappa e prenotazione conservano la scala del sito.

La home mostra esattamente le 11 foto della cartella indicata, nelle versioni fornite dall’utente, senza sostituirle con i vecchi originali della raccolta completa. Dati separati in `homeGallery.ts`, varianti WebP 480/960/larghezza nativa e fonti/hash in `home-gallery-selection.json`: circa 24,58 MB di PNG diventano 2,81 MB per tutte e 33 le varianti. Il carosello continua a caricare le sole immagini vicine alla selezione. «Esplora tutti i nostri lavori» diventa un richiamo blu coerente con gli altri pulsanti del sito. Le 101 immagini della pagina completa restano invariate e differite rispetto alla home.

Le colonne della galleria iniziano allineate, conservando il bilanciamento per altezza e le foto intere. «I nostri lavori» resta centrato nella stessa posizione anche quando cambia la lunghezza della categoria o si torna a Tutti; su mobile lo spazio della categoria è riservato nella riga sottostante. Solo la categoria compare con maschera sfumata in 0,9 s. L’immagine finale è contenuta interamente su desktop/tablet e non viene montata sotto 700 px; pulsante «Parliamo su WhatsApp», con icona iniziale come in Competenze.

Il visualizzatore usa il motore Embla già installato: la fotografia segue il trascinamento e lascia entrare la successiva, con loop, frecce e tastiera. La finestra di scorrimento mantiene dimensioni stabili e ogni immagine conserva proporzioni e controlli vicini; i gesti verticali non cambiano fotografia. Sono montate soltanto l’immagine corrente e le due adiacenti, anche nelle raccolte da 101 foto. Gestione del focus, chiusura con Esc/tap e movimento ridotto restano disponibili. Nessuna nuova dipendenza.

Verifica della consegna: 38 test in nove file, lint, typecheck, formattazione e build con base `/lge-home-solutions/` superati. Controllati layout a 360, 390, 768, 1024 e 1440 px, allineamento delle colonne e posizione invariata del titolo al cambio filtro. Verificati swipe in entrambe le direzioni, passaggio ultima/prima, gesto verticale, tastiera, chiusura e ritorno del focus senza contorno dopo tap. Nella build di produzione sono controllati ingresso diretto a Lavori, URL degli asset, immagini caricate e visualizzatore con 101 foto e sole tre immagini montate. Le sette risorse della hero corrispondono per hash al manifest; un solo video nella home, sospeso fuori vista. Nessun asset mancante tra raccolta completa e selezione. Prove nel browser in-app, non su iPhone fisico; nessun punteggio Lighthouse dichiarato. Evidenze in `Sito/references/release-verification-2026-11-06.json`. Pubblicazione richiesta dall’utente.

### Movimenti fluidi nella hero — Rev12, 6 novembre 2026

Su richiesta esplicita dell’utente si correggono i piccoli scatti laterali e si pubblica il risultato. Rev12 ricostruisce dalle stesse fonti le dieci scene di Rev11 a 60 fps: 3536 fotogrammi in 58,933 secondi, con fotogrammi intermedi stimati tramite optical flow. Velocità nel browser 1×, stesse durate dei segmenti e dissolvenze da 1,367 secondi. Rimossi gli spostamenti aggiunti al crop portrait nelle scene 1, 6 e 10, con inquadrature stabili che conservano la priorità all’oscurante. Nessuna modifica a testo, animazione, colori o layout.

H.264 desktop/tablet/mobile e HEVC portrait con poster nuovi, faststart, bitrate limitato e GOP da due secondi. I quattro file superano decodifica integrale, controllo di tutti i timestamp, dimensioni, codec, livelli e raccordo del loop. Lint, 38 test e typecheck/build superati. Un loop completo nel browser per i tre formati senza nuovi frame persi durante le misure, nessuno stallo o intervallo callback oltre 100 ms; un evento waiting per ciascuna prova. Verificate anche le inquadrature a 360×780 e 768×1024. HEVC verificato con decodifica completa; nessun test su iPhone fisico/Safari. Ricetta, provenienza e risultati in `Sito/references/hero-video-fluidity/`; manifest dei sette asset aggiornato. Commit, push su main e workflow GitHub Pages autorizzati dall’utente.

### Verifiche Coverflow — 7 novembre 2026

Controllati home (11 foto), raccolta completa (101) e filtro Porte interne (16), a 360, 390, 768 e 1440 px: trascinamento, frecce, tastiera, giro ultima/prima, foto intera e selezione conservata al resize. Esc e clic sullo sfondo ripristinano focus e scroll; Tab e Shift+Tab restano nei tre comandi attivi. Tre immagini montate a riposo, con vicine uscenti conservate durante il movimento. La pagina locale usa il componente reale in Strict Mode: verificati anche movimento ridotto senza prospettiva e transizioni, due fotografie e foto singola, senza avvisi o errori nel browser. Preferenza locale di movimento ripristinata dopo la prova.

Verificato il primo caricamento nella build finale con base `/lge-home-solutions/`: il modulo Coverflow e i CSS sono assenti prima dell’apertura e caricati su richiesta; il primo comando disponibile avanza correttamente senza ricaricare la pagina. Modulo JavaScript differito 26,18 KB gzip e CSS 1,13 KB gzip; bundle iniziale 143,01 KB gzip. Lint, typecheck/build, formattazione e 38 test in nove file superati. Dettagli in `Sito/references/coverflow-preview/verification.json`. Prove nel browser in-app; nessuna verifica su iPhone fisico con Safari.

### Verifiche fluidità e comandi mobile — 7 novembre 2026

Prova con la build reale e risposte immagini rallentate: 450 ms prima delle anteprime, 1800 ms prima dei dettagli e blocchi da 8 KiB ogni 70 ms. Lo swipe avanza da 1 a 2 mentre il dettaglio della seconda è in attesa; al completamento dei download le dimensioni delle cinque cornici restano identiche, senza nuovi cambi di geometria nella fase misurata. I sette pannelli del carosello sostituiscono i 101 precedenti nella raccolta completa. Esempio di file: 18.346 byte per l’anteprima, 56.914 per il dettaglio mobile e 134.656 per l’originale desktop. Nessuna immagine modificata o riscaricata da fonti esterne.

Verificati telefono 390×844 e landscape 844×390 senza frecce, desktop 1440×900 con frecce, giro 1 ↔ 101, home reale 6 → 7 nelle 11 selezionate, apertura dell’ultima foto, movimento ridotto e raccolte di una/due fotografie. Il Tab mobile rimane sulla X; Esc ripristina il focus. Prove con React Strict Mode e nessun errore/avviso nel browser. Lint, typecheck/build, formattazione, controllo delle 331 varianti immagine e 42 test in dieci file superati. Risultati in `Sito/references/coverflow-preview/fluidity-verification.json`; server riproducibile nel medesimo percorso. Nessuna prova su iPhone fisico/Safari né garanzia di un frame rate su qualsiasi dispositivo. Pubblicazione richiesta.
