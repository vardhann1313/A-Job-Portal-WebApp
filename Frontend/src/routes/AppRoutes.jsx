import React from 'react'
import { Routes, Route } from 'react-router-dom'

import LandingPage from '../components/LandingPage'
// Authentication routes ----
import CompanySignup from '../pages/CompanySignup' 
import CompanyLogin from '../pages/CompanyLogin' 
import SeekerSignup from '../pages/SeekerSignup' 
import SeekerLogin from '../pages/SeekerLogin' 
import HRLogin from '../pages/HRLogin'

// Dashboard routes ----
import CompanyDashboard from '../pages/dashboards/CompanyDashboard'
import SeekerDashboard from '../pages/dashboards/SeekerDashboard'
import HRDashboard from '../pages/dashboards/HRDashboard'

const AppRoutes = () => {
  return (
    <div>
        <Routes>
            {/* Authentication routes  */}
            <Route path='/' element={<LandingPage />} />
            <Route path='/company/signup' element={<CompanySignup />} />
            <Route path='/company/login' element={<CompanyLogin />} />
            <Route path='/seeker/signup' element={<SeekerSignup />} />
            <Route path='/seeker/login' element={<SeekerLogin />} />
            <Route path='/hr/login' element={<HRLogin />} />

            {/* Dashboard routes */}
            <Route path='/company/dashboard' element={<CompanyDashboard />} />
            <Route path='/seeker/dashboard' element={<SeekerDashboard />} />
            <Route path='/hr/dashboard' element={<HRDashboard />} />
        </Routes>
    </div>
  )
}

export default AppRoutes