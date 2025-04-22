import React from 'react'
import HRNavbar from '../Navbar/HRNavbar'

const HRDashboard = () => {
  return (
    <>
      <HRNavbar />
      <div className='w-full px-4 sm:px-6 max-w-xl md:max-w-4xl lg:max-w-7xl mx-auto mt-16 sm:mt-24 md:mt-32 py-4 sm:py-6 md:py-8 font-semibold text-2xl sm:text-3xl md:text-5xl lg:text-6xl text-center'>
        <h1 className='text-blue-800'>Post jobs and start</h1>
        <h1 className='text-blue-900 mt-2'>hiring ...</h1>
      </div>
    </>
  )
}

export default HRDashboard