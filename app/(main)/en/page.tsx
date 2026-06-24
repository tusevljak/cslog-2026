import type { Metadata } from 'next'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import Services from '@/components/Services'
import QuoteBanner from '@/components/QuoteBanner'
import TrailersBanner from '@/components/TrailersBanner'
import About from '@/components/About'
import BlogPreview from '@/components/BlogPreview'

export const metadata: Metadata = {
  title: 'Cargo Special Logistic — Oversized & Special Cargo Transport',
  description: 'Over 20 years of experience in oversized and special cargo transport — from Belgrade to the Middle East.',
  alternates: { languages: { sr: '/' } },
}

export default function HomeEn() {
  return (
    <>
      <Hero lang="en" />
      <Stats lang="en" />
      <Services lang="en" />
      <QuoteBanner lang="en" />
      <TrailersBanner lang="en" />
      <About lang="en" />
      <BlogPreview lang="en" />
    </>
  )
}
