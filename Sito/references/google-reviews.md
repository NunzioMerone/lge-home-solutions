# Recensioni Google LGE

## Rilevazione del 24 novembre 2026

La [scheda pubblica su Google Maps](https://www.google.com/maps/place/LGE+HOME+SOLUTIONS/@40.7940311,14.0532046,17z/data=!4m8!3m7!1s0x133b13b35654a357:0x440e66bcfc5c136a!8m2!3d40.7940311!4d14.0532046!9m1!1b1!16s%2Fg%2F12hlkhmp2) indica **10 recensioni**, tutte da cinque stelle. La nuova recensione di Giovanni Donato è stata verificata in Maps. La card mostra un estratto fedele e apre l’originale tramite il collegamento sotto il nome. Le date di ottobre e novembre sono espresse per mese per evitare che invecchino tra un aggiornamento manuale e il successivo. Le schede storiche provengono dalla rilevazione precedente.

Il carosello LGE è nuovamente attivo nella home locale. La prova Elfsight e Google Places possono essere riattivate con le rispettive configurazioni descritte sotto.

## Fonte verificata il 27 ottobre 2026

Scheda: **LGE HOME SOLUTIONS**, Via Roma 29, Monte di Procida. Valutazione pubblica attuale: **5,0/5, 9 recensioni**, tutte da cinque stelle.

[Recensioni originali su Google Maps](https://www.google.com/maps/place/LGE+HOME+SOLUTIONS/@40.7940311,14.0532046,17z/data=!4m8!3m7!1s0x133b13b35654a357:0x440e66bcfc5c136a!8m2!3d40.7940311!4d14.0532046!9m1!1b1!16s%2Fg%2F12hlkhmp2).

La verifica è stata ripetuta su richiesta dell’utente: quattro recensioni nuove rispetto al 24 ottobre. Tutte e nove sono state controllate nella scheda pubblica della [Ricerca Google](https://www.google.com/search?q=recensioni+di+lge+home+solutions+monte+di+procida), aprendo l’elenco completo. La vista Maps senza accesso esponeva inizialmente soltanto cinque risultati; non è stato eseguito alcun accesso ad account. I testi di Giorgia Luongo, Tony Merone e Oriana De Vita erano completi nella vista Maps. Per Nunzio Merone è stato verificato l’italiano originale nel suo [profilo pubblico](https://www.google.com/maps/contrib/114683268840464223144/reviews?hl=it-IT), evitando la traduzione inglese mostrata dal pannello di dettaglio della Ricerca.

Ordine editoriale nel sito, con le novità prima delle valutazioni storiche:

1. Giorgia Luongo — 5 stelle, 2 giorni fa, commento completo.
2. Tony Merone — 5 stelle, 3 giorni fa, commento completo.
3. Oriana De Vita — 5 stelle, 3 giorni fa, commento completo.
4. Nunzio Merone — 5 stelle, 3 giorni fa, commento completo.
5. Carlo Sesti — 5 stelle, 5 anni fa, commento completo.
6. Francesco Barbato — 5 stelle, ultima modifica 5 anni fa, commento originale «🔝»; l’ellissi della precedente vista Maps non è parte del commento.
7. Giuseppe Manna — 5 stelle, 5 anni fa, senza commento.
8. Sasi De Mari — 5 stelle, 5 anni fa, senza commento.
9. Pasqualina Parascandola Ladonea — 5 stelle, 7 anni fa, senza commento.

Le date relative riproducono quelle mostrate il 27 ottobre; `checkedAt` e la fonte `google-manual` sono conservati nel dataset. Nessuna recensione o frase è stata inventata o completata, e le risposte del titolare non sono incorporate nelle citazioni dei clienti. Gli identificativi Google sono conservati per ciascuna recensione.

Fonti locali: `google-reviews-2026-10-27.png`, `google-reviews-2026-10-27-visible.json`, `google-review-nunzio-original-2026-10-27.png` e il corrispondente JSON. La rilevazione del 24 ottobre resta documentata in `google-reviews-verification-2026-10-24.md` e nello screenshot originale.

## Collegamento e presentazione della rilevazione di ottobre

Il riepilogo con il voto, nove recensioni e le stelle apre la scheda reale. Card bianche con testo serif, voto, stelle, avatar di fallback e data. Titolo senza linea, «noi» in corsivo blu. Quattro card nei desktop ordinari, cinque da 1600 px; una card centrata con anticipazioni laterali sul telefono. Le card laterali sono appena ridotte, come nella galleria. Al massimo cinque indicatori selezionabili visibili, con scorrimento animato della finestra, estremi più piccoli e indicatore attivo allungato. Al massimo sette pulsanti montati, compresi quelli di transizione; finestra verificata in tutte le 500 posizioni di un elenco di prova. Swipe e tastiera; avanzamento automatico lento, interrotto durante lettura e interazioni e con movimento ridotto. I commenti oltre quattro righe mantengono «Leggi di più / Leggi di meno».

Il logo Google originale è ospitato localmente da [Google Static](https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png). Le iniziali colorate sono avatar di fallback, non foto dei recensori. Nessun badge di verifica.

L’aggiornamento rimane **manuale**: nessuna nuova API, chiave, integrazione esterna, accesso ad account o servizio a pagamento è stato attivato. L’utente non dispone ancora di una chiave Maps/Places.

## Aggiornamento automatico in anteprima locale

Il carosello può caricare le recensioni con Google Maps JavaScript API, Places API (New) e `Place.fetchFields` all’ingresso in prossimità della sezione. Per provarlo, creare nel progetto Google Cloud di LGE una chiave con restrizione **Siti web** per `http://localhost:5175` (oppure `http://127.0.0.1:5175` se si usa quell’indirizzo) e restrizioni API a **Maps JavaScript API** e **Places API (New)**. Il progetto Google Cloud deve essere collegato alla fatturazione.

Impostare `VITE_GOOGLE_MAPS_API_KEY` in `Sito/.env.development.local`, escluso da Git, e riavviare Vite. È una chiave browser visibile nelle richieste, protetta dalle restrizioni di Google Cloud. Il sito senza chiave usa la rilevazione manuale. Con la chiave, la media e il totale sono quelli di Google. Il carosello mostra fino a cinque recensioni ordinate da Google per rilevanza, con attribuzioni e collegamenti disponibili. Il link a Google Maps resta disponibile durante il caricamento e in caso di errore. Le risposte API non vengono salvate o incluse nella build.

Il Place ID in `src/config/googlePlaces.ts` è ricavato dagli identificativi della scheda di Via Roma 29. Alla prima prova con la chiave verificare corrispondenza di sede, media e conteggio con Google Maps. L’informativa locale descrive il caricamento soltanto quando la chiave è configurata. La pubblicazione richiede una chiave dedicata al dominio pubblico e la revisione dell’informativa e delle condizioni d’uso.

Prima di attivare la chiave, verificare nella console che **Place Details (New)** consenta una quota giornaliera e impostarla a **30 richieste**. Il limite corrisponde a un massimo di 930 richieste in un mese di 31 giorni, a fronte di una soglia standard di 1.000 per la richiesta con recensioni. Verificare il listino e l’eventuale uso dello stesso SKU negli altri progetti collegati allo stesso account di fatturazione. Una visita alla sezione può consumare una richiesta anche in assenza di nuove recensioni. Al superamento della quota resta disponibile il link alla scheda Google Maps. [Controllo dei costi](https://developers.google.com/maps/billing-and-pricing/manage-costs#quotas) · [Consumo aggregato per account di fatturazione](https://developers.google.com/maps/billing-and-pricing/overview#pay-as-you-go)

Documentazione ufficiale consultata:

- [Esempio Place Reviews](https://developers.google.com/maps/documentation/javascript/place-reviews).
- [Configurazione della chiave e fatturazione](https://developers.google.com/maps/documentation/javascript/get-api-key).
- [Attribuzioni e recensioni nella Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/policies).
- [Politiche Places e collegamenti alle fonti](https://developers.google.com/maps/documentation/places/web-service/policies).

## Prova locale Elfsight

L’anteprima con `npm run dev` può usare il widget Google Reviews di Elfsight. Impostare `VITE_ELFSIGHT_REVIEWS_WIDGET_ID` in `Sito/.env.development.local` con l’identificativo del widget LGE e riavviare Vite. La home conserva il titolo e il collegamento a Google Maps. Il widget si carica in prossimità della sezione. Durante l’attesa e se il widget viene nascosto, per esempio al limite mensile, compaiono le schede LGE con le recensioni della rilevazione manuale. La build esclude il widget anche se l’identificativo è presente nell’ambiente.

Il piano Free dichiara una visualizzazione ogni volta che il widget viene caricato, fino a 200 al mese. La sincronizzazione con Google avviene ogni 72 ore. [Piano Elfsight](https://elfsight.com/google-reviews-widget/pricing/) · [Aggiornamento](https://help.elfsight.com/article/168-why-my-reviews-are-not-being-updated) · [Quote](https://help.elfsight.com/article/1089-views-limit-everything-you-need-to-know-new-dashboard)
