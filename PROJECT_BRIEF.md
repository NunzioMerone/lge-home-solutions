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
4. **I nostri lavori:** La home presenta 15 fotografie autentiche, tre per ciascuna delle cinque categorie, alternate nel carosello per variare le soluzioni mostrate. Restano coverflow, autoplay, swipe, tastiera, frecce da tablet, finestra di cinque indicatori e apertura della fotografia intera. Il collegamento «Esplora tutti i lavori» apre `/lavori`. La pagina dedicata rende disponibili tutte le 101 fotografie: Infissi (32), Oscuranti (16), Porte e sicurezza (11), Porte interne (16), Atelier Gibus / Outdoor (26). L’indice filtra tramite `?categoria=…`, preservando link diretti e cronologia. La panoramica mostra sei foto per categoria e il link alla raccolta; la categoria selezionata parte da 12 foto e aggiunge le successive a gruppi di 12. Nessuna foto omessa o duplicata tra le raccolte. Foto ottimizzate esistenti e originali invariati; selezione e classificazione in `Sito/src/data/works.ts`, fonti in `Sito/references/gallery-real-sources.json`.
5. **Cosa dicono di noi**: titolo centrato senza linea, con «noi» in corsivo blu LGE e sottotitolo breve. Card bianche più compatte, con Google, voto, stelle, citazione serif, autore e data; quattro card da 1100 px e cinque da 1600 px, una centrata sui telefoni. Il carosello Embla con lieve enfasi centrale usa il motore useLoopCarousel condiviso con la galleria: avanzamento dopo 6,5 secondi di sosta, swipe e tastiera; al massimo cinque indicatori visibili in una finestra che scorre con animazione, con pallini più piccoli ai bordi e selezione attiva allungata. Si montano al massimo sette indicatori, includendo quelli di transizione, anche con centinaia di recensioni. Frecce circolari sottili nel blu LGE affiancano gli indicatori su tablet e desktop da 700 px; sui telefoni rimangono soltanto indicatori e swipe. Movimento interrotto durante lettura e interazioni, fuori vista, a scheda nascosta e con movimento ridotto. Riepilogo Google a destra su desktop e sotto il titolo sui dispositivi più piccoli. Commenti oltre quattro righe espandibili con «Leggi di più / Leggi di meno»; nessun messaggio sostitutivo per commenti assenti. Dati ricontrollati il 27 ottobre 2026: nove recensioni autentiche, media 5,0/5, tutte inserite. Le quattro nuove sono mostrate prima delle cinque storiche; testo italiano originale e assenza di commenti conservati. Provenienza e verifica manuale documentate in references/google-reviews.md (dentro Sito/). Nessun aggiornamento automatico, chiave Places o nuovo servizio esterno.
6. **Contatti:** sezione «Vieni a trovarci» su fondo greige come i Partner. Il titolo è nel pannello introduttivo, con la scala tipografica condivisa delle sezioni e «trovarci» in corsivo blu. Da 1000 px la colonna sinistra contiene introduzione, azioni, indirizzo/orari e Instagram; a destra resta la mappa. Sotto 1000 px l’ordine è introduzione con azioni, indirizzo/orari, mappa, Instagram. I dettagli sono affiancati da 600 px e impilati sugli schermi più stretti, con divisori sottili. Il pulsante blu «Prenota su WhatsApp» usa il simbolo bianco derivato dal marchio ufficiale locale; «Chiamaci» è un collegamento testuale. Il titolare ha confermato il 29 ottobre 2026 il numero +39 334 600 8313 per telefono e WhatsApp, condiviso anche con il footer, e il profilo ufficiale @atelier_gibus_campiflegrei, collegato senza parametri di tracciamento. L’email info@lgesolutions.it, confermata dal titolare il 29 ottobre 2026, è configurata con collegamento mailto e condivisa con il footer. La mappa OpenStreetMap con Leaflet 1.9.4 resta differita, con marcatore blu, zoom sottile e attribuzione essenziale invariati; la cornice bianca riporta «LGE Home Solutions» e il link «Apri le indicazioni» verso Google Maps. Via Roma 29, 80070 Monte di Procida (NA) e orari Lun–Ven 09–18, Sab–Dom chiuso restano quelli verificati il 27 ottobre 2026. Ingressi morbidi compatibili con le preferenze di movimento; nessun modulo. Fonti in `Sito/references/contact-sources.md`.
7. **Footer**: aggiornato al riferimento del 29 ottobre 2026, con fondo antracite e tre colonne da 1000 px: identità e recapiti, «Soluzioni» ed «Esplora». Il logo bianco ufficiale conserva asset e geometria originali; il CSS ritaglia soltanto i margini trasparenti per allinearlo ai recapiti. I gruppi di navigazione non hanno più lineette blu. Su mobile identità e recapiti precedono le due colonne di link; la fascia inferiore raccoglie social circolari da 44 px e copyright automatico con new Date().getFullYear(). Telefono e WhatsApp usano +39 334 600 8313, Instagram il profilo ufficiale @atelier_gibus_campiflegrei. L’email info@lgesolutions.it è stata confermata dal titolare il 29 ottobre 2026. I recapiti compaiono nell’ordine telefono, indirizzo, email, con testo da 13 px su mobile/tablet e 14 px su desktop. Il link «Privacy Policy» apre la pagina locale `/privacy-policy`, predisposta come bozza non approvata e non pubblicata. Nessun reveal, Lorem Ipsum, dicitura legale provvisoria o controllo «Riduci le animazioni». Restano rispettate le preferenze di movimento del sistema.

