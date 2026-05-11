'use client'

import { useEffect, useRef } from 'react'
import { ArrowDown, Briefcase, CircleDollarSign, Code2, Mail, Network, TimerReset } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa6'
import styles from './Hero.module.css'
import { useLanguage } from '@/lib/language'

const copy = {
  en: {
    badge: 'Available for opportunities',
    role: 'Software Systems Engineer',
    analyst: 'Local Infrastructure Engineer',
    subtitleStart: 'Bridging Manufacturing Production with Digital Transformation.',
    smartFactory: 'Smart Factory',
    viewWork: 'View My Work',
    contact: 'Get In Touch',
    scroll: 'Scroll down',
    impact: [
      { value: '8+ years', label: 'Professional experience', icon: Briefcase },
      { value: '3,000,000 THB', label: 'Cost reduction per year', icon: CircleDollarSign },
      { value: '10+', label: 'Manpower reduction per year', icon: TimerReset },
    ],
  },
  th: {
    badge: 'เปิดรับโอกาสใหม่',
    role: 'Software Systems Engineer',
    analyst: 'Local Infrastructure Engineer',
    subtitleStart: 'ประสบการณ์ในการเชื่อม Production Factory เข้ากับ Digital Transformation.',
    smartFactory: 'Smart Factory',
    viewWork: 'ดูผลงาน',
    contact: 'ติดต่อ',
    scroll: 'เลื่อนลง',
    impact: [
      { value: '8+ ปี', label: 'ประสบการณ์ทำงาน', icon: Briefcase },
      { value: '3,000,000 THB', label: 'ลดค่าใช้จ่ายต่อปี', icon: CircleDollarSign },
      { value: '10+', label: 'ลดคนต่อปี', icon: TimerReset },
    ],
  },
}

export default function Hero() {
  const { language } = useLanguage()
  const t = copy[language]
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = []
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
      })
    }

    let animId: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 194, 255, ${p.alpha})`
        ctx.fill()
      })

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(0, 194, 255, ${0.08 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className={styles.hero}>
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />

      <div className={styles.orb1} aria-hidden="true" />
      <div className={styles.orb2} aria-hidden="true" />

      <div className={`${styles.content} container`}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          {t.badge}
        </div>

        <h1 className={styles.name}>
          <span className={styles.nameLine1}>Anantachai</span>
          <span className={`${styles.nameLine2} gradient-text`}>Treemanee</span>
        </h1>

        <div className={styles.roleBadges} aria-label={`${t.role} and ${t.analyst}`}>
          <span className={`${styles.roleBadge} ${styles.softwareBadge}`}>
            <Code2 size={18} />
            {t.role}
          </span>
          <span className={styles.roleConnector} aria-hidden="true" />
          <span className={`${styles.roleBadge} ${styles.infrastructureBadge}`}>
            <Network size={18} />
            {t.analyst}
          </span>
        </div>

        <p className={styles.subtitle}>
          <span className={styles.subtitleLead}>{t.subtitleStart}</span>
        </p>

        <div className={`${styles.smartFactory} gradient-text`}>
          {t.smartFactory}
        </div>

        <div className={styles.impactGrid} aria-label="Key impact metrics">
          {t.impact.map(item => {
            const Icon = item.icon

            return (
              <div className={styles.impactCard} key={item.label}>
                <Icon size={18} />
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            )
          })}
        </div>

        <div className={styles.ctas}>
          <a href="#projects" className="btn-primary" onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }}>
            {t.viewWork}
            <ArrowDown size={16} />
          </a>
          <a href="#contact" className="btn-outline" onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}>
            {t.contact}
          </a>
        </div>

        <div className={styles.socials}>
          <a href="https://linkedin.com/in/anantachai-treemanee-a58236172" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
            <FaLinkedin size={18} />
          </a>
          <a href="https://github.com/anan24-source" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub">
            <FaGithub size={18} />
          </a>
          <a href="mailto:anantachai.tree@gmail.com" className={styles.socialLink} aria-label="Email">
            <Mail size={18} />
          </a>
        </div>
      </div>

      <button className={styles.scrollDown} onClick={scrollToAbout} aria-label={t.scroll}>
        <div className={styles.scrollMouse}>
          <div className={styles.scrollWheel} />
        </div>
      </button>
    </section>
  )
}
