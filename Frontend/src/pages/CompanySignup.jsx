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
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { company_name, description, location, username, password } =
      signupInfo;

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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-300">
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
            Company Signup
          </h1>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="company_name"
                className="block text-sm font-medium text-blue-800 mb-2"
              >
                Company Name
              </label>
              <input
                type="text"
                name="company_name"
                autoFocus
                className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                value={signupInfo.company_name}
              />
            </div>
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-blue-800 mb-2"
              >
                Location
              </label>
              <input
                type="text"
                name="location"
                className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                value={signupInfo.location}
              />
            </div>
            <div className="md:col-span-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-blue-800 mb-2"
              >
                Description
              </label>
              <textarea
                name="description"
                rows="3"
                className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                onChange={handleChange}
                value={signupInfo.description}
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-blue-800 mb-2"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                value={signupInfo.username}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-blue-800 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                value={signupInfo.password}
              />
            </div>
            <div className="md:col-span-2">
              <button
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
                type="submit"
              >
                Signup
              </button>
            </div>
          </form>
          <p className="mt-6 text-center text-sm text-blue-800">
            Already have an account?{" "}
            <Link className="font-medium text-blue-900 hover:underline" to="/company/login">
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