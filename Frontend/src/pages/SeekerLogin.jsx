import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../../Utilities/ToastMSG";

import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { API_BASEURL } from "../../Utilities/constant";

const SeekerLogin = () => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email || !password) {
      handleError("All fields are required!");
      return;
    }

    try {
      const url = `${API_BASEURL}/seeker/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();
      const { message, success, error, name, role, jwtToken } = result;

      if (success) {
        handleSuccess(message);
        localStorage.setItem("jwtToken", jwtToken);
        localStorage.setItem("loggedInUser", name);
        localStorage.setItem("role", role);

        setTimeout(() => {
          navigate("/seeker/dashboard");
        }, 2000);
      } else if (error) {
        const details = error?.details[0]?.message;
        handleError(details || "Something went wrong!");
      } else {
        handleError(message);
      }
    } catch (err) {
      handleError("Network error. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
        <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6 sm:p-8">
          <h1 className="font-bold text-2xl sm:text-3xl text-center mb-6 text-blue-800">
            Seeker Login
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                autoFocus
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                value={loginInfo.email}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                value={loginInfo.password}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              Login
            </button>
          </form>
          <p className="text-center mt-4 text-sm text-gray-700">
            Don't have an account?{" "}
            <Link to="/seeker/signup" className="text-blue-700 font-semibold hover:underline">
              Signup
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default SeekerLogin;
