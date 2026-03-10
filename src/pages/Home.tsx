import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Counselling } from '@/components/sections/Counselling'
import { Consulting } from '@/components/sections/Consulting'
import { MiniCV } from '@/components/sections/MiniCV'
import { Testimonials } from '@/components/sections/Testimonials'
import { Prices } from '@/components/sections/Prices'
import { Contact } from '@/components/sections/Contact'

export function Home () {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Counselling />
        <Consulting />
        <MiniCV />
        <Testimonials />
        <Prices />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
