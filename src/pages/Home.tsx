import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { Intercultural } from '@/components/sections/Intercultural'
import { Counselling } from '@/components/sections/Counselling'
import { About } from '@/components/sections/About'
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
        <Intercultural />
        <Counselling />
        <About />
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
