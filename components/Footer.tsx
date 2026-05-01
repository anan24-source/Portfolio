import styles from './Footer.module.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.brand}>
            <span className={styles.logoAccent}>AN</span>antachai
          </div>
          <p className={styles.copyright}>
            &copy; {currentYear} Anantachai Treemanee. All rights reserved.
          </p>
          <div className={styles.builtWith}>
            Built with Next.js & Supabase
          </div>
        </div>
      </div>
    </footer>
  )
}
