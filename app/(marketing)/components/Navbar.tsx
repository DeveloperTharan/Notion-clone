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
            <label className="swap swap-rotate hover:bg-base-200 px-3 py-2 rounded-md">
              <input type="checkbox" className="theme-controller" value="black" />
              <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
              <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
            </label>
          </div>
        </div>
        <MediaNavbar />
      </div>
    </div>
  )
}

export default Navbar