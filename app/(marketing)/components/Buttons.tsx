'use client'

import React from 'react'
import { FaArrowRight } from "react-icons/fa6";

export function GetNotionFree() {
    return (
        <>
            <button className="bg-base-content text-sm text-base-100 px-3 py-1 rounded-md cursor-pointer mt-[1px]">Get Notion free</button>
        </>
    )
}

export function GetNotionFreeHero() {
    return (
        <>
            <button className="btn bg-base-content text-base-100 hover:bg-base-content mt-5">Get Notion free <FaArrowRight className='ms-4 mt-1' /></button>
        </>
    )
}

export function Getnotionlogin() {
    return (
        <>
            <button className="hover:bg-base-200 text-sm px-3 py-1 rounded-md cursor-pointer">Login</button>
        </>
    )
}

export function GetDemo() {
    return (
        <>
            <button className="hover:bg-base-200 text-sm px-3 py-1 rounded-md cursor-pointer">Request a demo</button>
        </>
    )
}

export function GetPricing() {
    return (
        <>
            <button className="hover:bg-base-200 text-sm px-3 py-1 rounded-md cursor-pointer hidden 4xl:block">Pricing</button>
        </>
    )
}