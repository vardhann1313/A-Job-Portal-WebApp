import React, { useState } from "react";
import { ToastContainer } from "react-toastify";

import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { handleError, handleSuccess } from "../../Utilities/ToastMSG";

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
      const url = "http://localhost:8080/api/company/login";
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
        localStorage.setItem("role", role)

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
      <div className="w-full h-screen">
        <div className="border-2 flex flex-col p-4 m-10 max-w-96 mx-auto rounded-md">
          <h1 className="font-bold text-2xl text-center mb-2">Company login</h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col m-2">
              <label htmlFor="username">Username :</label>
              <input
                type="text"
                name="username"
                autoFocus
                className="border-2 rounded-md p-2 mt-2"
                onChange={handleChange}
                value={loginInfo.username}
              />
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="password">Password :</label>
              <input
                type="password"
                name="password"
                className="border-2 rounded-md p-2 mt-2"
                onChange={handleChange}
                value={loginInfo.password}
              />
            </div>
            <button
              className="border-blue-500 border-2 px-4 py-2 rounded-md my-4 w-full bg-blue-600 text-white hover:bg-blue-800"
              type="submit"
            >
              Login
            </button>
          </form>
          <span className="text-center">
            Don't have an account ?
            <Link className="text-blue-900" to="/company/signup">
              Signup
            </Link>
          </span>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default CompanyLogin;
