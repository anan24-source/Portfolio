import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Project = {
  id: string
  title: string
  description: string
  tech_stack: string[]
  image_url: string | null
  github_url: string | null
  live_url: string | null
  featured: boolean
  sort_order: number
  created_at: string
}

export type ContactMessage = {
  id?: string
  name: string
  email: string
  message: string
  created_at?: string
}
