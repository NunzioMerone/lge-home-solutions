# Istruzioni permanenti per Codex — LGE Home Solutions

## 1. Ambito e fonti di riferimento

Queste istruzioni si applicano all'intero workspace. Leggere [PROJECT_BRIEF.md](./PROJECT_BRIEF.md) per identità aziendale, design, funzionalità, stato del progetto e roadmap.

- Operare come un ingegnere software senior in un contesto professionale di produzione.
- Analizzare problema, struttura esistente e impatto prima di modificare il codice.
- Dare precedenza alle istruzioni esplicite e aggiornate dell'utente.
- Non trasformare una proposta o una decisione aperta del brief in un requisito già approvato.
- Aggiornare i documenti quando nuove decisioni concordate rendono obsolete le informazioni precedenti.

## 2. Directory e lavoro per fasi

- Rifinitura del 7 novembre 2026, richiesta corrente: nel visualizzatore fotografico le frecce sono esclusivamente desktop/tablet; su telefono, anche landscape, restano gesto e X. Carosello con dimensioni numeriche stabili e Virtual per raccolte oltre nove foto: evitare `slidesPerView="auto"`, che ricalcola la posizione al termine dei download. Foto con cornice dimensionata dal rapporto originale, anteprima 480 px e dettaglio mostrato soltanto dopo `decode()`; dettaglio fino a 960 px su mobile e originale su desktop. Preparare due foto per lato, senza caricare l’intera raccolta. Verifiche con rete rallentata e server locale riproducibile in `Sito/references/coverflow-preview/`; pubblicazione e push su main richiesti.
- Aggiornamento del 7 novembre 2026: l’utente richiede e autorizza la pubblicazione del Coverflow di Swiper nei visualizzatori fotografici della home e di `/lavori`, anche su desktop con frecce. Swiper 14.4.0 e il solo modulo EffectCoverflow sono caricati su apertura del dialogo; gli altri caroselli restano Embla. Mantenere foto attiva intera, anteprime inclinate, controlli vicini alla foto, swipe, tastiera, Esc e focus. Tre foto montate a riposo; durante il movimento si conservano anche i vicini della foto uscente, al massimo sei, per evitare vuoti. Con movimento ridotto usare scorrimento senza prospettiva e transizioni istantanee. La pagina di verifica locale è `Sito/references/coverflow-preview/`. Commit, push su `main` e workflow Pages esistente autorizzati.
- Ultimo aggiornamento del 6 novembre 2026: l’utente autorizza commit, push di tutto il checkpoint corrente su `main` e pubblicazione GitHub Pages tramite il workflow esistente. Questa richiesta supera i precedenti vincoli di sola prova locale per le revisioni del 6 novembre, inclusi video Rev11, transizioni, skeleton, contatti e Lavori. La home usa esclusivamente le 11 immagini della cartella `LGE_foto_lavori_home`, con varianti WebP dedicate separate dalle 101 fotografie della raccolta completa. Showroom con il nuovo segnaposto fornito, intero e senza etichetta «Il nostro showroom». Colonne Lavori allineate; titolo fisso anche nella posizione, categoria in 0,9 s. Fascia finale con foto intera solo da 700 px e pulsante «Parliamo su WhatsApp» con icona iniziale. Visualizzatore fotografico Embla con trascinamento continuo e sole tre immagini caricate per volta. Restano anteprima non indicizzata e stato reale della Privacy Policy.
- Nuovo riferimento del 6 novembre 2026: «Vieni a trovarci» conserva la composizione a foto singola: fondo caldo, foto a destra su desktop e prima dei riquadri su mobile, prenotazione WhatsApp/su appuntamento e indirizzo affiancato alla mappa reale. La prova a quattro foto è annullata su richiesta dell’utente. Usare la scala del sito (`--font-size-section-title`, descrizione 0.9rem e pulsanti 0.8125rem), senza ingrandimenti dedicati ai monitor grandi. La foto di riferimento è provvisoria. Curve uniformi di 8 px (`--radius`), come le card delle soluzioni, per foto, pannelli e pulsanti; evitare nuovi raggi differenti o capsule. Eccezione richiesta: le frecce dei caroselli restano tonde, come prima, con raggio 50%. La revisione resta locale.
- Aggiornamento del 6 novembre 2026: correggere la continuità delle transizioni fra card e hero, in particolare Oscuranti e Porte e sicurezza, preservando la porzione di foto visibile al clic. Sostituire le attese testuali con skeleton adatti alle pagine. Questa revisione è autorizzata solo in locale: avviare la porta 5175 e non eseguire push o deploy.
- Dal 3 novembre 2026 esiste un solo sito ufficiale da sviluppare, in `Sito/`. Hero corrente Rev12: stesse dieci scene e 58,933 s di Rev11, ricostruite dalle fonti a 60 fps con interpolazione del movimento. Rimossi gli spostamenti artificiali del crop mobile nelle scene 1, 6 e 10, mantenendo la priorità all’oscurante. H.264 desktop/tablet/mobile e HEVC portrait, poster Rev12, riproduzione 1×. Ricetta e verifiche in `Sito/references/hero-video-fluidity/`. L’utente chiede esplicitamente di migliorare la fluidità e pubblicare il risultato; commit, push e workflow Pages autorizzati. L’ultima revisione usa un velo antracite leggero sul lato sinistro, prefisso e sottotitolo chiari e frase ciclica nel colore Sabbia `#EDD5B3` scelto dall’utente, dissolvenza lenta del titolo da sinistra a destra e rimuove dalla hero WhatsApp e il comando pausa video; i checkpoint già pubblicati restano distinti dalla revisione locale corrente. L’ultima prova mobile, sotto 700 px, sposta il testo in basso a sinistra in un blocco più largo, con sfumatura dal basso e safe area; desktop e tablet conservano la composizione precedente.
- Aggiornamento del 5 novembre 2026: l’utente autorizza ora commit e push di tutto il lavoro corrente su `NunzioMerone/lge-home-solutions`, con pubblicazione tramite il workflow GitHub Pages esistente. Il checkpoint corrente comprende la hero Rev07 a 30 fps e 1× (rallentamento incorporato), testo mobile in basso a sinistra, pagina Infissi completa, espansione della stessa immagine per tutte le cinque soluzioni, card conservate con prodotti interi e didascalie nello spazio riservato, competenze centrate su mobile, focus visibile solo da tastiera dopo le interazioni e rimozione degli orari dai contatti. Questa richiesta sostituisce il vincolo precedente di sola prova locale per questo checkpoint; restano anteprima non indicizzata e stato reale della Privacy Policy.
- Ultima correzione richiesta: mantenere le card delle soluzioni, senza pannelli che coprano il prodotto. Avvicinare i prodotti lontani e regolare il contesto anche su desktop; non è richiesto mostrare tutta la fotografia. Conservare home, video e caroselli nelle navigazioni interne, ripristinando lo scroll con Indietro. Codice delle pagine secondarie differito. HEVC mobile con fallback H.264 e nessuna nuova scena; push richiesto.
- La precedente variante della homepage è rimossa dal codice corrente. La cartella di confronto non è più un progetto attivo e non va ricreata per le modifiche ordinarie.
- Repository unico personale: `NunzioMerone/lge-home-solutions`. GitHub Pages: `https://nunziomerone.github.io/lge-home-solutions/`. Sviluppo locale: porta 5175; anteprima build: 4175. Usare il solo workflow `.github/workflows/deploy.yml` nella radice.
- Conservare la documentazione generale nella radice del workspace; codice, asset, dipendenze e configurazioni del sito restano in `Sito/`, con istruzioni specifiche in `Sito/AGENTS.md`.
- I prototipi storici `Hero_test/` (con test Blender), `Hero_Test2/` (video) e la cartella vuota `Sito_web/` restano materiali locali indipendenti ed esclusi dal sito ufficiale. Non modificarli o mescolarli con l’applicazione senza richiesta.
- Il sito comprende homepage, cinque rotte prodotto provvisorie, Privacy Policy, Competenze con attestati reali e I nostri lavori con 101 fotografie suddivise in cinque categorie. Non sviluppare ulteriori contenuti, backend o integrazioni senza richiesta.
- Avviare lo sviluppo quando richiesto, completando autonomamente le attività necessarie alla fase autorizzata. Verificare la fase prima di proseguire e non richiedere conferme aggiuntive per normali scelte implementative già comprese nell’ambito.

