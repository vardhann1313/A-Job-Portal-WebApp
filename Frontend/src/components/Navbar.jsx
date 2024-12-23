import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <header className="border-2 border-gray-200 bg-gray-100">
        <div className="flex items-start gap-4 flex-row justify-between px-4 py-6 lg:mx-6">
          <h1 className="text-3xl font-bold text-blue-900">
            Job Portal
          </h1>

          <div className="flex flex-row gap-2">
            <Link
              to="/"
              className="font-bold text-blue-800 text-2xl border-2 border-blue-900 rounded-md px-4 py-2"
            >
              Home
            </Link>

            <h1 className="text-2xl font-bold border-2 bg-blue-900 px-4 py-2 rounded-md text-white">
              JP - 2.0
            </h1>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
