import React, { useState } from "react";
import { ToastContainer } from "react-toastify";

import { handleError, handleSuccess } from "../../Utilities/ToastMSG";

import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { API_BASEURL } from "../../Utilities/constant";

const SeekerSignup = () => {
  const navigate = useNavigate();
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { seeker_name, email, location, qualification, DOB, password } = signupInfo;
    if (!seeker_name || !email || !location || !qualification || !DOB || !password) {
      handleError("All fields are required !");
      return;
    }

    try {
      const url = `${API_BASEURL}/seeker/signup`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });

      const result = await response.json();
      const { message, success, error } = result;

      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/seeker/login");
        }, 2000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md border-2 p-6 rounded-md shadow-sm bg-white">
          <h1 className="font-bold text-2xl text-center mb-4">Seeker signup</h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-4">
              <label htmlFor="seeker_name">Name :</label>
              <input
                type="text"
                name="seeker_name"
                autoFocus
                className="border-2 rounded-md p-2 mt-1"
                onChange={handleChange}
                value={signupInfo.seeker_name}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="email">Email :</label>
              <input
                type="text"
                name="email"
                className="border-2 rounded-md p-2 mt-1"
                onChange={handleChange}
                value={signupInfo.email}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="location">Location :</label>
              <input
                type="text"
                name="location"
                className="border-2 rounded-md p-2 mt-1"
                onChange={handleChange}
                value={signupInfo.location}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="qualification">Qualification :</label>
              <input
                type="text"
                name="qualification"
                className="border-2 rounded-md p-2 mt-1"
                onChange={handleChange}
                value={signupInfo.qualification}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="DOB">Date of birth :</label>
              <input
                type="date"
                name="DOB"
                className="border-2 rounded-md p-2 mt-1"
                onChange={handleChange}
                value={signupInfo.DOB}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="password">Password :</label>
              <input
                type="password"
                name="password"
                className="border-2 rounded-md p-2 mt-1"
                onChange={handleChange}
                value={signupInfo.password}
              />
            </div>
            <button
              className="border-blue-500 border-2 px-4 py-2 rounded-md w-full bg-blue-600 text-white hover:bg-blue-800 transition-all"
              type="submit"
            >
              Signup
            </button>
          </form>
          <span className="text-center block mt-4">
            Already have an account?{" "}
            <Link className="text-blue-900 font-medium" to="/seeker/login">
              Login
            </Link>
          </span>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default SeekerSignup;
