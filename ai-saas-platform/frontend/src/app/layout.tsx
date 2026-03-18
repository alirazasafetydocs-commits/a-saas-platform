import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import { AuthProvider } from '@/context/AuthContext'
import WhatsAppButton from '@/components/WhatsAppButton'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI SaaS Platform - Resume, Cover Letter, Documents & More',
  description: 'Professional AI tools for resumes, cover letters, HSE documents, websites and more. Premium templates available.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className + ' bg-background text-text'}>
        <AuthProvider>
        <Navbar />
        <main>{children}</main>
        <WhatsAppButton />
      </AuthProvider>
    </body>
  </html>
  )
}
