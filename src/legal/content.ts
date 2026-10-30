import type { Lang, Page } from '@/lib/route'

/**
 * Textos legais. Os fatos vêm da auditoria do código (docs/legal-audit.md) e de fontes oficiais / dos fornecedores.
 * Os {{placeholders}} são preenchidos por src/config/legal.ts; valor ausente vira um marcador visível de "pendente".
 * É um rascunho técnico para a revisão jurídica da cliente — não é aconselhamento jurídico.
 */
export interface Section { h: string; p?: string[]; list?: string[] }
export interface Doc { title: string; lead: string; sections: Section[] }

export const UI: Record<Lang, { back: string; updated: string; pending: string; other: string; reviewNote: string; cookieSettings: string }> = {
  de: { back: 'Zur Startseite', updated: 'Stand', pending: '[Angabe der Verantwortlichen ausstehend]', other: 'Sprache', cookieSettings: 'Cookie-Einstellungen öffnen', reviewNote: 'Diese Fassung ist ein technischer Entwurf und wurde noch nicht rechtlich geprüft.' },
  pt: { back: 'Voltar ao início', updated: 'Atualizado em', pending: '[informação pendente — a fornecer pela responsável]', other: 'Idioma', cookieSettings: 'Abrir preferências de cookies', reviewNote: 'Esta versão é um rascunho técnico e ainda não passou por revisão jurídica.' },
  en: { back: 'Back to home', updated: 'Last updated', pending: '[information pending — to be supplied by the controller]', other: 'Language', cookieSettings: 'Open cookie settings', reviewNote: 'This version is a technical draft and has not yet been legally reviewed.' },
}

