import React, { useState } from "react";

import { ToastContainer } from 'react-toastify'
import { handleSuccess, handleError } from '../../Utilities/ToastMSG'

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const HRLogin = () => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(loginInfo);
    handleSuccess("Login successfully !")
    navigate("/hr/dashboard");
  };

  return (
    <>
      <Navbar />
      <div className="w-full h-screen">
        <div className="border-2 flex flex-col p-4 m-10 max-w-96 mx-auto rounded-md">
          <h1 className="font-bold text-2xl text-center mb-2">HR login</h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col m-2">
              <label htmlFor="email">Email :</label>
              <input
                type="email"
                name="email"
                autoFocus
                className="border-2 rounded-md p-2 mt-2"
                onChange={handleChange}
                value={loginInfo.email}
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
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default HRLogin;
