import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Notion',
  description: '',
  icons: {
    icon: [
      {
        url: "/logo.png",
        href: "/logo.png"
      }
    ]
  }
}

export default function RootLayout({
  children, 
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme='light'>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
