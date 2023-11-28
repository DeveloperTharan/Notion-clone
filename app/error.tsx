'use client'

import React from 'react'
import Image from "next/image";
import Link from "next/link";
import errorImg from '../public/error.png'

export default function Error() {
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
    <Image src={errorImg} height="300" width="300" alt="Error" />
    <h2 className="text-xl font-medium">Something went wrong!</h2>
    <Link href="/workspace">
      <button className="btn btn-md bg-[#000] text-white hover:bg-[#000]">Go back</button>
    </Link>
  </div>
  )
}