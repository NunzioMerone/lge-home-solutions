# LGE Home Solutions

Pubblicazione del 14 novembre 2026: l’utente autorizza commit, push del checkpoint corrente su `main` e deploy tramite il workflow Pages esistente, superando i vincoli locali delle note seguenti. Accorciato al 45% l’ultimo intervallo desktop Gibus, mantenendo il ritmo delle altre scene; mobile e movimento ridotto conservati. Lo script `prepare-pages.mjs` genera anche `/blog` e i sei articoli con metadati, verificati da due test d’integrazione. Anteprima non indicizzata conservata.

Unica applicazione del sito LGE Home Solutions, nella cartella `Sito/`. L’8 novembre 2026 l’utente autorizza la pubblicazione delle pagine Infissi, Oscuranti e Porte e sicurezza, del footer condiviso e del nuovo video della home. Le precedenti varianti sono conservate nella cronologia Git; non esiste una seconda applicazione da mantenere.

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

Stack: React, TypeScript strict, Vite, React Router, CSS Modules, GSAP, Embla e Swiper per il Coverflow. Dipendenze e file generati restano esclusi da Git.

La scansione iniziale delle dipendenze Vite parte esclusivamente da `index.html`, seguendo gli import dell’applicazione. I file HTML archiviati in `references/` non sono ingressi del sito: alcuni, come la copia di Coverr, richiamano script del sito originale che non sono presenti nel progetto.

## Blog — revisione locale del 14 novembre 2026

La voce Blog nella navbar desktop, nel menu mobile e nel footer apre `/blog`. Dopo la prima proposta del 13 novembre, l’utente richiede un indice più semplice: un’unica raccolta delle sei guide su infissi, outdoor, porte interne, condensa, zanzariere e manutenzione del PVC, senza articolo in evidenza. I filtri testuali precedono gli articoli e usano `?argomento=…`, conservando scroll e focus al cambio argomento. Fotografie uniformi 16:10, tre colonne desktop, due tablet e una smartphone. Ogni pagina `/blog/:slug` include indice interno, didascalia dell’immagine, fonti, soluzione collegata e letture correlate. I link sconosciuti mostrano una pagina di recupero dedicata con `noindex`. Concept di riferimento, prompt e note in `references/blog-redesign/`; logo, foto, navbar, footer e sintesi editoriali restano quelli del sito.

Tipi in `src/types/blog.ts`, schede e categorie in `src/data/blog.ts`, testi proposti in `src/data/blogArticles.ts`; le pagine e il contenuto degli articoli sono caricati su richiesta. Le immagini sono asset già presenti, senza nuove copie. I testi restano una prima proposta editoriale da rivedere prima di un’eventuale pubblicazione. Non sono richiesti backend, CMS o altre integrazioni.

Rifinitura successiva del 14 novembre: l’indice della guida segue il capitolo in lettura durante lo scroll con testo blu e fondo azzurro, senza modificare URL o focus. `useActiveArticleSection` usa un listener passivo e raggruppa le letture geometriche per frame; lo stato React cambia soltanto al cambio di capitolo. `ResizeObserver` riallinea la selezione al variare del contenuto. Le comparse usano `useSectionReveal`, come il resto del sito, su schede, filtri e contenuti delle guide. I capitoli hanno contenitori stabili e figli animati. Il movimento ridotto e la navigazione da tastiera mantengono i contenuti disponibili.

Verifiche della prima semplificazione del 14 novembre: typecheck, lint, build, formattazione dei file modificati e 47 test superati. Nel browser in-app verificati tutti i filtri, apertura della guida outdoor, indice interno e ritorno alla categoria. Un tap su Comfort conserva scroll e focus; collegamento WhatsApp verificato senza invio di messaggi. Controlli responsive senza overflow a 320, 360, 390, 768, 1024 e 1487 px; screenshot confrontati con i concept anche alle dimensioni native 1487×1058 e 1511×1041. Movimento ridotto provato tramite il controllo locale già esistente, quindi ripristinato. Nessun errore o avviso nella scheda di verifica con caricamento pulito. Note, differenze intenzionali e limiti in `references/blog-redesign/verification.json`. Le prove non sostituiscono un test su telefono fisico/Safari. Server locale porta 5175; per avviarlo, eseguire `npm run dev` da questa cartella.

