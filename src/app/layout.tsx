import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { SplashScreen } from '@/components/ui/loader'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Sherwin Jefferson Tajan | Software Developer',
    template: '%s | Sherwin Jefferson Tajan',
  },
  description:
    'Software developer focused on becoming a professional full stack software engineer. Working across frontend, backend, desktop applications, databases, Docker, DevOps workflows, and technical documentation.',
  keywords: [
    'Sherwin Jefferson Tajan',
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
  authors: [{ name: 'Sherwin Jefferson Tajan', url: 'https://sherwintajan.dev' }],
  creator: 'Sherwin Jefferson Tajan',
  metadataBase: new URL('https://sherwintajan.dev'),
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'Sherwin Jefferson Tajan | Software Developer',
    description:
      'Software developer focused on full-stack engineering, desktop applications, and DevOps workflows.',
    type: 'website',
    locale: 'en_US',
    url: 'https://sherwintajan.dev',
    siteName: 'Sherwin Jefferson Tajan',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Sherwin Jefferson Tajan - Software Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sherwin Jefferson Tajan | Software Developer',
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
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
