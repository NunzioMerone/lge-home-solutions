# Ottimizzazione e collaudo locale LGE Home Solutions

28 novembre 2026 · Confronto con il checkpoint `70971d0` di `main`. Il lavoro è nella copia locale. I test della configurazione commerciale usano dati editoriali di prova in una copia temporanea. Il sito definitivo richiede ancora la revisione privacy del titolare.

**Revisione successiva del comando video.** Dopo la prova locale, il controllo è stato spostato nella hero della homepage. «Pausa video» conserva il fotogramma e la frase visibili e «Riprendi video» continua dal punto di pausa. Le voci sul precedente comando generale e le misurazioni che seguono documentano il checkpoint sottoposto alla prima verifica.

## 1. Interventi completati

| Area | Risultato |
| --- | --- |
| Homepage | Il visitatore legge «Infissi, porte e soluzioni outdoor. Consulenza e posa qualificata nei Campi Flegrei.» sotto il titolo sincronizzato e il sottotitolo, sul video Rev25. Il link «Visita il nostro showroom» raggiunge e mette a fuoco la sezione contatti anche su telefono e tablet. |
| Pagine lunghe | «Indice Outdoor» apre le ancore alle nove famiglie, all’introduzione delle soluzioni, ai cataloghi, alle FAQ e allo showroom. Le guide presentano l’indice dei capitoli anche durante la lettura su telefono. |
| Realizzazioni | Cinque racconti dimostrativi consultabili in sviluppo, integrati nei filtri della galleria e nel visualizzatore delle foto. |
| Accessibilità | Controllo generale «Riduci movimento», nomi accessibili allineati ai testi visibili, contrasto delle didascalie e aree touch corretti. |
| Caricamento | Risorse fotografiche e interazioni Gibus differite per capitolo. Il titolo e le azioni della prima schermata occupano uno spazio più stabile durante il caricamento dei font. |
| SEO | Tutti e cinque i sistemi di porte sono leggibili nell’HTML statico. I breadcrumb degli articoli e lo schema delle guide pubblicate condividono dati e URL con il documento visibile. |
| Toolchain | ESLint da 10.13.0 a 10.16.0, typescript-eslint da 8.72.0 a 8.74.0 e minimatch transitivo da 10.2.6 a 11.0.9. |

## 2. File creati e modificati

I percorsi sono relativi alla radice del progetto.

| Stato | Cartella | File |
| --- | --- | --- |
| Creati | `Sito/public/img/hero/` | `outdoor-720.webp` |
| Creati | `Sito/references/` | `ottimizzazione-2026-11-28.md` |
| Creati | `Sito/src/components/blog/` | `BlogByline.tsx` |
| Creati | `Sito/src/components/layout/` | `MotionPreference.tsx`, `RetainedHome.test.tsx` |
| Creati | `Sito/src/components/ui/` | `SectionIndex.module.css`, `SectionIndex.tsx` |
| Creati | `Sito/src/data/` | `workCaseStudyDrafts.ts` |
| Creati | `Sito/src/pages/Works/` | `WorkCaseStudies.module.css`, `WorkCaseStudies.tsx` |
| Creati | `Sito/src/types/` | `sectionIndex.ts` |
| Modificati | Radice | `PROJECT_BRIEF.md` |
| Modificati | `Sito/` | `package-lock.json`, `package.json`, `vite.config.ts` |
| Modificati | `Sito/scripts/` | `prepare-pages.mjs`, `prepare-pages.test.ts`, `prepare_hero_photos.py`, `verify-pages.mjs` |
| Modificati | `Sito/src/components/blog/` | `Blog.module.css`, `BlogCard.tsx` |
| Modificati | `Sito/src/components/layout/` | `Header.module.css`, `Header.tsx`, `MobileMenu.tsx` |
| Modificati | `Sito/src/components/sections/Gallery/` | `ProjectClosing.tsx` |
| Modificati | `Sito/src/components/sections/Hero/` | `Hero.module.css`, `Hero.tsx`, `HeroProductCard.tsx`, `HeroProducts.module.css` |
| Modificati | `Sito/src/components/sections/ProductHero/` | `ProductHero.tsx` |
| Modificati | `Sito/src/components/ui/` | `ProductOptionDetails.test.tsx`, `ResponsiveImage.tsx` |
| Modificati | `Sito/src/data/` | `blog.ts`, `competencyDocuments.ts`, `hero.ts` |
| Modificati | `Sito/src/` | `entry-prerender.tsx`, `vite-env.d.ts` |
| Modificati | `Sito/src/hooks/` | `useBlogPageEntry.ts`, `useLoopCarousel.ts`, `usePageMetadata.ts`, `useSectionImages.ts` |
| Modificati | `Sito/src/pages/AtelierGibus/` | `AtelierGallery.tsx`, `AtelierGibus.module.css`, `AtelierGibus.tsx`, `AtelierShowcase.tsx` |
| Modificati | `Sito/src/pages/Blog/` | `BlogArticle.tsx` |
| Modificati | `Sito/src/pages/Competencies/` | `Competencies.module.css`, `DocumentPreview.tsx` |
| Modificati | `Sito/src/pages/Home/` | `Home.tsx` |
| Modificati | `Sito/src/pages/SecurityDoors/` | `DoorCatalogs.tsx`, `DoorDesignStudio.tsx` |
| Modificati | `Sito/src/pages/Works/` | `Works.tsx` |
| Modificati | `Sito/src/styles/` | `tokens.css` |
| Modificati | `Sito/src/types/` | `blog.ts`, `carousel.ts`, `competencyDocuments.ts`, `gallery.ts`, `works.ts` |
| Modificati | `Sito/src/utils/` | `blog.ts`, `siteSeo.test.ts`, `siteSeo.ts`, `works.test.ts` |

