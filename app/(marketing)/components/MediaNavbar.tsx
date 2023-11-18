'use client'

import React, { useState } from 'react'
import { IoIosMenu, IoMdClose } from "react-icons/io";
import {
    Accordion,
    AccordionHeader, 
    AccordionBody,
} from "@material-tailwind/react";

function Icon({ id, open }: { id: number, open: number }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
    );
}

function MediaNavbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [open, setOpen] = React.useState(0);

    const handleOpen = (value: React.SetStateAction<number>) => setOpen(open === value ? 0 : value);

    return (
        <div className='4xl:hidden'>
            {!isOpen ? (<button onClick={() => setIsOpen(true)}>
                <IoIosMenu className='text-[26px] text-base-content' />
            </button>) :
                (<button onClick={() => setIsOpen(false)}>
                    <IoMdClose className='text-[26px] text-base-content' />
                </button>)}
            {isOpen ? <div className='absolute left-0 top-[62px] w-full bg-base-100 h-[100vh] overflow-scroll pb-20 px-3 z-50'>
                <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
                    <AccordionHeader className='MediaNavAccor' onClick={() => handleOpen(1)}>Products</AccordionHeader>
                    <AccordionBody>
                        <ul tabIndex={1} className="menu menu-sm z-[1] -mt-5 -mb-5 bg-base-100 w-full min-w-full">
                            <li><a className='text-base-content'>Wikis</a></li>
                            <li><a className='text-base-content'>Projects</a></li>
                            <li><a className='text-base-content'>Docs</a></li>
                            <li><a className='text-base-content'>Notion AI</a></li>
                        </ul>
                    </AccordionBody>
                </Accordion>
                <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
                    <AccordionHeader className='MediaNavAccor' onClick={() => handleOpen(2)}>Solutions</AccordionHeader>
                    <AccordionBody>
                        <ul tabIndex={2} className="menu menu-sm z-[1] -mt-5 -mb-5 bg-base-100 w-full min-w-full">
                            <li><a className='text-base-content'>Enterprise</a></li>
                            <li><a className='text-base-content'>Small Buisness</a></li>
                            <li><a className='text-base-content'>Personal</a></li>
                        </ul>
                    </AccordionBody>
                </Accordion>
                <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
                    <AccordionHeader className='MediaNavAccor' onClick={() => handleOpen(3)}>Resources</AccordionHeader>
                    <AccordionBody>
                        <ul tabIndex={3} className="menu menu-sm z-[1] -mt-5 -mb-5 bg-base-100 w-full min-w-full">
                            <li><a className='text-base-content'>Blogs</a></li>
                            <li><a className='text-base-content'>Guids & Tutorial</a></li>
                            <li><a className='text-base-content'>Webinar</a></li>
                            <li><a className='text-base-content'>Help Center</a></li>
                            <li><a className='text-base-content'>API Docs</a></li>
                            <li><a className='text-base-content'>Community</a></li>
                            <li><a className='text-base-content'>Find a Consultant</a></li>
                        </ul>
                    </AccordionBody>
                </Accordion>
                <Accordion open={open === 4} icon={<Icon id={4} open={open} />}>
                    <AccordionHeader className='MediaNavAccor' onClick={() => handleOpen(4)}>Downlode</AccordionHeader>
                    <AccordionBody>
                        <ul tabIndex={4} className="menu menu-sm z-[1] -mt-5 -mb-5 bg-base-100 w-full min-w-full">
                            <li><a className='text-base-content'>IOS & Android</a></li>
                            <li><a className='text-base-content'>Mac & Windows</a></li>
                            <li><a className='text-base-content'>Web Clipper</a></li>
                        </ul>
                    </AccordionBody>
                </Accordion>
                <div className='border-t-[1px] border-base-300 bg-base-100'>
                    <button className='text-sm text-base-content font-bold my-4'>Pricing</button>
                </div>
                <div className='border-y-[1px] border-base-300 bg-base-100'>
                    <button className='text-sm text-base-content font-bold my-4'>Request a demo</button>
                </div>
                <div className='pt-6 bg-base-100'>
                    <button className='text-sm text-base-100 font-semibold py-2 bg-base-content w-full min-w-full rounded-md'>Get Notion free</button>
                </div>
                <div className='pt-3 bg-base-100'>
                    <button className='text-sm text-base-content bg-white font-semibold py-2 border-[1px] border-gray-500 w-full min-w-full rounded-md'>Login</button>
                </div>
            </div> : null}
        </div>
    )
}

export default MediaNavbar