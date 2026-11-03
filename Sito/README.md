# LGE Home Solutions

Unica applicazione del sito LGE Home Solutions, nella cartella `Sito/`. Dal 3 novembre 2026 la versione approvata è quella con la hero fotografica a tutta schermata. Le precedenti varianti sono conservate nella cronologia Git; non esiste una seconda applicazione da mantenere.

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

## Versione approvata

La homepage usa la grande fotografia architettonica, con logo e testi HTML. Su smartphone la hero occupa `100svh`, con il testo sulla parete sinistra e una vista aperta della vetrata e della pergola a destra. WhatsApp è un link blu sottolineato con freccia anche su mobile, collegato a `https://wa.me/393346008313`.

«Il design che» resta fisso dopo l’ingresso iniziale. Le cinque frasi in corsivo blu vengono scritte a 48 ms per carattere, restano complete per 3,2 secondi e sfumano con una lieve sfocatura in 0,85 secondi. Il contenuto cambia soltanto dopo la dissolvenza. La sequenza si sospende fuori vista o a scheda nascosta, rispetta il movimento ridotto e conserva l’altezza del titolo durante la scrittura.

Seguono Le nostre soluzioni, partner, competenze, lavori, recensioni e contatti. Le pagine `/competenze`, `/lavori` e `/privacy-policy` sono integrate nella navigazione. Le cinque categorie prodotto conservano navbar, footer, titolo e messaggio di preparazione.

Fonti e prompt delle immagini della hero: `references/hero-scene.json` e `references/hero-mobile-room.json`. Originali e derivati di lavoro: `references/hero-scene/`. Le foto decorative della hero non sono presentate come realizzazioni LGE. Le 101 fotografie dei lavori e gli attestati autorizzati restano separati e conservano le proprie fonti.

## Pubblicazione

Il solo workflow attivo è `../.github/workflows/deploy.yml`. Lavora da `Sito/`, esegue lint, test, build con base `/lge-home-solutions/`, prepara le rotte statiche e pubblica su GitHub Pages.

Per preparare gli ingressi statici localmente con Node.js 22:

```sh
VITE_PUBLIC_PREVIEW=true npm run build -- --base=/lge-home-solutions/
VITE_PUBLIC_PREVIEW=true node --experimental-strip-types scripts/prepare-pages.mjs
```

Il sito mantiene `VITE_PUBLIC_PREVIEW=true` e `noindex, nofollow` finché la revisione privacy e l’hosting definitivo non sono completati. L’unificazione dei progetti non approva la Privacy Policy: `approved` resta `false` e il controllo nel workflow dell’anteprima resta consultivo.

## Consolidamento del 3 novembre 2026

La hero minimalista precedente è rimossa dall’applicazione corrente. La versione fotografica approvata è stata importata senza cambiare i file applicativi, insieme alla cronologia del suo repository. Nome del pacchetto, porte e pubblicazione sono quelli del sito unico. Il repository di confronto viene archiviato e la sua pubblicazione Pages disattivata dopo la verifica del sito principale.

`references/site-consolidation.json` registra i commit di origine e gli hash dei 515 file applicativi verificati. `references/legacy-copy-manifest.json` resta una testimonianza storica della copia iniziale e non definisce percorsi o progetti attivi.
