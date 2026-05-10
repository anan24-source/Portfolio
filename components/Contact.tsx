'use client'

import { useEffect, useRef, useActionState } from 'react'
import { MapPin, Mail, Phone, Send } from 'lucide-react'
import { FaLinkedin } from 'react-icons/fa6'
import styles from './Contact.module.css'
import { submitContact, ContactFormState } from '@/app/actions/contact'
import { useLanguage } from '@/lib/language'

const initialState: ContactFormState = {}

const copy = {
  en: {
    label: 'Get in touch',
    title: "Let's",
    accent: 'Connect',
    subtitle: "Currently open to new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!",
    infoTitle: 'Contact Information',
    location: 'Location',
    email: 'Email',
    phone: 'Phone',
    linkedIn: 'LinkedIn',
    locationValue: 'U-Thai, Ayutthaya, Thailand',
    nameLabel: 'Name',
    namePlaceholder: 'John Doe',
    emailPlaceholder: 'john@example.com',
    messageLabel: 'Message',
    messagePlaceholder: "Hello, I'd like to discuss...",
    sending: 'Sending...',
    send: 'Send Message',
  },
  th: {
    label: 'Get in touch',
    title: 'มาคุยกัน',
    accent: 'Connect',
    subtitle: 'ตอนนี้เปิดรับโอกาสใหม่ หากต้องการคุยเรื่องงาน ระบบโรงงาน หรือ Digital Transformation สามารถติดต่อมาได้เลยครับ',
    infoTitle: 'Contact Information',
    location: 'Location',
    email: 'Email',
    phone: 'Phone',
    linkedIn: 'LinkedIn',
    locationValue: 'อุทัย, อยุธยา, Thailand',
    nameLabel: 'Name',
    namePlaceholder: 'ชื่อของคุณ',
    emailPlaceholder: 'your@email.com',
    messageLabel: 'Message',
    messagePlaceholder: 'สวัสดีครับ อยากสอบถามเรื่อง...',
    sending: 'Sending...',
    send: 'Send Message',
  },
}

export default function Contact() {
  const { language } = useLanguage()
  const t = copy[language]
  const sectionRef = useRef<HTMLElement>(null)
  const [state, formAction, isPending] = useActionState(submitContact, initialState)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset()
    }
  }, [state.success])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.querySelectorAll('.fade-up').forEach(el => el.classList.add('visible'))
          }
        })
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="contact" className={`section ${styles.contact}`} ref={sectionRef}>
      <div className="container">
        <div className={styles.header}>
          <p className="section-label fade-up">{t.label}</p>
          <h2 className="section-title fade-up fade-up-delay-1">
            {t.title} <span className="gradient-text">{t.accent}</span>
          </h2>
          <p className={`${styles.subtitle} fade-up fade-up-delay-2`}>
            {t.subtitle}
          </p>
        </div>

        <div className={styles.grid}>
          <div className={`${styles.info} fade-up fade-up-delay-2`}>
            <div className={`glass-card ${styles.infoCard}`}>
              <h3 className={styles.infoTitle}>{t.infoTitle}</h3>
              <ul className={styles.infoList}>
                <li>
                  <div className={styles.iconBox}><MapPin size={20} /></div>
                  <div>
                    <div className={styles.infoLabel}>{t.location}</div>
                    <div className={styles.infoValue}>{t.locationValue}</div>
                  </div>
                </li>
                <li>
                  <div className={styles.iconBox}><Mail size={20} /></div>
                  <div>
                    <div className={styles.infoLabel}>{t.email}</div>
                    <a href="mailto:anantachai.tree@gmail.com" className={styles.infoValue}>anantachai.tree@gmail.com</a>
                  </div>
                </li>
                <li>
                  <div className={styles.iconBox}><Phone size={20} /></div>
                  <div>
                    <div className={styles.infoLabel}>{t.phone}</div>
                    <a href="tel:0898200569" className={styles.infoValue}>089-820-0569</a>
                  </div>
                </li>
                <li>
                  <div className={styles.iconBox}><FaLinkedin size={20} /></div>
                  <div>
                    <div className={styles.infoLabel}>{t.linkedIn}</div>
                    <a href="https://linkedin.com/in/anantachai-treemanee-a58236172" target="_blank" rel="noopener noreferrer" className={styles.infoValue}>anantachai-treemanee</a>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className={`${styles.formWrapper} fade-up fade-up-delay-3`}>
            <form action={formAction} ref={formRef} className={`glass-card ${styles.form}`}>
              <input type="hidden" name="language" value={language} />
              {state.error && <div className={styles.errorAlert}>{state.error}</div>}
              {state.success && <div className={styles.successAlert}>{state.message}</div>}

              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>{t.nameLabel}</label>
                <input type="text" id="name" name="name" className={styles.input} placeholder={t.namePlaceholder} required disabled={isPending} />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>{t.email}</label>
                <input type="email" id="email" name="email" className={styles.input} placeholder={t.emailPlaceholder} required disabled={isPending} />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>{t.messageLabel}</label>
                <textarea id="message" name="message" rows={5} className={styles.textarea} placeholder={t.messagePlaceholder} required disabled={isPending} />
              </div>

              <button type="submit" className={`btn-primary ${styles.submitBtn}`} disabled={isPending}>
                {isPending ? t.sending : (
                  <>
                    {t.send}
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
