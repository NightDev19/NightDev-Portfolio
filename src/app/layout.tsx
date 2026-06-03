import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { SplashScreen } from '@/components/ui/loader'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'NightDev | Software Developer',
    template: '%s | NightDev',
  },
  description:
    'Software developer focused on becoming a professional full stack software engineer. Working across frontend, backend, desktop applications, databases, Docker, DevOps workflows, and technical documentation.',
  keywords: [
    'NightDev',
    'Sherwin Jefferson Tajan',  // Real name for SEO discoverability
    'Software Developer',
    'Full Stack Developer',
    'React',
    'Next.js',
    'TypeScript',
    'Python',
    'FastAPI',
    '.NET',
    'Avalonia UI',
    'Docker',
    'C#',
    'Node.js',
    'PostgreSQL',
    'Supabase',
  ],
  authors: [{ name: 'NightDev', url: 'https://sherwintajan.dev' }],
  creator: 'NightDev',
  metadataBase: new URL('https://sherwintajan.dev'),
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'NightDev | Software Developer',
    description:
      'Software developer focused on full-stack engineering, desktop applications, and DevOps workflows.',
    type: 'website',
    locale: 'en_US',
    url: 'https://sherwintajan.dev',
    siteName: 'NightDev',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'NightDev - Software Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NightDev | Software Developer',
    description:
      'Software developer focused on full-stack engineering, desktop applications, and DevOps workflows.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SplashScreen>
            {children}
          </SplashScreen>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