Quest'ordine è richiesto esplicitamente e non va cambiato senza accordo. L'immagine di riferimento è estetica, non un layout da copiare rigidamente. La hero contiene una prima proposta di testi significativi, richiesta durante la rifinitura; le altre sezioni mantengono i testi descrittivi provvisori.

### Pagine interne

**Competenze — autorizzata il 29 ottobre 2026.** La pagina `/competenze` sviluppa il mockup approvato: tre approfondimenti tecnici, cinque riconoscimenti e sette documenti reali visualizzabili. Navbar e footer sono condivisi; la voce Competenze e il collegamento nella sezione della homepage aprono la nuova pagina. L’ancora `/#competenze` rimane disponibile. I due PDF originali sono conservati senza modifiche; le foto possono essere raddrizzate e ripulite dai riflessi solo mantenendo leggibili e inalterati contenuti, firme e timbri. I documenti di posa senior e termografia di categoria 1 sono distinti dai livelli EQF 4 e II confermati dall’utente. Sono previsti metadati dedicati e un ingresso statico per l’accesso diretto su GitHub Pages, senza pubblicazione automatica.

**I nostri lavori — autorizzata il 29 ottobre 2026.** Pagina `/lavori` con navbar/footer condivisi, titolo serif con corsivo blu, cinque categorie separate e navigazione funzionante. Griglie fotografiche adattive, lieve zoom interno e ingressi da 1,4 secondi; nessuna ricostruzione o modifica delle foto. Il visualizzatore riprende quello della home, con sola immagine e X, Esc, blocco dello scroll e ripristino del focus. Navbar desktop/mobile e footer aprono la pagina; `/#lavori` rimane l’ancora della selezione in home. Metadati e ingresso statico dedicati per GitHub Pages, senza pubblicazione automatica.

Per una fase futura restano proposte pagine dedicate alle singole soluzioni, all'azienda, a Gibus, alle realizzazioni e ai contatti. **Non sono autorizzate nella fase attuale:** le cinque rotte prodotto implementate mostrano soltanto navbar, footer, titolo e messaggio di preparazione, secondo la richiesta del 28 ottobre 2026.

Percorso editoriale proposto per le pagine soluzione: ambiente e beneficio, soluzioni disponibili, dettagli e personalizzazioni, lavori pertinenti, invito alla consulenza. I filtri delle realizzazioni sono ora implementati in `/lavori`; eventuali approfondimenti sui singoli interventi restano da definire in base al materiale disponibile.

