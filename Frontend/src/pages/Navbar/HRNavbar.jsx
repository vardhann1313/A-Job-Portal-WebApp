import React, { useState } from "react";
import { ToastContainer } from "react-toastify";

import logo from "../../../public/image/icon.png";
import { Link, useNavigate } from "react-router-dom";
import { handleSuccess } from "../../../Utilities/ToastMSG";

const HRNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = localStorage.getItem('loggedInUser');
  const navigate = useNavigate();

  const logout = (e) => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("role");

    handleSuccess("Logging out ...");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="border-b-2 bg-gray-100 sticky top-0 z-10 shadow-sm">
        <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <img
                onClick={() => navigate("/hr/dashboard")}
                className="h-10 w-auto cursor-pointer"
                src={logo}
                alt="Logo"
              />
              <h1 className="text-blue-900 ml-2 py-2 text-sm sm:text-base truncate max-w-[150px] sm:max-w-full">
                Welcome {user}
              </h1>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden rounded-md p-2 text-gray-600 hover:bg-gray-200 focus:outline-none"
              onClick={toggleMenu}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <nav aria-label="Global">
                <ul className="flex items-center gap-2 sm:gap-4 lg:gap-6 text-sm">
                  <li>
                    <Link
                      to="/hr/alljobs"
                      className="text-gray-500 transition hover:text-blue-700 hover:font-semibold px-2 py-1"
                    >
                      All Jobs
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/hr/addjob"
                      className="text-gray-500 transition hover:text-blue-700 hover:font-semibold px-2 py-1"
                    >
                      Add Job
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/hr/application"
                      className="text-gray-500 transition hover:text-blue-700 hover:font-semibold px-2 py-1"
                    >
                      Application
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="hidden md:flex items-center">
              <button
                onClick={logout}
                className="rounded-md px-3 py-1.5 sm:px-4 sm:py-2 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Mobile menu, show/hide based on menu state */}
          {isMenuOpen && (
            <div className="md:hidden py-2 border-t border-gray-200">
              <nav className="flex flex-col space-y-2 pb-3">
                <Link
                  to="/hr/alljobs"
                  className="text-gray-500 hover:bg-gray-200 px-4 py-2 rounded-md"
                >
                  All Jobs
                </Link>
                <Link
                  to="/hr/addjob"
                  className="text-gray-500 hover:bg-gray-200 px-4 py-2 rounded-md"
                >
                  Add Job
                </Link>
                <Link
                  to="/hr/application"
                  className="text-gray-500 hover:bg-gray-200 px-4 py-2 rounded-md"
                >
                  Application
                </Link>
                <div className="pt-2 border-t border-gray-200">
                  <button
                    onClick={logout}
                    className="w-full text-left rounded-md px-4 py-2 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800"
                  >
                    Logout
                  </button>
                </div>
              </nav>
            </div>
          )}
        </div>
        <ToastContainer />
      </header>
    </>
  );
};

export default HRNavbar;