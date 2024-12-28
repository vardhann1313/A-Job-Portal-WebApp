import React from 'react'
import HRNavbar from '../Navbar/HRNavbar'

const HRDashboard = () => {
  return (
    <>
    <HRNavbar />
    <div className='max-w-xl md:max-w-4xl lg:max-w-7xl mx-auto mt-32 py-8 font-semibold md:text-6xl text-4xl text-center'>
      <h1 className='text-blue-800'>Post jobs and start</h1>
      <h1 className='text-blue-900'>hiring ...</h1>
    </div>
    </>
  )
}

export default HRDashboard