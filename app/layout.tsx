import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Anantachai Treemanee | Senior IT Specialist & System Analyst',
  description:
    'Portfolio of Anantachai Treemanee — Senior IT Specialist and System Analyst with 7+ years in Manufacturing IT and Digital Transformation. Reduced company costs by 3M+ THB annually.',
  keywords: [
    'IT Specialist',
    'System Analyst',
    'Digital Transformation',
    'Manufacturing IT',
    'Next.js',
    'MinebeaMitsumi',
  ],
  authors: [{ name: 'Anantachai Treemanee' }],
  openGraph: {
    title: 'Anantachai Treemanee | Senior IT Specialist & System Analyst',
    description:
      'Portfolio showcasing expertise in Manufacturing IT, Digital Transformation, and System Analysis.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  )
}