const privacyDE: Doc = {
  title: 'Datenschutzerklärung',
  lead: 'Hier erfahren Sie, welche personenbezogenen Daten beim Besuch dieser Website verarbeitet werden, warum und welche Rechte Sie haben.',
  sections: [
    { h: 'Verantwortliche', p: ['Verantwortlich im Sinne von Art. 4 Nr. 7 DSGVO ist: {{name}}, {{address}}. E-Mail: {{email}}.'] },
    { h: 'Überblick', p: ['Diese Website informiert über psychologische Beratung und bietet ein Kontaktformular. Ich setze keine Werbe- oder Tracking-Pixel, keine Social-Media-Plugins, keine eingebetteten Karten oder Videos ein und erstelle keine Nutzerprofile. Diese Website setzt selbst keine Cookies.'] },
    { h: 'Hosting und Server-Logfiles', p: ['Beim Aufruf der Website verarbeitet der Hosting-Anbieter technisch notwendige Daten, die Ihr Browser übermittelt (u. a. IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, Browser- und Betriebssysteminformationen). Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (Auslieferung und Sicherheit der Website). Hosting-Anbieter: {{hosting}}. Die Speicherdauer der Logfiles richtet sich nach den Vorgaben des Anbieters.'] },
    { h: 'Notwendige Speicherung in Ihrem Browser', p: ['Ohne Ihre Einwilligung wird nur gespeichert, was unbedingt erforderlich ist, damit Sie die gewünschte Seite nutzen können (§ 25 Abs. 2 Nr. 2 TDDDG; Art. 6 Abs. 1 lit. f DSGVO). Im lokalen Speicher (localStorage) Ihres Browsers:'], list: ['consent_preferences – Ihre Auswahl im Cookie-Banner (Version, Statistik ja/nein, Zeitpunkt). Sie bleibt bis zur Änderung oder Löschung durch Sie bestehen.', 'contact_last_submit – Zeitpunkt der letzten Formularübermittlung als Schutz vor Missbrauch (ein Versand pro Stunde). Es wird keine E-Mail-Adresse gespeichert.'] },
    { h: 'Einwilligungsverwaltung', p: ['Beim ersten Besuch können Sie nicht notwendige Verarbeitungen annehmen oder ablehnen; beide Optionen sind gleichwertig. Ohne Einwilligung wird kein Statistik-Dienst geladen. Ihre Auswahl können Sie jederzeit über „Cookie-Einstellungen“ im Fußbereich ändern oder widerrufen (Art. 7 Abs. 3 DSGVO); der Widerruf berührt nicht die Rechtmäßigkeit der bis dahin erfolgten Verarbeitung.'] },
    { h: 'Reichweitenmessung mit Plausible (nur mit Einwilligung)', p: ['Wenn Sie in „Statistik“ einwilligen, wird das Skript von Plausible Analytics (plausible.io) geladen. Nach Angaben des Anbieters (https://plausible.io/data-policy) verwendet Plausible weder Cookies noch Local Storage, speichert keine vollständigen IP-Adressen oder User-Agents, bildet eine täglich wechselnde Kennung aus gehashten Verbindungsdaten und verarbeitet die Daten in der EU. Erfasst werden u. a. aufgerufene Seite, Referrer, Browser, Betriebssystem, Gerätetyp und ungefährer Standort (Land/Region/Stadt).', 'Rechtsgrundlage: Ihre Einwilligung, Art. 6 Abs. 1 lit. a DSGVO i. V. m. § 25 Abs. 1 TDDDG. Sie können sie jederzeit widerrufen. Ohne Einwilligung findet keine Verbindung zu Plausible statt.'] },
    { h: 'Kontaktformular', p: ['Wenn Sie das Formular nutzen, verarbeite ich Name, E-Mail-Adresse, Betreff und Ihre Nachricht, um Ihre Anfrage zu beantworten (Art. 6 Abs. 1 lit. b DSGVO, soweit es um die Anbahnung einer Beratung geht; sonst Art. 6 Abs. 1 lit. f DSGVO). Die Übermittlung erfolgt über den Dienst EmailJS (EmailJS Pte. Ltd.) als Auftragsverarbeiter. Nach der Datenschutzerklärung des Anbieters liegen dessen Server in den USA (AWS); für Übermittlungen aus der EU verwendet der Anbieter Standardvertragsklauseln. Die Nachricht wird anschließend in meinem E-Mail-Postfach empfangen (Anbieter: {{mailbox}}).', 'Bitte teilen Sie über das Formular keine Gesundheitsdaten oder andere besonders sensible Informationen mit; für ein erstes Gespräch genügt eine kurze Nachricht. Falls Sie dies dennoch tun, ist Ihre ausdrückliche Einwilligung (Art. 9 Abs. 2 lit. a DSGVO), die Sie vor dem Absenden per Häkchen erteilen, die Grundlage.', 'Speicherdauer: Ich speichere Anfragen nur so lange, wie es zur Bearbeitung erforderlich ist, und lösche sie danach, soweit keine gesetzlichen Aufbewahrungspflichten bestehen.'] },
    { h: 'Kontakt per E-Mail oder WhatsApp', p: ['Wenn Sie mir per E-Mail schreiben oder den WhatsApp-Link nutzen, verarbeite ich die von Ihnen übermittelten Daten zur Beantwortung (Art. 6 Abs. 1 lit. b bzw. f DSGVO). Der WhatsApp-Link wird erst bei Ihrem Klick geöffnet; ab dann gelten die Datenschutzbestimmungen von WhatsApp. Auch hier gilt: bitte keine sensiblen Gesundheitsdaten im ersten Kontakt.'] },
    { h: 'Externe Links und Schriftarten', p: ['Links zu externen Seiten (z. B. LinkedIn, der Entwicklerseite eproxstudio.com) sind normale Verweise: Daten werden erst übertragen, wenn Sie sie anklicken; dann gilt die Datenschutzerklärung der Zielseite. Die Schriftarten werden lokal von dieser Website ausgeliefert; es findet keine Verbindung zu Google Fonts statt.'] },
    { h: 'Ihre Rechte', p: ['Sie haben das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch gegen Verarbeitungen auf Grundlage berechtigter Interessen (Art. 21 DSGVO). Erteilte Einwilligungen können Sie jederzeit mit Wirkung für die Zukunft widerrufen. Wenden Sie sich dazu an {{email}}.'] },
    { h: 'Beschwerderecht', p: ['Sie können sich bei einer Datenschutz-Aufsichtsbehörde beschweren (Art. 77 DSGVO). Für Verantwortliche mit Sitz in Berlin ist zuständig: {{authority}}.'] },
    { h: 'Keine automatisierte Entscheidungsfindung', p: ['Es findet keine ausschließlich automatisierte Entscheidungsfindung einschließlich Profiling im Sinne von Art. 22 DSGVO statt.'] },
  ],
}

