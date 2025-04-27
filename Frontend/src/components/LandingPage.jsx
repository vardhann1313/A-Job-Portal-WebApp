import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Sticky Navbar */}
      <header className="sticky top-0 z-50 bg-blue-800 text-white">
        <Navbar />
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col justify-center items-center bg-gradient-to-b from-blue-100 to-blue-300">
        <section className="text-center px-6">
          <h1 className="font-extrabold text-5xl md:text-6xl lg:text-7xl leading-tight text-blue-900">
            Unlock Your Potential <br />
            <span className="text-blue-700">With Us</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-blue-800">
            Join our platform to connect with top companies and talented job seekers.
          </p>
        </section>
        <div className="flex flex-wrap gap-4 mt-10 justify-center">
          <Link
            to="/company/signup"
            className="inline-block border-2 border-blue-700 rounded-lg bg-blue-700 px-6 py-3 text-sm md:text-base font-medium text-white hover:bg-blue-800 transition focus:outline-none focus:ring-4 focus:ring-blue-400"
          >
            For Companies
          </Link>
          <Link
            to="/seeker/signup"
            className="inline-block border-2 border-blue-700 rounded-lg bg-blue-700 px-6 py-3 text-sm md:text-base font-medium text-white hover:bg-blue-800 transition focus:outline-none focus:ring-4 focus:ring-blue-400"
          >
            For Seekers
          </Link>
          <Link
            to="/hr/login"
            className="inline-block border-2 border-blue-700 rounded-lg bg-blue-700 px-6 py-3 text-sm md:text-base font-medium text-white hover:bg-blue-800 transition focus:outline-none focus:ring-4 focus:ring-blue-400"
          >
            For HRs
          </Link>
        </div>
      </main>

      {/* Sticky Footer */}
      <footer className="sticky bottom-0 bg-blue-800 text-white">
        <Footer />
      </footer>
    </div>
  );
};

export default LandingPage;