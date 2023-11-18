import React from 'react'
import Image from 'next/image'
import { GetNotionFreeHero, TryNotion, RequestNotion } from './components/Buttons'
import heroblack from '../../public/home-hero.svg'
import NotionParade from '../../public/notion-parade.svg'
import MarketingCard from './components/MarketingCard'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import MarketingSlide from './components/MarketingSlide'

const MarketingPage = () => {
  return (
    <>
      <Navbar />
      <div className='px-3 xl:px-16 3xl:px-44'>
        <div className='text-center mt-10'>
          <h1 className='text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-semibold'>Write, plan, share.</h1>
          <h1 className='text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-semibold'>With AI at your side.</h1>
          <p className='text-sm md:text-ms lg:text-xl font-semibold mt-4'>Notion is the connected workspace where better, faster work happens.</p>
          <GetNotionFreeHero />
        </div>
        <aside className='mt-10'>
          <Image
            src={heroblack}
            alt="img"
            className='m-auto block h-auto w-[75%] object-contain'
          />
        </aside>
        <MarketingCard />
        <MarketingSlide/>
        <div className='text-center mt-32'>
          <h1 className='text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-semibold'>Get started for free.</h1>
          <p className='text-sm md:text-md lg:text-lg font-medium mt-4'>Play around with it first. Pay and add your team later.</p>
          <div className='flex justify-center items-center mt-5 gap-8'>
            <TryNotion />
            <RequestNotion />
          </div>
        </div>
        <aside className='mt-10'>
          <Image
            src={NotionParade}
            alt="img"
            className='m-auto block h-auto w-[75%] object-contain'
          />
        </aside>
      </div>
      <Footer />
    </>
  )
}

export default MarketingPage