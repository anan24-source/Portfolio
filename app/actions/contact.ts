'use server'

import { supabase } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export type ContactFormState = {
  success?: boolean
  error?: string
  message?: string
}

export async function submitContact(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name    = formData.get('name') as string
  const email   = formData.get('email') as string
  const message = formData.get('message') as string

  // Validation
  if (!name?.trim() || name.trim().length < 2) {
    return { error: 'Please enter your name (at least 2 characters).' }
  }
  if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: 'Please enter a valid email address.' }
  }
  if (!message?.trim() || message.trim().length < 10) {
    return { error: 'Please enter a message (at least 10 characters).' }
  }

  const { error } = await supabase
    .from('contact_messages')
    .insert([{ name: name.trim(), email: email.trim(), message: message.trim() }])

  if (error) {
    console.error('Supabase error:', error)
    return { error: 'Something went wrong. Please try again or email me directly.' }
  }

  revalidatePath('/')
  return { success: true, message: 'Message sent! I\'ll get back to you soon.' }
}
