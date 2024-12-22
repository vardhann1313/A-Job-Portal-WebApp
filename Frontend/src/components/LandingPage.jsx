import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <section className="h-screen">
        <div className="flex flex-col">
          <h1 className="font-bold text-blue-900 text-6xl text-center mt-20">
            Unlock your potential <br /> <span>with us</span>
          </h1>
          <div className="flex gap-2 m-4 p-4 justify-center">
          <Link to='/company/signup' className="inline-block border-2 rounded bg-white-900 px-5 py-3 text-sm font-medium text-blue hover:text-white transition hover:bg-blue-900 focus:outline-none focus:ring">
              For companies
            </Link>
            <Link to='/seeker/signup' className="inline-block border-2 rounded bg-white-900 px-5 py-3 text-sm font-medium text-blue hover:text-white transition hover:bg-blue-900 focus:outline-none focus:ring">
              For seekers
            </Link>
            <Link to='/hr/login' className="inline-block border-2 rounded bg-white-900 px-5 py-3 text-sm font-medium text-blue hover:text-white transition hover:bg-blue-900 focus:outline-none focus:ring">
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