- Revisione locale del 6 novembre 2026 per `/lavori`: hero panoramica decorativa più alta, senza etichetta o linea, sotto la navbar inizialmente trasparente. Filtri fotografici più grandi con le stesse immagini delle soluzioni e sfumatura blu LGE sulla selezione; «Tutti» usa un mosaico. Il cambio categoria aggiorna soltanto il nome accanto al titolo fisso «I nostri lavori» e la galleria, senza rimontare hero/filtri né forzare lo scroll. Nessun conteggio visibile. Ingressi come in home e dissolvenza del nome categoria; foto reali intere in colonne bilanciate, caricamento a gruppi di 18 e link «Altre fotografie» senza bordo. Skeleton per attese e immagini. Solo locale, nessun push o deploy.
- Rifinitura successiva di `/lavori`, sempre locale: nome categoria con la maschera sfumata da sinistra a destra della home, in 2,6 s e avvio quando visibile; etichette dei filtri 14 px su mobile e 15 px su desktop. Invito finale dal nuovo riferimento: «La prossima realizzazione potrebbe essere la tua», foto decorativa a destra sfumata nel fondo e pulsante «Parliamone insieme» sul WhatsApp verificato. Nei visualizzatori di foto e documenti usare la stessa X chiara senza riquadro, vicina al contenuto; frecce tonde a 12 px dalla fotografia su desktop e subito sotto su mobile. Conservare foto/documenti interi, tastiera, Esc, safe area e ripristino del focus.

