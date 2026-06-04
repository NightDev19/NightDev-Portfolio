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
    default: 'NightDev | Full Stack Software Developer — Sherwin Jefferson Tajan',
    template: '%s | NightDev',
  },
  description:
    'Sherwin Jefferson Tajan (NightDev) — Full Stack Software Developer specializing in React, Next.js, TypeScript, Python, .NET, Docker, and DevOps. Building production-ready web apps, desktop applications, and scalable backend systems.',
  keywords: [
    'NightDev',
    'Sherwin Jefferson Tajan',
    'Sherwin Tajan',
    'Software Developer',
    'Full Stack Developer',
    'Full Stack Engineer',
    'Web Developer',
    'React Developer',
    'Next.js Developer',
    'TypeScript Developer',
    'Python Developer',
    'FastAPI Developer',
    '.NET Developer',
    'C# Developer',
    'Avalonia UI Developer',
    'Docker',
    'DevOps Engineer',
    'Node.js Developer',
    'PostgreSQL Developer',
    'Supabase Developer',
    'Desktop Application Developer',
    'Frontend Engineer',
    'Backend Engineer',
    'Software Engineer Portfolio',
  ],
  authors: [{ name: 'Sherwin Jefferson Tajan', url: 'https://sherwintajan.dev' }],
  creator: 'Sherwin Jefferson Tajan',
  publisher: 'Sherwin Jefferson Tajan',
  metadataBase: new URL('https://sherwintajan.dev'),
  alternates: {
    canonical: 'https://sherwintajan.dev',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'NightDev | Full Stack Software Developer',
    description:
      'Sherwin Jefferson Tajan — Full Stack Software Developer building web apps, desktop applications, and DevOps pipelines with React, Next.js, TypeScript, Python, .NET, and Docker.',
    type: 'website',
    locale: 'en_US',
    url: 'https://sherwintajan.dev',
    siteName: 'NightDev',
    firstName: 'Sherwin Jefferson',
    lastName: 'Tajan',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'NightDev — Full Stack Software Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NightDev | Full Stack Software Developer',
    description:
      'Sherwin Jefferson Tajan — Full Stack Software Developer building web apps, desktop applications, and DevOps pipelines.',
    images: ['/og-image.png'],
    creator: '@nightdev',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'technology',
}

function JsonLd() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Sherwin Jefferson Tajan',
    alternateName: 'NightDev',
    url: 'https://sherwintajan.dev',
    jobTitle: 'Full Stack Software Developer',
    description:
      'Software developer focused on becoming a professional full stack software engineer. Working across frontend, backend, desktop applications, databases, Docker, DevOps workflows, and technical documentation.',
    sameAs: [
      'https://github.com/sherwintajan',
      'https://linkedin.com/in/sherwintajan',
    ],
    knowsAbout: [
      'React',
      'Next.js',
      'TypeScript',
      'Python',
      'FastAPI',
      'Django',
      'Node.js',
      'Express',
      'C#',
      '.NET',
      'Avalonia UI',
      'Docker',
      'PostgreSQL',
      'Supabase',
      'Redis',
      'MongoDB',
      'Git',
      'Linux',
      'DevOps',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLd />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}
        suppressHydrationWarning
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
