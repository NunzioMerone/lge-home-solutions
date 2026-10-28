# LGE Home Solutions — Homepage

Homepage locale realizzata dal prompt del 23 ottobre 2026. Il prompt completo è conservato in `references/homepage-request.txt`; l'immagine allegata è stata usata solo come riferimento estetico.

## Avvio

Richiede Node.js 22.12 o successivo e npm.

```sh
cd /Users/nunziomerone/Desktop/Project/LgeHomeSolutions/Sito
npm ci
npm run dev
```

Aprire **http://localhost:5175/**. La porta è separata dai prototipi 5173 e 5174.

## Pubblicazione su GitHub Pages

Sito: **https://nunziomerone.github.io/lge-home-solutions/**.

Repository personale: **https://github.com/NunzioMerone/lge-home-solutions**. Il workflow `deploy.yml` nella radice del repository esegue lint, test, build e pubblicazione a ogni push su `main`. La build usa il prefisso `/lge-home-solutions/`; asset e React Router rispettano `import.meta.env.BASE_URL`. Lo sviluppo locale continua a usare `/`.

Lo script `scripts/prepare-pages.mjs`, eseguito con Node.js 24 nel workflow, genera punti di ingresso statici per le cinque pagine prodotto, con navbar, footer, titolo della categoria e messaggio di sezione in preparazione.

## Comandi di verifica

```sh
npm run typecheck
npm run lint
npm test
npm run build
npm run preview
```

La preview della build usa la porta 4175. `npm run format` e `npm run format:check` gestiscono la formattazione.

## Struttura

```text
src/
  components/
    sections/       Hero, Partners, Certifications, Gallery, Reviews, Contacts
    layout/         Footer
    ui/             Carousel, immagini responsive, titoli, icone, azioni contatto
  pages/            Home e pagine prodotto provvisorie
  hooks/            Animazioni, caroselli, preferenze, recensioni, ancore
  types/            Contratti tipizzati dei contenuti e dei componenti
  data/             Dataset provvisori e testi
  config/           Identità, contatti, movimento e breakpoint JS
  services/         Adattatore delle recensioni
  utils/            Macchina a stati del titolo e link contatto
  styles/           Design token e regole globali
public/img/         Loghi e fotografie responsive locali
references/         Prompt, originali fotografici, licenze font
verification/       Anteprime e report delle verifiche
```

React, TypeScript strict, Vite, React Router, CSS Modules, CSS custom properties, GSAP/ScrollTrigger e Embla 8 con Auto Scroll. Nessuno stile inline React, nessun `any`, nessun backend o modulo di contatto. I type dedicati risiedono in `src/types/`.

Il prompt aggiornato richiede `Sito/`, che è stato creato senza rinominare la precedente cartella vuota `Sito_web/`. I due esperimenti e i test Blender non sono stati modificati.

## Contenuti e comportamento

La versione corrente usa il logo orizzontale lineare fornito per ultimo, il fondo globale `#FCFCFB` e il blu `#014380` campionato dal logo per il suffisso animato della hero. Il prefisso ha una comparsa dal basso di 0,95 secondi e resta poi statico. Il movimento ridotto mantiene tutti i contenuti immediatamente visibili.

La sezione separata «I nostri prodotti» è stata rimossa il 27 ottobre 2026. Le descrizioni e i report più vecchi di quella sezione documentano una versione precedente. Il footer rimanda al carosello della hero con «Le nostre soluzioni».

