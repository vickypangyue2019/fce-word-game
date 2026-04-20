import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FCE词性转换大师',
  description: '专为剑桥FCE考生设计的词性转换练习工具',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  )
}
