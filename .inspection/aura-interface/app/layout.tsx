import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Unbounded, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const displayFont = Unbounded({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-display',
  weight: ['400', '600', '700', '800', '900'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'AURA — голосовой AI-агент для вашего ПК',
  description:
    'AURA слышит, говорит, видит экран, читает файлы и управляет Windows. Узнаёт хозяина по голосу, работает на UMBRA и LUMEN. Создаёт, изменяет, удаляет — манифест автономного агента.',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#1a2bff',
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ru"
      className={`${displayFont.variable} ${jetbrainsMono.variable} bg-background`}
    >
      <body className="antialiased font-mono">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
