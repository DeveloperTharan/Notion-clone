import React from 'react'
import logo from '../../../public/logo.png'
import Image from 'next/image'
import { IoLogoInstagram, IoLogoTwitter } from "react-icons/io";
import { FaLinkedinIn } from "react-icons/fa";
import { IoLogoFacebook, IoLogoYoutube } from "react-icons/io5";

function Footer() {
  return (
    <>
      <footer className="footer py-10 px-24 xl:px-44 bg-base-100 text-base-content border-t-[1px] border-base-content 6xl:container 6xl:mx-auto">
        <aside>
          <div className='flex gap-2'>
            <Image src={logo} alt="logo/img" width={40} height={40} />
            <span className='capitalize font-bold text-md mt-3'>notion</span>
          </div>
          <div className='flex gap-4 mt-4'>
            <IoLogoInstagram className='text-[22px] text-gray-500 hover:text-pink-700 cursor-pointer' />
            <IoLogoTwitter className='text-[22px] text-gray-500 hover:text-blue-600 cursor-pointer' />
            <FaLinkedinIn className='text-[22px] text-gray-500 hover:text-blue-600 cursor-pointer' />
            <IoLogoFacebook className='text-[22px] text-gray-500 hover:text-blue-600 cursor-pointer' />
            <IoLogoYoutube className='text-[22px] text-gray-500 hover:text-red-600 cursor-pointer' />
          </div>
        </aside>
        <nav>
          <header className="footer-title">Product</header>
          <a className="link link-hover text-base-content">Wikis</a>
          <a className="link link-hover text-base-content">Projects</a>
          <a className="link link-hover text-base-content">Docs</a>
          <a className="link link-hover text-base-content">Notion AI</a>
          <a className="link link-hover text-base-content">What’s new</a>
        </nav>
        <nav>
          <header className="footer-title">Downlode</header>
          <a className="link link-hover text-base-content">iOS & Android</a>
          <a className="link link-hover text-base-content">Mac & Windows</a>
          <a className="link link-hover text-base-content">Web Clipper</a>
        </nav>
        <nav>
          <header className="footer-title">Get Start</header>
          <a className="link link-hover text-base-content">Switch from Confluence</a>
          <a className="link link-hover text-base-content">Switch from Asana</a>
          <a className="link link-hover text-base-content">Switch from Evernote</a>
          <a className="link link-hover text-base-content">Compare vs Monday</a>
          <a className="link link-hover text-base-content">Compare vs Clickup</a>
          <a className="link link-hover text-base-content">Compare vs Jira</a>
        </nav>
      </footer>
      <footer className="footer footer-center p-4 bg-base-100">
        <aside>
          <p className='text-base-content'>Copyright © 2023 - © 2023 Notion Labs, Inc.</p>
        </aside>
      </footer>
    </>
  )
}

export default Footer