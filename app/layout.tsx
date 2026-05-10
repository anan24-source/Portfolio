import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Anantachai Treemanee | Software Systems Engineer & Local Infrastructure Engineer',
  description:
    'Portfolio of Anantachai Treemanee — Software Systems Engineer and Local Infrastructure Engineer with 8+ years in Manufacturing IT and Digital Transformation. Reduced company costs by 3M+ THB annually.',
  keywords: [
    'IT Specialist',
    'Local Infrastructure Engineer',
    'Digital Transformation',
    'Manufacturing IT',
    'Next.js',
    'Production Div.',
  ],
  authors: [{ name: 'Anantachai Treemanee' }],
  openGraph: {
    title: 'Anantachai Treemanee | Software Systems Engineer & Local Infrastructure Engineer',
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
