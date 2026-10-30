import { useId, useRef, useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Button } from '@/components/ui/Button'
import { Link } from '@/components/ui/Link'
import { Reveal } from '@/components/ui/Reveal'
import { CONTACT_EMAIL, LINKEDIN_URL } from '@/config/site'
import { useLang } from '@/hooks/useLang'
import {
  ContactSendError, isRateLimited, markSubmitted, sendContact, validateContact,
  type ContactField, type ContactValues, type FieldErrors, type SendFailure,
} from '@/lib/contactForm'
import { hrefFor } from '@/lib/route'
import imgContact from '@/assets/img/elaine6.webp'
import { MapPin, Globe2, Mail, Linkedin, type LucideIcon } from 'lucide-react'

interface ContactInfoItem {
  icon: LucideIcon
  label: string
  value: string
  href?: string
}

/**
 * Campo com <label htmlFor> de verdade (antes era só `aria-label`, que não aumenta a área de clique
 * e duplicava o texto) e mensagem de erro ligada ao input via `aria-describedby`.
 */
function Field({ id, label, error, children }: { id: string; label: string; error?: string | false; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="eyebrow-sm text-ink-soft">{label}</label>
      {children}
      {error && <p id={`${id}-err`} className="m-0 text-[0.75rem] text-[var(--forest)]">{error}</p>}
    </div>
  )
}

/** Estado do envio. Falhas reaproveitam os tipos de `contactForm` para o `switch` ser exaustivo. */
type Status = 'idle' | 'loading' | 'success' | 'consent' | 'invalid' | SendFailure

const EMPTY: ContactValues = { name: '', email: '', subject: '', message: '' }

