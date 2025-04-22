import React, { useState } from "react";
import { ToastContainer } from "react-toastify";

import { handleError, handleSuccess } from "../../Utilities/ToastMSG";

import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { API_BASEURL } from "../../Utilities/constant";

const CompanySignup = () => {
  const navigate = useNavigate();
  const [signupInfo, setSignupInfo] = useState({
    company_name: "",
    description: "",
    location: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { company_name, description, location, username, password } = signupInfo;

    if (!company_name || !description || !location || !username || !password) {
      return handleError("All fields are required !");
    }

    try {
      const url = `${API_BASEURL}/company/signup`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupInfo),
      });

      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/company/login");
        }, 2000);
      } else if (error) {
        const details = error?.details[0]?.message;
        handleError(details || "Something went wrong!");
      } else {
        handleError(message);
      }
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
        <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6 sm:p-8">
          <h1 className="font-bold text-2xl sm:text-3xl text-center mb-6 text-blue-800">
            Company Signup
          </h1>
          <form onSubmit={handleSubmit}>
            {[
              { label: "Company name", name: "company_name" },
              { label: "Location", name: "location" },
              { label: "Description", name: "description" },
              { label: "Username", name: "username" },
              { label: "Password", name: "password", type: "password" },
            ].map(({ label, name, type = "text" }) => (
              <div className="mb-4" key={name}>
                <label htmlFor={name} className="block font-medium text-gray-700 mb-1">
                  {label}
                </label>
                <input
                  type={type}
                  name={name}
                  autoFocus={name === "company_name"}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                  value={signupInfo[name]}
                />
              </div>
            ))}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              Signup
            </button>
          </form>
          <p className="text-center text-sm mt-6">
            Already have an account?{" "}
            <Link to="/company/login" className="text-blue-600 font-medium hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default CompanySignup;
