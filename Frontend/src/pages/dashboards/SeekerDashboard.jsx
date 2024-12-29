import React from 'react'

import SeekerNavbar from '../Navbar/SeekerNavbar'

const SeekerDashboard = () => {
  return (
    <>
    <SeekerNavbar />
    <div className='max-w-xl md:max-w-4xl lg:max-w-7xl mx-auto mt-32 py-8 font-semibold md:text-6xl text-4xl text-center'>
      <h1 className='text-blue-800'>Start applying and get hired</h1>
      <h1 className='text-blue-900'>with us ...</h1>
    </div>
    </>
  )
}

export default SeekerDashboard