import { useState } from 'react'
import emailjs from 'emailjs-com'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Button } from '@/components/ui/Button'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string

const RATE_LIMIT_MS = 60 * 60 * 1000 // 1 hour

function isRateLimited(email: string): boolean {
  try {
    const raw = localStorage.getItem('contact_last_submit')
    if (!raw) return false
    const { email: lastEmail, timestamp } = JSON.parse(raw) as { email: string; timestamp: number }
    return lastEmail === email.toLowerCase() && Date.now() - timestamp < RATE_LIMIT_MS
  } catch {
    return false
  }
}

function markSubmitted(email: string) {
  localStorage.setItem('contact_last_submit', JSON.stringify({ email: email.toLowerCase(), timestamp: Date.now() }))
}


interface ContactInfoItem {
  icon: string
  label: string
  value: string
  href?: string
}

export function Contact() {
  const { t } = useTranslation()
  const { ref } = useScrollReveal()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'rate_limited'>('idle')

  const infoItems: ContactInfoItem[] = [
    { icon: '📍', label: t('contact.locationLabel'), value: t('contact.locationValue') },
    { icon: '🌍', label: t('contact.sessionsLabel'), value: t('contact.sessionsValue') },
    { icon: '📧', label: 'Email', value: 'elaine.teixeira.psy@gmail.com', href: 'mailto:elaine.teixeira.psy@gmail.com' },
    { icon: '🔗', label: 'LinkedIn', value: t('contact.linkedinValue'), href: 'https://linkedin.com/in/elaine-teixeira-psy' },
  ]

  const LANGUAGE_TAGS = [
    { flag: '🇧🇷', lang: 'Português' },
    { flag: '🇬🇧', lang: 'English' },
    { flag: '🇪🇸', lang: 'Español' },
  ]

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus('error')
      return
    }

    if (isRateLimited(email)) {
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
      markSubmitted(email)
      setStatus('success')
      setName('')
      setEmail('')
      setSubject('')
      setMessage('')
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
    }
  }

  const inputClass = [
    'w-full px-4 py-3 rounded-sm text-[0.9rem] text-ink bg-white outline-none transition-all duration-200',
    'border border-[var(--border)] focus:border-[var(--rose-mid)] focus:shadow-[0_0_0_3px_rgba(192,122,134,0.12)]',
    'placeholder:text-ink-faint',
  ].join(' ')

  return (
    <section
      id="contact"
      style={{
        background: 'var(--rose-wash)',
        padding: 'clamp(4rem, 8vw, 7rem) 0',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div ref={ref} className="reveal">
          <SectionTitle
            label={t('contact.label')}
            title={t('contact.title')}
            subtitle={t('contact.description')}
          />
        </div>

        <div
          className="grid gap-16 mt-12 items-start"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))' }}
        >
          {/* Info column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            {infoItems.map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-4 p-4 bg-white rounded-md border transition-all hover:border-[var(--rose-mid)] hover:shadow-sm"
                style={{ border: '1px solid var(--border)' }}
              >
                <div
                  className="w-10 h-10 rounded-sm flex items-center justify-center text-lg flex-shrink-0"
                  style={{ background: 'var(--rose-wash)' }}
                  aria-hidden="true"
                >
                  {item.icon}
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
                      className="text-[0.9rem] transition-colors hover:text-[#8a3a49]"
                      style={{ color: 'var(--rose-deep)' }}
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
            <div
              className="p-5 bg-white rounded-md border"
              style={{ border: '1px solid var(--border)' }}
            >
              <p
                className="text-2xs font-medium tracking-[0.12em] uppercase mb-3"
                style={{ color: 'var(--rose-mid)' }}
              >
                {t('contact.langsLabel')}
              </p>
              <div className="flex flex-wrap gap-2">
                {LANGUAGE_TAGS.map((lt) => (
                  <span
                    key={lt.lang}
                    className="inline-flex items-center gap-1.5 text-[0.7rem] font-medium tracking-[0.08em] px-2.5 py-1 rounded-full border"
                    style={{
                      background: 'var(--rose-wash)',
                      color: 'var(--rose-deep)',
                      borderColor: 'var(--border)',
                    }}
                  >
                    {lt.flag} {lt.lang}
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
                style={{ background: '#f0fdf4', color: '#166534', borderColor: '#bbf7d0' }}
                role="alert"
              >
                {t('contact.form.successMsg', { name })}
              </div>
            )}
            {status === 'error' && (
              <div
                className="p-4 rounded-sm text-[0.85rem] font-medium border"
                style={{ background: '#fff5f5', color: '#c0392b', borderColor: '#fecaca' }}
                role="alert"
              >
                {t('contact.form.errorMsg')}
              </div>
            )}
            {status === 'rate_limited' && (
              <div
                className="p-4 rounded-sm text-[0.85rem] font-medium border"
                style={{ background: '#fffbeb', color: '#92400e', borderColor: '#fde68a' }}
                role="alert"
              >
                {t('contact.form.rateLimitMsg')}
              </div>
            )}

            {/* Name + Email row */}
            <div className="grid grid-cols-2 gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))' }}>
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.73rem] font-medium tracking-[0.1em] uppercase text-ink-soft">
                  {t('contact.form.namePlaceholder').includes('nome') || t('contact.form.namePlaceholder').includes('Name') ? 'Name' : t('contact.form.namePlaceholder')}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t('contact.form.namePlaceholder')}
                  className={inputClass}
                  aria-label="Name"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.73rem] font-medium tracking-[0.1em] uppercase text-ink-soft">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('contact.form.emailPlaceholder')}
                  className={inputClass}
                  aria-label="Email"
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
                {t('contact.form.messagePlaceholder').includes('sch') || t('contact.form.messagePlaceholder').includes('men') ? 'Message' : 'Message'}
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t('contact.form.messagePlaceholder')}
                rows={5}
                className={[inputClass, 'resize-y min-h-[120px]'].join(' ')}
                aria-label="Message"
              />
            </div>

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
