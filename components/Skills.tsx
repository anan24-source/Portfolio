'use client'

import { useEffect, useRef } from 'react'
import {
  Cable,
  Code2,
  Database,
  Factory,
  GitBranch,
  LayoutTemplate,
  Network,
  Sparkles,
  Server,
  TerminalSquare,
  UserCheck,
  UsersRound,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import type { IconType } from 'react-icons'
import { FaJava } from 'react-icons/fa'
import {
  SiAlmalinux,
  SiBootstrap,
  SiDjango,
  SiDotnet,
  SiFlask,
  SiGit,
  SiGithub,
  SiGitlab,
  SiLinux,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiProxmox,
  SiPython,
  SiReact,
  SiSharp,
  SiTailwindcss,
  SiVercel,
} from 'react-icons/si'
import styles from './Skills.module.css'
import { useLanguage } from '@/lib/language'

type SkillLogo = LucideIcon | IconType

type SkillItem = {
  name: string
  icon?: SkillLogo
}

type SkillGroup = {
  title: string
  icon: LucideIcon
  skills: SkillItem[]
}

type SkillTrack = {
  title: string
  subtitle: string
  icon: LucideIcon
  groups: SkillGroup[]
}

const softwareGroups: SkillGroup[] = [
  {
    title: 'Frontend',
    icon: LayoutTemplate,
    skills: [
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'React', icon: SiReact },
      { name: 'Bootstrap', icon: SiBootstrap },
      { name: 'Tailwind', icon: SiTailwindcss },
      { name: 'Responsive UI', icon: LayoutTemplate },
    ],
  },
  {
    title: 'Backend',
    icon: TerminalSquare,
    skills: [
      { name: 'Node.js', icon: SiNodedotjs },
      { name: 'Java', icon: FaJava },
      { name: 'Python', icon: SiPython },
      { name: 'C#', icon: SiSharp },
      { name: 'VB', icon: SiDotnet },
      { name: 'Django', icon: SiDjango },
      { name: 'Flask', icon: SiFlask },
      { name: 'REST API', icon: TerminalSquare },
    ],
  },
  {
    title: 'Database',
    icon: Database,
    skills: [
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'SQL Server', icon: Database },
      { name: 'AS400 / IBM i', icon: Server },
      { name: 'SQL Query Design', icon: Database },
    ],
  },
  {
    title: 'CI/CD & Tools',
    icon: GitBranch,
    skills: [
      { name: 'Git', icon: SiGit },
      { name: 'GitLab', icon: SiGitlab },
      { name: 'GitHub', icon: SiGithub },
      { name: 'Vercel', icon: SiVercel },
      { name: 'Command Automation', icon: TerminalSquare },
    ],
  },
]

const infrastructureGroups: SkillGroup[] = [
  {
    title: 'Network',
    icon: Cable,
    skills: [
      { name: 'Factory LAN', icon: Cable },
      { name: 'IP Address Planning', icon: Network },
      { name: 'Switch / Router', icon: Network },
      { name: 'Port & Firewall Rules', icon: Wrench },
    ],
  },
  {
    title: 'Factory Hardware',
    icon: Factory,
    skills: [
      { name: 'CNC Machine', icon: Factory },
      { name: 'PLC / Automation', icon: Server },
      { name: 'FOCAS library / FANUC', icon: Factory },
    ],
  },
  {
    title: 'Operations',
    icon: Wrench,
    skills: [
      { name: 'Remote Support', icon: Wrench },
      { name: 'SSH / SCP', icon: TerminalSquare },
      { name: 'Health Monitor', icon: Server },
      { name: 'Troubleshooting', icon: Wrench },
    ],
  },
  {
    title: 'Virtualization & Linux',
    icon: Server,
    skills: [
      { name: 'Proxmox', icon: SiProxmox },
      { name: 'Linux', icon: SiLinux },
      { name: 'Almalinux Server', icon: SiAlmalinux },
      { name: 'PostgreSQL Server', icon: SiPostgresql },
      { name: 'Service Monitoring', icon: Server },
    ],
  },
]

