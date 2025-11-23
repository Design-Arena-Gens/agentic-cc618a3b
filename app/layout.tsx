import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'تعلم الإنجليزية - Learn English',
  description: 'تطبيق تفاعلي لتعلم اللغة الإنجليزية',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  )
}
