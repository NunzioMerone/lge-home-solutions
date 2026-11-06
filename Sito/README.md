# LGE Home Solutions

Unica applicazione del sito LGE Home Solutions, nella cartella `Sito/`. Il 6 novembre 2026 l’utente autorizza la pubblicazione dell’intero checkpoint corrente: hero video Rev12 a 60 fps, transizioni e skeleton, showroom aggiornato, selezione fotografica della home e pagina Lavori. I precedenti vincoli locali delle prove del 6 novembre sono superati per questa consegna. Le precedenti varianti sono conservate nella cronologia Git; non esiste una seconda applicazione da mantenere.

- Repository: https://github.com/NunzioMerone/lge-home-solutions
- Sito: https://nunziomerone.github.io/lge-home-solutions/
- Sviluppo locale: http://localhost:5175/
- Anteprima build: http://localhost:4175/

## Avvio e verifiche

Richiede Node.js 22.12 o successivo. Nella cartella `Sito/`:

```sh
npm ci
npm run dev
```

```sh
npm run lint
npm run test
npm run build
```

Stack: React, TypeScript strict, Vite, React Router, CSS Modules, GSAP ed Embla. Dipendenze e file generati restano esclusi da Git.

## Hero video

La homepage usa il montaggio Rev12 da 58,933 secondi a 60 fps, con rallentamento incorporato e riproduzione del browser a 1×, con logo e testi HTML. Un velo antracite molto trasparente segue l’intero lato sinistro, senza fasce attorno alle scritte, e sfuma a zero al 65% della larghezza. Testi chiari con ombra delicata accompagnano il nuovo sfondo. Su smartphone la hero occupa `100svh`: il testo resta allineato a sinistra ma si appoggia in basso, con blocco più largo (massimo 26rem), titolo più leggibile e margine inferiore che somma la safe area. Solo sotto 700 px l’overlay sfuma dal basso, con un velo superiore tenue per il logo; desktop e tablet mantengono il gradiente laterale e il layout precedenti. Su richiesta dell’utente sono rimossi dalla hero il link WhatsApp e il comando pausa video; i contatti nelle altre sezioni restano disponibili.

Le voci della navbar, il comando menu e il logo orizzontale completo di scritta laterale sono bianchi sopra il video. Oltre 24 px di scroll, quando compare il fondo della navbar, il logo torna alla versione colorata; anche il menu mobile aperto e le altre rotte mantengono il logo colorato. La versione bianca usa il medesimo asset nitido, con filtro CSS che conserva trasparenza, forma e proporzioni.

Gli asset sono in `public/media/hero/`: desktop 1920×1080, tablet 1280×960 e portrait 720×1280. La revisione attiva Rev12 ricostruisce dalle fonti le stesse dieci scene di Rev11 a 60 fps, con fotogrammi intermedi stimati dal movimento, mantenendo durata 58,933 s, ritmo lento, gradazione calda e dissolvenze da 1,367 s. Rimossi i tre spostamenti artificiali del crop portrait; l’oscurante conserva la priorità nell’ultima scena. I quattro video e i tre poster hanno suffisso `rev12`. H.264 High (livello 4.2 desktop/tablet, 4.1 mobile) e HEVC hvc1 Main livello 4 portrait, faststart, GOP 120, bitrate limitato e nessun audio. Fonti 720p conservate senza inventare dettaglio. Ricetta riproducibile e verifiche in `references/hero-video-fluidity/`; `preview.html` permette di verificare le scene nella hero reale. Manifest con dimensioni e hash in `references/hero-video-integration.json`. La selezione responsive, il solo video montato, la sospensione fuori vista, il poster con movimento ridotto e l’errore gestito restano invariati. Rev12 è autorizzata alla pubblicazione.

