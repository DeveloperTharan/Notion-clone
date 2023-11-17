import React from 'react'
import Image from 'next/image'
import logo from '../../../public/logo.png'
import { FaAngleDown, FaAngleUp } from "react-icons/fa6"
import MediaNavbar from './MediaNavbar'
import { GetDemo, GetNotionFree, GetPricing, Getnotionlogin } from './Buttons'

function Navbar() {
  return (
    <div className="navbar bg-transparent px-2 5xl:px-4">
      <div className="navbar-start">
        <div className='flex gap-2 me-5'>
          <Image src={logo} alt="logo/img" width={40} height={40} />
          <span className='capitalize font-bold text-md mt-2'>notion</span>
        </div>
        <div className='hidden 4xl:block'>
          <div className="dropdown dropdown-hover">
            <label tabIndex={0} className="hover:bg-base-200 text-sm px-3 py-1 rounded-md cursor-pointer group flex gap-[6px]">
              Products
              <span className='mt-1'>
                <FaAngleDown className='block group-hover:hidden text-base-content text-[12px]' />
                <FaAngleUp className='hidden group-hover:block text-base-content text-[12px]' />
              </span>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-[2px] z-[1] p-2 shadow bg-base-300 rounded-md w-52">
              <li><a className='text-base-content'>Homepage</a></li>
              <li><a className='text-base-content'>Portfolio</a></li>
              <li><a className='text-base-content'>About</a></li>
            </ul>
          </div>
        </div>
        <div className='hidden 4xl:block'>
          <div className="dropdown dropdown-hover">
            <label tabIndex={1} className="hover:bg-base-200 text-sm px-3 py-1 rounded-md cursor-pointer group flex gap-[6px]">
              Download
              <span className='mt-1'>
                <FaAngleDown className='block group-hover:hidden text-base-content text-[12px]' />
                <FaAngleUp className='hidden group-hover:block text-base-content text-[12px]' />
              </span>
            </label>
            <ul tabIndex={1} className="menu menu-sm dropdown-content mt-[2px] z-[1] p-2 shadow bg-base-300 rounded-md w-52">
              <li><a className='text-base-content'>Homepage</a></li>
              <li><a className='text-base-content'>Portfolio</a></li>
              <li><a className='text-base-content'>About</a></li>
            </ul>
          </div>
        </div>
        <div className='hidden 4xl:block'>
          <div className="dropdown dropdown-hover">
            <label tabIndex={2} className="hover:bg-base-200 text-sm px-3 py-1 rounded-md cursor-pointer group flex gap-[6px]">
              Solutions
              <span className='mt-1'>
                <FaAngleDown className='block group-hover:hidden text-base-content text-[12px]' />
                <FaAngleUp className='hidden group-hover:block text-base-content text-[12px]' />
              </span>
            </label>
            <ul tabIndex={2} className="menu menu-sm dropdown-content mt-[2px] z-[1] p-2 shadow bg-base-300 rounded-md w-52">
              <li><a className='text-base-content'>Homepage</a></li>
              <li><a className='text-base-content'>Portfolio</a></li>
              <li><a className='text-base-content'>About</a></li>
            </ul>
          </div>
        </div>
        <div className='hidden 4xl:block'>
          <div className="dropdown dropdown-hover">
            <label tabIndex={3} className="hover:bg-base-200 text-sm px-3 py-1 rounded-md cursor-pointer group flex gap-[6px]">
              Resources
              <span className='mt-1'>
                <FaAngleDown className='block group-hover:hidden text-base-content text-[12px]' />
                <FaAngleUp className='hidden group-hover:block text-base-content text-[12px]' />
              </span>
            </label>
            <ul tabIndex={3} className="menu menu-sm dropdown-content mt-[2px] z-[1] p-2 shadow bg-base-300 rounded-md w-52">
              <li><a className='text-base-content'>Homepage</a></li>
              <li><a className='text-base-content'>Portfolio</a></li>
              <li><a className='text-base-content'>About</a></li>
            </ul>
          </div>
        </div>
        <GetPricing/>
      </div>
      <div className="navbar-end">
        <div className='hidden 4xl:block'>
          <div className='flex gap-1'>
            <div className='flex gap-4'>
              <GetDemo/>
              <div className=' text-xl text-base-content font-extralight mt-1'>|</div>
              <div className='flex gap-1'>
                <Getnotionlogin/>
                <GetNotionFree/>
              </div>
            </div>
          </div>
        </div>
        <MediaNavbar /> 
      </div>
    </div>
  )
}

export default Navbar