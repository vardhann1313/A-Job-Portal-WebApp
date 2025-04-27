import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { handleError, handleSuccess } from "../../Utilities/ToastMSG";
import { API_BASEURL } from "../../Utilities/constant";

const CompanyLogin = () => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = loginInfo;
    if (!username || !password) {
      handleError("All fields are required !");
    }

    try {
      const url = `${API_BASEURL}/company/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();
      const { success, message, name, role, jwtToken, error } = result;

      if (success) {
        handleSuccess(message);
        localStorage.setItem("jwtToken", jwtToken);
        localStorage.setItem("loggedInUser", name);
        localStorage.setItem("role", role);

        setTimeout(() => {
          navigate("/company/dashboard");
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
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
            Company Login
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-blue-800"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                autoFocus
                className="w-full mt-2 p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                value={loginInfo.username}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-blue-800"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                className="w-full mt-2 p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                value={loginInfo.password}
              />
            </div>
            <button
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
              type="submit"
            >
              Login
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-blue-800">
            Don't have an account?{" "}
            <Link className="font-medium text-blue-900 hover:underline" to="/company/signup">
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

export default CompanyLogin;