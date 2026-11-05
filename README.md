# LGE Home Solutions

Unico progetto del sito LGE Home Solutions, con hero video responsive Rev08, derivata dalla composizione fotografica approvata il 3 novembre 2026.

Il codice, gli asset e le dipendenze sono in [`Sito/`](./Sito/README.md). Identità e decisioni di progetto sono documentate in [`PROJECT_BRIEF.md`](./PROJECT_BRIEF.md).

## Sito online

[Apri LGE Home Solutions](https://nunziomerone.github.io/lge-home-solutions/)

Repository personale: https://github.com/NunzioMerone/lge-home-solutions

## Sviluppo locale

Richiede Node.js 22.12 o successivo.

```sh
cd Sito
npm ci
npm run dev
```

Aprire `http://localhost:5175/`. L’anteprima della build usa la porta 4175.

## Verifiche e pubblicazione

```sh
cd Sito
npm run lint
npm run test
npm run build
```

Il workflow in `.github/workflows/deploy.yml` pubblica da `Sito/` sul solo percorso `/lge-home-solutions/`. Stack: React, TypeScript strict, Vite, React Router, CSS Modules, GSAP ed Embla.

Il sito in `Sito/` è quello ufficiale e unico da sviluppare. La vecchia hero e il confronto tra due siti appartengono alla cronologia Git; la cartella duplicata è rimossa. Il repository di confronto viene archiviato e il relativo sito Pages disattivato. Gli esperimenti storici precedenti alla vetrina completa restano materiali locali separati, esclusi dalla pubblicazione.

L’anteprima pubblica resta non indicizzata: il consolidamento non modifica lo stato di revisione della Privacy Policy o le decisioni ancora aperte sull’hosting.
