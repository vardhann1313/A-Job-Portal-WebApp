import React from 'react'

import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const CompanyLogin = () => {
  return (
    <>
    <Navbar />
    <div className="w-full h-screen">
      <div className='border-2 flex flex-col p-4 m-10 max-w-96 mx-auto rounded-md'>
      <h1 className='font-bold text-2xl text-center mb-2'>Company login</h1>
      <form>
        <div className='flex flex-col m-2'>
          <label htmlFor="username">Username :</label>
          <input type="text" name="username" autoFocus className='border-2 rounded-md p-2 mt-2' />
        </div>
        <div className='flex flex-col m-2'>
          <label htmlFor="pass">Password :</label>
          <input type="password" name="pass" className='border-2 rounded-md p-2 mt-2' />
        </div>
        <button className='border-blue-500 border-2 px-4 py-2 rounded-md my-4 w-full bg-blue-600 text-white hover:bg-blue-800' type="submit">Login</button>
      </form>
      <span className='text-center'>
          Don't have an account ? <Link className='text-blue-900' to='/company/signup'>Signup</Link>
      </span>
      </div>
    </div>
    <Footer />
    </>
  )
}

export default CompanyLogin