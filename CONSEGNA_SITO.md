# Pubblicazione e monitoraggio di LGE Home Solutions

Questa guida è per il titolare, il manutentore del sito e il professionista che gestisce il dominio. Il prodotto da installare è un sito statico. Il manutentore prepara i file, il gestore li pubblica e il titolare conserva l’accesso agli strumenti Google. Le statistiche sono facoltative.

## 1. Dati da raccogliere prima del passaggio

| Chi | Cosa deve fornire |
| --- | --- |
| Responsabile hosting | Origine HTTPS definitiva, scelta tra host con e senza `www`, cartella di pubblicazione, eventuale sottocartella URL, modalità di trasferimento e ripristino, supporto ai redirect e agli errori HTTP. Chiedere anche fornitore, soggetti con accesso, gestione e conservazione dei log, eventuali script statistici già inseriti, paesi e garanzie applicabili. |
| Gestore precedente o proprietario Search Console | Accesso alla proprietà esistente, metodi di verifica da conservare, URL del vecchio CMS, vecchie sitemap, PDF importanti, pagine di ingresso e link in entrata. Esportare prima del cambio anche pagine, query, clic e impressioni per il successivo confronto. |
| Titolare LGE | Conferma del telefono commerciale da mostrare sul Profilo dell’attività su Google, partita IVA e ulteriori dati societari da esporre. Il recapito privacy è distinto. Verificare testi dell’informativa, tempi di conservazione delle richieste, diritti d’uso di foto, video partner e recensioni per il dominio definitivo. |
| Titolare LGE, per eventuali approfondimenti locali | Comuni effettivamente serviti e, per ciascun lavoro che si vuole descrivere, comune, intervento e permesso di usare foto e descrizione. Il sito colloca lo showroom a Monte di Procida. Il riferimento a Bacoli descrive la vicinanza geografica. |
| Titolare LGE, solo per GA4 | Autorizzazione all’uso di GA4, proprietà e stream web controllati dall’azienda, identificativo dello stream, responsabile della gestione consensi, impostazioni concordate di conservazione e accesso. |

