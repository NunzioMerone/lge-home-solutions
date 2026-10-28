# LGE Home Solutions — Project brief

Documento di riferimento per il contesto aziendale, la direzione artistica, le funzionalità e il percorso di sviluppo del sito.

Le regole operative per lo sviluppo sono definite in [AGENTS.md](./AGENTS.md). Le proposte e le decisioni ancora aperte sono indicate esplicitamente: non costituiscono funzionalità già approvate da implementare.

## 1. Stato e organizzazione del progetto

- Fase attuale: homepage completa sviluppata localmente, da valutare e completare con i dati aziendali definitivi prima della pubblicazione.
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

Aggiornamento del 27 ottobre 2026: Hero chiara e minimale, senza fotografia di sfondo. Logo originale immediatamente visibile a sinistra della navbar e tutte le voci a destra, con più spazio tra i gruppi. Nessuna introduzione con logo che sale. «Il design che» entra con una dissolvenza dal basso di 0,95 secondi e poi resta fisso; cinque finali si scrivono, si cancellano e ruotano con cursore lampeggiante, su una sola riga da 700 px e con disposizione su più righe sui telefoni. Il sottotitolo completo «Ogni ambiente merita di essere vissuto al meglio.» entra con dissolvenza dal basso e resta statico. Spazio riservato per tutte le frasi; nessun controllo pausa/riprendi nella hero. Resta rispettato il movimento ridotto e si evitano aggiornamenti fuori vista o a scheda nascosta. Sotto: carosello Embla di Infissi, Oscuranti, Porte e sicurezza, Porte interne e Atelier Gibus, con ingresso delle card dal basso in 1,8 secondi, a intervalli di 0,18 secondi. Foto locali, proporzioni 4:5, angoli di 8 px, pannello chiaro e zoom interno del 3,5% in hover/focus, dimensioni esterne fisse. Su touch e sotto 700 px il pannello è già visibile. Frecce circolari sottili nel blu LGE affiancano gli indicatori quando il contenuto è scorrevole; ai limiti del carosello sono disabilitate. Swipe e tastiera restano disponibili. Le piccole frecce interne ai pannelli identificano i link alle categorie. La sezione separata «I nostri prodotti» è stata eliminata: le cinque categorie restano soltanto nella hero. L’ancora #prodotti ora raggiunge il carosello della hero. Spazio maggiore sopra il titolo e sotto il sottotitolo; testi della navbar leggermente rientrati verso il centro. Il pannello delle card ha sfondo opaco costante e si anima soltanto con una traslazione, senza dissolvenze concorrenti; l’intera card mantiene una sola superficie di puntamento.

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
- A destra: Competenze, Recensioni e Contatti, collegati alle rispettive sezioni della homepage.

Dal 27 ottobre 2026 la navbar è immediatamente disponibile, con logo a sinistra e navigazione a destra. La barra trasparente iniziale è alta 112 px su desktop e 96 px sul telefono; durante lo scroll diventa bianca traslucida e si compatta come in precedenza. Il menu mobile mantiene hamburger animato, chiusura con Esc, focus e blocco dello sfondo. Le pagine prodotto rimangono bianche.

### Homepage prevista

