import React from 'react'
import WorkArea from './components/WorkArea'
import SideBar from './components/SideBar'

export default function GettingStart() {
  return (
    <div className='flex'>
      <SideBar/>
      <WorkArea/>
    </div>
  )
}