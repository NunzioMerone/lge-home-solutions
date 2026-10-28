# Fonti dei contatti — 27 ottobre 2026

Verifica manuale della scheda pubblica [LGE HOME SOLUTIONS su Google Maps](https://www.google.com/maps/place/LGE+HOME+SOLUTIONS/@40.7940311,14.0532046,17z/data=!4m8!3m7!1s0x133b13b35654a357:0x440e66bcfc5c136a!8m2!3d40.7940311!4d14.0532046!9m1!1b1!16s%2Fg%2F12hlkhmp2), nella scheda Panoramica, aprendo gli orari settimanali. Nessun accesso ad account, costo o modifica alla scheda.

- Indirizzo: Via Roma, 29, 80070 Monte di Procida NA.
- Telefono: 329 826 5371, normalizzato per i collegamenti in +39 329 826 5371.
- Orari settimanali: lunedì–venerdì 09:00–18:00; sabato e domenica chiuso. Eventuali variazioni festive non sono ricostruite o calcolate: non viene mostrato uno stato «aperto ora».
- Coordinate associate alla scheda: 40.7940311, 14.0532046.
- Il sito web indicato nella scheda è lgesolutions.it; il lettore web non ha potuto aprirlo. Email e social non sono stati ricavati da domini o profili ipotizzati.

Prove conservate: `google-contacts-2026-10-27.png` e `.txt`. L'indirizzo è coerente anche con le schede pubbliche di [iCRIBIS](https://www.icribis.com/it/scheda-azienda/NA1031085_LGE_HOME_SOLUTIONS_S.A.S._DI_SCHIANO_LOMORIELLO_LEMUEL) e [Ufficio Camerale](https://www.ufficiocamerale.it/5215/lge-home-solutions-sas-di-schiano-lomoriello-lemuel); queste non sono usate per attivare altri recapiti o dati fiscali.

## Rifinitura della mappa e dei contatti

La nuova richiesta sostituisce l'embed con Leaflet 1.9.4 (versione stabile), fornito localmente tramite npm e importato in un chunk differito. Le tile sono quelle standard OSM, con URL ufficiale HTTPS e cache del browser; nessun proxy, prefetch o acquisizione di dati privati. La mappa mantiene soltanto l'attribuzione visibile «© OpenStreetMap contributors» collegata alla licenza. Le voci donazione, segnalazione e condizioni appartenevano all'embed e non sono incluse nella nuova interfaccia. Il marcatore usa `--color-brand-blue`, come il logo; + e − sono SVG con tratto 1,25. Cleanup di Leaflet e ResizeObserver, gestione di Strict Mode e movimento ridotto; zoom con rotella disabilitato per mantenere lo scroll naturale.

Riferimenti: [Leaflet stabile](https://leafletjs.com/download.html), [documentazione](https://leafletjs.com/reference.html), [attribuzione OSM](https://www.openstreetmap.org/copyright), [policy tile](https://operations.osmfoundation.org/policies/tiles/).

Il pannello non ha più un titolo aggiuntivo. La descrizione invita a prendere appuntamento. Per WhatsApp l'utente ha chiesto esplicitamente di aprire il numero del telefono mostrato: `https://wa.me/393298265371`. Il link apre la chat, senza inviare messaggi. L'email `info@lge.example` rimane un esempio senza mailto; il profilo Instagram non è ancora fornito, quindi la relativa icona è visuale e non porta a un profilo inventato. Rimossa su richiesta la nota dimostrativa sotto ai social. Le fonti dei loghi sono documentate in ASSET_SOURCES.md.