**Hero attuale — 27 ottobre 2026.** Hero chiara e minimale, senza fotografia di sfondo. Logo originale immediatamente visibile a sinistra della navbar e tutte le voci a destra, con più spazio tra i gruppi. Nessuna introduzione con logo che sale. «Il design che» entra con una dissolvenza dal basso di 0,95 secondi e poi resta fisso; cinque finali si scrivono, si cancellano e ruotano con cursore lampeggiante, su una sola riga da 700 px e con disposizione su più righe sui telefoni. Il sottotitolo completo «Ogni ambiente merita di essere vissuto al meglio.» entra con dissolvenza dal basso e resta statico. Spazio riservato per tutte le frasi; nessun controllo pausa/riprendi nella hero. Resta rispettato il movimento ridotto e si evitano aggiornamenti fuori vista o a scheda nascosta. Sotto: carosello Embla di Infissi, Oscuranti, Porte e sicurezza, Porte interne e Atelier Gibus, con ingresso delle card dal basso in 1,8 secondi, a intervalli di 0,18 secondi. Foto locali, proporzioni 4:5, angoli di 8 px, pannello chiaro e zoom interno del 3,5% in hover/focus, dimensioni esterne fisse. Su touch e sotto 700 px il pannello è già visibile. Frecce circolari sottili nel blu LGE affiancano gli indicatori da 700 px quando il contenuto è scorrevole; ai limiti del carosello sono disabilitate. Swipe e tastiera restano disponibili. Le piccole frecce interne ai pannelli identificano i link alle categorie. La sezione separata «I nostri prodotti» è stata eliminata: le cinque categorie restano soltanto nella hero. L’ancora #prodotti ora raggiunge il carosello della hero. Spazio maggiore sopra il titolo e sotto il sottotitolo; testi della navbar leggermente rientrati verso il centro. Il pannello delle card ha sfondo opaco costante e si anima soltanto con una traslazione, senza dissolvenze concorrenti; l’intera card mantiene una sola superficie di puntamento.

Rifinitura del 24 ottobre: titoli delle sezioni più contenuti (`clamp(1.85rem, 2.7vw, 2.75rem)`) e linea blu di 52 px che compare dopo l'inizio dell'ingresso del titolo. La hero mantiene il fondo `#FAF9F6`; Prodotti usa `#EDE9E3`, lo stesso greige delle Competenze, poi Partner ritorna al fondo della hero. Le cinque card prodotto hanno fotografie verticali 3:4, angoli da 8 px, testi brevi dedicati e centrati, senza “Scopri di più” né bordo inferiore. Su desktop gli ingressi alternano alto e basso, durano 1,8 secondi con intervalli di 0,2 secondi e avvengono una sola volta. Sotto 700 px il carosello entra come gruppo con una dissolvenza e un movimento verso l'alto di 18 px in 1,3 secondi, senza alternanza o ritardi tra le card; durante lo swipe le fotografie restano visibili. Il focus rende subito leggibile il contenuto e il movimento ridotto disabilita gli ingressi. I loghi partner reali sono una selezione dimostrativa dai produttori, con ingresso da destra verso sinistra: fonti in `references/partner-logo-sources.json`; rapporti commerciali e uso pubblico sono da confermare. Il report aggiornato è `verification/products-partners-checks.json`.

Rifinitura delle intestazioni: tutti i titoli iniziali delle sezioni, da Partner a Contatti, sono centrati e usano la stessa scala fluida (`--font-size-section-title`). I titoli H3 delle card condividono `--font-size-card-title`. Resta un solo H1, nella hero, avvicinato al logo con 20–24 px di spazio oltre l'altezza della navbar. Etichette introduttive e Lorem ipsum sono stati rimossi dalle intestazioni; rimangono i contenuti demo dentro le card e le indicazioni sulla provenienza degli asset. La voce selezionata della navbar, determinata dall'ancora navigata, ha una linea nel blu LGE `#205D9B`, anche nel menu mobile; Soluzioni resta senza linea su tutta la homepage, anche all’ancora #prodotti e con il sottomenu aperto; l’indicatore dipende esclusivamente dal percorso di una delle cinque pagine prodotto, su desktop e mobile. La nuova hero mantiene un carosello orizzontale anche sul telefono, con swipe, indicatori e tastiera. Verifiche aggiornate in `verification/heading-cleanup-checks.json`.

La homepage ha una **navbar fissa bianca e traslucida**, immediatamente visibile, con logo a sinistra e tutti i link a destra. È stato rimosso il precedente ingresso del logo dal centro dello schermo. La barra iniziale misura 112 px su desktop e 96 px su mobile. Il logo orizzontale fornito il 27 ottobre mantiene proporzioni 3:1 e dimensioni fluide, adattate anche alla barra compatta. Oltre 24 px di scroll si compatta a 88/76 px e usa il fondo bianco al 74% con sfocatura. Soluzioni e le altre destinazioni mantengono il comportamento precedente; le pagine prodotto mostrano navbar, footer, titolo e messaggio di preparazione.

