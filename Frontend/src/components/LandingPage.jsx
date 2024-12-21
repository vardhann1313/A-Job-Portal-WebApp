import React from "react";

const LandingPage = () => {
  return (
    <div>
      <header className="border-2 border-gray-200 bg-gray-100">
        <div className="flex items-start gap-4 flex-row justify-between px-4 py-6 lg:mx-6">
          <h1 className="text-2xl font-bold text-blue-900 sm:text-3xl">
            Job Portal
          </h1>

          <button
            className="inline-block rounded bg-blue-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
            type="button"
          >
            Login | HR
          </button>
        </div>
      </header>
      <section className="h-screen">
        <div className="flex flex-col">
          <h1 className="font-bold text-blue-900 text-6xl text-center mt-20">
            Unlock your potential <br /> <span>with us</span>
          </h1>
          <div className="flex gap-2 m-4 p-4 justify-center">
            <button className="inline-block rounded bg-blue-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring">
              For companies
            </button>
            <button className="inline-block border-2 rounded bg-white-900 px-5 py-3 text-sm font-medium text-blue hover:text-white transition hover:bg-blue-900 focus:outline-none focus:ring">
              For seekers
            </button>
          </div>
        </div>
      </section>
      <footer className="bg-gray-100 border-gray-200 border-2">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <img src="logo.png" alt="Logo" />
            <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
              Copyright &copy; 2024. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
