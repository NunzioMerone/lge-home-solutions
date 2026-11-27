import { useEffect } from 'react'
import { Header } from '../../components/layout/Header'
import { Footer } from '../../components/layout/Footer'
import { analyticsConfig } from '../../config/analytics'
import { contacts } from '../../config/contacts'
import { elfsightReviewsWidgetId } from '../../config/elfsightReviews'
import { googleMapsBrowserKey } from '../../config/googlePlaces'
import {
  privacyContact,
  privacyContent,
  privacyPage,
  privacyDetails,
  privacySources,
} from '../../config/privacy'
import { getContactLinks } from '../../utils/contactLinks'
import styles from './PrivacyPolicy.module.css'

export function PrivacyPolicy() {
  const privacyEmail = privacyDetails.contact
  const links = getContactLinks({ ...contacts, email: privacyEmail, phone: privacyContact.phone })
  const emailLink = links.email ? <a href={links.email}>{privacyEmail}</a> : privacyEmail
  const usesGooglePlaces = !elfsightReviewsWidgetId && Boolean(googleMapsBrowserKey)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  return (
    <div className={styles.page}>
      <a className="skip-link" href="#informativa">
        Vai all’informativa
      </a>
      <Header />
      <main className={styles.main} id="informativa" tabIndex={-1}>
        <header className={styles.heading}>
          <h1>Privacy Policy</h1>
          <p className={styles.intro}>
            Come LGE tratta i tuoi dati quando visiti lgesolutions.it, ci contatti o compari in un
            contenuto pubblicato sul sito.
          </p>
          <p className={styles.updated}>
            Ultimo aggiornamento:{' '}
            <time dateTime={privacyPage.updatedAt}>{privacyPage.updatedLabel}</time>
          </p>
        </header>

        <article
          className={styles.content}
          aria-label="Informativa sul trattamento dei dati personali"
        >
          <section aria-labelledby="privacy-controller">
            <h2 id="privacy-controller">1. Titolare e contatti</h2>
            <p>
              Il titolare del trattamento è <strong>{privacyDetails.controller}</strong>, con sede
              in {privacyDetails.address}
              {contacts.vatNumber && `, partita IVA ${contacts.vatNumber}`}. L’amministratore è{' '}
              {privacyContact.administrator}.
            </p>
            <p>
              Per la privacy puoi scrivere a {emailLink}, telefonare al{' '}
              {links.phone ? (
                <a href={links.phone}>{privacyContact.phone}</a>
              ) : (
                privacyContact.phone
              )}{' '}
              o inviare una richiesta all’indirizzo della sede.
            </p>
          </section>

          <section aria-labelledby="privacy-data">
            <h2 id="privacy-data">2. Navigazione e richieste di contatto</h2>
            <p>
              Puoi visitare il sito senza registrarti. Durante la navigazione il browser comunica
              l’indirizzo IP e i dati tecnici della richiesta, tra cui data e ora, pagina o risorsa
              richiesta e tipo di browser. Il servizio di hosting può registrare anche l’esito della
              richiesta.
            </p>
            <p>{privacyDetails.legitimateInterests}</p>
            <p>
              Quando ci scrivi o ci telefoni, utilizziamo il recapito, il nome e le informazioni che
              scegli di comunicarci. Se chiedi un preventivo, usiamo i dettagli del lavoro per
              preparare l’offerta e seguire la trattativa su tua richiesta (misure precontrattuali,
              art. 6, par. 1, lett. b del GDPR). Fornire i dati è facoltativo. Senza un recapito o i
              dettagli necessari potremmo non riuscire a rispondere o a preparare il preventivo.
            </p>
            <p>
              Il pulsante WhatsApp apre una chat con Emanuele Schiano Lomoriello, che gestisce
              informazioni e preventivi direttamente nel suo account WhatsApp personale. Il sito non
              riceve né conserva i messaggi.{' '}
              <a href={privacySources.whatsappPrivacy}>
                Informativa di WhatsApp per gli utenti europei
              </a>
              .
            </p>
            <p>
              Quando la legge lo richiede, LGE tratta i dati necessari per adempiere all’obbligo
              applicabile (art. 6, par. 1, lett. c del GDPR). Se occorre tutelare un proprio
              diritto, utilizza i soli dati necessari per questo legittimo interesse (lett. f).
            </p>
          </section>

          <section aria-labelledby="privacy-services">
            <h2 id="privacy-services">3. Chi riceve i dati e dove vengono trattati</h2>
            <p>{privacyDetails.providers}</p>
            <p className={styles.hostingNotice}>
              <strong>Hosting.</strong> {privacyContent.hostingNotice} {privacyDetails.transfers}{' '}
              <a href={privacySources.siteGroundDpa}>
                Accordo sul trattamento dei dati di SiteGround
              </a>
              .
            </p>
            <p>
              <strong>Mappa dello showroom.</strong> Quando ti avvicini alla sezione contatti, il
              browser chiede le immagini della mappa a OpenStreetMap Foundation e comunica
              l’indirizzo IP, il sito di provenienza e i dati tecnici necessari a mostrare l’area
              visualizzata. La mappa parte dall’indirizzo dello showroom e non richiede la posizione
              geografica del dispositivo.
            </p>
            <p>
              La Fondazione è un titolare autonomo con sede nel Regno Unito, Paese per il quale la
              Commissione europea ha riconosciuto un livello adeguato di protezione dei dati. I
              server delle sue API e banche dati si trovano nel Regno Unito, in Irlanda e nei Paesi
              Bassi. Per distribuire le immagini usa la rete internazionale di Fastly. Il nodo che
              risponde dipende dalla connessione e può trovarsi anche fuori dal SEE.{' '}
              <a href={privacySources.osmPrivacy}>Informativa della Fondazione</a>,{' '}
              <a href={privacySources.osmTileFaq}>informazioni sul servizio cartografico</a> e{' '}
              <a href={privacySources.ukAdequacy}>decisione europea sul Regno Unito</a>.
            </p>
            <p>
              Per i trasferimenti successivi che richiedono garanzie, le condizioni di Fastly
              prevedono clausole contrattuali standard o lo strumento britannico applicabile. Puoi
              consultare le <a href={privacySources.fastlyTransfers}>condizioni di Fastly</a> o
              chiedere informazioni e copia delle garanzie alla Fondazione scrivendo a{' '}
              <a href="mailto:privacy@osmfoundation.org">privacy@osmfoundation.org</a>.
            </p>
            <p>
              I collegamenti ai profili social, alle indicazioni stradali e ai siti dei partner
              aprono il relativo servizio esterno solo quando li selezioni. Puoi consultare le
              informative di <a href={privacySources.instagramPrivacy}>Instagram</a>,{' '}
              <a href={privacySources.facebookPrivacy}>Facebook</a> e{' '}
              <a href={privacySources.googlePrivacy}>Google</a>.
            </p>
            {elfsightReviewsWidgetId && (
              <p>
                Quando raggiungi le recensioni, il browser contatta Elfsight per visualizzarle.
                Elfsight riceve l’indirizzo IP e i dati tecnici della richiesta.{' '}
                <a href={privacySources.elfsightPrivacy}>Informativa di Elfsight</a>.
              </p>
            )}
            {usesGooglePlaces && (
              <p>
                Quando raggiungi le recensioni, il browser contatta Google Maps Platform per
                caricarle. Google riceve l’indirizzo IP e i dati tecnici della richiesta.{' '}
                <a href={privacySources.googleMapsTerms}>Termini di Google Maps</a> e{' '}
                <a href={privacySources.googlePrivacy}>informativa sulla privacy di Google</a>.
              </p>
            )}
          </section>

          <section aria-labelledby="privacy-storage">
            <h2 id="privacy-storage">4. Cookie e preferenze</h2>
            <p>
              {analyticsConfig
                ? 'Con il tuo consenso alle statistiche, Google Analytics 4 misura le visite alle pagine e i clic su WhatsApp, telefono, cataloghi e indicazioni stradali. Puoi modificare la scelta nelle preferenze di consenso.'
                : 'Il sito non installa cookie pubblicitari o di profilazione e non utilizza strumenti di analisi delle visite nel browser.'}
            </p>
            <p>
              Il sito rispetta l’impostazione del dispositivo per ridurre le animazioni.
              Un’eventuale preferenza salvata nella memoria di sessione del browser vale solo per
              quella scheda, anche se ricarichi la pagina. Si esaurisce con la sessione e non viene
              trasmessa a LGE.
            </p>
            <p>LGE non effettua profilazione e non prende decisioni automatizzate sulle persone.</p>
          </section>

          <section aria-labelledby="privacy-content">
            <h2 id="privacy-content">5. Fotografie, attestati e recensioni</h2>
            <ul>
              <li>
                <strong>Fotografie.</strong> Le immagini dei lavori, tratte dall’archivio
                fotografico di LGE, documentano le realizzazioni dell’azienda. Possono contenere
                dettagli che rendono riconoscibili le persone o le loro abitazioni.
              </li>
              <li>
                <strong>Attestati.</strong> Le copie degli attestati rilasciati dagli enti di
                qualificazione o formazione documentano le competenze dei professionisti. Riportano
                il nome, il corso o la qualifica e le date presenti sul documento.
              </li>
              <li>
                <strong>Recensioni.</strong> Per presentare le esperienze dei clienti, LGE riprende
                dalla propria scheda pubblica su Google il nome visualizzato dall’autore, il voto,
                la data e l’eventuale commento.{' '}
                {elfsightReviewsWidgetId
                  ? 'Le recensioni sono mostrate tramite Elfsight, con una selezione locale di riserva.'
                  : usesGooglePlaces
                    ? 'Google può fornire anche la foto del profilo e il collegamento alla recensione originale.'
                    : 'La selezione è aggiornata a mano.'}
              </li>
            </ul>
            <p>{privacyDetails.publishedContent}</p>
          </section>

          <section aria-labelledby="privacy-retention">
            <h2 id="privacy-retention">6. Per quanto tempo conserviamo i dati</h2>
            <p>{privacyDetails.contactRetention}</p>
            <p>
              {privacyDetails.technicalRetention}{' '}
              <a href={privacySources.siteGroundAccessLogs}>
                Come si consultano i log di SiteGround
              </a>
              .
            </p>
          </section>

          <section aria-labelledby="privacy-rights">
            <h2 id="privacy-rights">7. I tuoi diritti</h2>
            <p>
              Puoi chiedere a LGE l’accesso ai tuoi dati, la rettifica, la cancellazione o la
              limitazione del trattamento. Per i dati che ci hai fornito e che trattiamo con mezzi
              automatizzati sulla base del consenso o di un contratto, puoi chiedere anche la
              portabilità, ossia riceverli in un formato riutilizzabile o farli trasmettere a un
              altro titolare, se tecnicamente possibile.
            </p>
            <p>
              <strong>Diritto di opposizione.</strong> Puoi opporti in qualsiasi momento, per motivi
              legati alla tua situazione, ai trattamenti fondati sul legittimo interesse. In tal
              caso LGE interrompe il trattamento, salvo motivi legittimi cogenti che prevalgano sui
              tuoi diritti o la necessità di accertare, esercitare o difendere un diritto in
              giudizio.
            </p>
            <p>
              Puoi revocare il consenso in qualsiasi momento e chiedere la rettifica o la rimozione
              dei tuoi dati da foto, attestati e recensioni. La revoca lascia valido il trattamento
              svolto lecitamente fino a quel momento.
            </p>
            <p>
              Per esercitare i tuoi diritti scrivi a {emailLink} o usa gli altri recapiti del
              titolare. LGE risponde entro un mese dal ricevimento. Se la complessità o il numero
              delle richieste richiede una proroga, ti informa entro lo stesso mese, spiegandone il
              motivo. La proroga può durare fino a due mesi. Puoi presentare reclamo al{' '}
              <a href={privacySources.garante}>Garante per la protezione dei dati personali</a>.{' '}
              <a href={privacySources.gdpr}>Testo del GDPR</a>.
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  )
}
