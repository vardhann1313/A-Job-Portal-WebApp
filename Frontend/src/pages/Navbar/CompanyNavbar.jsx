import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import logo from "../../../public/image/icon.png";
import { Link, useNavigate } from "react-router-dom";
import { handleSuccess } from "../../../Utilities/ToastMSG";

const CompanyNavbar = () => {
  const user = localStorage.getItem("loggedInUser");
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("role");

    handleSuccess("Logging out ...");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <>
      <header className="bg-blue-800 text-white shadow-md">
        <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo and Welcome Message */}
            <div className="flex items-center">
              <img
                onClick={() => navigate("/company/dashboard")}
                className="h-12 cursor-pointer"
                src={logo}
                alt="Logo"
              />
              <h1 className="hidden sm:block text-white text-lg font-semibold ml-4">
                Welcome, {user}
              </h1>
            </div>

            {/* Hamburger Menu for Small Screens */}
            <div className="sm:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </button>
            </div>

            {/* Navigation Links for Larger Screens */}
            <nav
              aria-label="Global"
              className="hidden sm:flex items-center gap-6 text-sm"
            >
              <ul className="flex items-center gap-6">
                <li>
                  <Link
                    to="/company/allhr"
                    className="text-white hover:text-blue-300 transition font-medium"
                  >
                    All HR
                  </Link>
                </li>
                <li>
                  <Link
                    to="/company/alljobs"
                    className="text-white hover:text-blue-300 transition font-medium"
                  >
                    All Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/company/addhr"
                    className="text-white hover:text-blue-300 transition font-medium"
                  >
                    Add HR
                  </Link>
                </li>
                <li>
                  <Link
                    to="/company/applications"
                    className="text-white hover:text-blue-300 transition font-medium"
                  >
                    Applications
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Logout Button for Larger Screens */}
            <div className="hidden sm:block">
              <button
                onClick={logout}
                className="rounded-md px-5 py-2.5 text-sm font-medium bg-white text-blue-800 hover:bg-blue-100 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Dropdown Menu for Small Screens */}
        {isMenuOpen && (
          <div className="sm:hidden bg-blue-800 text-white">
            <ul className="flex flex-col items-center gap-4 py-4 text-sm">
              <li>
                <Link
                  to="/company/allhr"
                  className="text-white hover:text-blue-300 transition font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  All HR
                </Link>
              </li>
              <li>
                <Link
                  to="/company/alljobs"
                  className="text-white hover:text-blue-300 transition font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  All Jobs
                </Link>
              </li>
              <li>
                <Link
                  to="/company/addhr"
                  className="text-white hover:text-blue-300 transition font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Add HR
                </Link>
              </li>
              <li>
                <Link
                  to="/company/applications"
                  className="text-white hover:text-blue-300 transition font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Applications
                </Link>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="rounded-md px-5 py-2.5 text-sm font-medium bg-white text-blue-800 hover:bg-blue-100 transition"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
        <ToastContainer />
      </header>
    </>
  );
};

export default CompanyNavbar;