const copy: Record<'en' | 'th', {
  label: string
  title: string
  accent: string
  subtitle: string
  aiTitle: string
  aiSubtitle: string
  aiTeamLabel: string
  aiSoloLabel: string
  aiResultLabel: string
  aiTeamItems: SkillItem[]
  aiSoloItems: SkillItem[]
  tracks: SkillTrack[]
}> = {
  en: {
    label: 'Technical Expertise',
    title: 'Core Technical',
    accent: 'Skills',
    subtitle: 'A practical skill set across software systems and local factory infrastructure.',
    aiTitle: 'AI VibeCoding Capacity',
    aiSubtitle:
      'A normal 4-person IT delivery team can be matched or exceeded by one experienced engineer who handles the PM and senior developer roles while using AI to multiply junior-level implementation capacity.',
    aiTeamLabel: 'Normal IT Team',
    aiSoloLabel: 'My Delivery Model',
    aiResultLabel: '1 person + AI = 4-person IT team capacity',
    aiTeamItems: [
      { name: '1 PM', icon: UserCheck },
      { name: '1 Senior dev', icon: Code2 },
      { name: '2 Junior devs', icon: UsersRound },
    ],
    aiSoloItems: [
      { name: 'PM role by me', icon: UserCheck },
      { name: 'Senior dev role by me', icon: Code2 },
      { name: 'AI as 2 junior devs', icon: Sparkles },
    ],
    tracks: [
      {
        title: 'Software Systems Engineer',
        subtitle: 'Build applications, automate workflows, and connect factory data with business systems.',
        icon: Code2,
        groups: softwareGroups,
      },
      {
        title: 'Local Infrastructure Engineer',
        subtitle: 'Maintain the local network, Linux servers, and factory hardware layer that production systems depend on.',
        icon: Network,
        groups: infrastructureGroups,
      },
    ],
  },
  th: {
    label: 'Technical Expertise',
    title: 'Core Technical',
    accent: 'Skills',
    subtitle: 'ทักษะหลักสองด้าน: พัฒนาระบบซอฟต์แวร์ และดูแลโครงสร้างพื้นฐานโรงงาน',
    aiTitle: 'AI VibeCoding Capacity',
    aiSubtitle:
      'ทีม IT ปกติ 4 คน คือ PM 1 คน, Senior dev 1 คน และ Junior dev 2 คน แต่ด้วยประสบการณ์ของผม ผมสามารถทำหน้าที่ PM และ Senior dev ได้เอง พร้อมใช้ AI ช่วยเขียนโค้ดแทนกำลังของ Junior dev อีก 2 คน เพื่อให้ได้เนื้องานเท่ากันหรือมากกว่า',
    aiTeamLabel: 'ทีม IT ปกติ',
    aiSoloLabel: 'รูปแบบการทำงานของผม',
    aiResultLabel: 'ผม 1 คน + AI = ทีม IT 4 คน',
    aiTeamItems: [
      { name: 'PM 1 คน', icon: UserCheck },
      { name: 'Senior dev 1 คน', icon: Code2 },
      { name: 'Junior dev 2 คน', icon: UsersRound },
    ],
    aiSoloItems: [
      { name: 'ผมทำบทบาท PM', icon: UserCheck },
      { name: 'ผมทำบทบาท Senior dev', icon: Code2 },
      { name: 'AI แทนกำลัง Junior 2 คน', icon: Sparkles },
    ],
    tracks: [
      {
        title: 'Software Systems Engineer',
        subtitle: 'พัฒนาแอปพลิเคชัน ทำงานซ้ำให้เป็นอัตโนมัติ และเชื่อมข้อมูลโรงงานเข้ากับระบบธุรกิจ',
        icon: Code2,
        groups: softwareGroups,
      },
      {
        title: 'Local Infrastructure Engineer',
        subtitle: 'ดูแลเครือข่ายภายใน Linux server และอุปกรณ์หน้างานที่ระบบฝ่ายผลิตต้องพึ่งพา',
        icon: Network,
        groups: infrastructureGroups,
      },
    ],
  },
}

export default function Skills() {
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
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" className={`section section-alt ${styles.skills}`} ref={sectionRef}>
      <div className="container">
        <div className={styles.header}>
          <p className="section-label fade-up">{t.label}</p>
          <h2 className="section-title fade-up fade-up-delay-1">
            {t.title} <span className="gradient-text">{t.accent}</span>
          </h2>
          <p className={`${styles.subtitle} fade-up fade-up-delay-2`}>
            {t.subtitle}
          </p>
        </div>

        <div className={`glass-card ${styles.aiPanel} fade-up fade-up-delay-3`}>
          <div className={styles.aiHeading}>
            <div className={styles.aiIcon}><Sparkles size={22} /></div>
            <div>
              <h3>{t.aiTitle}</h3>
              <p>{t.aiSubtitle}</p>
            </div>
          </div>
          <div className={styles.aiTags}>
            <div className={styles.aiCompareCard}>
              <strong>{t.aiTeamLabel}</strong>
              {t.aiTeamItems.map(item => {
                const ItemIcon = item.icon

                return (
                  <span key={item.name}>
                    {ItemIcon ? <ItemIcon size={15} /> : null}
                    {item.name}
                  </span>
                )
              })}
            </div>
            <div className={styles.aiEquals} aria-hidden="true">=</div>
            <div className={styles.aiCompareCard}>
              <strong>{t.aiSoloLabel}</strong>
              {t.aiSoloItems.map(item => {
                const ItemIcon = item.icon

                return (
                  <span key={item.name}>
                    {ItemIcon ? <ItemIcon size={15} /> : null}
                    {item.name}
                  </span>
                )
              })}
            </div>
            <div className={styles.aiResult}>
              <Sparkles size={16} />
              {t.aiResultLabel}
            </div>
          </div>
        </div>

        <div className={styles.trackGrid}>
          {t.tracks.map((track, index) => {
            const TrackIcon = track.icon

            return (
              <article key={track.title} className={`glass-card ${styles.trackCard} fade-up`} style={{ transitionDelay: `${index * 160}ms` }}>
                <header className={styles.trackHeader}>
                  <div className={styles.trackIcon}><TrackIcon size={24} /></div>
                  <div>
                    <h3>{track.title}</h3>
                    <p>{track.subtitle}</p>
                  </div>
                </header>

                <div className={styles.groupGrid}>
                  {track.groups.map(group => {
                    const GroupIcon = group.icon

                    return (
                      <section className={styles.skillGroup} key={group.title}>
                        <div className={styles.layerIcon}>
                          <GroupIcon size={18} />
                        </div>
                        <div className={styles.layerContent}>
                          <div className={styles.groupTitle}>
                            <GroupIcon size={17} />
                            <h4>{group.title}</h4>
                          </div>
                          <div className={styles.skillTags}>
                            {group.skills.map(skill => {
                              const SkillIcon = skill.icon

                              return (
                                <span key={skill.name}>
                                  {SkillIcon ? <SkillIcon className={styles.skillLogo} size={14} /> : null}
                                  {skill.name}
                                </span>
                              )
                            })}
                          </div>
                        </div>
                      </section>
                    )
                  })}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
