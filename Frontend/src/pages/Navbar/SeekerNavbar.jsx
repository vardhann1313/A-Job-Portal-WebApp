import React from "react";
import { ToastContainer } from "react-toastify";

import logo from "../../../public/image/icon.png";
import { Link, useNavigate } from "react-router-dom";
import { handleSuccess } from "../../../Utilities/ToastMSG";

const SeekerNavbar = () => {
  const user = localStorage.getItem("loggedInUser");

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

  return (
    <>
      <header className="border-2 bg-gray-100">
        <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex md:flex-row">
              <img
                onClick={() => navigate("/seeker/dashboard")}
                className="h-12 cursor-pointer"
                src={logo}
                alt=""
              />
              <h1 className="text-blue-900 mx-2 py-2">Welcome {user}</h1>
            </div>

            <div className="md:block">
              <nav aria-label="Global">
                <ul className="flex items-center gap-6 text-sm">
                  <li>
                    <Link
                      to="/seeker/jobs"
                      className="text-gray-500 transition hover:text-blue-700 hover:font-semibold"
                    >
                      Jobs
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/seeker/application"
                      className="text-gray-500 transition hover:text-blue-700 hover:font-semibold"
                    >
                      Application
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/seeker/profile"
                      className="text-gray-500 transition hover:text-blue-700 hover:font-semibold"
                    >
                      Profile
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                <button
                  onClick={logout}
                  className="rounded-md px-5 py-2.5 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </header>
    </>
  );
};

export default SeekerNavbar;