## 3. Decisioni progettuali

- La frase commerciale segue il sottotitolo e precede il link allo showroom. La gerarchia lascia al titolo sincronizzato il maggior peso visivo. Su telefono il collegamento conserva spazio laterale per WhatsApp e rispetta la safe area.
- Il controllo del movimento è nella barra di navigazione desktop e nel menu compatto. Riutilizza la preferenza di sessione già prevista dal sito. L’impostazione del dispositivo a movimento ridotto ha sempre precedenza. Chi lo attiva vede il poster e una frase ferma, e la preferenza sopravvive al ricaricamento nella stessa scheda.
- L’indice Outdoor usa una disclosure nativa a sinistra e resta entro i confini della pagina. L’apertura espone normali link con hash e la sezione corrente. Su telefono le guide riutilizzano lo stesso componente. Le recensioni occupano una sola sezione della home raggiungibile dalla navbar e dispongono già di paginazione. La galleria dei lavori si esplora con i filtri di categoria.
- Il percorso editoriale è Home → Blog → titolo della guida. Le categorie filtrano la pagina Blog e restano raggiungibili come filtri. Il breadcrumb visibile e quello strutturato derivano dalla stessa lista.
- Il nuovo `#696969` è il grigio neutro più vicino a `#6b6b6b` che supera 4,5 su `#ede9e3`. Il rapporto calcolato passa da 4,407 a 4,540. Per i puntini delle soluzioni è cambiata l’area del pulsante, che misura 32 × 44 CSS px. La forma del segno interno è quella originale. [Criterio W3C sui bersagli](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- Le schede Blog hanno un solo link «Leggi la guida» con il titolo nel nome accessibile. La fotografia e il resto della scheda conservano l’intera superficie cliccabile. Negli attestati il nome del pulsante comprende l’intestatario, «Visualizza attestato» e la qualifica. [Criterio W3C sul nome accessibile](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html)

## 4. Nuove funzionalità

**Bozze dei lavori.** Su [Lavori in sviluppo](http://127.0.0.1:5175/lavori/) ogni scheda raccoglie esigenza, soluzione, posa, possibile contributo LGE, risultato atteso e fotografie. L’indicazione di bozza compare nella sezione. Il modulo viene importato solo dal server Vite di sviluppo su loopback. La build elimina import, dati e stili dedicati. Il test di integrazione controlla HTML, manifest e chunk nelle due configurazioni di build.

**Articoli.** Un articolo con stato editoriale pubblicato e un’origine commerciale valida produce il `BlogPosting` con titolo, descrizione, immagine, lingua, editore, URL canonico e `mainEntityOfPage`. I campi facoltativi per autore e date provengono dai dati editoriali mostrati anche nella guida. Le sei bozze correnti conservano tale stato. L’anteprima senza origine canonica usa `noindex, nofollow` e omette gli schemi degli articoli che richiedono URL definitivi.

## 5. Problemi tecnici risolti

- Dopo Home → Infissi la pagina attiva e la home conservata montavano ciascuna un footer con `id="footer"`. Il footer segue ora lo stesso ciclo dell’header della home. Scroll, video, caroselli e destinazione `#contatti` conservano il comportamento previsto.
- Due schede dei certificati ITC di Termografia di categoria 1 riportavano «PDF», mentre il dialogo apriva il rispettivo WebP minimizzato. I sette attestati ora dichiarano l’azione compiuta. Le miniature e i file autorizzati sono verificati con le impronte del progetto.
- I due selettori delle porte mostravano nell’HTML statico la sola famiglia attiva. Il componente nativo condiviso con Infissi ora espone tre sistemi TEHNi e due Effepi, con testo e collegamenti specifici per ogni sistema. L’interazione JavaScript continua a mostrare la sola opzione attiva e la fotografia corrispondente.
- Nel Blog il lettore di schermo perdeva l’azione visibile. Il controllo esteso ha rilevato lo stesso tipo di incongruenza anche nelle schede soluzione in home e nei cataloghi delle porte. I nomi ora derivano dal contenuto dei controlli.
- Le nove segnalazioni npm moderate si riferivano alla filiera di sviluppo basata su minimatch. Sono state risolte con aggiornamenti supportati all’interno delle versioni principali di ESLint e typescript-eslint.

## 6. Risultati dei test

| Controllo | Esito osservato |
| --- | --- |
| ESLint, TypeScript strict, Vitest | Lint e typecheck superati. 93 test superati in 22 file, inclusi i controlli degli artefatti e delle guardie di rilascio. |
| Audit npm | Zero segnalazioni nel runtime prima e dopo. Nell’albero completo, da nove moderate a zero. |
| Build di anteprima | 16 pagine prerenderizzate più la 404. Su tutti i 17 HTML verificati H1, noindex, unicità degli ID e riferimenti ARIA. Controllati anche gli hash dei collegamenti interni e il JSON-LD effettivamente serializzato. La ricerca di titoli e identificativi dei casi dimostrativi in tutti gli artefatti testuali ha dato zero corrispondenze. |
| axe-core 4.14.1 | 16 rotte × 2 viewport (390 × 844 e 1440 × 900). Prima, 22 delle 32 verifiche riportavano almeno una violazione. Dopo, zero violazioni rilevate nelle 32 verifiche, compresa la regola opzionale di corrispondenza fra testo e nome. |
| Playwright e responsive | 1920 × 1080, 1440 × 900, 1280 × 800, 820 × 1180, 390 × 844 e 360 × 800. Verificati CTA showroom, focus, overflow, link delle schede e articoli correlati. Provati inoltre hero e menu a 320 × 568, 740 × 360 e 1100 × 750. |
| Fotografie e attestati | A 390 e 1440 px provati tutti e sette gli attestati. Ogni pulsante apre un WebP decodificabile, porta il focus su «Chiudi attestato» e lo recupera dopo Esc. Nella revisione locale provati i cinque filtri e il visualizzatore del caso. |
| Navigazione SPA | Riprodotto `footer` duplicato in sei percorsi dalla home. Dopo la correzione, nessun duplicato negli stessi percorsi, ritorno alla posizione salvata con Indietro e focus su `#contatti` al rientro dal footer. |
| Indici | Su desktop animato a 1440 × 900 e telefono touch a 390 × 844, verificati tutti i 13 collegamenti Outdoor per hash, focus, indicatore corrente e foto della famiglia. Verificati inoltre Esc, ripristino del focus dopo il visualizzatore e indice fuori dal footer. Nella guida mobile, provati apertura da tastiera, ritorno allo stesso hash, evidenziazione risalendo e passaggio all’indice desktop a 820 px. |
| Movimento | Dal video in riproduzione, la scelta interrompe video e testi automatici su desktop e telefono. Provati ricaricamento, ripresa e preferenza di sistema. |
| HTML senza JavaScript | Aperte da tastiera tutte e cinque le famiglie delle porte. Con JavaScript, verificate le cinque selezioni, la fotografia e i collegamenti corrispondenti. Provato su telefono il salto all’ultimo capitolo di una guida con JavaScript disattivato. |
| Dati strutturati | Fixture isolata con origine `https://lgesolutions.it/`, guida pubblicata con dati editoriali di prova e gerarchia di tre posizioni. Verificati testo e ordine del breadcrumb, URL assoluti, unicità degli script, aggiornamento dei metadati SPA e omissione del BlogPosting per le bozze. |
| Browser | Nelle prove sulle 16 rotte, esclusi i servizi di terzi per isolare il sito locale, zero eccezioni JavaScript, errori applicativi in console, ID duplicati o riferimenti ARIA irrisolti. |
| Lighthouse, altri controlli | Sulla build finale di Gibus mobile, Accessibilità 100/100 e Best Practices 100/100. SEO 63/100. L’unico controllo ponderato fallito è l’indicizzazione, bloccata intenzionalmente dal `noindex` dell’anteprima. |

## 7. Prestazioni prima e dopo

Lighthouse 12.8.2, Chrome headless 158, anteprime statiche locali, stessa macchina e cache fredda per navigazione. Mediane di tre esecuzioni mobile e due desktop per pagina e versione. Il profilo mobile simula 412 × 823, DPR 1,75, RTT 150 ms, 1.638 kbit/s e CPU 4×. Desktop usa il preset standard. I valori nella tabella sono esposti come prima → dopo. Il peso misura le immagini trasferite e tiene separati i byte del video.

| Pagina e profilo | Performance /100 | LCP | CLS | Richieste | Immagini trasferite |
| --- | ---: | ---: | ---: | ---: | ---: |
| Gibus mobile | 71 → 85 | 6,10 → 3,62 s | 0,093 → 0,012 | 53 → 29 | 2,475 → 0,143 MiB |
| Gibus desktop | 97 → 99 | 1,14 → 0,78 s | 0,044 → 0,004 | 62 → 30 | 3,48 → 0,14 MiB |
| Home mobile | 86 → 87 | 3,57 → 3,42 s | 0,000 → 0,001 | 26 → 25 | 0,23 → 0,23 MiB |
| Home desktop | 100 → 100 | 0,71 → 0,72 s | 0,004 → 0,006 | 31 → 30 | 0,25 → 0,25 MiB |

L’audit indipendente riportava per Gibus mobile 91/100, LCP mediano di 2,94 s, CLS fino a 0,109, 53 richieste e 2,47 MiB di immagini. Il checkpoint locale riproduce il numero di richieste e il peso delle immagini. Le impostazioni complete di macchina, Lighthouse e hosting dell’audit non sono disponibili. La variazione attribuibile al lavoro è misurata sulla coppia locale. In queste prove il CLS massimo su Gibus mobile passa da 0,093 a 0,012.

La serie Lighthouse misura l’apertura della pagina con indice chiuso. Dopo la serie è stata regolata la posizione alla quale l’indice aperto evidenzia la sezione successiva su telefono. Il collaudo dei 26 salti riportato sopra comprende quest’ultima correzione.

## 8. Limiti e criticità residue

Gibus mobile trasferisce circa il 94% di immagini in meno al primo caricamento. Le richieste di immagini passano da 29 a 5. Con i font rallentati, il titolo della versione iniziale passava da tre a due righe e spostava le azioni di circa 48 px. Il fallback tipografico e la disposizione delle CTA correggono lo spostamento principale. La foto hero rimane l’elemento LCP. Anticiparne il preload in una build sperimentale non ha portato un ulteriore miglioramento misurabile.

L’LCP mobile simulato di Gibus scende del 41% ma resta a 3,62 s. Il riferimento per un buon LCP sul traffico reale è 2,5 s al 75º percentile. Sulla home il punteggio desktop resta 100, con LCP da 0,715 a 0,718 s. Il CLS mobile della home presenta una piccola variazione, con massimo da 0 a 0,0104. [Definizione e soglia LCP](https://web.dev/articles/lcp)

Le prove touch sono state eseguite con Chrome in emulazione. I risultati di Lighthouse misurano il caricamento locale a cache fredda. Non sono disponibili in questa attività misure sul traffico reale di SiteGround, prove su telefono fisico con VoiceOver/TalkBack o una verifica con un motore di comandi vocali. Per il dialogo documentale e le nuove azioni sono stati controllati ruoli, nomi, tastiera e focus nel browser.

## 9. Contenuti da sostituire o approvare

Con la successiva autorizzazione del 28 novembre l’anteprima GitHub Pages comprende anche i cinque racconti in `Sito/src/data/workCaseStudyDrafts.ts`. La pagina Lavori li presenta come esempi ipotetici, con immagini dell’archivio. La verifica della build di anteprima controlla titolo e risultato atteso di ciascuna scheda. La build commerciale continua a escludere il modulo.

Le foto nelle bozze sono riferimenti visivi dell’archivio. Per ogni caso LGE dovrà confermare l’associazione tra foto e intervento e fornire il racconto effettivo. Restano da approvare separatamente fotografie definitive, FAQ e sei articoli. Il trasferimento al repository aziendale e la pubblicazione commerciale restano le successive attività di consegna.