Sotto 1100 px, due linee si incrociano nella X in 550 ms. Il menu bianco occupa lo schermo, si apre dall'alto in 650 ms e presenta le voci con ingressi graduali; Soluzioni apre le categorie a fisarmonica; il logo rimane a sinistra anche su mobile. Il pannello ha gestione del focus, chiusura con Esc, sfondo non interattivo e blocco dello scroll. Link, chiusura e cambio breakpoint ripristinano lo stato della pagina. I menu chiusi sono esclusi dalla navigazione e dall'albero di accessibilità. Il movimento ridotto rende immediate le transizioni. La navbar e il footer sono condivisi anche dalle cinque pagine prodotto provvisorie.

1. **Hero:** Hero chiara e minimale, senza fotografia di sfondo. Logo originale immediatamente visibile a sinistra della navbar e tutte le voci a destra, con più spazio tra i gruppi. Nessuna introduzione con logo che sale. «Il design che» entra con una dissolvenza dal basso di 0,95 secondi e poi resta fisso; cinque finali si scrivono, si cancellano e ruotano con cursore lampeggiante, su una sola riga da 700 px e con disposizione su più righe sui telefoni. Il sottotitolo completo «Ogni ambiente merita di essere vissuto al meglio.» entra con dissolvenza dal basso e resta statico. Spazio riservato per tutte le frasi; nessun controllo pausa/riprendi nella hero. Resta rispettato il movimento ridotto e si evitano aggiornamenti fuori vista o a scheda nascosta. Sotto: carosello Embla di Infissi, Oscuranti, Porte e sicurezza, Porte interne e Atelier Gibus, con ingresso delle card dal basso in 1,8 secondi, a intervalli di 0,18 secondi. Foto locali, proporzioni 4:5, angoli di 8 px, pannello chiaro e zoom interno del 3,5% in hover/focus, dimensioni esterne fisse. Su touch e sotto 700 px il pannello è già visibile. Frecce circolari sottili nel blu LGE affiancano gli indicatori da 700 px quando il contenuto è scorrevole; ai limiti del carosello sono disabilitate. Swipe e tastiera restano disponibili. Le piccole frecce interne ai pannelli identificano i link alle categorie. La sezione separata «I nostri prodotti» è stata eliminata: le cinque categorie restano soltanto nella hero. L’ancora #prodotti ora raggiunge il carosello della hero. Spazio maggiore sopra il titolo e sotto il sottotitolo; testi della navbar leggermente rientrati verso il centro. Il pannello delle card ha sfondo opaco costante e si anima soltanto con una traslazione, senza dissolvenze concorrenti; l’intera card mantiene una sola superficie di puntamento. La macchina a stati è verificata in `utils/heroTyping.test.ts`; `useHeroEntrance` gestisce ingressi e cleanup in Strict Mode. Il carosello è separato dagli aggiornamenti per carattere del titolo. Le fotografie restano dimostrative.
2. **Partner:** otto marchi indicati dall’utente il 27 ottobre: Schüco, VELUX, I-PEA Porte Design, DoorArreda, Blindato Effepi, TEHNi, Sikur Home e Hörmann. TEHNi confermato dall’utente come correzione di «Theni». Loghi originali dai siti ufficiali, ospitati localmente e documentati in Sito/references/partner-logo-sources.json (percorso dalla radice del workspace); precedente selezione dimostrativa archiviata. Quattro colonne e due righe da 900 px; due colonne e quattro righe sui dispositivi più piccoli. Divisori verticali tra le colonne e orizzontali tra le righe, senza divisore a inizio riga. Fondo greige uniforme, «partner» in corsivo blu LGE senza linea, ingresso da destra. Nessun filtro o ricolorazione: per le varianti bianche originali I-PEA e Sikur Home si usa una base antracite discreta. Loghi ridotti di circa il 12% su desktop e mobile, mantenendo dimensioni delle celle e divisori.
3. **Competenze**: titolo centrato «La qualità nasce dalla competenza», con «competenza» in corsivo chiaro su fondo antracite, scelta confermata dall’utente per il contrasto. Sottotitolo esatto: «Dalla scelta dei materiali alla posa, uniamo preparazione tecnica, precisione e attenzione per risultati che durano nel tempo.». Titolo e sottotitolo sono parte della fascia scura, senza composizione introduttiva laterale. Le quattro competenze, testi, icone e divisori sono conservati; quattro colonne da 900 px, due da 600 px e una sui telefoni.
4. **Lavori:** galleria fotografica a livelli ispirata al riferimento del 27 ottobre. Titolo «I nostri lavori» con la sola parola «lavori» in corsivo blu LGE Cormorant Garamond, senza linea blu né didascalie. Sfondo chiaro invariato. Embla centra una foto più grande con le altre sovrapposte ai lati; avanzamento automatico dopo 4,2 secondi di sosta, swipe e tastiera. Cinque pallini permettono la selezione diretta delle fotografie; frecce circolari sovrapposte ai lati compaiono da 700 px su tablet e desktop, restando nascoste sui telefoni. Sotto 700 px le fotografie scorrono su card stabili larghe l’82% della rail, senza variazioni di scala o sovrapposizioni durante il trascinamento. Due serie delle cinque foto garantiscono il ciclo: soltanto cinque posizioni sono esposte e la foto centrale entra nel percorso Tab. Il clic apre la fotografia intera in un dialogo nativo con sfondo oscurato; chiusura con X, Esc o clic esterno, blocco dello scorrimento e ritorno del focus alla foto. L’avanzamento si ferma con dialogo aperto, hover/focus, trascinamento, sezione fuori vista, scheda nascosta e movimento ridotto. Dati e provenienza delle foto restano dimostrativi, conservati nella documentazione. Sulle fotografie si usa il cursore a manina (`pointer`).
5. **Recensioni:** titolo centrato senza linea, con «noi» in corsivo blu LGE e sottotitolo breve. Card bianche più compatte, con Google, voto, stelle, citazione serif, autore e data; quattro card da 1100 px e cinque da 1600 px, una centrata sui telefoni. Il carosello Embla con lieve enfasi centrale usa il motore useLoopCarousel condiviso con la galleria: avanzamento dopo 6,5 secondi di sosta, swipe e tastiera; al massimo cinque indicatori visibili in una finestra che scorre con animazione, con pallini più piccoli ai bordi e selezione attiva allungata. Si montano al massimo sette indicatori, includendo quelli di transizione, anche con centinaia di recensioni. Frecce circolari sottili nel blu LGE affiancano gli indicatori su tablet e desktop da 700 px; sui telefoni rimangono soltanto indicatori e swipe. Movimento interrotto durante lettura e interazioni, fuori vista, a scheda nascosta e con movimento ridotto. Riepilogo Google a destra su desktop e sotto il titolo sui dispositivi più piccoli. Commenti oltre quattro righe espandibili con «Leggi di più / Leggi di meno»; nessun messaggio sostitutivo per commenti assenti. Dati ricontrollati il 27 ottobre 2026: nove recensioni autentiche, media 5,0/5, tutte inserite. Le quattro nuove sono mostrate prima delle cinque storiche; testo italiano originale e assenza di commenti conservati. Provenienza e verifica manuale documentate in references/google-reviews.md (dentro Sito/). Nessun aggiornamento automatico, chiave Places o nuovo servizio esterno.
6. **Contatti:** sezione «Vieni a trovarci», con «trovarci» in corsivo blu e senza linea. Mappa OpenStreetMap gestita con Leaflet 1.9.4, caricata soltanto vicino alla sezione: marcatore nel blu LGE, zoom con simboli SVG sottili e sola attribuzione essenziale visibile. Cornice bianca e pulsante «Come raggiungerci» verso Google Maps. Fondo greige uguale ai Partner. Pannello senza titolo, con invito a prendere appuntamento, icone lineari e recapiti in griglia a due colonne. Sotto 1000 px informazioni e social precedono la mappa, con la medesima larghezza dei due blocchi. Indirizzo Via Roma 29, 80070 Monte di Procida (NA), telefono +39 329 826 5371 e orari Lun–Ven 09–18, Sab–Dom chiuso verificati sulla scheda Google il 27 ottobre 2026. Email di esempio non collegata; WhatsApp apre il numero del telefono mostrato, su richiesta dell’utente. WhatsApp e Instagram usano i loghi a colori senza pulsanti o riquadri. Instagram resta visuale finché manca il profilo effettivo. La nota sui dati dimostrativi è stata rimossa su richiesta. Ingressi morbidi, ridotti secondo le preferenze di movimento. Nessun modulo. Fonti in Sito/references/contact-sources.md.
7. **Footer**: nuovo logo bianco lineare originale, numero e indirizzo sotto al logo; cinque categorie prodotto collegate alle rotte esistenti, più navigazione alle sezioni. Impaginazione su tre colonne da 1000 px e su due gruppi affiancati sotto l’identità sui telefoni. Nessun reveal, Lorem Ipsum, dicitura legale provvisoria o controllo «Riduci le animazioni». Copyright calcolato con new Date().getFullYear(). Restano rispettate le preferenze di movimento del sistema.

