# Fonti degli asset

Le cinque fotografie della galleria sono state generate per questo progetto con Imagegen integrato. Non sono fotografie di installazioni LGE. I prompt completi, associati ai rispettivi file, sono in `photo-prompts.json`; i PNG sono in `generated/`.

I loghi LGE derivano dai file originali già forniti dall'utente. Le copie PNG non sono state alterate; i derivati WebP sono ridimensionati proporzionalmente e codificati lossless. Nessun logo certificativo è stato inventato.

Il 24 ottobre l'utente ha richiesto loghi di marchi reali per valutare la sezione partner. Gli asset originali provengono dai siti dei produttori e sono conservati localmente in `public/img/partners/`, senza hotlink né alterazioni dei marchi. Pagine e file di origine sono documentati in [partner-logo-sources.json](./partner-logo-sources.json). Si tratta di una selezione dimostrativa, non di una conferma delle partnership LGE o di una licenza generale per la pubblicazione; i marchi restano dei rispettivi titolari.

I font DM Sans e Cormorant Garamond sono distribuiti tramite Fontsource, con le licenze incluse in `licenses/`.

La mappa usa Leaflet 1.9.4 locale con tile standard OpenStreetMap e attribuzione essenziale visibile. Il marcatore usa il blu LGE alle coordinate della sede verificata (40.7940311, 14.0532046). Fonti e configurazione in `contact-sources.md`.

Riferimenti tecnici consultati: [Embla Auto Scroll v8](https://www.embla-carousel.com/docs/v8/plugins/auto-scroll), [GSAP Context](https://gsap.com/docs/v3/GSAP/gsap.context/), [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/).

## Loghi social e mappa personalizzata

- `public/icons/whatsapp.svg`: [Wikimedia Commons, WhatsApp.svg](https://commons.wikimedia.org/wiki/File:WhatsApp.svg), autore WhatsApp, fonte originale del marchio indicata nella scheda.
- `public/icons/instagram.svg`: [Instagram Glyph Gradient RGB logo.svg](https://commons.wikimedia.org/wiki/File:Instagram_Glyph_Gradient_RGB_logo.svg), fonte Meta Brand Resources indicata nella scheda.
- File SVG locali con colori e proporzioni conservati; uso come identificatori dei canali social, senza indicare partnership. Schede Commons riportano il pubblico dominio per geometrie semplici e la tutela del marchio.
- Mappa: sostituito l'embed con Leaflet 1.9.4 e tile `https://tile.openstreetmap.org/{z}/{x}/{y}.png`; attribuzione essenziale visibile, nessuna copertura o rimozione del credito. Coordinate e fonte dei contatti restano quelle verificate in `contact-sources.md`.

## Logo bianco del footer — 28 ottobre 2026

Fornito direttamente dall’utente nell’allegato `codex-clipboard-b9d7f672-f243-4c4d-ab7d-1eb66f2898d0.png`, PNG RGBA 2171×724. Copia invariata in `public/img/brand/lge-footer-white.png` e originale conservato nella cartella generale `img/Logo LGE bianco - lineare.png`. Nessuna ricostruzione, ricolorazione o modifica delle proporzioni. Sostituisce nel footer il precedente logo bianco, che resta conservato.

## Fotografie della hero fornite dall’utente — 28 ottobre 2026

Associazioni e percorsi originali in `hero-photo-sources.json`. Originali conservati senza alterazioni in `hero-supplied/`; script riproducibile `scripts/prepare_hero_photos.py`. Varianti WebP da 480 e 960 px, senza ritaglio del file e senza ingrandimento. Il punto di inquadratura è applicato solo tramite CSS nelle card verticali. Queste immagini sostituiscono soltanto quelle della hero; la galleria conserva le immagini precedenti. La fornitura non le identifica automaticamente come realizzazioni LGE.
