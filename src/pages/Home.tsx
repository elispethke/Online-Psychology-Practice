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
import { SectionTransition } from '@/components/ui/SectionTransition'

export function Home () {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SectionTransition><Intercultural /></SectionTransition>
        <SectionTransition><Counselling /></SectionTransition>
        <SectionTransition><GroupWork /></SectionTransition>
        <SectionTransition><Journey /></SectionTransition>
        <SectionTransition><AfricaGallery /></SectionTransition>
        <SectionTransition><Consulting /></SectionTransition>
        <SectionTransition><Testimonials /></SectionTransition>
        <SectionTransition><Prices /></SectionTransition>
        <SectionTransition><FAQ /></SectionTransition>
        <SectionTransition><Contact /></SectionTransition>
      </main>
      <Footer />
    </>
  )
}