## 3. Stack

Per `Sito/` usare React, TypeScript strict, Vite, React Router, CSS Modules e CSS custom properties; GSAP/ScrollTrigger per animazioni complesse ed Embla per i caroselli. Non usare stili inline React. Tailwind rimane nei due prototipi esistenti: non convertirli o modificarli come conseguenza del lavoro sulla homepage.

- Seguire le convenzioni delle versioni effettivamente presenti nel progetto.
- Non introdurre framework o pattern estranei allo stack senza una necessità concreta.
- Installare dipendenze soltanto quando servono alla fase richiesta.
- Per il sito ufficiale Three.js resta una possibilità da valutare. Per `Hero_test/` sono stati esplicitamente richiesti e autorizzati Three.js, React Three Fiber e, se utile, Drei.
- Usare il package manager e il lockfile scelti dal progetto; non mescolare gestori o generare lockfile concorrenti.

## 4. TypeScript e confini dei dati

- Abilitare e mantenere `strict`; non indebolire la configurazione per aggirare errori.
- Collocare tutti i type e le interface dedicati in `src/types/` del progetto interessato (`Sito/`, `Hero_test/` oppure `Hero_Test2/`), inclusi i tipi delle props e dei dati condivisi, organizzati per dominio o funzionalità. Non mescolare i file dei progetti.
- Usare `import type` per importazioni esclusivamente di tipo.
- Evitare `any`, cast approssimativi, doppie asserzioni e operatori di non-null assertion usati per nascondere problemi.
- Usare `unknown` e restringimento dei tipi per dati non attendibili; validare i dati esterni ai confini dell'applicazione.
- Modellare correttamente valori opzionali, stati di caricamento, errori e assenza di dati.
- Sfruttare l'inferenza quando è chiara; dichiarare contratti espliciti dove migliorano leggibilità e sicurezza.
- Non usare direttive di soppressione per evitare di risolvere un errore di tipo.

