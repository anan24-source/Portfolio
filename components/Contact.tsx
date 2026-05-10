'use client'

import { useEffect, useRef, useActionState } from 'react'
import { MapPin, Mail, Phone, Send } from 'lucide-react'
import { FaLinkedin } from 'react-icons/fa6'
import styles from './Contact.module.css'
import { submitContact, ContactFormState } from '@/app/actions/contact'

const initialState: ContactFormState = {}

export default function Contact() {
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
          <p className="section-label fade-up">Get in touch</p>
          <h2 className="section-title fade-up fade-up-delay-1">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          <p className={`${styles.subtitle} fade-up fade-up-delay-2`}>
            Currently open to new opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
          </p>
        </div>

        <div className={styles.grid}>
          {/* Contact Info */}
          <div className={`${styles.info} fade-up fade-up-delay-2`}>
            <div className={`glass-card ${styles.infoCard}`}>
              <h3 className={styles.infoTitle}>Contact Information</h3>
              <ul className={styles.infoList}>
                <li>
                  <div className={styles.iconBox}><MapPin size={20} /></div>
                  <div>
                    <div className={styles.infoLabel}>Location</div>
                    <div className={styles.infoValue}>U-Thai, Ayutthaya, Thailand</div>
                  </div>
                </li>
                <li>
                  <div className={styles.iconBox}><Mail size={20} /></div>
                  <div>
                    <div className={styles.infoLabel}>Email</div>
                    <a href="mailto:anantachai.tree@gmail.com" className={styles.infoValue}>anantachai.tree@gmail.com</a>
                  </div>
                </li>
                <li>
                  <div className={styles.iconBox}><Phone size={20} /></div>
                  <div>
                    <div className={styles.infoLabel}>Phone</div>
                    <a href="tel:0898200569" className={styles.infoValue}>089-820-0569</a>
                  </div>
                </li>
                <li>
                  <div className={styles.iconBox}><FaLinkedin size={20} /></div>
                  <div>
                    <div className={styles.infoLabel}>LinkedIn</div>
                    <a href="https://linkedin.com/in/anantachai-treemanee-a58236172" target="_blank" rel="noopener noreferrer" className={styles.infoValue}>anantachai-treemanee</a>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className={`${styles.formWrapper} fade-up fade-up-delay-3`}>
            <form action={formAction} ref={formRef} className={`glass-card ${styles.form}`}>
              {state.error && <div className={styles.errorAlert}>{state.error}</div>}
              {state.success && <div className={styles.successAlert}>{state.message}</div>}
              
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>Name</label>
                <input type="text" id="name" name="name" className={styles.input} placeholder="John Doe" required disabled={isPending} />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>Email</label>
                <input type="email" id="email" name="email" className={styles.input} placeholder="john@example.com" required disabled={isPending} />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>Message</label>
                <textarea id="message" name="message" rows={5} className={styles.textarea} placeholder="Hello, I'd like to discuss..." required disabled={isPending} />
              </div>
              
              <button type="submit" className={`btn-primary ${styles.submitBtn}`} disabled={isPending}>
                {isPending ? 'Sending...' : (
                  <>
                    Send Message
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
