import React from 'react'
import Image from 'next/image'
import { GetNotionFreeHero } from './components/Buttons'
import heroblack from '../../public/home-hero-black.svg'
import herowhite from '../../public/home-hero-white.svg'

const MarketingPage = () => {  
  return (
    <div className='px-16 3xl:px-52'>
      <div className='text-center mt-10'>
        <h1 className='text-6xl font-semibold'>Write, plan, share.</h1>
        <h1 className='text-6xl font-semibold'>With AI at your side.</h1>
        <p className='text-2xl font-semibold mt-4'>Notion is the connected workspace where better, faster work happens.</p>
        <GetNotionFreeHero/>
      </div>
      <aside className='mt-10'>
        
        <Image
          src={heroblack} 
          alt="img"
          className='m-auto block h-auto w-full object-contain' 
        />
      </aside>
    </div>
  )
}

export default MarketingPage