const privacyPT: Doc = {
  title: 'Política de Privacidade (Datenschutzerklärung)',
  lead: 'Aqui você descobre quais dados pessoais são tratados ao visitar este site, por quê e quais são os seus direitos.',
  sections: [
    { h: 'Responsável', p: ['Responsável pelo tratamento (art. 4, n.º 7, do RGPD/DSGVO): {{name}}, {{address}}. E-mail: {{email}}.'] },
    { h: 'Visão geral', p: ['Este site apresenta o trabalho de aconselhamento psicológico e oferece um formulário de contato. Não uso pixels de publicidade ou rastreamento, plugins de redes sociais, mapas ou vídeos incorporados, e não crio perfis de usuários. O site não define cookies.'] },
    { h: 'Hospedagem e registros do servidor', p: ['Ao abrir o site, o provedor de hospedagem trata dados tecnicamente necessários enviados pelo seu navegador (entre outros: endereço IP, data e hora, página acessada, informações de navegador e sistema). Base legal: art. 6, n.º 1, alínea f, do RGPD (entrega e segurança do site). Provedor de hospedagem: {{hosting}}. O prazo de guarda dos registros segue as regras do provedor.'] },
    { h: 'Armazenamento necessário no seu navegador', p: ['Sem o seu consentimento, só é guardado o que é estritamente necessário para que você use a página solicitada (§ 25, n.º 2, n.º 2 TDDDG; art. 6, n.º 1, alínea f, do RGPD). No armazenamento local (localStorage) do navegador:'], list: ['consent_preferences – sua escolha no aviso de cookies (versão, estatística sim/não, momento). Permanece até você alterá-la ou apagá-la.', 'contact_last_submit – momento do último envio do formulário, como proteção contra abuso (um envio por hora). Nenhum e-mail é guardado.'] },
    { h: 'Gerenciamento de consentimento', p: ['Na primeira visita você pode aceitar ou recusar tratamentos não necessários; as duas opções têm o mesmo destaque. Sem consentimento, nenhuma ferramenta de estatística é carregada. Você pode alterar ou retirar a escolha a qualquer momento em “Preferências de cookies”, no rodapé (art. 7, n.º 3, do RGPD); a retirada não afeta a licitude do tratamento anterior.'] },
    { h: 'Medição de audiência com Plausible (somente com consentimento)', p: ['Se você consentir em “Estatística”, o script do Plausible Analytics (plausible.io) é carregado. Segundo o fornecedor (https://plausible.io/data-policy), o Plausible não usa cookies nem local storage, não guarda endereços IP completos nem user-agents, forma um identificador diário a partir de dados de conexão com hash e trata os dados na UE. São registrados, entre outros, página acessada, origem do acesso, navegador, sistema, tipo de dispositivo e localização aproximada (país/região/cidade).', 'Base legal: o seu consentimento, art. 6, n.º 1, alínea a, do RGPD, em conjunto com o § 25, n.º 1 TDDDG. Você pode retirá-lo a qualquer momento. Sem consentimento, não há conexão com o Plausible.'] },
    { h: 'Formulário de contato', p: ['Ao usar o formulário, trato nome, e-mail, assunto e mensagem para responder ao seu pedido (art. 6, n.º 1, alínea b, do RGPD, quando se trata de iniciar um atendimento; caso contrário, alínea f). O envio passa pelo serviço EmailJS (EmailJS Pte. Ltd.), como operador. Segundo a política de privacidade do fornecedor, os servidores ficam nos EUA (AWS); para transferências a partir da UE ele usa cláusulas contratuais-padrão. A mensagem chega depois à minha caixa de e-mail (provedor: {{mailbox}}).', 'Por favor, não envie pelo formulário dados de saúde ou outras informações especialmente sensíveis; para uma primeira conversa basta uma mensagem curta. Se mesmo assim o fizer, a base é o seu consentimento expresso (art. 9, n.º 2, alínea a, do RGPD), dado antes do envio por meio da caixa de seleção.', 'Prazo de guarda: guardo as mensagens apenas pelo tempo necessário para tratá-las e depois as apago, salvo obrigações legais de conservação.'] },
    { h: 'Contato por e-mail ou WhatsApp', p: ['Se você me escrever por e-mail ou usar o link do WhatsApp, trato os dados enviados para responder (art. 6, n.º 1, alínea b ou f, do RGPD). O link do WhatsApp só é aberto quando você clica; a partir daí valem as regras de privacidade do WhatsApp. Também aqui: sem dados sensíveis de saúde no primeiro contato.'] },
    { h: 'Links externos e fontes', p: ['Links para outros sites (por exemplo LinkedIn e o site da desenvolvedora, eproxstudio.com) são referências comuns: dados só são transmitidos quando você clica, e então vale a política do site de destino. As fontes tipográficas são servidas localmente por este site; não há conexão com o Google Fonts.'] },
    { h: 'Seus direitos', p: ['Você tem direito de acesso (art. 15), retificação (art. 16), apagamento (art. 17), limitação (art. 18), portabilidade (art. 20) e oposição a tratamentos baseados em interesses legítimos (art. 21 do RGPD). Pode retirar consentimentos a qualquer momento, com efeito para o futuro. Escreva para {{email}}.'] },
    { h: 'Direito de reclamação', p: ['Você pode apresentar reclamação a uma autoridade de proteção de dados (art. 77 do RGPD). Para responsáveis com sede em Berlim, a autoridade competente é: {{authority}}.'] },
    { h: 'Sem decisões automatizadas', p: ['Não há decisões exclusivamente automatizadas, incluindo definição de perfis, nos termos do art. 22 do RGPD.'] },
  ],
}

