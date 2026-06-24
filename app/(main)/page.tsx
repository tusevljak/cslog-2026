import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import Services from '@/components/Services'
import QuoteBanner from '@/components/QuoteBanner'
import TrailersBanner from '@/components/TrailersBanner'
import About from '@/components/About'
import BlogPreview from '@/components/BlogPreview'

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <QuoteBanner />
      <TrailersBanner />
      <About />
      <BlogPreview />
    </>
  )
}
