'use client'

import { useEffect, useRef } from 'react'
import {
  Cable,
  ClipboardList,
  FileCode2,
  Folder,
  GitMerge,
  Globe2,
  Keyboard,
  type LucideIcon,
} from 'lucide-react'
import styles from './Projects.module.css'
import { Project } from '@/lib/supabase'
import MMSShowcase from './MMSShowcase'
import { useLanguage } from '@/lib/language'

interface ProjectsProps {
  initialProjects: Project[]
}

type CaseStudy = {
  id: string
  title: string
  description: string
  tech: string[]
  icon: LucideIcon
}

const copy: Record<'en' | 'th', {
  label: string
  title: string
  accent: string
  intro: string
  leadership: CaseStudy
  mmsTitle: string
  mmsIntro: string
  otherTitle: string
  cases: CaseStudy[]
}> = {
  en: {
    label: 'Portfolio',
    title: 'Project & Leadership',
    accent: 'Case Studies',
    intro: 'A presentation flow that shows leadership, factory systems, machine connectivity, traceability, engineering governance, and paperless operations.',
    leadership: {
      id: 'team-collaboration',
      title: 'Team & Cross-Country Collaboration',
      description:
        'Coordinate a 6-person local IT team and 2 Japan-based programmers. Most communication is handled through English email, with weekly Monday project updates with Japanese managers and Japan-side IT support in Karuizawa.',
      tech: ['Team Leadership', 'English Communication', 'Japan Collaboration', 'Weekly Project Updates'],
      icon: Globe2,
    },
    mmsTitle: 'Machine Monitoring System (MMS)',
    mmsIntro: 'Flagship Manufacturing IT case study with measurable impact, factory LAN topology, monitoring, and remote deployment.',
    otherTitle: 'Additional Case Studies',
    cases: [
      {
        id: 'remote-machine-control',
        title: 'Remote Machine Control via LAN',
        description:
          'Remote-control machine-related operations through the factory LAN to reduce manual travel, speed up support, and improve response time for production issues.',
        tech: ['Factory LAN', 'Remote Control', 'Machine Support'],
        icon: Cable,
      },
      {
        id: 'c-code-backup',
        title: 'C Code Backup & Comparison System',
        description:
          'Pull C-language machine code from production machines, store backups, and compare code versions to support traceability, maintenance, and change review.',
        tech: ['C Code', 'Backup', 'Comparison', 'Traceability'],
        icon: FileCode2,
      },
      {
        id: 'gitlab-review',
        title: 'Local GitLab Production Review Workflow',
        description:
          'Control and review junior developers’ code before deploying to the real production server through a local GitLab workflow.',
        tech: ['GitLab Local', 'Code Review', 'Production Control'],
        icon: GitMerge,
      },
      {
        id: 'paperless-input-apps',
        title: 'Paperless Input Apps & Request Tools',
        description:
          'Build many small request-driven input applications that replace paper forms and manual recording with database-backed workflows for production users.',
        tech: ['Input Apps', 'Paperless', 'Database', 'Workflow'],
        icon: Keyboard,
      },
    ],
  },
  th: {
    label: 'โปรเจกต์',
    title: 'Project & Leadership',
    accent: 'Case Studies',
    intro: 'ลำดับการนำเสนอที่เล่าทั้งการคุมทีม ระบบโรงงาน การเชื่อมเครื่องจักร การเก็บหลักฐานโค้ด การรีวิวก่อนขึ้น production และงาน paperless',
    leadership: {
      id: 'team-collaboration',
      title: 'Team & Cross-Country Collaboration',
      description:
        'นำเสนอโครงสร้างทีม IT 6 คน และการทำงานร่วมกับ programmer ญี่ปุ่น 2 คนที่ประจำอยู่ญี่ปุ่น โดยสื่อสารหลักผ่าน email ภาษาอังกฤษ และอัปเดตความคืบหน้า project ทุกวันจันทร์กับ manager ญี่ปุ่นและ IT support ฝั่ง Karuizawa',
      tech: ['Team Leadership', 'English Email', 'Japan Collaboration', 'Weekly Project Update'],
      icon: Globe2,
    },
    mmsTitle: 'Machine Monitoring System (MMS)',
    mmsIntro: 'โปรเจกต์หลักของ Manufacturing IT ที่มีตัวเลขผลลัพธ์ชัดเจน ทั้ง LAN topology, monitoring และ remote deployment',
    otherTitle: 'Case Studies เพิ่มเติม',
    cases: [
      {
        id: 'remote-machine-control',
        title: 'Remote Machine Control via LAN',
        description:
          'โปรเจกต์ remote control machine ผ่านสาย LAN เพื่อลดการเดินเข้า production, support ได้เร็วขึ้น และตอบสนองปัญหาหน้างานได้ดีขึ้น',
        tech: ['Factory LAN', 'Remote Control', 'Machine Support'],
        icon: Cable,
      },
      {
        id: 'c-code-backup',
        title: 'C Code Backup & Comparison System',
        description:
          'ดึงข้อมูลโค้ดภาษา C จากเครื่องจักรมาเก็บไว้ และสามารถเปรียบเทียบ version ของโค้ด เพื่อช่วยเรื่อง traceability, maintenance และการตรวจสอบการเปลี่ยนแปลง',
        tech: ['C Code', 'Backup', 'Comparison', 'Traceability'],
        icon: FileCode2,
      },
      {
        id: 'gitlab-review',
        title: 'Local GitLab Production Review Workflow',
        description:
          'คอนโทรลและช่วยรีวิวโค้ดของน้อง ๆ ในทีมก่อนนำขึ้น server production จริง ผ่าน GitLab Local',
        tech: ['GitLab Local', 'Code Review', 'Production Control'],
        icon: GitMerge,
      },
      {
        id: 'paperless-input-apps',
        title: 'Paperless Input Apps & Request Tools',
        description:
          'รับโจทย์ย่อยจำนวนมากมาทำเป็นระบบ input ลงฐานข้อมูล แทนการใช้กระดาษจดบันทึกหรือส่ง request แบบ manual',
        tech: ['Input Apps', 'Paperless', 'Database', 'Workflow'],
        icon: Keyboard,
      },
    ],
  },
}