Verifiche della rifinitura: lint, typecheck, build e 51 test superati. Nel browser in-app controllati cambio automatico del capitolo in entrambe le direzioni, focus e ancore dirette, comparse delle schede mentre entrano nella viewport e movimento ridotto, con preferenza finale ripristinata. Corretto e verificato anche l’arrotondamento delle coordinate frazionarie delle ancore a 768 px. Nessun errore/avviso catturato; note ed evidenze in `references/blog-redesign/motion-verification.json`.

Questa revisione è solo locale: nessun commit, push o deploy. La preparazione degli ingressi statici del blog per l’hosting resta da affrontare quando sarà richiesta la pubblicazione.

## Visualizzatore fotografico

Home e pagina Lavori condividono il Coverflow di Swiper 14.4.0. Su telefono ci sono soltanto swipe e X, senza frecce anche in orizzontale; desktop e tablet conservano le frecce tonde accanto alla foto. Foto intera, tastiera, Esc e ripristino del focus restano disponibili. Carosello e CSS sono caricati quando si apre una fotografia, con foto/skeleton e X funzionante nell’attesa. Le raccolte grandi usano Virtual: pochi pannelli in pagina e due foto preparate per lato. Le dimensioni numeriche evitano i ricalcoli di posizione provocati dai download tardivi. Ogni foto ha una cornice stabile, anteprima 480 px e dettaglio che appare dopo la decodifica; su mobile il dettaglio usa al massimo 960 px, su desktop la risoluzione completa. Con movimento ridotto non ci sono prospettiva o transizioni automatiche. Gli altri caroselli mantengono Embla.

La pagina locale `references/coverflow-preview/` usa il componente reale in Strict Mode. Per verificare le immagini con rete rallentata, dopo la build eseguire `node references/coverflow-preview/slow-server.mjs` e aprire `http://127.0.0.1:4185/lge-home-solutions/lavori`. Il server serve soltanto la build locale, con immagini ritardate, e non viene incluso nel sito. Per una nuova origine senza cache si può cambiare la porta tramite `LGE_SLOW_PREVIEW_PORT`. Dati in `references/coverflow-preview/fluidity-verification.json`.

## Hero video

La homepage usa il montaggio Rev21. Le 16 scene alternano le vetrate VEKA, le finestre per tetti VELUX, gli avvolgibili newSolar e gli ambienti esterni Gibus. Il video dura 50,2 secondi e si ripete a velocità 1× sotto il logo e i testi HTML. Un velo antracite sfuma verso destra fino al 65% della larghezza. Sotto 700 px, la hero occupa `100svh` e la sfumatura sale dal bordo inferiore, dove si trovano titolo e sottotitolo.

Le voci della navbar, il comando menu e il logo orizzontale completo di scritta laterale sono bianchi sopra il video. Oltre 24 px di scroll, quando compare il fondo della navbar, il logo torna alla versione colorata; anche il menu mobile aperto e le altre rotte mantengono il logo colorato. La versione bianca usa il medesimo asset nitido, con filtro CSS che conserva trasparenza, forma e proporzioni.

Video e poster in `public/media/hero/` condividono le regole di selezione in `src/config/hero.ts`. I formati sono 1920×1080 su desktop panoramico, 1280×720 su panoramico compatto, 1280×960 e 960×1280 su tablet, 720×1280 su telefono verticale. Ogni dispositivo carica il filmato adatto alla forma della finestra. Il formato telefono offre HEVC e H.264. Fuori vista il filmato si sospende. Con movimento ridotto appare solo il poster. La ricetta in `references/hero-video-partners/edit-rev21.json` documenta tagli, ritagli e fonti. Il manifest `references/hero-video-integration.json` identifica gli asset attivi e i relativi hash.

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

## Rifinitura locale · 14 novembre 2026

Porte e sicurezza: selettori alleggeriti, PDF della famiglia attiva, miniature e caricamento fotografico con skeleton/decodifica. Atelier Gibus: nove soluzioni ufficiali e cataloghi per tre famiglie, espandibili indipendentemente su mobile; link rapido dalla hero. Applicati i cinque aggiornamenti testuali richiesti (quattro paragrafi e titolo showroom). Corretta la presentazione delle rotte sconosciute con ritorno alla home e metadati dedicati.

Concept, fonti e confronto visivo in `references/security-refinement/`, `references/gibus-catalogs/` e `references/atelier-gibus/expansion-2026-11-14.json`. Nuove fotografie ufficiali conservate come riferimenti per la revisione locale. Verifiche: lint, TypeScript/build e 53 test in 13 file; browser integrato su desktop, tablet e telefono, con movimento ridotto. Sviluppo sulla porta 5175; nessuna pubblicazione.
