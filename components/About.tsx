'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import {
  BookOpenCheck,
  BrainCircuit,
  Code2,
  GraduationCap,
  Languages,
  Laptop,
  Rocket,
  type LucideIcon,
} from 'lucide-react'
import styles from './About.module.css'
import { useLanguage } from '@/lib/language'

type IconText = {
  icon: LucideIcon
  title: string
  text: string
}

type EducationItem = {
  degree: string
  major: string
  school: string
  focus: string
  logo: string
  logoAlt: string
  note?: string
}

type AboutCopy = {
  label: string
  titleLine: string
  titleAccent: string
  personalTitle: string
  personalIntro: string
  personalItems: IconText[]
  educationTitle: string
  educationSummary: string
  educationItems: EducationItem[]
}

const copy: Record<'en' | 'th', AboutCopy> = {
  en: {
    label: 'About Me',
    titleLine: 'Personal Background &',
    titleAccent: 'Education',
    personalTitle: 'Personal Background',
    personalIntro:
      'I am a family-focused person with one young child. My main goal is to prepare early and build a stronger future for my child, so continuous self-development has become part of my daily routine.',
    personalItems: [
      {
        icon: BrainCircuit,
        title: 'Growth Mindset',
        text: 'I keep improving myself across IT, production systems, communication, asset management, and modern AI-assisted development workflows.',
      },
      {
        icon: BookOpenCheck,
        title: 'Self-Learning Routine',
        text: 'After graduating, I bought online programming courses and used weekends to improve my software development skills.',
      },
      {
        icon: Languages,
        title: 'English Learning',
        text: 'I continue learning English on weekends and Wednesday evenings to improve communication for IT and business work.',
      },
      {
        icon: Rocket,
        title: 'VibeCode Thailand',
        text: 'I help manage the VibeCode Thailand community, sharing practical ways to use AI for real coding work.',
      },
    ],
    educationTitle: 'Education',
    educationSummary: 'Graduated with both a bachelor degree and high vocational certificate.',
    educationItems: [
      {
        degree: "Bachelor's Degree: Science and Technology",
        major: 'Digital Technology',
        school: 'The University of the Thai Chamber of Commerce (UTCC)',
        focus: 'Studied Full-stack Development and Machine Learning.',
        logo: '/education/utcc-logo.svg',
        logoAlt: 'UTCC logo',
        note: 'Studied on Saturdays and Sundays while continuing full-time work at iGenco.',
      },
      {
        degree: 'High Vocational Certificate: Business Administration and Information Technology',
        major: 'Information Systems and Business Computer',
        school: 'RUS | Rajamangala University of Technology Suvarnabhumi',
        focus: 'Studied programming fundamentals, database fundamentals, and hardware systems.',
        logo: '/education/rmutsb-logo.gif',
        logoAlt: 'Rajamangala University of Technology Suvarnabhumi logo',
      },
    ],
  },
  th: {
    label: 'เกี่ยวกับ',
    titleLine: 'ประวัติส่วนตัวและ',
    titleAccent: 'การศึกษา',
    personalTitle: 'ประวัติส่วนตัว',
    personalIntro:
      'ผมเป็นคนให้ความสำคัญกับครอบครัว พึ่งมีลูกเล็ก 1 คน เป้าหมายหลักคือการเตรียมความพร้อมล่วงหน้าให้กับลูก จึงทำให้การพัฒนาตัวเองเป็นกิจวัตรที่ทำต่อเนื่องอยู่เสมอ',
    personalItems: [
      {
        icon: BrainCircuit,
        title: 'Growth Mindset',
        text: 'พัฒนาตัวเองต่อเนื่องทั้งด้าน IT, ระบบโรงงาน, การสื่อสาร, การบริหารสินทรัพย์ และการใช้ AI ช่วยงานพัฒนาโปรแกรม',
      },
      {
        icon: BookOpenCheck,
        title: 'Self-Learning Routine',
        text: 'ซื้อคอร์สเรียนเขียนโปรแกรมออนไลน์ และใช้วันเสาร์-อาทิตย์ในการฝึกทักษะ programming เพิ่มเติมอยู่เสมอ',
      },
      {
        icon: Languages,
        title: 'English Learning',
        text: 'เรียนภาษาอังกฤษเพิ่มทุกเสาร์-อาทิตย์ และเย็นวันพุธหลังเลิกงาน เพื่อใช้สื่อสารในงาน IT และงานธุรกิจได้ดีขึ้น',
      },
      {
        icon: Rocket,
        title: 'VibeCode Thailand',
        text: 'เป็นผู้ดูแลกลุ่ม Facebook VibeCode Thailand ที่แชร์แนวทางการใช้ AI ช่วยงาน coding แบบใช้งานจริง',
      },
    ],
    educationTitle: 'การศึกษา',
    educationSummary: 'จบการศึกษาระดับปริญญาตรี และ ปวส.',
    educationItems: [
      {
        degree: 'ปริญญาตรี: Science and Technology',
        major: 'สาขา เทคโนโลยีดิจิทัล',
        school: 'มหาวิทยาลัยหอการค้าไทย (UTCC)',
        focus: 'เรียน Full-stack Dev. และ Machine Learning',
        logo: '/education/utcc-logo.svg',
        logoAlt: 'โลโก้มหาวิทยาลัยหอการค้าไทย',
        note: 'เรียนภาคเสาร์-อาทิตย์ ควบคู่กับการทำงานประจำที่บริษัท IGENCO',
      },
      {
        degree: 'ปวส: คณะบริหารธุรกิจและเทคโนโลยีสารสนเทศ',
        major: 'สาขา ระบบสารสนเทศและคอมพิวเตอร์ธุรกิจ',
        school: 'RUS มหาวิทยาลัยเทคโนโลยีราชมงคลสุวรรณภูมิ',
        focus: 'เรียนการเขียนโปรแกรมและดาต้าเบส ขั้นพื้นฐาน และระบบฮาร์ดแวร์',
        logo: '/education/rmutsb-logo.gif',
        logoAlt: 'โลโก้มหาวิทยาลัยเทคโนโลยีราชมงคลสุวรรณภูมิ',
      },
    ],
  },
}

