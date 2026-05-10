'use client'

import styles from './Footer.module.css'
import { useLanguage } from '@/lib/language'

export default function Footer() {
  const { language } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.brand}>
            <span className={styles.logoAccent}>AT</span> Portfolio
          </div>
          <p className={styles.copyright}>
            &copy; {currentYear} Anantachai Treemanee. All rights reserved.
          </p>
          <div className={styles.builtWith}>
            {language === 'th' ? 'Built with Next.js & Supabase' : 'Built with Next.js & Supabase'}
          </div>
        </div>
      </div>
    </footer>
  )
}
