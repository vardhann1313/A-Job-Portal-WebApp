import React from "react";
import logo from "../../public/image/logo.png";

const footer = () => {
  return (
    <div>
      <footer className="bg-gray-100 border-gray-200 border-2">
        <div className="mx-auto max-w-screen-xl px-4 py-4 sm:py-6 lg:py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-between">
            <div className="flex justify-center sm:justify-start w-full sm:w-auto mb-4 sm:mb-0">
              <img className="w-16 h-10 sm:w-18 sm:h-12" src={logo} alt="Logo" />
            </div>
            <p className="text-center text-xs sm:text-sm text-gray-500 sm:mt-0 sm:text-right">
              Copyright &copy; 2024. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default footer;