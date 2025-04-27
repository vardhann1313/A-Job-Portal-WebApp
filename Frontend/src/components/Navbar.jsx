import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <header className="bg-blue-800 text-white shadow-md">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link to="/" className="text-3xl font-bold">
            Job Portal
          </Link>

          {/* Version Badge */}
          <div className="flex items-center">
            <h1 className="text-lg md:text-xl font-semibold bg-white text-blue-800 px-4 py-2 rounded-md shadow-sm">
              JP - 2.0
            </h1>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;