La denominazione societaria presente nel footer e nei dati strutturati proviene dalla conferma aziendale registrata in `Sito/src/config/privacy.ts`. Per indirizzo, contatti commerciali e scheda Google fare riferimento a `Sito/src/config/contacts.ts` e `Sito/src/config/googlePlaces.ts`. Lo statuto comunale documenta il confine con Bacoli. [Statuto del Comune di Monte di Procida](https://oldsite.comune.montediprocida.na.it/files/documenti/Statuto_monte_di_procida.pdf)

## 2. Preparare le build

Eseguire i comandi dalla cartella `Sito/`, con il lockfile del progetto e Node 22.12 o successivo. Il workflow di anteprima usa Node 24. Il server che serve i file HTML non richiede Node.

```sh
npm ci
npm run typecheck
npm run lint
npm test
```

Questi comandi riproducono in locale la configurazione di GitHub Pages.

```sh
VITE_PUBLIC_PREVIEW=true npm run build -- --base=/lge-home-solutions/
npm run preview -- --base=/lge-home-solutions/ --port 4175
```

Questa build scrive `Sito/dist/`. Tutte le pagine hanno `noindex, nofollow`, incluso il documento di errore. Il crawler deve poter leggere l’HTML per vedere tale direttiva. Il workflow Pages mantiene questa configurazione anche dopo il lancio aziendale. [Guida Google al noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing?hl=it)

Per la **consegna aziendale**, configurare le variabili nell’ambiente della build oppure nel file locale ignorato `Sito/.env.production.local`. Le variabili Vite sono pubbliche. Conservare credenziali server e credenziali degli account Google separatamente.

| Variabile | Valore e uso |
| --- | --- |
| `VITE_PUBLIC_PREVIEW` | `true` per anteprima, `false` esplicito per la consegna. |
| `VITE_SITE_ORIGIN` | Origine HTTPS confermata dal gestore, comprensiva del nome host scelto. L’eventuale sottocartella si indica tramite `--base`. |
| `VITE_GOOGLE_SITE_VERIFICATION` | Facoltativa. Solo il valore originale dell’attributo `content` fornito da Google. Lasciare vuota quando si usa il file di verifica o una proprietà DNS già verificata. |
| `VITE_GA4_AUTHORIZED` | Predefinito `false`. Impostare `true` solo dopo l’approvazione aziendale, la configurazione della proprietà e il collaudo del consenso. |
| `VITE_GA4_MEASUREMENT_ID` | Vuota per impostazione predefinita. Per GA4 usare l’identificativo reale dello stream web che inizia con `G-`. |
| `VITE_GOOGLE_MAPS_API_KEY`, `VITE_ELFSIGHT_REVIEWS_WIDGET_ID` | Riguardano le integrazioni facoltative delle recensioni. Lasciarle vuote per mantenere la raccolta locale. Elfsight è riservato allo sviluppo. |

Dopo la revisione del titolare, completare i dati e il **testo visibile** della privacy e aggiornare lo stato di approvazione in `src/config/privacy.ts`. Verificare la pagina generata. Un flag da solo non completa l’informativa.

```sh
node --experimental-strip-types scripts/check-privacy.mjs
npm run build:release
```

La destinazione predefinita è la radice URL. Per una sottocartella confermata impostare il relativo percorso con `npm run build:release -- --base="$PERCORSO_WEB"`, dove la variabile contiene il percorso fornito dal gestore, con slash iniziale e finale. Il file `robots.txt` deve essere raggiungibile anche alla radice dell’host. In caso di hosting condiviso fra più applicazioni, spetta al gestore integrare la direttiva Sitemap nelle regole già presenti alla radice.

Consegnare **il contenuto di `Sito/dist-release/` solo dopo un comando terminato con successo**. La build sostituisce il pacchetto precedente solo dopo il collaudo. Dopo una prova fallita, la cartella può quindi contenere una versione precedente. Il controllo verifica origine e base, stato privacy, HTML delle rotte, H1, metadati, direttive di scansione, link interni alle pagine, canonical, immagini social, dati dello showroom, sitemap e pagina di errore. Il controllo verifica la sintassi dell’indirizzo. Il gestore conferma la proprietà del dominio e i valori DNS.

## 3. Migrare e configurare l’hosting

1. Prima di sostituire il sito, salvare file correnti, configurazione server, file di verifica e redirect esistenti. Preparare una tabella con vecchio URL, nuovo URL finale, risposta attesa e risultato del collaudo. Includere gli URL che ricevono traffico e i documenti con link esterni.
2. Conservare gli indirizzi equivalenti quando possibile. Per gli indirizzi cambiati impostare un 301 diretto alla pagina pertinente. Per contenuti definitivamente rimossi e senza sostituto scegliere 404 o 410. Evitare catene e rinvii generalizzati alla home. Mantenere normalmente i redirect almeno un anno. [Migrazioni con cambio di URL](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes?hl=it)
3. Pubblicare i file già verificati, preferibilmente con cambio di directory atomico. Servire l’`index.html` di ogni directory. Allineare HTTP/HTTPS, host, percorso senza slash e alias `/index.html` al canonical finale. Preservare i parametri utili. Un percorso sconosciuto deve mostrare `404.html` con **status HTTP 404**, anche aprendo direttamente una pagina inesistente dal browser.
4. Attivare compressione per HTML, CSS e JS, e verificare MIME corretti per moduli, WebP, WOFF2, PDF e MP4. Per i video verificare una richiesta `Range` e una risposta `206`. Usare cache lunga per asset con hash o revisione nel nome. Per HTML, sitemap, robots e asset aggiornabili allo stesso URL configurare la rivalidazione.
5. Dall’esterno provare la home, una pagina prodotto, Outdoor, Lavori, un articolo, Privacy e una vecchia pagina reindirizzata. Controllare titolo e contenuto nel sorgente HTML, risposta 200, canonical, sitemap e assenza di `noindex` negli header e nell’HTML delle pagine pubbliche. Provare un URL mancante, un asset mancante, un catalogo e una variante MP4. Verificare che la pubblicazione della nuova cartella abbia preservato la verifica Google del vecchio sito.
6. Se pagine valide restituiscono errori o rimangono bloccate all’indicizzazione, il gestore ripristina insieme file e regole del rilascio precedente. Correggere la causa e ricollaudare prima del nuovo passaggio.

## 4. Attivare Search Console

Chiedere per prima cosa al proprietario esistente di concedere all’account aziendale l’accesso alla proprietà. Sullo stesso dominio questo conserva lo storico e, con gli stessi URL, il cambio di hosting non richiede la procedura Cambio di indirizzo. [Guida Google sul cambio hosting](https://developers.google.com/search/docs/crawling-indexing/site-move-no-url-changes?hl=it)

In assenza di una proprietà utilizzabile, creare una **proprietà Prefisso URL** con l’indirizzo HTTPS canonico. Chi ha accesso ai file del sito può scegliere uno dei seguenti metodi.

- **Meta tag.** Impostare `VITE_GOOGLE_SITE_VERIFICATION` con il valore ricevuto da Google e ricostruire. Controllare che sia presente nel sorgente della home commerciale e selezionare **Verifica** in Search Console.
- **File HTML originale.** Conservare nome e contenuto forniti da Google. Per una proprietà sulla radice del dominio, il gestore può preservare il file nella radice pubblica oppure includerlo in `Sito/public/` prima della build. Se il sito è in sottocartella, seguire l’URL esatto che Search Console chiede di verificare. L’URL deve servire il file originale con 200. Conservare il metodo scelto nei rilasci successivi.

Una proprietà di tipo **Dominio** richiede invece la verifica DNS del gestore. Una volta verificata la proprietà, inviare l’URL della sitemap indicato nel robots pubblico e usare **Controllo URL** su home, prodotto e articolo. [Verifica della proprietà](https://support.google.com/webmasters/answer/9008080?hl=it)

## 5. Statistiche facoltative con GA4

GA4 e GTM non sono richiesti per Search Console. Per abilitare GA4, il titolare deve approvare configurazione e informativa, predisporre comandi accessibili per accettare, rifiutare e revocare il consenso statistico, e collegare la propria piattaforma di gestione del consenso (CMP). Prima di cambiare le variabili, controllare con il gestore che non esistano altri tag inseriti dal server, dal vecchio sito o da GTM.

La CMP conserva la scelta. A ogni caricamento ripristina la scelta valida e a ogni cambio aggiorna questo contratto, anche in caso di revoca. L’assenza di una scelta esplicita equivale a consenso negato. Nei callback della CMP, passare lo stato reale alla funzione seguente.

```js
function comunicaSceltaStatistica(consensoEsplicito) {
  window.lgeAnalyticsConsent = consensoEsplicito === true
  window.dispatchEvent(new Event('lge:analytics-consent'))
}
```

Usare un solo stream web. Disattivare la **Misurazione avanzata** dello stream e qualsiasi altra visualizzazione automatica sulle modifiche della cronologia. Lasciare disattivati Google Signals, personalizzazione pubblicitaria e raccolta di dati forniti dagli utenti. Impostare la conservazione concordata e registrare l’accesso di LGE alla proprietà. Completare l’informativa con il funzionamento effettivo della CMP e la procedura di revoca. Soltanto dopo questi passaggi impostare identificativo e autorizzazione, ricostruire e collaudare. [GA4 per applicazioni a pagina singola](https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications?hl=it) · [Consenso per i tag Google](https://developers.google.com/tag-platform/security/concepts/consent-mode?hl=it) · [Linee guida del Garante](https://www.garanteprivacy.it/home/docweb/-/docweb-display/docweb/9677876)

| Evento del sito | Quando si verifica |
| --- | --- |
| `page_view` | Una volta sulla pagina corrente dopo il consenso e al passaggio a un’altra pagina, anche con Indietro o Avanti. Ancore e filtri della stessa pagina non producono nuove visualizzazioni. |
| `click_whatsapp` | Apertura del collegamento WhatsApp commerciale. |
| `click_phone` | Attivazione del numero telefonico commerciale. Il recapito dedicato alla privacy è escluso. |
| `open_catalog` | Apertura di un collegamento contrassegnato come catalogo o brochure, inclusi PDF, flipbook e indici cataloghi. |
| `click_directions` | Apertura delle indicazioni stradali verso lo showroom. |

Gli eventi usano titolo editoriale, indirizzo canonico e, dove applicabile, posizione del collegamento. Non includere destinazioni esterne, numeri, testi, query, hash o referrer di provenienza esterni nei parametri. I clic misurano l’intenzione di contatto. Per confermare appuntamenti o vendite servono i riscontri commerciali dell’azienda.

**Collaudo dell’integrazione autorizzata.** Usare un profilo browser pulito sul dominio configurato. Prima della scelta e dopo il rifiuto controllare nella scheda Rete che manchino sia lo script gtag sia le chiamate di raccolta. Dopo il consenso, con Tag Assistant e DebugView dello stream corretto, verificare una visualizzazione iniziale, attraversare due pagine e tornare indietro. Provare un filtro, un’ancora, tutti e quattro i clic, un PDF e un flipbook, e il collegamento privacy. Controllare che i parametri contengano solo i dati previsti e che ciascuna interazione produca un solo evento applicativo. Revocare, ripetere i clic e ricaricare la pagina per verificare che la scelta sia rispettata. Disabilitare il debug al termine. Il titolare può consultare i rapporti in GA4 e contrassegnare come eventi chiave le azioni utili alla propria attività.

## 6. Aggiornamenti futuri e controlli essenziali

Per ogni rilascio aggiornare i dati nella sezione corrispondente di `Sito/src/data/` o `Sito/src/config/`, eseguire nuovamente test e build, quindi distribuire solo il pacchetto verificato. Rotte prodotto e articoli registrati nei dati alimentano il prerendering e la sitemap. Una nuova tipologia di pagina richiede anche registrazione nelle rotte, metadati e verifica dell’HTML. Se un URL cambia, consegnare al gestore il relativo redirect insieme ai file.

Dopo il lancio confrontare query, clic e pagine di ingresso con l’esportazione precedente. Controllare errori 404/5xx, stato della sitemap e canonical scelti da Google. Quando Search Console dispone di abbastanza visite, consultare i Core Web Vitals su mobile e desktop. Per la verifica immediata usare PageSpeed Insights su home, Lavori, prodotto e articolo, verificando anche la risposta a filtri e gallerie. Ripetere questi controlli dopo la migrazione o un aggiornamento importante. La build verifica automaticamente sitemap, link e metadati. [Core Web Vitals in Search Console](https://support.google.com/webmasters/answer/9205520?hl=it)

Come riferimento per il collaudo dell’hosting, il 27 novembre 2026 la pagina Lavori ha registrato un LCP di 2,15 s a 4 Mbit/s e di 4,22 s a 1,6 Mbit/s in Chrome con Pixel 7 simulato e cache vuota. Il browser ha selezionato la fotografia da 1120 px, pari a 107.216 byte. Ripetere la misura sul dominio definitivo con le stesse condizioni e confrontarla successivamente con l’esperienza dei visitatori reali.
