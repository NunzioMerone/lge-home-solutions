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
            Come LGE tratta i tuoi dati quando visiti lgesolutions.it o ci contatti per un
            preventivo.
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
            <h2 id="privacy-controller">1. Chi tratta i dati</h2>
            <p>
              Il titolare del trattamento è la società <strong>{privacyDetails.controller}</strong>,
              con sede in {privacyDetails.address}. L’amministratore della società è{' '}
              {privacyContact.administrator}.
            </p>
            <p>
              Per informazioni sulla privacy o per esercitare i tuoi diritti puoi scrivere a{' '}
              {links.email ? (
                <a href={links.email}>{privacyEmail}</a>
              ) : (
                'LGE tramite i recapiti aziendali'
              )}
              . Puoi inoltre contattarci al{' '}
              {links.phone ? (
                <a href={links.phone}>{privacyContact.phone}</a>
              ) : (
                privacyContact.phone
              )}
              .
            </p>
          </section>

          <section aria-labelledby="privacy-data">
            <h2 id="privacy-data">2. Quali dati e per quali scopi</h2>
            <p>Puoi visitare il sito senza registrarti.</p>
            <ul>
              <li>
                <strong>Per la navigazione e la mappa</strong> vengono trattati l’indirizzo IP, le
                risorse richieste e i dati tecnici del browser. Servono a mostrare il sito,
                proteggerlo e indicare dove si trova lo showroom.
              </li>
              <li>
                <strong>Quando ci scrivi o ci telefoni</strong>, usiamo il tuo recapito per
                risponderti. Se ci chiedi un preventivo, utilizziamo i dettagli del lavoro per
                preparare l’offerta su tua richiesta (art. 6, par. 1, lett. b del GDPR).
              </li>
            </ul>
            <p>
              Il pulsante WhatsApp apre una chat con Emanuele per chiedere un preventivo. Il sito
              non riceve né conserva i messaggi.{' '}
              <a href={privacySources.whatsappPrivacy}>Informativa privacy di WhatsApp</a>.
            </p>
            {privacyDetails.legitimateInterests && <p>{privacyDetails.legitimateInterests}</p>}
          </section>

          <section aria-labelledby="privacy-services">
            <h2 id="privacy-services">3. Servizi utilizzati dal sito</h2>
            <p className={styles.hostingNotice}>
              {privacyContent.hostingNotice}{' '}
              <a href={privacySources.siteGroundDpa}>
                Accordo sul trattamento dei dati di SiteGround
              </a>
              .
            </p>
            {privacyDetails.providers && <p>{privacyDetails.providers}</p>}
            <p>
              Quando ti avvicini alla sezione contatti, la mappa dello showroom carica immagini da{' '}
              <strong>OpenStreetMap</strong>. Il servizio riceve l’indirizzo IP e i dati tecnici
              della richiesta. Le immagini provengono da una rete mondiale di server, anche fuori
              dallo Spazio economico europeo. La mappa non richiede la posizione del dispositivo.
              Dettagli nell’
              <a href={privacySources.osmPrivacy}>informativa OpenStreetMap</a>.
            </p>
            <p>
              I profili social, le indicazioni stradali, i cataloghi e i configuratori esterni si
              aprono quando scegli il relativo collegamento. Puoi consultare le informative di{' '}
              <a href={privacySources.instagramPrivacy}>Instagram</a>,{' '}
              <a href={privacySources.facebookPrivacy}>Facebook</a> e{' '}
              <a href={privacySources.googlePrivacy}>Google</a>.
            </p>
            {elfsightReviewsWidgetId && (
              <p>
                Avvicinandoti alla sezione Recensioni, il browser contatta Elfsight per mostrare le
                recensioni pubbliche della scheda Google di LGE. Il servizio riceve l’indirizzo IP e
                i dati tecnici della richiesta. Dettagli nell’
                <a href={privacySources.elfsightPrivacy}>informativa sulla privacy di Elfsight</a>.
              </p>
            )}
            {usesGooglePlaces && (
              <p>
                Quando ti avvicini alla sezione Recensioni, il browser contatta Google Maps Platform
                per caricare valutazione, commenti e informazioni sugli autori. Google riceve
                l’indirizzo IP e dati tecnici della richiesta. L’uso della sezione è soggetto ai{' '}
                <a href={privacySources.googleMapsTerms}>Termini di servizio di Google Maps</a> e
                all’<a href={privacySources.googlePrivacy}>Informativa sulla privacy di Google</a>.
              </p>
            )}
            {privacyDetails.transfers && <p>{privacyDetails.transfers}</p>}
          </section>

          <section aria-labelledby="privacy-storage">
            <h2 id="privacy-storage">4. Cookie e preferenze</h2>
            <p>
              {analyticsConfig
                ? 'Con il tuo consenso alle statistiche, Google Analytics 4 misura le visite alle pagine e i clic su WhatsApp, telefono, cataloghi e indicazioni stradali. Puoi modificare la scelta nelle preferenze di consenso.'
                : 'Il sito non imposta cookie propri e non utilizza strumenti pubblicitari o di analisi delle visite.'}
            </p>
            <p>
              La scelta di ridurre le animazioni viene salvata solo nel tuo browser. I font e le
              fotografie sono ospitati insieme al sito.
            </p>
          </section>

          <section aria-labelledby="privacy-content">
            <h2 id="privacy-content">5. Fotografie, attestati e recensioni</h2>
            <p>
              La galleria mostra fotografie dei lavori di LGE. Per le foto scattate presso i clienti
              viene richiesto il consenso a fotografare e pubblicare. Quando il consenso riguarda
              dati personali, può essere revocato contattandoci, senza pregiudicare il trattamento
              effettuato prima della revoca.
            </p>
            <p>
              Nella pagina Competenze puoi consultare copie degli attestati con il nome del
              professionista, la qualifica e le date riportate nel documento.
            </p>
            <p>
              Le recensioni provengono dalla scheda Google di LGE e riportano il nome dell’autore,
              la valutazione, l’eventuale commento e la data.{' '}
              {elfsightReviewsWidgetId
                ? 'Elfsight aggiorna le recensioni mostrate. Se il widget è indisponibile, il sito mostra le recensioni rilevate manualmente.'
                : usesGooglePlaces
                  ? 'Google può fornire anche la foto profilo e il collegamento alla recensione originale.'
                  : 'Le recensioni sono aggiornate manualmente.'}{' '}
              Per segnalare un contenuto o richiedere una rettifica o rimozione puoi scriverci
              all’email indicata in questa pagina.
            </p>
            {privacyDetails.publishedContent && <p>{privacyDetails.publishedContent}</p>}
          </section>

          <section aria-labelledby="privacy-retention">
            <h2 id="privacy-retention">6. Tempi di conservazione</h2>
            <p>
              La preferenza per le animazioni resta nel browser per la durata della sessione della
              scheda.
            </p>
            {privacyDetails.technicalRetention ? (
              <p>{privacyDetails.technicalRetention}</p>
            ) : (
              <p>
                Nel servizio standard di SiteGround, il gestore può consultare i registri degli
                accessi fino a 30 giorni a ritroso.{' '}
                <a href={privacySources.siteGroundAccessLogs}>Dettagli sui registri di accesso</a>.
              </p>
            )}
            {privacyDetails.contactRetention && <p>{privacyDetails.contactRetention}</p>}
          </section>

          <section aria-labelledby="privacy-rights">
            <h2 id="privacy-rights">7. I tuoi diritti</h2>
            <p>
              Nei casi previsti dal <a href={privacySources.gdpr}>GDPR</a> puoi chiedere accesso,
              rettifica, cancellazione, limitazione e portabilità dei dati, oppure opporti ai
              trattamenti basati sul legittimo interesse. Scrivi a{' '}
              {links.email ? (
                <a href={links.email}>{privacyEmail}</a>
              ) : (
                'LGE tramite i recapiti aziendali'
              )}
              . Di norma rispondiamo entro un mese, salvo le proroghe motivate previste dal GDPR.
            </p>
            <p>
              Puoi inoltre presentare reclamo al{' '}
              <a href={privacySources.garante}>Garante per la protezione dei dati personali</a>.
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  )
}
