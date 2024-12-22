import React from "react";
import logo from "../../public/image/logo.png";

const footer = () => {
  return (
    <div>
      <footer className="bg-gray-100 border-gray-200 border-2">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <img className="w-18 h-12" src={logo} alt="Logo" />
            <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
              Copyright &copy; 2024. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default footer;
