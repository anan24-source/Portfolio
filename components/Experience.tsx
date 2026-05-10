'use client'

import { useEffect, useRef } from 'react'
import { Building2, Factory, Handshake } from 'lucide-react'
import styles from './Experience.module.css'
import { useLanguage } from '@/lib/language'

const copy = {
  en: {
    label: 'Journey',
    title: 'Professional',
    accent: 'Experience',
    timeline: [
      {
        id: 'igenco',
        title: 'Web Developer',
        subtitle: 'iGenco | Software House',
        date: '2+ years',
        icon: Building2,
        description: [
          'Worked in a product development team building registration systems for public events, including large-scale event registration such as the National Book Fair.',
          'Gained early experience in web development, production support, and delivering systems used by real users under event deadlines.',
        ],
      },
      {
        id: 'outsource',
        title: 'Outsource Developer',
        subtitle: 'Freelance job-based development',
        date: '1+ year',
        icon: Handshake,
        description: [
          'Accepted freelance development jobs from the market as a developer on a project-by-project basis.',
          'Built practical experience in requirement clarification, implementation, and delivery across different client needs.',
        ],
      },
      {
        id: 'current',
        title: 'IT Department Head (Hard Disk Component Unit)',
        subtitle: 'Production Div. | Minebea Navanakorn',
        date: '4+ years / Current',
        icon: Factory,
        description: [
          'Lead Manufacturing IT and Digital Transformation projects across production systems, local infrastructure, and factory data workflows.',
          'Use shop-floor production experience to understand production flow, operator pain points, machine data, and the real requirements behind factory improvement projects.',
          'Coordinate daily work with a local IT team, review production code before deployment, and support stable operation of factory systems.',
          'Work with Japanese stakeholders and Japan-side IT members through English email and weekly project update meetings.',
        ],
        highlight: 'Result: Reduced company expenses by 3,000,000 THB annually via DX and IT optimization.',
      },
    ],
  },
  th: {
    label: 'ประสบการณ์',
    title: 'ประสบการณ์',
    accent: 'ทำงาน',
    timeline: [
      {
        id: 'igenco',
        title: 'Web Developer',
        subtitle: 'iGenco | Software House',
        date: '2+ ปี',
        icon: Building2,
        description: [
          'อยู่ในทีมพัฒนาระบบ product สำหรับงานลงทะเบียนอีเวนต์ต่าง ๆ เช่น งานสัปดาห์หนังสือแห่งชาติ',
          'ได้ประสบการณ์ด้าน web development, production support และการส่งมอบระบบที่มีผู้ใช้งานจริงภายใต้เวลางานอีเวนต์',
        ],
      },
      {
        id: 'outsource',
        title: 'Outsource Developer',
        subtitle: 'รับงานเขียนโค้ดแบบ freelance / job-based',
        date: '1+ ปี',
        icon: Handshake,
        description: [
          'รับงานเป็น Dev. เป็นจ็อบ ๆ ตามตลาดฟรีแลนซ์ ตาม requirement ของแต่ละลูกค้า',
          'ได้ฝึกการคุยโจทย์งานจริง แปลงความต้องการเป็นระบบ และส่งมอบงานให้จบตามขอบเขตของแต่ละโปรเจกต์',
        ],
      },
      {
        id: 'current',
        title: 'IT Department Head (Hard Disk Component Unit)',
        subtitle: 'Production Div. | Minebea Navanakorn',
        date: '4+ ปี / ปัจจุบัน',
        icon: Factory,
        description: [
          'Lead งาน Manufacturing IT และ Digital Transformation ครอบคลุม production systems, local infrastructure และ factory data workflows',
          'ใช้ประสบการณ์หน้างาน production จริงเพื่อเข้าใจ flow การผลิต, ปัญหาของผู้ใช้งานหน้างาน, ข้อมูลเครื่องจักร และ requirement จริงของโปรเจกต์ในโรงงาน',
          'ดูแลทีม IT ภายใน รีวิวโค้ดก่อนขึ้น production และ support ระบบโรงงานให้ทำงานได้เสถียร',
          'ประสานงานกับ stakeholder ญี่ปุ่นและ IT ฝั่งญี่ปุ่นผ่าน email ภาษาอังกฤษ และประชุมอัปเดต project ทุกวันจันทร์',
        ],
        highlight: 'ผลลัพธ์: ลดค่าใช้จ่ายบริษัทได้ 3,000,000 THB ต่อปี ผ่าน DX และ IT Optimization',
      },
    ],
  },
}

export default function Experience() {
  const { language } = useLanguage()
  const t = copy[language]
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
          <p className="section-label fade-up">{t.label}</p>
          <h2 className="section-title fade-up fade-up-delay-1">
            {t.title} <span className="gradient-text">{t.accent}</span>
          </h2>
        </div>

        <div className={styles.timeline}>
          <div className={styles.line} />
          {t.timeline.map((item, i) => {
            const Icon = item.icon

            return (
              <div key={item.id} className={`${styles.item} fade-up`} style={{ transitionDelay: `${i * 150}ms` }}>
                <div className={styles.marker}>
                  <Icon size={18} />
                </div>
                <div className={`glass-card ${styles.card}`}>
                  <div className={styles.cardHeader}>
                    <div>
                      <h3 className={styles.title}>{item.title}</h3>
                      <p className={styles.subtitle}>{item.subtitle}</p>
                    </div>
                    <span className={styles.date}>{item.date}</span>
                  </div>
                  <ul className={styles.description}>
                    {item.description.map((desc, idx) => (
                      <li key={idx}>{desc}</li>
                    ))}
                  </ul>
                  {item.highlight && <div className={styles.highlight}>{item.highlight}</div>}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
