import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <section className="min-h-screen px-4 md:px-8">
        <div className="flex flex-col">
          <h1 className="font-bold text-blue-900 text-3xl md:text-5xl lg:text-6xl text-center mt-10 md:mt-20">
            Unlock your potential <br /> <span>with us</span>
          </h1>
          <div className="flex flex-col sm:flex-row gap-2 m-2 md:m-4 p-2 md:p-4 justify-center">
            <Link to='/company/signup' className="inline-block border-2 rounded bg-white-900 px-3 py-2 md:px-5 md:py-3 text-sm font-medium text-blue hover:text-white transition hover:bg-blue-900 focus:outline-none focus:ring text-center">
              For companies
            </Link>
            <Link to='/seeker/signup' className="inline-block border-2 rounded bg-white-900 px-3 py-2 md:px-5 md:py-3 text-sm font-medium text-blue hover:text-white transition hover:bg-blue-900 focus:outline-none focus:ring text-center">
              For seekers
            </Link>
            <Link to='/hr/login' className="inline-block border-2 rounded bg-white-900 px-3 py-2 md:px-5 md:py-3 text-sm font-medium text-blue hover:text-white transition hover:bg-blue-900 focus:outline-none focus:ring text-center">
              For HRs
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default LandingPage;