import { useState } from 'react'
import emailjs from 'emailjs-com'
import { useTranslation } from 'react-i18next'
import { motion } from 'motion/react'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Button } from '@/components/ui/Button'
import { Link } from '@/components/ui/Link'
import { hrefFor } from '@/lib/route'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import imgContact from '@/assets/img/elaine6.webp'
import { MapPin, Globe2, Mail, Linkedin, type LucideIcon } from 'lucide-react'

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string

const RATE_LIMIT_MS = 60 * 60 * 1000 // 1 hour

/** Abuse protection only: remembers WHEN the form was last sent from this browser — no personal data is stored. */
function isRateLimited(): boolean {
  try {
    const raw = localStorage.getItem('contact_last_submit')
    if (!raw) return false
    const parsed = JSON.parse(raw) as { timestamp?: number } | number
    const ts = typeof parsed === 'number' ? parsed : parsed.timestamp
    return typeof ts === 'number' && Date.now() - ts < RATE_LIMIT_MS
  } catch {
    return false
  }
}

function markSubmitted() {
  try { localStorage.setItem('contact_last_submit', JSON.stringify({ timestamp: Date.now() })) } catch { /* storage unavailable */ }
}


interface ContactInfoItem {
  icon: LucideIcon
  label: string
  value: string
  href?: string
}

