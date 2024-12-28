import React from 'react'
import CompanyNavbar from '../Navbar/CompanyNavbar'

const CompanyDashboard = () => {
  return (
    <>
    <CompanyNavbar />
    <div className='max-w-xl md:max-w-4xl lg:max-w-7xl mx-auto mt-32 py-8 font-semibold md:text-6xl text-4xl text-center'>
      <h1 className='text-blue-800'>Start hiring with</h1>
      <h1 className='text-blue-900'>us ...</h1>
    </div>
    </>
    
  )
}

export default CompanyDashboard