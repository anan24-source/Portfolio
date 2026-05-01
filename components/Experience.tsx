'use client'

import { useEffect, useRef } from 'react'
import { Briefcase, GraduationCap } from 'lucide-react'
import styles from './Experience.module.css'

const timeline = [
  {
    id: 'exp1',
    title: 'IT Department Head (Hard Disk Component Unit)',
    subtitle: 'MinebeaMitsumi | Navanakorn',
    date: 'Present',
    type: 'work',
    description: [
      'Lead Digital Transformation (DX) projects, successfully reducing manual recording and paper usage via custom-built input applications.',
      'Design and maintain Machine Monitoring Systems (MMS), integrating real-time data from CNC Machines and Automation PLCs.',
      'Developed API integration for AS400 to streamline data input processes, improving efficiency by 40%.',
      'Manage enterprise-level Network and Server infrastructure to ensure 99.9% uptime for factory operations.'
    ],
    highlight: '★ Result: Reduced company expenses by 3,000,000 THB annually via DX & IT Optimization.',
  },
  {
    id: 'exp2',
    title: 'Production Floor Specialist',
    subtitle: 'MinebeaMitsumi',
    date: '4 Years prior',
    type: 'work',
    description: [
      'Gained deep domain knowledge in production processes, enabling effective communication and requirement gathering from end-users on the factory floor.'
    ],
  },
  {
    id: 'edu1',
    title: "Bachelor's Degree: Science and Technology",
    subtitle: 'The University of the Thai Chamber of Commerce (UTCC)',
    date: 'Graduated',
    type: 'education',
    description: [],
  },
]

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)

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
    <section id="experience" className={`section ${styles.experience}`} ref={sectionRef}>
      <div className="container">
        <div className={styles.header}>
          <p className="section-label fade-up">Journey</p>
          <h2 className="section-title fade-up fade-up-delay-1">
            Experience & <span className="gradient-text">Education</span>
          </h2>
        </div>

        <div className={styles.timeline}>
          <div className={styles.line} />
          {timeline.map((item, i) => (
            <div key={item.id} className={`${styles.item} fade-up`} style={{ transitionDelay: `${i * 150}ms` }}>
              <div className={styles.marker}>
                {item.type === 'work' ? <Briefcase size={18} /> : <GraduationCap size={18} />}
              </div>
              <div className={`glass-card ${styles.card}`}>
                <div className={styles.cardHeader}>
                  <div>
                    <h3 className={styles.title}>{item.title}</h3>
                    <p className={styles.subtitle}>{item.subtitle}</p>
                  </div>
                  <span className={styles.date}>{item.date}</span>
                </div>
                {item.description.length > 0 && (
                  <ul className={styles.description}>
                    {item.description.map((desc, idx) => (
                      <li key={idx}>{desc}</li>
                    ))}
                  </ul>
                )}
                {item.highlight && <div className={styles.highlight}>{item.highlight}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
