import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <header className="border-2 border-gray-200 bg-gray-100">
        <div className="flex items-center flex-wrap sm:flex-nowrap justify-between px-3 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-6">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-900">
            Job Portal
          </h1>

          <div className="flex flex-row gap-1 sm:gap-2 mt-2 sm:mt-0">
            <Link
              to="/"
              className="font-bold text-blue-800 text-sm sm:text-lg lg:text-2xl border-2 border-blue-900 rounded-md px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-2"
            >
              Home
            </Link>

            <h1 className="text-sm sm:text-lg lg:text-2xl font-bold border-2 bg-blue-900 px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-2 rounded-md text-white">
              JP - 2.0
            </h1>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;