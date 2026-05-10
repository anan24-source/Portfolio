import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import { supabase } from '@/lib/supabase'
import { LanguageProvider } from '@/lib/language'

export const revalidate = 3600 // revalidate every hour

export default async function Home() {
  // Fetch projects from Supabase
  let projects = []
  
  // If NEXT_PUBLIC_SUPABASE_URL is properly set and not dummy URL, try fetching
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('your-project')) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('sort_order', { ascending: true })
      
      if (!error && data) {
        projects = data
      } else {
        console.error('Failed to fetch projects:', error)
      }
    } catch (err) {
      console.error('Error fetching projects:', err)
    }
  }

  return (
    <LanguageProvider>
      <main>
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects initialProjects={projects} />
        <Contact />
        <Footer />
      </main>
    </LanguageProvider>
  )
}
