# Istruzioni permanenti per Codex — LGE Home Solutions

## 1. Ambito e fonti di riferimento

Queste istruzioni si applicano all'intero workspace. Leggere [PROJECT_BRIEF.md](./PROJECT_BRIEF.md) per identità aziendale, design, funzionalità, stato del progetto e roadmap.

- Operare come un ingegnere software senior in un contesto professionale di produzione.
- Analizzare problema, struttura esistente e impatto prima di modificare il codice.
- Dare precedenza alle istruzioni esplicite e aggiornate dell'utente.
- Non trasformare una proposta o una decisione aperta del brief in un requisito già approvato.
- Aggiornare i documenti quando nuove decisioni concordate rendono obsolete le informazioni precedenti.

## 2. Directory e lavoro per fasi

- Mantenere la documentazione generale nella radice del workspace.
- Contenere tutto il codice, gli asset e le configurazioni del sito ufficiale in `Sito/`, come richiesto dal prompt aggiornato del 23 ottobre 2026. La precedente cartella vuota `Sito_web/` resta conservata.
- Il prototipo della sola hero è stato autorizzato come progetto indipendente in `Hero_test/`. Tutti i suoi file, dipendenze e asset devono rimanere al suo interno; non modificare `Sito_web/` per sviluppare il prototipo.
- È inoltre autorizzata la seconda proposta video in `Hero_Test2/`, con codice, dipendenze e asset indipendenti. Conservare intatti il primo prototipo e i test Blender. Applicare anche a questa cartella le convenzioni di struttura e qualità definite sotto.
- La nuova homepage è autorizzata in `Sito/`, con istruzioni specifiche in `Sito/AGENTS.md`. Non rinominare le directory né mescolare file e dipendenze dei tre progetti.
- Dal 29 ottobre 2026 è autorizzata `Sito_Hero_PT2/`, copia indipendente del sito attuale con repository `NunzioMerone/lge-home-solutions-hero-pt2`. La futura hero alternativa va modificata esclusivamente qui; codice, asset, dipendenze e deploy restano separati da `Sito/`.
- I due prototipi restano esperimenti indipendenti. Il sito ufficiale comprende la homepage, cinque rotte prodotto provvisorie, la Privacy Policy e, dal 29 ottobre 2026, le pagine Competenze con attestati reali e I nostri lavori con tutte le 101 foto suddivise in cinque categorie. Non sviluppare ulteriori contenuti interni, backend o integrazioni future senza richiesta.
- Avviare lo sviluppo quando richiesto dall'utente, completando autonomamente le attività necessarie alla fase autorizzata.
- Non anticipare sezioni, pagine, integrazioni o funzionalità estranee alla richiesta corrente.
- Verificare la fase sviluppata prima di passare alla successiva.
- Non richiedere conferme aggiuntive per normali scelte implementative già comprese nella fase autorizzata.

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