«Il design che» resta fisso dopo l’ingresso iniziale. Le cinque frasi in corsivo Sabbia `#EDD5B3`, scelto dall’utente sul video reale, emergono da sinistra a destra tramite una maschera con bordo sfumato in 2,6 secondi, restano complete per 5,5 secondi e si dissolvono in 1,6 secondi. Il testo della frase viene impostato interamente mentre è nascosto, senza scrittura per caratteri, cursore, spostamento o sfocatura. La sequenza si sospende fuori vista o a scheda nascosta, rispetta il movimento ridotto e conserva l’altezza del titolo.

Seguono Le nostre soluzioni, partner, competenze, lavori, recensioni e contatti. Le pagine `/competenze`, `/lavori` e `/privacy-policy` sono integrate nella navigazione. Tutte le cinque categorie prodotto ricevono la foto della card nella hero condivisa mediante espansione; si attende la decodifica anche al primo ingresso. Infissi ha il contenuto completo; le altre quattro mantengono il messaggio di preparazione sotto la hero. Le card restano compatte e delimitate, con lo spazio del testo riservato al loro interno. Le inquadrature sono mirate al prodotto, completo e più vicino, anche su desktop; il contesto può essere ritagliato. I testi delle competenze in home sono centrati. I contatti non mostrano orari. Il tap non lascia contorni blu nei visualizzatori, conservando focus e navigazione visibile da tastiera.

La revisione locale di `/lavori` usa una hero panoramica decorativa sotto la navbar trasparente e sei filtri fotografici più grandi; le cover sono quelle delle soluzioni, con ritagli mirati e selezione blu sfumata. «Tutti» usa un mosaico. Solo la categoria accanto al titolo fisso «I nostri lavori» e la galleria cambiano alla selezione, senza ricaricare hero o filtri. Le foto reali rimangono intere in colonne bilanciate, con aggiunte da 18 e azione testuale senza bordo; nessun conteggio visibile. Ingressi condivisi con la home, skeleton dedicati, visualizzatore con tastiera e frecce tonde. Il sorgente della pagina resta differito; nessuna nuova dipendenza o pubblicazione.

La rifinitura della stessa pagina rende evidente la comparsa della categoria con la maschera sfumata della home in 2,6 secondi, avviata quando il nome entra in vista. Le etichette dei filtri sono 14/15 px. La nuova fascia «La prossima realizzazione potrebbe essere la tua» unisce la vetrata del riferimento al fondo del testo, con gli stessi caratteri e pulsanti del sito e collegamento WhatsApp condiviso. Fonte decorativa e viewport sono documentate in `references/mockups/works/contact-source.json`. Foto e attestati condividono `MediaDialog.module.css`: X senza riquadro vicina al contenuto, frecce a 12 px dalla foto o subito sotto su mobile, safe area e focus da tastiera. Prova esclusivamente locale.

Montaggio e verifica Rev07: `references/hero-video-playback/` (interpolazione dagli originali a 30 fps e bitrate limitato per formato). Le nove scene e i colori Rev06 restano invariati; sorgenti Rev06: `references/hero-video-interiors/`; Rev05 resta in `references/hero-video-refinement/` e Rev04 resta in `references/hero-video-warm/` e Rev03 in `references/hero-video-final/`. Copia e hash degli asset integrati: `references/hero-video-integration.json`. Le scene dei produttori non sono realizzazioni LGE. Rev05 usa la copia VEKA 4K e una porta d’ingresso reale in legno al posto della scena famiglia a bassa risoluzione; conserva outdoor, mansarda, colore caldo delicato e dissolvenze da 1,167 secondi. L’interpolazione avviene prima degli ingrandimenti. Le fonti Gibus restano 720p e alcune riprese hanno morbidezza ottica originale: non viene dichiarato dettaglio nativo superiore alle fonti. Rev06 aggiunge due riprese reali native 4K di porte interne da Pexels: vetrata bianca con ottone e corridoio con porta scura e parquet. Sono scene d’atmosfera generiche, con licenza gratuita verificata; non prodotti dei partner o lavori/clienti LGE. Sono esclusi il filmato showroom rifiutato, UI social e perimetri luminosi artificiali. Le sette scene Rev05 e l’aspetto della hero restano conservati nel nuovo montaggio da nove scene. Il push e la pubblicazione di questo checkpoint sono ora richiesti dall’utente; la documentazione delle fonti e delle licenze resta conservata, senza attestazioni di diritti ulteriori rispetto a quelle effettivamente verificate. Le precedenti immagini decorative restano conservate, con fonti e prompt in `references/hero-scene.json` e `references/hero-mobile-room.json` e materiali in `references/hero-scene/`. Le 101 fotografie dei lavori e gli attestati autorizzati restano separati e conservano le proprie fonti.

