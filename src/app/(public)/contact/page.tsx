import type { Metadata } from 'next'
import { ContactSection } from '@/components/sections/ContactSection'

export const metadata: Metadata = {
  title: 'Contact — Get in Touch for Collaboration & Opportunities',
  description:
    'Reach out to Sherwin Jefferson Tajan (NightDev) for collaboration, freelance work, job opportunities, or technical discussions. Available for full-stack development, desktop application, and DevOps projects.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact NightDev',
    description:
      'Get in touch with NightDev for collaboration, freelance work, or job opportunities in full-stack development and DevOps.',
  },
}

export default function ContactPage() {
  return (
    <div className="pt-20">
      <ContactSection />
    </div>
  )
}
