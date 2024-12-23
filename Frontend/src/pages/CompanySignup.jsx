import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CompanySignup = () => {
  const navigate = useNavigate();
  const [signupInfo, setSignupInfo] = useState({
    company_name: "",
    description: "",
    location: "",
    qualification: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(signupInfo);
    navigate("/company/login");
  };

  return (
    <>
      <Navbar />
      <div className="w-full h-screen">
        <div className="border-2 flex flex-col p-4 m-10 max-w-96 mx-auto rounded-md">
          <h1 className="font-bold text-2xl text-center mb-2">
            Company signup
          </h1>
          <form onSubmit={handleSubmit} >
            <div className="flex flex-col m-2">
              <label htmlFor="company_name">Company name :</label>
              <input
                type="text"
                name="company_name"
                autoFocus
                className="border-2 rounded-md p-2 mt-2"
                onChange={handleChange}
                value={signupInfo.company_name}
              />
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="location">Location :</label>
              <input
                type="text"
                name="location"
                className="border-2 rounded-md p-2 mt-2"
                onChange={handleChange}
                value={signupInfo.location}
              />
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="description">Description :</label>
              <input
                type="text"
                name="description"
                className="border-2 rounded-md p-2 mt-2"
                onChange={handleChange}
                value={signupInfo.description}
              />
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="username">Username :</label>
              <input
                type="text"
                name="username"
                className="border-2 rounded-md p-2 mt-2"
                onChange={handleChange}
                value={signupInfo.username}
              />
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="pass">Password :</label>
              <input
                type="password"
                name="pass"
                className="border-2 rounded-md p-2 mt-2"
                onChange={handleChange}
                value={signupInfo.password}
              />
            </div>
            <button
              className="border-blue-500 border-2 px-4 py-2 rounded-md my-4 w-full bg-blue-600 text-white hover:bg-blue-800"
              type="submit"
            >
              Signup
            </button>
          </form>
          <span className="text-center">
            Already have an account ?{" "}
            <Link className="text-blue-900" to="/company/login">
              Login
            </Link>
          </span>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CompanySignup;
