import React from "react";
import SeekerNavbar from "../Navbar/SeekerNavbar";
import Footer from "../../components/Footer";

const SeekerDashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky Navbar */}
      <header className="sticky top-0 z-50">
        <SeekerNavbar />
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col justify-center items-center bg-gradient-to-b from-blue-100 to-blue-300">
        <h1 className="text-4xl md:text-6xl font-bold text-blue-800 mb-4">
          Start applying and get hired
        </h1>
        <h1 className="text-4xl md:text-6xl font-bold text-blue-900">
          with us ...
        </h1>
      </main>

      {/* Sticky Footer */}
      <footer className="bg-blue-800 text-white">
        <Footer />
      </footer>
    </div>
  );
};

export default SeekerDashboard;