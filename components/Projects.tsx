'use client'

import { useEffect, useRef } from 'react'
import { ExternalLink, Folder } from 'lucide-react'
import { FaGithub } from 'react-icons/fa6'
import styles from './Projects.module.css'
import { Project } from '@/lib/supabase'
import MMSShowcase from './MMSShowcase'

interface ProjectsProps {
  initialProjects: Project[]
}

const fallbackProjects: Project[] = [
  {
    id: '1',
    title: 'Digital Transformation (DX) App',
    description: 'Custom-built input applications to reduce manual recording and paper usage on the production floor. Replaced legacy systems with modern web architecture.',
    tech_stack: ['Next.js', 'Node.js', 'PostgreSQL'],
    image_url: null,
    github_url: null,
    live_url: null,
    featured: true,
    sort_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'AS400 API Integration',
    description: 'Developed API integration for legacy AS400 systems to streamline data input processes, improving overall workflow efficiency by 40%.',
    tech_stack: ['AS400', 'Java', 'REST API'],
    image_url: null,
    github_url: null,
    live_url: null,
    featured: false,
    sort_order: 3,
    created_at: new Date().toISOString(),
  },
]

export default function Projects({ initialProjects }: ProjectsProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const projects = initialProjects.length > 0 ? initialProjects : fallbackProjects

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
          <p className="section-label fade-up">Portfolio</p>
          <h2 className="section-title fade-up fade-up-delay-1">
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </div>

        <div className="fade-up fade-up-delay-2">
          <MMSShowcase />
        </div>

        <div className={styles.otherHeader}>
          <h3 className={`${styles.otherTitle} fade-up`}>Other Projects</h3>
        </div>

        <div className={styles.grid}>
          {projects.map((project, i) => (
            <div key={project.id} className={`glass-card ${styles.card} fade-up`} style={{ transitionDelay: `${i * 150}ms` }}>
              <div className={styles.cardContent}>
                <div className={styles.top}>
                  <div className={styles.folderIcon}><Folder size={34} /></div>
                  <div className={styles.links}>
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer" className={styles.link} aria-label="GitHub">
                        <FaGithub size={20} />
                      </a>
                    )}
                    {project.live_url && (
                      <a href={project.live_url} target="_blank" rel="noopener noreferrer" className={styles.link} aria-label="Live Site">
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>
                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.description}>{project.description}</p>
              </div>
              <div className={styles.techStack}>
                {project.tech_stack.map(tech => (
                  <span key={tech} className={styles.tech}>{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