1. **Hero**: Hero chiara e minimale, senza fotografia di sfondo. Logo originale immediatamente visibile a sinistra della navbar e tutte le voci a destra, con più spazio tra i gruppi. Nessuna introduzione con logo che sale. «Il design che» entra con una dissolvenza dal basso di 0,95 secondi e poi resta fisso; cinque finali si scrivono, si cancellano e ruotano con cursore lampeggiante, su una sola riga da 700 px e con disposizione su più righe sui telefoni. Il sottotitolo completo «Ogni ambiente merita di essere vissuto al meglio.» entra con dissolvenza dal basso e resta statico. Spazio riservato per tutte le frasi; nessun controllo pausa/riprendi nella hero. Resta rispettato il movimento ridotto e si evitano aggiornamenti fuori vista o a scheda nascosta. Sotto: carosello Embla di Infissi, Oscuranti, Porte e sicurezza, Porte interne e Atelier Gibus, con ingresso delle card dal basso in 1,8 secondi, a intervalli di 0,18 secondi. Foto locali, proporzioni 4:5, angoli di 8 px, pannello chiaro e zoom interno del 3,5% in hover/focus, dimensioni esterne fisse. Su touch e sotto 700 px il pannello è già visibile. Frecce circolari sottili nel blu LGE affiancano gli indicatori quando il contenuto è scorrevole; ai limiti del carosello sono disabilitate. Swipe e tastiera restano disponibili. Le piccole frecce interne ai pannelli identificano i link alle categorie. La sezione separata «I nostri prodotti» è stata eliminata: le cinque categorie restano soltanto nella hero. L’ancora #prodotti ora raggiunge il carosello della hero. Spazio maggiore sopra il titolo e sotto il sottotitolo; testi della navbar leggermente rientrati verso il centro. Il pannello delle card ha sfondo opaco costante e si anima soltanto con una traslazione, senza dissolvenze concorrenti; l’intera card mantiene una sola superficie di puntamento.
2. **I nostri partner**: otto marchi indicati dall’utente il 27 ottobre: Schüco, VELUX, I-PEA Porte Design, DoorArreda, Blindato Effepi, TEHNi, Sikur Home e Hörmann. TEHNi confermato dall’utente come correzione di «Theni». Loghi originali dai siti ufficiali, ospitati localmente e documentati in Sito/references/partner-logo-sources.json (percorso dalla radice del workspace); precedente selezione dimostrativa archiviata. Quattro colonne e due righe da 900 px; due colonne e quattro righe sui dispositivi più piccoli. Divisori verticali tra le colonne e orizzontali tra le righe, senza divisore a inizio riga. Fondo greige uniforme, «partner» in corsivo blu LGE senza linea, ingresso da destra. Nessun filtro o ricolorazione: per le varianti bianche originali I-PEA e Sikur Home si usa una base antracite discreta. Loghi ridotti di circa il 12% su desktop e mobile, mantenendo dimensioni delle celle e divisori.
3. **Competenze**: titolo centrato «La qualità nasce dalla competenza», con «competenza» in corsivo chiaro su fondo antracite, scelta confermata dall’utente per il contrasto. Sottotitolo esatto: «Dalla scelta dei materiali alla posa, uniamo preparazione tecnica, precisione e attenzione per risultati che durano nel tempo.». Titolo e sottotitolo sono parte della fascia scura, senza composizione introduttiva laterale. Le quattro competenze, testi, icone e divisori sono conservati; quattro colonne da 900 px, due da 600 px e una sui telefoni.
4. **I nostri lavori**: galleria fotografica a livelli ispirata al riferimento del 27 ottobre. Titolo «I nostri lavori» con la sola parola «lavori» in corsivo blu LGE Cormorant Garamond, senza linea blu né didascalie. Sfondo chiaro invariato. Embla centra una foto più grande con le altre sovrapposte ai lati; avanzamento automatico dopo 4,2 secondi di sosta, swipe e tastiera. Cinque pallini permettono la selezione diretta delle fotografie; frecce circolari sovrapposte ai lati compaiono solo su desktop da 1100 px, restando nascoste su tablet e smartphone. Due serie delle cinque foto garantiscono il ciclo: soltanto cinque posizioni sono esposte e la foto centrale entra nel percorso Tab. Il clic apre la fotografia intera in un dialogo nativo con sfondo oscurato; chiusura con X, Esc o clic esterno, blocco dello scorrimento e ritorno del focus alla foto. L’avanzamento si ferma con dialogo aperto, hover/focus, trascinamento, sezione fuori vista, scheda nascosta e movimento ridotto. Dati e provenienza delle foto restano dimostrativi, conservati nella documentazione. Sulle fotografie si usa il cursore a manina (`pointer`).
5. **Cosa dicono di noi**: titolo centrato senza linea, con «noi» in corsivo blu LGE e sottotitolo breve. Card bianche più compatte, con Google, voto, stelle, citazione serif, autore e data; quattro card da 1100 px e cinque da 1600 px, una centrata sui telefoni. Il carosello Embla con lieve enfasi centrale usa il motore useLoopCarousel condiviso con la galleria: avanzamento dopo 6,5 secondi di sosta, swipe e tastiera; al massimo cinque indicatori visibili in una finestra che scorre con animazione, con pallini più piccoli ai bordi e selezione attiva allungata. Si montano al massimo sette indicatori, includendo quelli di transizione, anche con centinaia di recensioni. Frecce circolari sottili nel blu LGE affiancano gli indicatori su desktop, tablet e smartphone. Movimento interrotto durante lettura e interazioni, fuori vista, a scheda nascosta e con movimento ridotto. Riepilogo Google a destra su desktop e sotto il titolo sui dispositivi più piccoli. Commenti oltre quattro righe espandibili con «Leggi di più / Leggi di meno»; nessun messaggio sostitutivo per commenti assenti. Dati ricontrollati il 27 ottobre 2026: nove recensioni autentiche, media 5,0/5, tutte inserite. Le quattro nuove sono mostrate prima delle cinque storiche; testo italiano originale e assenza di commenti conservati. Provenienza e verifica manuale documentate in references/google-reviews.md (dentro Sito/). Nessun aggiornamento automatico, chiave Places o nuovo servizio esterno.
6. **Contatti**: sezione «Vieni a trovarci», con «trovarci» in corsivo blu e senza linea. Mappa OpenStreetMap gestita con Leaflet 1.9.4, caricata soltanto vicino alla sezione: marcatore nel blu LGE, zoom con simboli SVG sottili e sola attribuzione essenziale visibile. Cornice bianca e pulsante «Come raggiungerci» verso Google Maps. Fondo greige uguale ai Partner. Pannello senza titolo, con invito a prendere appuntamento, icone lineari e recapiti in griglia a due colonne. Sotto 1000 px informazioni e social precedono la mappa, con la medesima larghezza dei due blocchi. Indirizzo Via Roma 29, 80070 Monte di Procida (NA), telefono +39 329 826 5371 e orari Lun–Ven 09–18, Sab–Dom chiuso verificati sulla scheda Google il 27 ottobre 2026. Email di esempio non collegata; WhatsApp apre il numero del telefono mostrato, su richiesta dell’utente. WhatsApp e Instagram usano i loghi a colori senza pulsanti o riquadri. Instagram resta visuale finché manca il profilo effettivo. La nota sui dati dimostrativi è stata rimossa su richiesta. Ingressi morbidi, ridotti secondo le preferenze di movimento. Nessun modulo. Fonti in Sito/references/contact-sources.md.
7. **Footer**: nuovo logo bianco lineare originale, numero e indirizzo sotto al logo; cinque categorie prodotto collegate alle rotte esistenti, più navigazione alle sezioni. Impaginazione su tre colonne da 1000 px e su due gruppi affiancati sotto l’identità sui telefoni. Nessun reveal, Lorem Ipsum, dicitura legale provvisoria o controllo «Riduci le animazioni». Copyright calcolato con new Date().getFullYear(). Restano rispettate le preferenze di movimento del sistema.