export function Contact() {
  const { t } = useTranslation()
  const lang = useLang()
  const uid = useId()
  const [values, setValues] = useState<ContactValues>(EMPTY)
  const [consent, setConsent] = useState(false)
  const [trap, setTrap] = useState('')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const refs = useRef<Partial<Record<ContactField, HTMLInputElement | HTMLTextAreaElement | null>>>({})
  // Nome usado na mensagem de sucesso: guardado ANTES de limpar o formulário.
  const [sentName, setSentName] = useState('')

  const infoItems: ContactInfoItem[] = [
    { icon: MapPin, label: t('contact.locationLabel'), value: t('contact.locationValue') },
    { icon: Globe2, label: t('contact.sessionsLabel'), value: t('contact.sessionsValue') },
    { icon: Mail, label: t('contact.form.emailLabel'), value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
    { icon: Linkedin, label: 'LinkedIn', value: t('contact.linkedinValue'), href: LINKEDIN_URL },
  ]

  const LANGUAGE_TAGS = [t('contact.langPt'), t('contact.langEn')]

  const setField = (field: keyof ContactValues) => (e: { target: { value: string } }) => {
    setValues(v => ({ ...v, [field]: e.target.value }))
    // Limpa o erro do campo assim que a pessoa volta a digitar nele.
    if (field !== 'subject' && errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === 'loading') return // duplo clique/Enter repetido: ignora o segundo envio

    // Honeypot: pessoas reais nunca veem nem preenchem este campo. Bots recebem um "sucesso" falso
    // para não saberem que foram detectados (e não tentarem contornar).
    if (trap) { setStatus('success'); return }

    const found = validateContact(values)
    if (Object.keys(found).length > 0) {
      setErrors(found)
      setStatus('invalid')
      // Acessibilidade: leva o foco ao primeiro campo com erro (leitor de tela anuncia o problema).
      const first = (['name', 'email', 'message'] as const).find(f => found[f])
      if (first) refs.current[first]?.focus()
      return
    }
    if (!consent) { setStatus('consent'); return }
    if (isRateLimited()) { setStatus('rate_limited'); return }

    setErrors({})
    setStatus('loading')
    try {
      await sendContact(values)
      markSubmitted()
      setSentName(values.name)
      setValues(EMPTY)
      setConsent(false)
      setStatus('success')
    } catch (error) {
      // sendContact SEMPRE lança ContactSendError; o fallback 'service' cobre um bug futuro nesse contrato.
      setStatus(error instanceof ContactSendError ? error.kind : 'service')
    }
  }

  /** Mensagem do banner para cada estado de falha; `null` = nada a mostrar. */
  const failureMessage: Record<Exclude<Status, 'idle' | 'loading' | 'success'>, string> = {
    invalid: t('contact.form.errorMsg'),
    consent: t('contact.form.consentError'),
    rate_limited: t('contact.form.rateLimitMsg'),
    network: t('contact.form.errors.networkMsg'),
    service: t('contact.form.errors.serviceMsg'),
    misconfigured: t('contact.form.errors.configMsg'),
  }
  const failureBorder: Record<string, string> = { rate_limited: 'var(--gold)' }

  const inputClass = [
    'w-full px-0 py-3 text-[0.95rem] text-ink bg-transparent outline-none transition-all duration-200',
    'border-0 border-b border-[var(--border)] focus:border-[var(--forest)] rounded-none',
    'placeholder:text-ink-faint',
  ].join(' ')

  return (
    <section
      id="contact"
      style={{
        background: 'var(--paper)',
        padding: 'clamp(5rem, 9vw, 8rem) 0',
      }}
    >
      <div className="mx-auto px-[var(--gutter)]" style={{ maxWidth: 'var(--content-w)' }}>
        <Reveal>
          <SectionTitle
            label={t('contact.label')}
            title={t('contact.title')}
            subtitle={t('contact.description')}
            scale="large"
          />
        </Reveal>

        <div
          className="grid gap-12 lg:gap-14 mt-14 items-start grid-cols-1 lg:grid-cols-[0.78fr_1fr_1.15fr]"
        >
          {/* Portrait column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="img-zoom relative max-w-[280px] lg:max-w-none mx-auto lg:mx-0"
          >
            <img
              src={imgContact}
              alt={t('contact.imageAlt')}
              width={1066}
              height={1600}
              loading="lazy"
              className="w-full h-auto object-cover aspect-[3/4]"
              style={{ objectPosition: '50% 15%' }}
            />
          </motion.div>

          {/* Info column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            {infoItems.map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-4 py-4 border-t border-[var(--border-soft)] last:border-b"
              >
                <div
                  className="w-9 h-9 rounded-sm flex items-center justify-center flex-shrink-0"
                  style={{ background: 'var(--paper)' }}
                  aria-hidden="true"
                >
                  <item.icon className="w-4 h-4 text-gold" strokeWidth={1.5} />
                </div>
                <div>
                  <p
                    className="eyebrow-sm mb-0.5"
                    style={{ color: 'var(--ink-faint)' }}
                  >
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-[0.9rem] transition-colors hover:text-[var(--sage)]"
                      style={{ color: 'var(--forest)' }}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-[0.9rem] text-ink">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Language tags */}
            <div className="mt-6">
              <p
                className="eyebrow-sm mb-3"
                style={{ color: 'var(--gold)' }}
              >
                {t('contact.langsLabel')}
              </p>
              <div className="flex flex-wrap gap-2">
                {LANGUAGE_TAGS.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 text-[0.7rem] font-medium tracking-[0.08em] px-2.5 py-1 rounded-full border"
                    style={{
                      background: 'var(--paper)',
                      color: 'var(--forest)',
                      borderColor: 'var(--border)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col gap-4"
          >
            <form onSubmit={(e) => { void handleSubmit(e) }} noValidate className="flex flex-col gap-4">
              {/* Sucesso = role="status" (educado, não interrompe); falhas = role="alert" (anunciadas na hora) */}
              {status === 'success' && (
                <div
                  className="p-4 rounded-sm text-[0.85rem] font-medium border"
                  style={{ background: 'var(--paper)', color: 'var(--forest)', borderColor: 'var(--sage)' }}
                  role="status"
                >
                  {t('contact.form.successMsg', { name: sentName })}
                </div>
              )}
              {status !== 'idle' && status !== 'loading' && status !== 'success' && (
                <div
                  className="p-4 rounded-sm text-[0.85rem] font-medium border"
                  style={{ background: 'var(--paper)', color: 'var(--forest)', borderColor: failureBorder[status] ?? 'var(--forest)' }}
                  role="alert"
                >
                  {failureMessage[status]}
                  {(status === 'service' || status === 'misconfigured') && (
                    <>{' '}<a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-4">{CONTACT_EMAIL}</a></>
                  )}
                </div>
              )}

              <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))' }}>
                <Field id={`${uid}-name`} label={t('contact.form.nameLabel')} error={errors.name && t(`contact.form.errors.${errors.name}`)}>
                  <input
                    ref={el => { refs.current.name = el }}
                    id={`${uid}-name`}
                    type="text"
                    value={values.name}
                    onChange={setField('name')}
                    maxLength={100}
                    autoComplete="name"
                    required
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? `${uid}-name-err` : undefined}
                    placeholder={t('contact.form.namePlaceholder')}
                    className={inputClass}
                  />
                </Field>
                <Field id={`${uid}-email`} label={t('contact.form.emailLabel')} error={errors.email && t(`contact.form.errors.${errors.email}`)}>
                  <input
                    ref={el => { refs.current.email = el }}
                    id={`${uid}-email`}
                    type="email"
                    value={values.email}
                    onChange={setField('email')}
                    maxLength={254}
                    autoComplete="email"
                    required
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? `${uid}-email-err` : undefined}
                    placeholder={t('contact.form.emailPlaceholder')}
                    className={inputClass}
                  />
                </Field>
              </div>

              <Field id={`${uid}-subject`} label={t('contact.form.subjectLabel')}>
                <select id={`${uid}-subject`} value={values.subject} onChange={setField('subject')} className={inputClass}>
                  <option value="">{t('contact.form.subjectPlaceholder')}</option>
                  <option value="individual">{t('contact.form.subjectOpt1')}</option>
                  <option value="package">{t('contact.form.subjectOpt2')}</option>
                  <option value="consulting">{t('contact.form.subjectOpt3')}</option>
                  <option value="other">{t('contact.form.subjectOpt4')}</option>
                </select>
              </Field>

              <Field id={`${uid}-message`} label={t('contact.form.messageLabel')} error={errors.message && t(`contact.form.errors.${errors.message}`)}>
                <textarea
                  ref={el => { refs.current.message = el }}
                  id={`${uid}-message`}
                  value={values.message}
                  onChange={setField('message')}
                  maxLength={4000}
                  placeholder={t('contact.form.messagePlaceholder')}
                  rows={5}
                  required
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? `${uid}-message-err` : undefined}
                  className={[inputClass, 'resize-y min-h-[120px]'].join(' ')}
                />
              </Field>

              <p className="m-0 text-[0.78rem] leading-relaxed text-ink-faint">{t('contact.form.healthNote')}</p>

              {/* Honeypot (escondido de pessoas e de tecnologia assistiva) */}
              <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
                <label>Website<input type="text" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} /></label>
              </div>

              <label className="flex cursor-pointer items-start gap-3 text-[0.8rem] leading-relaxed text-ink-soft">
                <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} aria-invalid={status === 'consent'} className="mt-1 size-4 shrink-0 accent-[var(--forest)]" />
                <span>
                  {t('contact.form.consentLabel')}{' '}
                  <Link href={hrefFor('privacy', lang)} className="underline underline-offset-4 hover:text-[var(--forest)]">
                    {t('contact.form.privacyLink')}
                  </Link>
                </span>
              </label>

              <Button type="submit" fullWidth disabled={status === 'loading' || status === 'success'}>
                {status === 'loading' ? t('contact.form.sendingBtn') : t('contact.form.sendBtn')}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