La home visitata resta montata fuori rotta, nascosta e `inert`; il video si sospende e riprende dallo stesso punto. Indietro ripristina la posizione e la selezione del carosello. Un link esplicito Home continua a raggiungere l’inizio. Competenze, Lavori e Privacy caricano codice e CSS su richiesta; le entrate semplici delle sezioni usano IntersectionObserver, eliminando ScrollTrigger dal codice iniziale. Il bundle principale passa da circa 520,37 a 444,10 KB prima della compressione. La pagina locale `/references/performance-check.html` misura video realmente presentato e buffering, senza essere copiata nella build.

## Pubblicazione

Il 6 novembre 2026 è autorizzato il push di tutto il lavoro corrente su `main`, con aggiornamento dell’anteprima GitHub Pages. Il sito conserva `VITE_PUBLIC_PREVIEW=true` e la Privacy Policy nello stato reale.

Il solo workflow attivo è `../.github/workflows/deploy.yml`. Lavora da `Sito/`, esegue lint, test, build con base `/lge-home-solutions/`, prepara le rotte statiche e pubblica su GitHub Pages.

Per preparare gli ingressi statici localmente con Node.js 22 (il workflow usa Node.js 24):

```sh
VITE_PUBLIC_PREVIEW=true npm run build -- --base=/lge-home-solutions/
VITE_PUBLIC_PREVIEW=true node --experimental-strip-types scripts/prepare-pages.mjs
```

Il sito mantiene `VITE_PUBLIC_PREVIEW=true` e `noindex, nofollow` finché la revisione privacy e l’hosting definitivo non sono completati. L’unificazione dei progetti non approva la Privacy Policy: `approved` resta `false` e il controllo nel workflow dell’anteprima resta consultivo.

## Consolidamento del 3 novembre 2026

La hero minimalista precedente è rimossa dall’applicazione corrente. La versione fotografica approvata è stata importata senza cambiare i file applicativi, insieme alla cronologia del suo repository. Nome del pacchetto, porte e pubblicazione sono quelli del sito unico. Il repository di confronto viene archiviato e la sua pubblicazione Pages disattivata dopo la verifica del sito principale.

`references/site-consolidation.json` registra i commit di origine e gli hash dei 515 file applicativi verificati. `references/legacy-copy-manifest.json` resta una testimonianza storica della copia iniziale e non definisce percorsi o progetti attivi.

## Revisione locale del 6 novembre 2026

Transizioni card/hero basate sui rettangoli dipinti della foto, per conservare l’inquadratura iniziale anche sulle immagini molto ingrandite. Skeleton specifici per le pagine caricate su richiesta, con navigazione disponibile, segnaposto per le immagini prodotto, mappa e recensioni. Anteprima locale dei caricamenti e della copia iniziale: `http://127.0.0.1:5175/references/loading-preview/`. Nessun rallentamento artificiale delle pagine reali; questa revisione resta esclusivamente locale, senza push o pubblicazione.

La sezione `/#contatti` segue i mockup desktop/mobile forniti dall’utente, con foto provvisoria, prenotazione e indicazioni affiancate alla mappa reale. Le curve delle superfici e dei controlli sono uniformate al token `--radius: 8px` delle card delle soluzioni; le frecce dei caroselli restano tonde su richiesta dell’utente. Provenienza della foto e viewport in `references/mockups/contacts/source.json`; gli originali rimangono separati dagli asset web.
