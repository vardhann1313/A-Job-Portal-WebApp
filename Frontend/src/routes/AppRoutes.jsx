import React from 'react'
import { Routes, Route } from 'react-router-dom'

import LandingPage from '../components/LandingPage'

import CompanySignup from '../pages/CompanySignup' 
import CompanyLogin from '../pages/CompanyLogin' 
import SeekerSignup from '../pages/SeekerSignup' 
import SeekerLogin from '../pages/SeekerLogin' 
import HRLogin from '../pages/HRLogin' 

const AppRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/company/signup' element={<CompanySignup />} />
            <Route path='/company/login' element={<CompanyLogin />} />
            <Route path='/seeker/signup' element={<SeekerSignup />} />
            <Route path='/seeker/login' element={<SeekerLogin />} />
            <Route path='/hr/login' element={<HRLogin />} />
        </Routes>
    </div>
  )
}

export default AppRoutes