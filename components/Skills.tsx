'use client'

import { useEffect, useRef } from 'react'
import styles from './Skills.module.css'

type Skill = { name: string; level: number; icon: string }
type Category = { title: string; icon: string; skills: Skill[] }

const skillCategories: Category[] = [
  {
    title: 'Development Stack',
    icon: '⚡',
    skills: [
      { name: 'Java',     level: 85, icon: '☕' },
      { name: 'Next.js',  level: 80, icon: '▲' },
      { name: 'Node.js',  level: 78, icon: '🟢' },
      { name: 'Django',   level: 72, icon: '🐍' },
      { name: 'Flask',    level: 70, icon: '🧪' },
      { name: 'VB.NET',   level: 75, icon: '🖥️' },
    ],
  },
  {
    title: 'Industry & Infrastructure',
    icon: '🏭',
    skills: [
      { name: 'CNC Machine',           level: 90, icon: '⚙️' },
      { name: 'PLC / Automation',      level: 85, icon: '🤖' },
      { name: 'AS400 / IBM i',         level: 80, icon: '💾' },
      { name: 'Machine Monitoring',    level: 88, icon: '📊' },
      { name: 'Network & Server',      level: 82, icon: '🌐' },
      { name: 'Linux / Windows',       level: 85, icon: '🐧' },
      { name: 'PostgreSQL / SQL Svr',  level: 80, icon: '🗄️' },
    ],
  },
]

function SkillBar({ skill, visible }: { skill: Skill; visible: boolean }) {
  return (
    <div className={styles.skillItem}>
      <div className={styles.skillHeader}>
        <span className={styles.skillName}>
          <span className={styles.skillIcon}>{skill.icon}</span>
          {skill.name}
        </span>
        <span className={styles.skillLevel}>{skill.level}%</span>
      </div>
      <div className={styles.progressTrack}>
        <div
          className={styles.progressBar}
          style={{ width: visible ? `${skill.level}%` : '0%' }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const barsRef    = useRef<boolean>(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting && !barsRef.current) {
            barsRef.current = true
            e.target.querySelectorAll('.fade-up').forEach(el => el.classList.add('visible'))
            // Trigger bar animations
            sectionRef.current?.querySelectorAll('[data-bar]').forEach(el => {
              ;(el as HTMLElement).style.width = (el as HTMLElement).dataset.bar!
            })
          }
        })
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" className={`section section-alt ${styles.skills}`} ref={sectionRef}>
      <div className="container">
        <div className={styles.header}>
          <p className="section-label fade-up">Technical Expertise</p>
          <h2 className="section-title fade-up fade-up-delay-1">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className={`${styles.subtitle} fade-up fade-up-delay-2`}>
            A decade of experience across manufacturing systems, enterprise software, and modern web development.
          </p>
        </div>

        <div className={styles.grid}>
          {skillCategories.map((cat, ci) => (
            <div key={cat.title} className={`glass-card ${styles.categoryCard} fade-up`} style={{ transitionDelay: `${ci * 150}ms` }}>
              <div className={styles.categoryTitle}>
                <span className={styles.catIcon}>{cat.icon}</span>
                {cat.title}
              </div>
              <div className={styles.skillList}>
                {cat.skills.map((skill, si) => (
                  <SkillBar key={skill.name} skill={skill} visible={barsRef.current} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
