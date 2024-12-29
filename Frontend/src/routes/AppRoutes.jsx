import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "../components/LandingPage";
import RefreshHandler from "../../Utilities/RefreshHandler";

// Authentication routes ----
import CompanySignup from "../pages/CompanySignup";
import CompanyLogin from "../pages/CompanyLogin";
import SeekerSignup from "../pages/SeekerSignup";
import SeekerLogin from "../pages/SeekerLogin";
import HRLogin from "../pages/HRLogin";

// Dashboard routes ----
import CompanyDashboard from "../pages/dashboards/CompanyDashboard";
import SeekerDashboard from "../pages/dashboards/SeekerDashboard";
import HRDashboard from "../pages/dashboards/HRDashboard";

// Company Pages routes ---
import AllHR from "../pages/CompanyPages/AllHR";
import AddHR from "../pages/CompanyPages/AddHR";
import AllJobs from "../pages/CompanyPages/AllJobs";
import Profile from "../pages/CompanyPages/Profile";

// HR Pages routes ---
import AddJob from "../pages/HRPages/AddJob";
import HRAllJobs from "../pages/HRPages/AllJobs";
import Application from "../pages/HRPages/Application";
import HRProfile from "../pages/HRPages/Profile";

// Seeker Pages routes ---
import Jobs from "../pages/SeekerPages/Jobs";
import SeekerApplication from "../pages/SeekerPages/Application";
import SeekerProfile from "../pages/SeekerPages/Profile";

const AppRoutes = () => {

  // Private Route
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/" />;
  };

  return (
    <div>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        {/* Authentication routes  */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/company/signup" element={<CompanySignup />} />
        <Route path="/company/login" element={<CompanyLogin />} />
        <Route path="/seeker/signup" element={<SeekerSignup />} />
        <Route path="/seeker/login" element={<SeekerLogin />} />
        <Route path="/hr/login" element={<HRLogin />} />

        {/* Dashboard routes */}
        <Route path="/company/dashboard" element={<CompanyDashboard />} />
        <Route path="/seeker/dashboard" element={<SeekerDashboard />} />
        <Route path="/hr/dashboard" element={<HRDashboard />} />

        {/* CompanyRoutes */}
        <Route path="/company/allhr" element={<AllHR />} />
        <Route path="/company/alljobs" element={<AllJobs />} />
        <Route path="/company/profile" element={<Profile />} />
        <Route path="/company/addhr" element={<AddHR />} />

        {/* HRRoutes */}
        <Route path="/hr/alljobs" element={<HRAllJobs />} />
        <Route path="/hr/profile" element={<HRProfile />} />
        <Route path="/hr/application" element={<Application />} />
        <Route path="/hr/addjob" element={<AddJob />} />

        {/* SeekerRoutes */}
        <Route path="/seeker/jobs" element={<Jobs />} />
        <Route path="/seeker/profile" element={<SeekerProfile />} />
        <Route path="/seeker/application" element={<SeekerApplication />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
