import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Unbounded, JetBrains_Mono } from 'next/font/google'
import { Providers } from './providers'
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
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
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
        <Providers>
          {children}
        </Providers>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