Quest'ordine è richiesto esplicitamente e non va cambiato senza accordo. L'immagine di riferimento è estetica, non un layout da copiare rigidamente. La hero contiene una prima proposta di testi significativi, richiesta durante la rifinitura; le altre sezioni mantengono i testi descrittivi provvisori.

### Pagine interne

Per una fase futura restano proposte pagine dedicate alle singole soluzioni, all'azienda, a Gibus, alle realizzazioni e ai contatti. **Non sono autorizzate nella fase attuale:** le cinque rotte prodotto implementate devono restare bianche fino a una nuova richiesta.

Percorso editoriale proposto per le pagine soluzione: ambiente e beneficio, soluzioni disponibili, dettagli e personalizzazioni, lavori pertinenti, invito alla consulenza. Filtri delle realizzazioni e approfondimenti sui singoli lavori saranno definiti in base al materiale disponibile.

## 7. Hero cinematografica

**Homepage attuale:** la hero di `Sito/` segue la nuova sequenza con logo e tre fotografie, descritta sopra. I racconti 3D e video seguenti appartengono ai test antecedenti e non sono il requisito attuale della homepage.

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

Modalità di invio delle richieste, destinatari del modulo, aggiornamento automatico delle recensioni e altri strumenti esterni restano da definire. Il collegamento alla scheda Google reale e la trascrizione delle cinque recensioni sono stati autorizzati; manca ancora la chiave per la futura sorgente automatica. Non aggiungere chat, analytics, blog o altre integrazioni senza una richiesta pertinente.

## 10. Roadmap

| Fase | Obiettivo                                                     | Stato                                                                                                   |
| ---- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| 1    | Comprensione, brief, analisi del riferimento e pianificazione | Completata per la homepage                                                                              |
| 2    | Setup tecnico iniziale                                        | Realizzato in `Sito/`                                                                                   |
| 3    | Realizzazione della hero                                      | Realizzata e verificata su desktop e smartphone                                                         |
| 4    | Navbar e navigazione                                          | Navbar traslucida, dropdown desktop e menu mobile animato implementati                                  |
| 5    | Sezioni della homepage                                        | Realizzate nell'ordine richiesto                                                                        |
| 6    | Pagine interne                                                | Solo rotte bianche; contenuti completi da autorizzare                                                   |
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

Rifinitura del footer sul riferimento fornito il 28 ottobre: logo bianco più ampio, telefono e indirizzo con icone lineari in cerchi discreti; colonne «Soluzioni» ed «Esplora» con piccoli accenti blu e cinque categorie e quattro collegamenti di sezione. Nessuna voce «Chi siamo». Tre colonne da 1000 px; identità e recapiti affiancati sui tablet, gruppi di navigazione in due colonne sui telefoni. Riga inferiore con copyright dinamico e icone WhatsApp/Instagram. WhatsApp mantiene il link reale già configurato; Instagram resta visuale in attesa del profilo. Sfondo antracite e assenza di reveal conservati.

Aggiornamento navbar del 28 ottobre 2026: «Soluzioni» non viene sottolineata nella homepage, neppure all’ancora #prodotti o durante l’apertura del menu. La linea indica esclusivamente una delle pagine prodotto associate, con lo stesso comportamento su desktop, tablet e smartphone. Le pagine prodotto restano bianche.

Pubblicazione autorizzata il 28 ottobre 2026 nell’account GitHub personale verificato `NunzioMerone`: repository pubblico `lge-home-solutions`, con il sito attuale in `Sito/`, asset e documentazione. I prototipi storici restano separati e conservati localmente. GitHub Pages pubblica la homepage su `https://nunziomerone.github.io/lge-home-solutions/`; il workflow su `main` esegue lint, test, build e deploy. I percorsi delle risorse e React Router rispettano il prefisso del repository, mantenendo lo sviluppo locale alla radice. Le cinque rotte prodotto restano bianche, con punti di ingresso statici per l’accesso diretto su Pages.
