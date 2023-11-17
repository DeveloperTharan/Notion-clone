'use client'

import React, { useState } from 'react'
import { IoIosMenu, IoMdClose } from "react-icons/io";

function MediaNavbar() {
    const [open, setOpen] = useState(false)

    return (
        <div className='4xl:hidden'>
            {!open ? (<button className='me-4' onClick={() => setOpen(true)}>
                <IoIosMenu className='text-[26px] text-base-content' />
            </button>) :
                (<button className='me-4' onClick={() => setOpen(false)}>
                    <IoMdClose className='text-[26px] text-base-content' />
                </button>)}
            {open ? <div className='absolute left-0 top-[52px] w-full bg-white max-h-max'>
                <details className="dropdown">
                    <summary className="m-1 btn min-w-full flex justify-between">open or close <div>s</div></summary>
                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                        <li><a>Item 1</a></li>
                        <li><a>Item 2</a></li>
                    </ul>
                </details>
            </div> : null}
        </div>
    )
}

export default MediaNavbar