**Privacy Policy — anteprima locale del 29 ottobre 2026.** La pagina `/privacy-policy`, collegata dal footer, condivide navbar e footer e un lieve ingresso CSS. Mantiene sette sezioni concise e la data del 29 ottobre 2026. Su richiesta dell’utente sono rimossi gli avvisi visibili di bozza o revisione, le formulazioni «da confermare» e le checklist; resta un unico paragrafo sull’hosting da completare alla scelta del fornitore definitivo. Denominazione «LGE Home Solutions S.a.s. di Schiano Lomoriello Lemuel», sede «Via Roma, 29 — 80070 Monte di Procida (NA)» ed email info@lgesolutions.it sono ora confermate direttamente dall’utente. L’utente precisa che Lemuel Schiano Lomoriello è amministratore e la società è titolare del trattamento: solo «Chi tratta i dati» usa +39 329 826 5371, mentre Contatti, footer e WhatsApp mantengono +39 334 600 8313. I precedenti riscontri nelle schede web commerciali restano documentati come evidenza storica, senza attribuire loro valore di visura. L’utente conferma fotografie proprie dei lavori dei clienti e richiesta preventiva del consenso per fotografare e pubblicare; non sono state esaminate liberatorie. WhatsApp resta un link esterno, senza invio automatico o raccolta dei messaggi nel frontend; le recensioni sono ancora copie statiche e l’API Google futura non è attiva. La conservazione è descritta con il criterio del tempo necessario per rispondere e gestire l’eventuale seguito, con ulteriori obblighi o tutela di diritti quando pertinenti, senza inventare durate o cancellazioni automatiche. La descrizione del caricamento automatico della mappa OSM resta corretta. Il riepilogo di GitHub Pages e dei trasferimenti è stato rimosso dall’anteprima; dettagli tecnici e fonti sono conservati in `Sito/references/privacy-audit.md`. La versione pubblica attuale usa GitHub Pages; l’hosting definitivo non è scelto. La pagina resta locale, non pubblicata e non certificata sul piano legale: `Sito/src/config/privacy.ts` mantiene nove campi di revisione interna e `approved: false`, con metadati `noindex, nofollow`. `Sito/scripts/check-privacy.mjs` blocca il deploy finché i campi e la revisione non sono completati, senza impedire la build locale. `prepare-pages.mjs` genera anche l’ingresso statico privacy e i relativi metadati per GitHub Pages; `App` e il relativo hook ripristinano i metadati a ogni cambio di rotta.

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


## Seconda versione — Hero PT2

Il 29 ottobre 2026 l’utente autorizza la copia del sito locale attuale in `Sito_Hero_PT2/`, progetto indipendente nel repository personale `NunzioMerone/lge-home-solutions-hero-pt2`, con secondo sito GitHub Pages. La hero iniziale resta identica; i prossimi interventi riguarderanno soltanto la nuova hero e i collegamenti necessari. Il sito originale non viene sostituito. Identità e contenuti restano LGE Home Solutions: Hero PT2 distingue il progetto tecnico. Porta locale 5177. La copia viene pubblicata come demo non indicizzata, mantenendo la Privacy Policy in revisione; il workflow della sola demo segnala il controllo senza registrare un’approvazione legale fittizia.


Hero PT2 pubblicata sul repository personale `https://github.com/NunzioMerone/lge-home-solutions-hero-pt2`, commit iniziale `7cc93de`. GitHub Pages attivo su `https://nunziomerone.github.io/lge-home-solutions-hero-pt2/`. Build e 25 test passati anche su GitHub Actions; pagina iniziale e URL diretti Lavori/Privacy verificati nel browser. La hero e tutti gli asset restano identici alla copia iniziale. Il solo hook dei metadati conserva noindex nella demo. Il repository e il deploy originali non sono stati modificati.


### Hero fotografica PT2 e pubblicazione delle due versioni

L’utente chiede una hero fotografica esclusivamente in `Sito_Hero_PT2/`: prima immagine fornita su desktop, sfondo verticale pulito su mobile/tablet, titolo animato a sinistra, sottotitolo e link WhatsApp. Le card precedenti passano nella sezione «Le nostre soluzioni», prima dei partner. La revisione mobile abbassa il testo e aumenta le distanze, riservando una zona chiara a WhatsApp. La hero originale in `Sito/` resta invariata.

È richiesta la pubblicazione di tutte le modifiche accumulate anche sul primo sito, mantenendo le due cartelle e i due repository indipendenti. Entrambe le versioni GitHub Pages sono anteprime pubbliche non indicizzate; la Privacy Policy conserva lo stato reale di revisione, senza impostare approved fittiziamente. Il controllo viene eseguito come segnalazione consultiva nei workflow delle anteprime. Per una release definitiva sarà necessario completare la revisione e ripristinare il vincolo di pubblicazione pertinente.
