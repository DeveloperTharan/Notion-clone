'use client'

import React from 'react'
import empty from '@/public/empty.png'
import Image from 'next/image'
import { useUser } from "@clerk/clerk-react";
import { CiCirclePlus } from "react-icons/ci";

export default function WorkArea() {
  const { user } = useUser();

  return (
    <div className='h-full flex flex-col items-center justify-center space-y-4'>
      <aside>
        <Image src={empty} alt="empty" height={300} width={300} />
      </aside>
      <h2 className='text-sm font-medium capitalize'>
        welcome to {user!.fullName}&apos;s notion
      </h2>
      <button className='btn bg-base-content text-base-100 hover:bg-base-content hover:text-base-100'>
      <CiCirclePlus />
      Create a note
      </button>
    </div>
  )
}