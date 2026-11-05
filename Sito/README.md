# LGE Home Solutions

Unica applicazione del sito LGE Home Solutions, nella cartella `Sito/`. Il 5 novembre 2026 l’utente autorizza la pubblicazione del checkpoint corrente: hero video Rev06 responsive, testo mobile in basso a sinistra e pagina Infissi completa, con transizioni e approfondimenti del comfort. Le precedenti varianti sono conservate nella cronologia Git; non esiste una seconda applicazione da mantenere.

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

La homepage usa il montaggio Rev06 da 45 secondi (circa 52,94 secondi nella hero a 0,85×), con logo e testi HTML. Un velo antracite molto trasparente segue l’intero lato sinistro, senza fasce attorno alle scritte, e sfuma a zero al 65% della larghezza. Testi chiari con ombra delicata accompagnano il nuovo sfondo. Su smartphone la hero occupa `100svh`: nella nuova prova locale il testo resta allineato a sinistra ma si appoggia in basso, con blocco più largo (massimo 26rem), titolo più leggibile e margine inferiore che somma la safe area. Solo sotto 700 px l’overlay sfuma dal basso, con un velo superiore tenue per il logo; desktop e tablet mantengono il gradiente laterale e il layout precedenti. Su richiesta dell’utente sono rimossi dalla hero il link WhatsApp e il comando pausa video; i contatti nelle altre sezioni restano disponibili.

Le voci della navbar, il comando menu e il logo orizzontale completo di scritta laterale sono bianchi sopra il video. Oltre 24 px di scroll, quando compare il fondo della navbar, il logo torna alla versione colorata; anche il menu mobile aperto e le altre rotte mantengono il logo colorato. La versione bianca usa il medesimo asset nitido, con filtro CSS che conserva trasparenza, forma e proporzioni.

Gli asset sono in `public/media/hero/`: desktop 1920×1080, tablet 1280×960, mobile 720×1280, con poster dedicati. Dimensioni e hash esatti sono nel manifest di integrazione. `config/hero.ts` seleziona il formato verticale sotto 1200 px in orientamento portrait, il tablet sotto 1200 px in landscape e il desktop da 1200 px. I nomi dei file attivi includono `rev06`. Viene montato un solo video, silenzioso e in loop a 0,85×; si sospende fuori vista o a scheda nascosta. Con movimento ridotto o errore del video resta il poster. I percorsi rispettano la base Vite.

«Il design che» resta fisso dopo l’ingresso iniziale. Le cinque frasi in corsivo Sabbia `#EDD5B3`, scelto dall’utente sul video reale, emergono da sinistra a destra tramite una maschera con bordo sfumato in 2,6 secondi, restano complete per 5,5 secondi e si dissolvono in 1,6 secondi. Il testo della frase viene impostato interamente mentre è nascosto, senza scrittura per caratteri, cursore, spostamento o sfocatura. La sequenza si sospende fuori vista o a scheda nascosta, rispetta il movimento ridotto e conserva l’altezza del titolo.

Seguono Le nostre soluzioni, partner, competenze, lavori, recensioni e contatti. Le pagine `/competenze`, `/lavori` e `/privacy-policy` sono integrate nella navigazione. Le cinque categorie prodotto conservano navbar, footer, titolo e messaggio di preparazione.

Sorgenti e montaggio riproducibile Rev06: `references/hero-video-interiors/`; Rev05 resta in `references/hero-video-refinement/` e Rev04 resta in `references/hero-video-warm/` e Rev03 in `references/hero-video-final/`. Copia e hash degli asset integrati: `references/hero-video-integration.json`. Le scene dei produttori non sono realizzazioni LGE. Rev05 usa la copia VEKA 4K e una porta d’ingresso reale in legno al posto della scena famiglia a bassa risoluzione; conserva outdoor, mansarda, colore caldo delicato e dissolvenze da 1,167 secondi. L’interpolazione avviene prima degli ingrandimenti. Le fonti Gibus restano 720p e alcune riprese hanno morbidezza ottica originale: non viene dichiarato dettaglio nativo superiore alle fonti. Rev06 aggiunge due riprese reali native 4K di porte interne da Pexels: vetrata bianca con ottone e corridoio con porta scura e parquet. Sono scene d’atmosfera generiche, con licenza gratuita verificata; non prodotti dei partner o lavori/clienti LGE. Sono esclusi il filmato showroom rifiutato, UI social e perimetri luminosi artificiali. Le sette scene Rev05 e l’aspetto della hero restano conservati nel nuovo montaggio da nove scene. Il push e la pubblicazione di questo checkpoint sono ora richiesti dall’utente; la documentazione delle fonti e delle licenze resta conservata, senza attestazioni di diritti ulteriori rispetto a quelle effettivamente verificate. Le precedenti immagini decorative restano conservate, con fonti e prompt in `references/hero-scene.json` e `references/hero-mobile-room.json` e materiali in `references/hero-scene/`. Le 101 fotografie dei lavori e gli attestati autorizzati restano separati e conservano le proprie fonti.

## Pubblicazione

Il 5 novembre 2026 è autorizzato il push del lavoro corrente su `main`, con aggiornamento dell’anteprima GitHub Pages. Il sito conserva `VITE_PUBLIC_PREVIEW=true` e la Privacy Policy nello stato reale.

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