export default function About() {
  const { language } = useLanguage()
  const t = copy[language]
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
          <div className={styles.textCol}>
            <p className="section-label fade-up">{t.label}</p>
            <h2 className="section-title fade-up fade-up-delay-1">
              {t.titleLine}<br />
              <span className="gradient-text">{t.titleAccent}</span>
            </h2>

            <div className={`${styles.personalSection} fade-up fade-up-delay-2`}>
              <div className={styles.sectionHeading}>
                <BrainCircuit size={20} />
                <h3>{t.personalTitle}</h3>
              </div>
              <p>{t.personalIntro}</p>
              <div className={styles.personalList}>
                {t.personalItems.map(item => {
                  const Icon = item.icon

                  return (
                    <div className={styles.personalItem} key={item.title}>
                      <div className={styles.inlineIcon}><Icon size={18} /></div>
                      <div>
                        <strong>{item.title}</strong>
                        <span>{item.text}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className={`${styles.imageCol} fade-up fade-up-delay-2`}>
            <div className={styles.imageWrapper}>
              <Image
                src="/img/Generated image profile3.png"
                alt="Anantachai Treemanee"
                width={380}
                height={420}
                className={styles.profileImage}
                priority
              />
              <div className={styles.imageGlow} />
              <div className={styles.floatingBadge}>
                <span className={styles.floatingIcon} aria-hidden="true">
                  <Laptop size={24} />
                  <Code2 size={15} className={styles.floatingIconBadge} />
                </span>
                <div>
                  <div className={styles.floatingTitle}>IT Head Dept.</div>
                  <div className={styles.floatingSubtitle}>Production Div.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.educationSection} fade-up fade-up-delay-3`}>
          <div className={styles.sectionHeading}>
            <GraduationCap size={20} />
            <h3>{t.educationTitle}</h3>
          </div>
          <p className={styles.educationIntro}>{t.educationSummary}</p>
          <div className={styles.educationList}>
            {t.educationItems.map(item => (
              <article className={styles.educationItem} key={`${item.degree}-${item.school}`}>
                <div className={styles.educationLogoWrap}>
                  <Image
                    src={item.logo}
                    alt={item.logoAlt}
                    width={92}
                    height={92}
                    className={styles.educationLogo}
                  />
                </div>
                <div className={styles.educationText}>
                  <h4>{item.degree}</h4>
                  <p>{item.major}</p>
                  <p className={styles.educationSchool}>{item.school}</p>
                  <span>{item.focus}</span>
                  {item.note ? <span>{item.note}</span> : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