Le cinque rotte prodotto aprono soltanto una pagina bianca, come richiesto:

- `/prodotti/infissi`
- `/prodotti/oscuranti`
- `/prodotti/porte-e-sicurezza`
- `/prodotti/porte-interne`
- `/atelier-gibus`

Non sono state realizzate pagine interne, CMS, amministrazione, preventivazione, modali di contenuto o nuove animazioni 3D.

## Fotografie, loghi e font

**Tutte e cinque le fotografie sono dimostrative, generate con il tool integrato Imagegen. Non rappresentano lavori LGE né modelli di catalogo verificati.** Sono riutilizzate in hero e gallery.

| Asset      | Soggetto                                      |
| ---------- | --------------------------------------------- |
| `security` | Porta di ingresso in una villa contemporanea  |
| `windows`  | Infissi affacciati sul paesaggio mediterraneo |
| `outdoor`  | Pergola bioclimatica con arredi outdoor       |
| `shading`  | Oscuranti esterni orientabili                 |
| `interior` | Porta interna in rovere                       |

I file usati dal sito sono in `public/img/photos/`, nelle varianti WebP da 640 e 1024 px. I PNG generati sono conservati in `references/generated/`; l'intero set dei prompt è in `references/photo-prompts.json`.

La navbar usa il logo orizzontale fornito il 27 ottobre: l’originale è conservato in `../img/Logo LGE_ il design per il tuo benessere - lineare.png` accanto al precedente logo quadrato. Il sito serve `public/img/brand/lge-navbar-horizontal-flat.webp`, convertito in WebP lossless con trasparenza e colori originali, senza ritagli o ridisegni (2172 × 724 px, rapporto 3:1). Il menu desktop compare da 1100 px per evitare sovrapposizioni con il marchio più largo. Gli altri asset e le varianti usate nei prototipi e nel footer sono conservati.