const privacyEN: Doc = {
  title: 'Privacy Policy (Datenschutzerklärung)',
  lead: 'This page explains which personal data is processed when you visit this website, why, and which rights you have.',
  sections: [
    { h: 'Controller', p: ['Controller within the meaning of Art. 4(7) GDPR: {{name}}, {{address}}. Email: {{email}}.'] },
    { h: 'Overview', p: ['This website presents psychological counselling services and offers a contact form. I do not use advertising or tracking pixels, social-media plugins, embedded maps or videos, and I do not build user profiles. The site itself does not set cookies.'] },
    { h: 'Hosting and server log files', p: ['When you open the website, the hosting provider processes technically necessary data sent by your browser (including IP address, date and time, requested page, browser and operating-system information). Legal basis: Art. 6(1)(f) GDPR (delivery and security of the site). Hosting provider: {{hosting}}. Log retention follows the provider’s rules.'] },
    { h: 'Necessary storage in your browser', p: ['Without your consent, only what is strictly necessary for you to use the requested page is stored (Section 25(2) no. 2 TDDDG; Art. 6(1)(f) GDPR). In your browser’s local storage (localStorage):'], list: ['consent_preferences – your choice in the cookie banner (version, statistics yes/no, time). It stays until you change or delete it.', 'contact_last_submit – time of the last form submission, as protection against abuse (one submission per hour). No email address is stored.'] },
    { h: 'Consent management', p: ['On your first visit you can accept or decline non-essential processing; both options carry equal weight. Without consent, no statistics service is loaded. You can change or withdraw your choice at any time via “Cookie settings” in the footer (Art. 7(3) GDPR); withdrawal does not affect the lawfulness of processing carried out before.'] },
    { h: 'Audience measurement with Plausible (only with consent)', p: ['If you consent to “Statistics”, the Plausible Analytics script (plausible.io) is loaded. According to the provider (https://plausible.io/data-policy), Plausible uses neither cookies nor local storage, does not store full IP addresses or user agents, derives a daily rotating identifier from hashed connection data, and processes data in the EU. Recorded data includes the page viewed, referrer, browser, operating system, device type and approximate location (country/region/city).', 'Legal basis: your consent, Art. 6(1)(a) GDPR in conjunction with Section 25(1) TDDDG. You can withdraw it at any time. Without consent, no connection to Plausible is made.'] },
    { h: 'Contact form', p: ['When you use the form, I process your name, email address, subject and message to answer your request (Art. 6(1)(b) GDPR where it concerns initiating counselling; otherwise Art. 6(1)(f)). Submission goes through the EmailJS service (EmailJS Pte. Ltd.) as a processor. According to the provider’s privacy policy its servers are located in the USA (AWS); for transfers from the EU it uses standard contractual clauses. The message is then received in my mailbox (provider: {{mailbox}}).', 'Please do not send health data or other particularly sensitive information through the form; a short message is enough for a first conversation. If you do, the basis is your explicit consent (Art. 9(2)(a) GDPR), given before sending by ticking the checkbox.', 'Retention: I keep requests only as long as needed to handle them and delete them afterwards, unless statutory retention duties apply.'] },
    { h: 'Contact by email or WhatsApp', p: ['If you write to me by email or use the WhatsApp link, I process the data you send in order to reply (Art. 6(1)(b) or (f) GDPR). The WhatsApp link only opens when you click it; from then on WhatsApp’s privacy rules apply. Here too: please no sensitive health data in the first contact.'] },
    { h: 'External links and fonts', p: ['Links to other sites (for example LinkedIn and the developer’s site, eproxstudio.com) are ordinary links: data is only transmitted when you click them, and the target site’s privacy policy then applies. Fonts are served locally by this website; there is no connection to Google Fonts.'] },
    { h: 'Your rights', p: ['You have the right of access (Art. 15), rectification (Art. 16), erasure (Art. 17), restriction (Art. 18), data portability (Art. 20) and to object to processing based on legitimate interests (Art. 21 GDPR). You may withdraw consent at any time with effect for the future. Contact {{email}}.'] },
    { h: 'Right to lodge a complaint', p: ['You may complain to a data-protection supervisory authority (Art. 77 GDPR). For controllers based in Berlin the competent authority is: {{authority}}.'] },
    { h: 'No automated decision-making', p: ['There is no solely automated decision-making, including profiling, within the meaning of Art. 22 GDPR.'] },
  ],
}