export function Contact() {
  const { t, i18n } = useTranslation()
  const { ref } = useScrollReveal()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [consent, setConsent] = useState(false)
  const [trap, setTrap] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'rate_limited'>('idle')

  const infoItems: ContactInfoItem[] = [
    { icon: MapPin, label: t('contact.locationLabel'), value: t('contact.locationValue') },
    { icon: Globe2, label: t('contact.sessionsLabel'), value: t('contact.sessionsValue') },
    { icon: Mail, label: t('contact.form.emailLabel'), value: 'elaine.teixeira.psy@gmail.com', href: 'mailto:elaine.teixeira.psy@gmail.com' },
    { icon: Linkedin, label: 'LinkedIn', value: t('contact.linkedinValue'), href: 'https://linkedin.com/in/elaine-teixeira-psy' },
  ]

  const LANGUAGE_TAGS = [
    { lang: t('contact.langPt') },
    { lang: t('contact.langEn') },
  ]

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Honeypot: real visitors never see or fill this field
    if (trap) { setStatus('success'); return }

    if (!name.trim() || !email.trim() || !message.trim() || !consent) {
      setStatus('error')
      return
    }

    if (isRateLimited()) {
      setStatus('rate_limited')
      return
    }

    setStatus('loading')

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { name, email, subject, message },
        EMAILJS_PUBLIC_KEY,
      )
      markSubmitted()
      setStatus('success')
      setName('')
      setEmail('')
      setSubject('')
      setMessage('')
      setConsent(false)
    } catch {
      setStatus('error')
    }
  }

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
      <div className="max-w-[1200px] mx-auto px-6">
        <div ref={ref} className="reveal">
          <SectionTitle
            label={t('contact.label')}
            title={t('contact.title')}
            subtitle={t('contact.description')}
            scale="large"
          />
        </div>

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
                    className="text-2xs font-medium tracking-[0.12em] uppercase mb-0.5"
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
                className="text-2xs font-medium tracking-[0.12em] uppercase mb-3"
                style={{ color: 'var(--gold)' }}
              >
                {t('contact.langsLabel')}
              </p>
              <div className="flex flex-wrap gap-2">
                {LANGUAGE_TAGS.map((lt) => (
                  <span
                    key={lt.lang}
                    className="inline-flex items-center gap-1.5 text-[0.7rem] font-medium tracking-[0.08em] px-2.5 py-1 rounded-full border"
                    style={{
                      background: 'var(--paper)',
                      color: 'var(--forest)',
                      borderColor: 'var(--border)',
                    }}
                  >
                    {lt.lang}
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
            <form onSubmit={(e) => { void handleSubmit(e) }} className="flex flex-col gap-4">
            {/* Status notifications */}
            {status === 'success' && (
              <div
                className="p-4 rounded-sm text-[0.85rem] font-medium border"
                style={{ background: 'var(--paper)', color: 'var(--forest)', borderColor: 'var(--sage)' }}
                role="alert"
              >
                {t('contact.form.successMsg', { name })}
              </div>
            )}
            {status === 'error' && (
              <div
                className="p-4 rounded-sm text-[0.85rem] font-medium border"
                style={{ background: 'var(--paper)', color: 'var(--forest)', borderColor: 'var(--forest)' }}
                role="alert"
              >
                {!consent ? t('contact.form.consentError') : t('contact.form.errorMsg')}
              </div>
            )}
            {status === 'rate_limited' && (
              <div
                className="p-4 rounded-sm text-[0.85rem] font-medium border"
                style={{ background: 'var(--paper)', color: 'var(--forest)', borderColor: 'var(--gold)' }}
                role="alert"
              >
                {t('contact.form.rateLimitMsg')}
              </div>
            )}

            {/* Name + Email row */}
            <div className="grid grid-cols-2 gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))' }}>
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.73rem] font-medium tracking-[0.1em] uppercase text-ink-soft">
                  {t('contact.form.nameLabel')}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={100}
                  autoComplete="name"
                  placeholder={t('contact.form.namePlaceholder')}
                  className={inputClass}
                  aria-label={t('contact.form.nameLabel')}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.73rem] font-medium tracking-[0.1em] uppercase text-ink-soft">
                  {t('contact.form.emailLabel')}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength={254}
                  autoComplete="email"
                  placeholder={t('contact.form.emailPlaceholder')}
                  className={inputClass}
                  aria-label={t('contact.form.emailLabel')}
                />
              </div>
            </div>

            {/* Subject */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[0.73rem] font-medium tracking-[0.1em] uppercase text-ink-soft">
                {t('contact.form.subjectLabel')}
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className={inputClass}
                aria-label={t('contact.form.subjectLabel')}
              >
                <option value="">{t('contact.form.subjectPlaceholder')}</option>
                <option value="individual">{t('contact.form.subjectOpt1')}</option>
                <option value="package">{t('contact.form.subjectOpt2')}</option>
                <option value="consulting">{t('contact.form.subjectOpt3')}</option>
                <option value="other">{t('contact.form.subjectOpt4')}</option>
              </select>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[0.73rem] font-medium tracking-[0.1em] uppercase text-ink-soft">
                {t('contact.form.messageLabel')}
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={4000}
                placeholder={t('contact.form.messagePlaceholder')}
                rows={5}
                className={[inputClass, 'resize-y min-h-[120px]'].join(' ')}
                aria-label={t('contact.form.messageLabel')}
              />
            </div>

            <p className="m-0 text-[0.78rem] leading-relaxed text-ink-faint">{t('contact.form.healthNote')}</p>

            {/* Honeypot (hidden from people and assistive tech) */}
            <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
              <label>Website<input type="text" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} /></label>
            </div>

            <label className="flex cursor-pointer items-start gap-3 text-[0.8rem] leading-relaxed text-ink-soft">
              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} aria-invalid={status === 'error' && !consent} className="mt-1 size-4 shrink-0 accent-[var(--forest)]" />
              <span>
                {t('contact.form.consentLabel')}{' '}
                <Link href={hrefFor('privacy', i18n.language === 'en' ? 'en' : 'pt')} className="underline underline-offset-4 hover:text-[var(--forest)]">
                  {t('contact.form.privacyLink')}
                </Link>
              </span>
            </label>

            <Button
              type="submit"
              fullWidth
              aria-label={t('contact.form.sendBtn')}
              disabled={status === 'loading' || status === 'success'}
            >
              {status === 'loading' ? t('contact.form.sendingBtn') : t('contact.form.sendBtn')}
            </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
