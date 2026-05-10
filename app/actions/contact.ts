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
  const language = formData.get('language') === 'th' ? 'th' : 'en'
  const text = {
    en: {
      name: 'Please enter your name (at least 2 characters).',
      email: 'Please enter a valid email address.',
      message: 'Please enter a message (at least 10 characters).',
      failed: 'Something went wrong. Please try again or email me directly.',
      success: 'Message sent! I\'ll get back to you soon.',
    },
    th: {
      name: 'กรุณากรอกชื่ออย่างน้อย 2 ตัวอักษร',
      email: 'กรุณากรอก Email ให้ถูกต้อง',
      message: 'กรุณากรอก Message อย่างน้อย 10 ตัวอักษร',
      failed: 'ระบบส่งข้อความมีปัญหา กรุณาลองใหม่หรือส่ง Email โดยตรง',
      success: 'ส่งข้อความเรียบร้อยแล้วครับ ผมจะติดต่อกลับโดยเร็ว',
    },
  }[language]

  // Validation
  if (!name?.trim() || name.trim().length < 2) {
    return { error: text.name }
  }
  if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: text.email }
  }
  if (!message?.trim() || message.trim().length < 10) {
    return { error: text.message }
  }

  const { error } = await supabase
    .from('contact_messages')
    .insert([{ name: name.trim(), email: email.trim(), message: message.trim() }])

  if (error) {
    console.error('Supabase error:', error)
    return { error: text.failed }
  }

  revalidatePath('/')
  return { success: true, message: text.success }
}
