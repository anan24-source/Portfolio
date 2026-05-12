import Link from 'next/link'
import type { Metadata } from 'next'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'MMS Mockup | AT Portfolio',
  description: 'Interactive MMS mockup prepared as part of the AT Portfolio site.',
}

export default function MMSMockupPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.backLink}>
          AT Portfolio
        </Link>
        <div>
          <p className={styles.kicker}>MMS Demo Mockup</p>
          <h1>Machine Monitoring System</h1>
        </div>
        <a
          href="/mockup-mms/index.html"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.openLink}
        >
          Open Full Page
        </a>
      </header>

      <section className={styles.frameWrap} aria-label="MMS mockup preview">
        <iframe
          className={styles.frame}
          title="MMS interactive mockup"
          src="/mockup-mms/index.html"
        />
      </section>
    </main>
  )
}