const imprintDE: Doc = {
  title: 'Impressum',
  lead: 'Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG).',
  sections: [
    { h: 'Anbieterin', p: ['{{name}}', '{{address}}'] },
    { h: 'Kontakt', p: ['E-Mail: {{email}}'] },
    { h: 'Berufsbezeichnung und berufsrechtliche Regelungen', p: ['Berufsbezeichnung: {{title}}.', 'Zuständige Kammer / Registrierung: {{chamber}}.', 'Aufsichtsbehörde (falls die Tätigkeit in Deutschland einer behördlichen Zulassung bedarf): {{supervisory}}.'] },
    { h: 'Umsatzsteuer-Identifikationsnummer', p: ['{{vat}}'] },
    { h: 'Haftung für Inhalte und Links', p: ['Die Inhalte dieser Website wurden mit Sorgfalt erstellt; für Richtigkeit, Vollständigkeit und Aktualität kann jedoch keine Gewähr übernommen werden. Für Inhalte externer Seiten, auf die verlinkt wird, sind ausschließlich deren Betreiber verantwortlich.'] },
    { h: 'Urheberrecht', p: ['Texte und Fotografien dieser Website unterliegen dem Urheberrecht. Eine Verwendung außerhalb der gesetzlichen Schranken bedarf der Zustimmung der Anbieterin.'] },
  ],
}
const imprintPT: Doc = {
  title: 'Impressum (Aviso legal)',
  lead: 'Informações conforme o § 5 da Lei alemã de Serviços Digitais (DDG).',
  sections: [
    { h: 'Responsável pelo site', p: ['{{name}}', '{{address}}'] },
    { h: 'Contato', p: ['E-mail: {{email}}'] },
    { h: 'Título profissional e normas profissionais', p: ['Título profissional: {{title}}.', 'Conselho / registro competente: {{chamber}}.', 'Autoridade de supervisão (se a atividade exigir autorização na Alemanha): {{supervisory}}.'] },
    { h: 'Número de identificação para fins de IVA', p: ['{{vat}}'] },
    { h: 'Responsabilidade por conteúdos e links', p: ['Os conteúdos deste site foram elaborados com cuidado, mas não é possível garantir sua exatidão, integridade e atualidade. Pelos conteúdos de sites externos aos quais há links respondem exclusivamente seus operadores.'] },
    { h: 'Direitos autorais', p: ['Textos e fotografias deste site estão protegidos por direitos autorais. Qualquer uso além dos limites legais depende de autorização da responsável.'] },
  ],
}
const imprintEN: Doc = {
  title: 'Impressum (Legal notice)',
  lead: 'Information pursuant to Section 5 of the German Digital Services Act (DDG).',
  sections: [
    { h: 'Provider', p: ['{{name}}', '{{address}}'] },
    { h: 'Contact', p: ['Email: {{email}}'] },
    { h: 'Professional title and professional rules', p: ['Professional title: {{title}}.', 'Competent chamber / registration: {{chamber}}.', 'Supervisory authority (if the activity requires official authorisation in Germany): {{supervisory}}.'] },
    { h: 'VAT identification number', p: ['{{vat}}'] },
    { h: 'Liability for content and links', p: ['The content of this website has been prepared with care, but accuracy, completeness and timeliness cannot be guaranteed. The operators of external sites that are linked are solely responsible for their content.'] },
    { h: 'Copyright', p: ['Texts and photographs on this website are protected by copyright. Any use beyond the statutory limits requires the provider’s consent.'] },
  ],
}

export const DOCS: Record<Exclude<Page, 'home'>, Record<Lang, Doc>> = {
  privacy: { de: privacyDE, pt: privacyPT, en: privacyEN },
  imprint: { de: imprintDE, pt: imprintPT, en: imprintEN },
}
