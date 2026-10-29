import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { Intercultural } from '@/components/sections/Intercultural'
import { Counselling } from '@/components/sections/Counselling'
import { GroupWork } from '@/components/sections/GroupWork'
import { Journey } from '@/components/sections/Journey'
import { AfricaGallery } from '@/components/sections/AfricaGallery'
import { Consulting } from '@/components/sections/Consulting'
import { Testimonials } from '@/components/sections/Testimonials'
import { Prices } from '@/components/sections/Prices'
import { FAQ } from '@/components/sections/FAQ'
import { Contact } from '@/components/sections/Contact'

export function Home () {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Intercultural />
        <Counselling />
        <GroupWork />
        <Journey />
        <AfricaGallery />
        <Consulting />
        <Testimonials />
        <Prices />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