## 5. Organizzazione e responsabilità

Organizzazione all'interno di `Sito/src/`, da estendere solo quando necessario. Gli stessi criteri si applicano ai prototipi separati:

| Cartella | Responsabilità |
| --- | --- |
| `components/` | Componenti riutilizzabili e sezioni con responsabilità chiare |
| `pages/` | Composizione delle pagine associate alle rotte |
| `types/` | Type e interface dedicati, organizzati per ambito |
| `hooks/` | Hook personalizzati e comportamento riutilizzabile legato a React |
| `utils/` | Funzioni riutilizzabili indipendenti dalla presentazione |
| `data/` | Contenuti strutturati e dati editoriali |
| `config/` | Configurazioni dell'applicazione |
| `assets/` | Asset elaborati dal bundler |
| `styles/` | Stili globali e definizioni visive condivise, se necessari |

Gli asset che richiedono URL pubblici stabili possono risiedere in `Sito/public/`, con sottocartelle ordinate. Evitare duplicazioni tra `public/` e `src/assets/`. Conservare separatamente gli originali e i prompt delle foto dimostrative.

- Non creare cartelle vuote o astrazioni senza un utilizzo reale.
- Separare contenuti, configurazione, logica e presentazione.
- Mantenere funzioni piccole, focalizzate e testabili.
- Estrarre componenti condivisi quando esiste un riuso concreto o una responsabilità autonoma.
- Evitare componenti monolitici, duplicazioni e generalizzazioni premature.
- Non aggiungere librerie di stato per esigenze gestibili con strumenti React già disponibili.

## 6. Convenzioni e React

- Usare nomi in inglese, chiari e coerenti per identificatori e file di codice; mantenere i contenuti rivolti al visitatore in italiano.
- Usare PascalCase per componenti, relativi file e tipi; camelCase per funzioni, variabili e utility.
- I nomi degli hook personalizzati devono iniziare con `use` e descrivere il comportamento.
- Rispettare le regole degli hook e mantenere gli effetti limitati alla sincronizzazione con sistemi esterni.
- Evitare stato duplicato o derivabile e dipendenze di effetti volutamente omesse.
- Usare chiavi stabili per liste e dati strutturati.
- Gestire timer, listener, observer e altre risorse con cleanup corretto.
- Non aggiungere memoizzazione senza una motivazione concreta.
- Usare i meccanismi di React Router per la navigazione interna.
- Preservare funzionalità, compatibilità e stile del codice esistente.
- Scrivere commenti quando spiegano motivi o vincoli non evidenti; evitare commenti che ripetono il codice.

## 7. Design e contenuti

- Applicare identità, palette indicativa, gerarchie e principi del brief.
- Centralizzare i valori visivi ricorrenti con CSS custom properties in `Sito/`; usare gli strumenti coerenti con la versione di Tailwind soltanto nei prototipi che già lo adottano.
- Privilegiare bordi squadrati, spazio, fotografie curate e blu usato come accento.
- Non alterare geometria e proporzioni del logo originale.
- Usare Sicilinfissi come riferimento progettuale, senza copiarne contenuti o identità.
- Distinguere esplicitamente asset e testi provvisori da quelli definitivi.
- Non inventare recensioni, partnership, certificazioni, promozioni, prestazioni o dati aziendali presentandoli come reali.
- Non usare foto di catalogo o loghi partner senza la disponibilità dei diritti necessari.
- Non assumere che i servizi pubblicizzati da un sito di riferimento siano offerti da LGE.

## 8. Animazioni e hero

