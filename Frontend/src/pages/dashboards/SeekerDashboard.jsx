import React from 'react'
import SeekerNavbar from '../Navbar/SeekerNavbar'

const SeekerDashboard = () => {
  return (
    <>
      <SeekerNavbar />
      <div className='w-full px-4 mx-auto mt-16 sm:mt-24 md:mt-32 py-4 sm:py-6 md:py-8'>
        <h1 className='font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center text-blue-800'>
          Start applying and get hired
        </h1>
        <h1 className='font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center text-blue-900'>
          with us ...
        </h1>
      </div>
    </>
  )
}

export default SeekerDashboard;