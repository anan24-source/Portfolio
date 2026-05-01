'use client'

import { useEffect, useRef } from 'react'
import { ArrowDown, Mail } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa6'
import styles from './Hero.module.css'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width  = window.innerWidth
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

      // Connect nearby particles
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

      {/* Gradient orbs */}
      <div className={styles.orb1} aria-hidden="true" />
      <div className={styles.orb2} aria-hidden="true" />

      <div className={`${styles.content} container`}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          Available for opportunities
        </div>

        <h1 className={styles.name}>
          <span className={styles.nameLine1}>Anantachai</span>
          <span className={`${styles.nameLine2} gradient-text`}>Treemanee</span>
        </h1>

        <p className={styles.title}>
          Senior IT Specialist <span className={styles.separator}>|</span> System Analyst
        </p>

        <p className={styles.subtitle}>
          7+ years bridging Manufacturing Production with Digital Transformation.<br />
          Reduced operational costs by <strong className={styles.highlight}>3,000,000 THB</strong> annually.
        </p>

        <div className={styles.ctas}>
          <a href="#projects" className="btn-primary" onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }}>
            View My Work
            <ArrowDown size={16} />
          </a>
          <a href="#contact" className="btn-outline" onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}>
            Get In Touch
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

      <button className={styles.scrollDown} onClick={scrollToAbout} aria-label="Scroll down">
        <div className={styles.scrollMouse}>
          <div className={styles.scrollWheel} />
        </div>
      </button>
    </section>
  )
}
