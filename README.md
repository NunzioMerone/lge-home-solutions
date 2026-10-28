# LGE Home Solutions

Sito LGE Home Solutions: homepage responsive con soluzioni per la casa, partner, competenze, galleria fotografica, recensioni e contatti.

Il sito attuale si trova in [`Sito/`](./Sito/README.md). Identità e scelte progettuali sono documentate in [`PROJECT_BRIEF.md`](./PROJECT_BRIEF.md).

## Sito online

[Apri LGE Home Solutions](https://nunziomerone.github.io/lge-home-solutions/)

Il workflow GitHub Actions verifica e pubblica il sito a ogni push sul branch `main`. Le dipendenze e i file generati non vengono versionati.

## Avvio locale

Richiede Node.js 22.12 o successivo.

```sh
cd Sito
npm ci
npm run dev
```

L’anteprima locale è disponibile su `http://localhost:5175/`.

## Verifiche

```sh
cd Sito
npm run lint
npm run test
npm run build
```

Stack: React, TypeScript strict, Vite, React Router, CSS Modules, GSAP ed Embla.

Le cinque rotte prodotto sono predisposte come pagine bianche. Il sito mantiene le indicazioni sulle fonti e sui contenuti dimostrativi nella documentazione di `Sito/`. I prototipi storici rimangono conservati separatamente nel workspace locale.