DM Sans variabile e Cormorant Garamond 400 sono ospitati localmente tramite Fontsource. Le licenze sono conservate in `references/licenses/`.

Per rigenerare le varianti ottimizzate, con `cwebp` installato:

```sh
python3 scripts/prepare_photos.py
```

Nessun hotlink fotografico, scraping o acquisto di asset. La mappa è l'unica risorsa esterna della pagina, con attribuzione OpenStreetMap mantenuta nell'embed.

## Accessibilità e movimento

La sezione prodotti ha meno spazio superiore: da 36 a 56 px tra lo stacco dalla hero e l’intestazione, con fondo greige condiviso con le Competenze. Le verifiche dell’ingresso unico sono in `verification/products-once-checks.json`.

Gli ingressi iniziano quando il titolo raggiunge il 78% dell'altezza visibile. Le card prodotto attendono almeno il 40% di visibilità nel riquadro di osservazione, con margine inferiore negativo del 12%, evitando di partire appena sfiorano lo schermo. Le card già entrate rimangono visibili: non si nascondono né ripetono l’ingresso risalendo la pagina o cambiando formato. Anche il focus e la modalità con movimento ridotto segnano i contenuti come già presentati.

Lo sfondo chiaro è `#FAF9F6`, leggermente più luminoso della prima versione. I titoli sui fondi chiari condividono l’antracite `#252A30`, un poco più scuro del footer `#2F343A`; quelli sulle fotografie e nel footer mantengono il contrasto necessario.

