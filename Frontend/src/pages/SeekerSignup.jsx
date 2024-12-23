import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SeekerSignup = () => {
  const navigate = useNavigate()
  const [signupInfo, setSignupInfo] = useState({
    seeker_name: "",
    email: "",
    location: "",
    qualification: "",
    DOB: "",
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
    navigate('/seeker/login')
  };

  return (
    <>
      <Navbar />
      <div className="w-full h-screen">
        <div className="border-2 flex flex-col p-4 m-10 max-w-96 mx-auto rounded-md">
          <h1 className="font-bold text-2xl text-center mb-2">Seeker signup</h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col m-2">
              <label htmlFor="seeker_name">Name :</label>
              <input
                type="text"
                name="seeker_name"
                autoFocus
                className="border-2 rounded-md p-2 mt-2"
                onChange={handleChange}
                value={signupInfo.name}
              />
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="email">Email :</label>
              <input
                type="text"
                name="email"
                className="border-2 rounded-md p-2 mt-2"
                onChange={handleChange}
                value={signupInfo.email}
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
              <label htmlFor="qualification">Qualification :</label>
              <input
                type="text"
                name="qualification"
                className="border-2 rounded-md p-2 mt-2"
                onChange={handleChange}
                value={signupInfo.qualification}
              />
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="DOB">Date of birth :</label>
              <input
                type="date"
                name="DOB"
                className="border-2 rounded-md p-2 mt-2"
                onChange={handleChange}
                value={signupInfo.dob}
              />
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="password">Password :</label>
              <input
                type="password"
                name="password"
                className="border-2 rounded-md p-2 mt-2"
                onChange={handleChange}
                value={signupInfo.pass}
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
            <Link className="text-blue-900" to="/seeker/login">
              Login
            </Link>
          </span>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SeekerSignup;
