'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './Navbar.module.css'

const navLinks = [
  { href: '#home',       label: 'Home' },
  { href: '#about',      label: 'About' },
  { href: '#skills',     label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects',   label: 'Projects' },
  { href: '#contact',    label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled]         = useState(false)
  const [active, setActive]             = useState('home')
  const [menuOpen, setMenuOpen]         = useState(false)
  const lastScrollY                     = useRef(0)
  const [hidden, setHidden]             = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      setHidden(y > lastScrollY.current && y > 200)
      lastScrollY.current = y

      // Active section detection
      const sections = navLinks.map(l => l.href.slice(1))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ''} ${hidden ? styles.hidden : ''}`}
    >
      <div className={`${styles.inner} container`}>
        <a className={styles.logo} onClick={() => handleNavClick('#home')}>
          <span className={styles.logoAccent}>AN</span>
          <span>antachai</span>
        </a>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          {navLinks.map(link => (
            <a
              key={link.href}
              className={`${styles.navLink} ${active === link.href.slice(1) ? styles.navLinkActive : ''}`}
              onClick={() => handleNavClick(link.href)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/resume/resume.html"
            target="_blank"
            rel="noopener noreferrer"
            className={`btn-primary ${styles.resumeBtn}`}
          >
            Resume
          </a>
        </nav>

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen1 : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen2 : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barOpen3 : ''}`} />
        </button>
      </div>
    </header>
  )
}