function CaseCard({ item, index }: { item: CaseStudy; index: number }) {
  const Icon = item.icon

  return (
    <div className={`glass-card ${styles.card} fade-up`} style={{ transitionDelay: `${index * 120}ms` }}>
      <div className={styles.cardContent}>
        <div className={styles.top}>
          <div className={styles.folderIcon}><Icon size={34} /></div>
          <span className={styles.caseNumber}>{String(index + 1).padStart(2, '0')}</span>
        </div>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.description}>{item.description}</p>
      </div>
      <div className={styles.techStack}>
        {item.tech.map(tech => (
          <span key={tech} className={styles.tech}>{tech}</span>
        ))}
      </div>
    </div>
  )
}

export default function Projects({ initialProjects }: ProjectsProps) {
  const { language } = useLanguage()
  const t = copy[language]
  const sectionRef = useRef<HTMLElement>(null)
  const importedProjectCount = initialProjects.length

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.querySelectorAll('.fade-up').forEach(el => el.classList.add('visible'))
          }
        })
      },
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className={`section section-alt ${styles.projects}`} ref={sectionRef}>
      <div className="container">
        <div className={styles.header}>
          <p className="section-label fade-up">{t.label}</p>
          <h2 className="section-title fade-up fade-up-delay-1">
            {t.title} <span className="gradient-text">{t.accent}</span>
          </h2>
          <p className={`${styles.intro} fade-up fade-up-delay-2`}>{t.intro}</p>
        </div>

        <div className={styles.leadCase}>
          <CaseCard item={t.leadership} index={0} />
        </div>

        <div className={styles.mmsBlock}>
          <div className={styles.mmsIntro}>
            <div className={styles.mmsIcon}><ClipboardList size={24} /></div>
            <div>
              <h3>{t.mmsTitle}</h3>
              <p>{t.mmsIntro}</p>
            </div>
          </div>
          <MMSShowcase />
        </div>

        <div className={styles.otherHeader}>
          <h3 className={`${styles.otherTitle} fade-up`}>
            <Folder size={20} />
            {t.otherTitle}
          </h3>
        </div>

        <div className={styles.grid} data-imported-project-count={importedProjectCount}>
          {t.cases.map((item, i) => (
            <CaseCard key={item.id} item={item} index={i + 2} />
          ))}
        </div>
      </div>
    </section>
  )
}