- Usare CSS per transizioni semplici e GSAP/ScrollTrigger quando la complessità lo richiede.
- Progettare animazioni fluide e funzionali, senza ostacolare lettura, navigazione o scorrimento naturale.
- Rispettare `prefers-reduced-motion` e predisporre una presentazione accessibile dei contenuti essenziali.
- Gestire inizializzazione e cleanup delle animazioni, inclusi cambio rotta, resize e ciclo di vita dei componenti.
- Verificare il comportamento anche con React Strict Mode; evitare istanze, listener o trigger duplicati.
- Preferire proprietà adatte all'animazione, evitando ricalcoli di layout inutili e aggiornamenti React per ogni frame.
- Non avviare la hero fotorealistica senza aver definito asset, tecnica e comportamento sui dispositivi di destinazione.
- Non simulare una sequenza continua attraverso fotografie scollegate.
- Non bloccare l'accesso alla navigazione o ai contenuti essenziali fino al completamento della sequenza.
- Nei caroselli automatici prevedere pausa, controllo manuale e comportamento compatibile con le preferenze di movimento.

## 9. Accessibilità, responsive, SEO e performance

- Considerare questi requisiti dall'inizio, non soltanto nella rifinitura finale.
- Usare HTML semantico, gerarchia corretta dei titoli e link o pulsanti secondo la loro funzione.
- Garantire navigazione da tastiera, focus visibile e gestione del focus nei menu e negli eventuali dialoghi.
- Associare etichette ai campi e rendere comprensibili gli errori dei moduli.
- Scrivere alternative testuali pertinenti; usare alternative vuote per immagini decorative.
- Verificare contrasto, leggibilità, aree interattive e layout su desktop, tablet e smartphone.
- Non rendere le interazioni dipendenti esclusivamente dall'hover.
- Evitare sovrapposizioni invasive, overflow orizzontali indesiderati e salti di layout.
- Ottimizzare immagini, dimensioni dichiarate, formati, caricamento e varianti responsive.
- Caricare risorse pesanti e contenuti differibili in modo proporzionato al loro utilizzo; non penalizzare l'immagine principale con caricamento differito indiscriminato.
- Valutare costo di download, decodifica e memoria degli asset della hero.
- Prevedere titoli e metadati pertinenti alle pagine; definire URL canonici e dati strutturati solo usando informazioni verificate.
- Non considerare React Router una strategia SEO completa: concordare hosting e necessità di prerendering nella fase pertinente.

## 10. Sicurezza e integrazioni

- Non inserire segreti, credenziali o chiavi private nel codice client, negli asset o nei file versionati.
- Considerare pubbliche le variabili esposte al browser da Vite.
- Validare e gestire in modo sicuro gli input quando verranno implementati moduli o servizi.
- Non introdurre HTML non attendibile senza una gestione esplicita della sanitizzazione.
- Non aggiungere analytics, chat, widget recensioni o servizi esterni senza una richiesta pertinente e una configurazione definita.
- Non creare invii fittizi o conferme di successo prive di un'integrazione funzionante.
- Non pubblicare o distribuire il sito come conseguenza implicita di una modifica locale.

## 11. Verifica e consegna

- Produrre codice completo e mantenibile nel perimetro richiesto; non lasciare logica incompleta o TODO non richiesti.
- Eseguire typecheck, lint, build e test pertinenti quando gli strumenti sono disponibili e appropriati alla modifica.
- Scrivere test significativi per logica e comportamenti che richiedono protezione da regressioni; evitare test che ripetono l'implementazione o introdotti solo per modifiche documentali e a basso impatto.
- Per le interfacce verificare il risultato visivo e le interazioni, includendo i formati di schermo pertinenti e il movimento ridotto quando coinvolto.
- Non dichiarare verifiche, prestazioni o compatibilità che non sono state effettivamente controllate.
- Non ampliare le modifiche con rifattorizzazioni estranee al problema.
- Non sovrascrivere modifiche dell'utente né eseguire operazioni distruttive non richieste.
- Alla consegna spiegare brevemente cosa è cambiato, perché, come è stato verificato ed eventuali limiti reali.
- Comunicare in italiano con spiegazioni brevi, concrete e tecnicamente precise.