Navigazione semantica, link per saltare ai prodotti, focus visibile, titoli gerarchici, alt descrittivi, nomi accessibili dei comandi, regioni dei caroselli e controlli di pausa. I reveal delle sezioni usano opacità e trasformazioni mantenendo il contenuto nell'albero di accessibilità; il focus completa immediatamente un reveal.

Gli ingressi delle sezioni durano 1,4 secondi, con intervallo di 0,16 secondi tra gli elementi e curva `power2.out`; i tempi sono centralizzati in `config/motion.ts`. Il movimento del logo mantiene i tempi precedenti.

`prefers-reduced-motion` viene letto e aggiornato tramite `matchMedia`. Il controllo manuale nel footer è stato rimosso su richiesta; restano rispettate le preferenze di movimento del sistema. Questa modalità disabilita introduzione, reveal e autoplay e rende immediati gli spostamenti manuali dei caroselli. Se il sistema richiede già il movimento ridotto, il sito lo rispetta senza permettere di forzarlo.

Sono previsti safe area, immagini con dimensioni intrinseche, caricamento differito e `srcSet`/`sizes`. Le media query CSS usano soglie documentate nei moduli; i corrispondenti confini JS sono centralizzati in `config/layout.ts`. Le custom properties standard non sono utilizzabili direttamente come soglie nelle media query CSS.

## Verifiche eseguite

- TypeScript, build, lint e cinque test sui link di contatto.
- Browser interno: 320 × 740, 360 × 800, 390 × 844, 700 × 1000, 768 × 1024, 1024 × 768, 1280 × 720, 1440 × 900 e 1920 × 1080.
- Controlli di overflow e titoli tagliati, ordine delle sezioni, caricamento immagini, layout desktop e smartphone.
- Introduzione iniziale del logo e composizione finale della hero su desktop e smartphone. La navbar usa lo stesso nodo immagine dal centro dello schermo alla posizione fissa centrale; voci Home / Soluzioni / I nostri lavori a sinistra e Competenze / Recensioni / Contatti a destra.
- Navbar: fondo bianco traslucido dopo l’ingresso del logo e durante lo scroll; dropdown Soluzioni, tastiera, Esc, click esterno, ancore e rotte prodotto. Logo unico centrato verificato su desktop a 1211 e 900 px e su mobile a 390 px, dalla comparsa iniziale alla posizione fissa durante lo scroll. Le verifiche aggiornate di trasparenza completa, logo grande e riduzione durante lo scroll, colori e tipografia sono in `verification/hero-integrated-checks.json`; la verifica della sequenza con un unico logo è conservata in `verification/centered-navbar-checks.json`.
- Menu mobile: 390 × 844 e 320 × 568, X animata, categorie, focus ciclico in entrambe le direzioni, ripristino dello scroll e dello sfondo, chiusura al cambio breakpoint e movimento ridotto. Report in `verification/navbar-checks.json`.
- Cinque rotte prodotto provvisorie con navbar, footer e ritorno alle sezioni della homepage.
- Frecce e tastiera, trascinamento dei prodotti, avanzamento recensioni.
- Autoplay lavori, pausa stabile, ripresa, preferenze di movimento e pausa conservata dopo resize.
- Mappa reale caricata, contatti mancanti disattivati, footer e navigazione ad ancore.

Il movimento ridotto è stato provato con il controllo del sito, che usa lo stesso percorso logico della preferenza di sistema; non è stata modificata o emulata la preferenza del sistema operativo. I controlli nei viewport non sostituiscono prove su iPhone/Android fisici o un audit completo su Safari e Firefox. Lighthouse non è installato e non sono dichiarati punteggi.

## Prima della pubblicazione

