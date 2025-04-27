import React from "react";
import CompanyNavbar from "../Navbar/CompanyNavbar";
import Footer from "../../components/Footer";

const CompanyDashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky Navbar */}
      <header className="sticky top-0 z-50">
        <CompanyNavbar />
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col justify-center items-center bg-gradient-to-b from-blue-100 to-blue-300">
        <h1 className="text-4xl md:text-6xl font-bold text-blue-800 mb-4">
          Start hiring with
        </h1>
        <h1 className="text-4xl md:text-6xl font-bold text-blue-900">
          us ...
        </h1>
      </main>

      {/* Sticky Footer */}
      <footer className="bg-blue-800 text-white">
        <Footer />
      </footer>
    </div>
  );
};

export default CompanyDashboard;