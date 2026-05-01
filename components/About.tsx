'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import styles from './About.module.css'

const stats = [
  { value: '7+',   label: 'Years Experience',   icon: '🏆' },
  { value: '3M',   label: 'THB Saved Annually',  icon: '💰' },
  { value: '40%',  label: 'Efficiency Gained',   icon: '📈' },
  { value: '99.9%',label: 'System Uptime',        icon: '⚡' },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          e.target.querySelectorAll('.fade-up').forEach(el => {
            if (e.isIntersecting) el.classList.add('visible')
          })
        })
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className={`section ${styles.about}`} ref={sectionRef}>
      <div className="container">
        <div className={styles.grid}>
          {/* Text Column */}
          <div className={styles.textCol}>
            <p className="section-label fade-up">About Me</p>
            <h2 className="section-title fade-up fade-up-delay-1">
              Turning Factory Floors into<br />
              <span className="gradient-text">Digital Ecosystems</span>
            </h2>
            <p className={`${styles.lead} fade-up fade-up-delay-2`}>
              Highly experienced IT Professional with over 7 years of expertise in
              <strong> Manufacturing IT Solutions</strong> and <strong>Digital Transformation (DX)</strong>.
            </p>
            <p className={`${styles.body} fade-up fade-up-delay-3`}>
              I bridge the gap between production floor operations (CNC/PLC) and enterprise
              software systems. My proven track record includes reducing annual operational costs
              by <span className={styles.accent}>3,000,000 THB</span> through strategic automation
              and paperless initiatives at MinebeaMitsumi.
            </p>
            <ul className={`${styles.strengths} fade-up fade-up-delay-4`}>
              <li>
                <span className={styles.strengthIcon}>🏭</span>
                <span><strong>Production Insight:</strong> 4 years of hands-on manufacturing experience enables practical, user-friendly system design.</span>
              </li>
              <li>
                <span className={styles.strengthIcon}>🔄</span>
                <span><strong>Full-Lifecycle Analyst:</strong> Requirements gathering, HLD/Detail Design, UAT, and Post Go-Live support.</span>
              </li>
              <li>
                <span className={styles.strengthIcon}>💻</span>
                <span><strong>Multilingual Dev:</strong> Modern web (Next.js/Node) and enterprise-grade (Java/AS400/SQL) stacks.</span>
              </li>
            </ul>
          </div>

          {/* Image Column */}
          <div className={`${styles.imageCol} fade-up fade-up-delay-2`}>
            <div className={styles.imageWrapper}>
              <Image
                src="/profile.jpg"
                alt="Anantachai Treemanee"
                width={380}
                height={420}
                className={styles.profileImage}
                priority
              />
              <div className={styles.imageGlow} />
              {/* Floating badge */}
              <div className={styles.floatingBadge}>
                <span className={styles.floatingIcon}>🎯</span>
                <div>
                  <div className={styles.floatingTitle}>IT Head</div>
                  <div className={styles.floatingSubtitle}>MinebeaMitsumi</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className={styles.statsGrid}>
          {stats.map((stat, i) => (
            <div key={stat.label} className={`glass-card ${styles.statCard} fade-up`} style={{ transitionDelay: `${i * 100}ms` }}>
              <div className={styles.statIcon}>{stat.icon}</div>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