Servono testi definitivi, fotografie autentiche dei lavori, eventuali autorizzazioni all’uso pubblico dei marchi selezionati, attestati e titolari delle qualifiche, configurazione Google Maps/Places per l'eventuale aggiornamento automatico delle recensioni, conferma dei recapiti aziendali, numero WhatsApp, profilo Instagram, ragione sociale, Partita IVA e testi legali. Le nove recensioni Google reali sono già state verificate e inserite come rilevazione manuale del 27 ottobre 2026.

Vanno definiti hosting, fallback delle rotte SPA, eventuale prerendering SEO, URL canonico e gestione della mappa esterna nell'informativa del sito. Solo allora potranno essere attivati i contatti reali e sostituiti i contenuti demo. La homepage è una versione locale completa da valutare; non è stata presentata come sito pronto alla pubblicazione con dati aziendali definitivi.

### Rifinitura visiva del 28 ottobre 2026

Titoli coerenti in Cormorant Garamond, parti in corsivo nel blu ufficiale `#014380`, eccetto il corsivo chiaro concordato per il titolo delle Competenze sul fondo scuro; `--color-blue` ora rimanda a `--color-brand-blue`. Hero con sottotitolo «Ogni ambiente merita di essere vissuto al meglio.». Ingresso della galleria esteso a 1,8 s, stagger 0,2 s, senza cambiare il carosello o il dialogo fotografico. Spazi verticali centralizzati in `--section-space: clamp(48px, 5.5vw, 80px)` e `--section-heading-gap: clamp(32px, 3.6vw, 52px)`; ridotti i margini interni inferiori dei caroselli, evitando spazio aggiuntivo tra Recensioni e Contatti.

Nel menu mobile eliminati «Esplora LGE» e la firma inferiore, peso delle voci 400 e chevron a 14 px dal testo. Restano focus, hamburger, sottomenu, Esc e blocco dello sfondo. Il footer usa `lge-footer-white.png`, originale trasparente 2171×724 copiato senza alterazioni; originale conservato anche in `img/Logo LGE bianco - lineare.png`.

Ultima precisazione concordata: titolo e sottotitolo delle Competenze sono entrambi sul fondo scuro, con «competenza» in corsivo chiaro. Il footer è stato arricchito con le cinque soluzioni e i recapiti sotto al logo; il controllo manuale per il movimento è stato eliminato su richiesta, lasciando il supporto a `prefers-reduced-motion`.

Foto hero aggiornate il 28 ottobre 2026 con i cinque file forniti dall’utente: infissi.jpg → Infissi; Oscuranti e sicurezza.png → Oscuranti; Ingresso moderno in legno e vetro.png → Porte e sicurezza; Soggiorno moderno con porta in legno.png → Porte interne; Pergola moderna al crepuscolo.png → Atelier Gibus. Immagini della hero separate dalla galleria, originali conservati in Sito/references/hero-supplied e varianti WebP 480/960 in Sito/public/img/hero. Inquadratura CSS dedicata alla porta interna e agli oscuranti, senza modifiche ai file originali.

Rifinitura del footer sul riferimento fornito il 28 ottobre: logo bianco più ampio, telefono e indirizzo con icone lineari in cerchi discreti; colonne «Soluzioni» ed «Esplora» con piccoli accenti blu e cinque categorie e quattro collegamenti di sezione. Nessuna voce «Chi siamo». Tre colonne da 1000 px; identità e recapiti affiancati sui tablet, gruppi di navigazione in due colonne sui telefoni. Riga inferiore con copyright dinamico e icone WhatsApp/Instagram. WhatsApp mantiene il link reale già configurato; Instagram resta visuale in attesa del profilo. Sfondo antracite e assenza di reveal conservati.

## Responsive e pagine provvisorie — 28 ottobre 2026

Le frecce condivise di tutti i caroselli sono nascoste sotto 700 px e visibili da tablet in su. Nei lavori il telefono usa fotografie su card stabili all’82%, senza trasformazioni di scala durante il drag; il coverflow resta attivo da 700 px. Il canvas del documento è antracite come il footer, mantenendo il fondo chiaro del contenuto. Le cinque pagine prodotto mostrano navbar, footer, titolo e messaggio di sezione in preparazione; navbar e titolo riconoscono anche gli URL con slash finale generati da GitHub Pages.
