import React from "react";
import logo from "../../public/image/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <footer className="bg-blue-500 text-white">
        <div className="mx-auto max-w-screen-xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center sm:flex-row sm:justify-between">
            {/* Logo */}
            <img className="w-18 h-12 mb-4 sm:mb-0" src={logo} alt="Logo" />

            {/* Copyright Text */}
            <p className="text-center text-sm sm:text-left">
              Copyright &copy; {currentYear}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;