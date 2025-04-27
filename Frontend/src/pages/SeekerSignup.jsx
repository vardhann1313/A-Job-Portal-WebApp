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

    const { seeker_name, email, location, qualification, DOB, password } =
      signupInfo;
    if (
      !seeker_name ||
      !email ||
      !location ||
      !qualification ||
      !DOB ||
      !password
    ) {
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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-300">
        <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
            Seeker Signup
          </h1>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="seeker_name"
                className="block text-sm font-medium text-blue-800 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                name="seeker_name"
                autoFocus
                className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                value={signupInfo.seeker_name}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-blue-800 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                value={signupInfo.email}
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
            <div>
              <label
                htmlFor="qualification"
                className="block text-sm font-medium text-blue-800 mb-2"
              >
                Qualification
              </label>
              <input
                type="text"
                name="qualification"
                className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                value={signupInfo.qualification}
              />
            </div>
            <div>
              <label
                htmlFor="DOB"
                className="block text-sm font-medium text-blue-800 mb-2"
              >
                Date of Birth
              </label>
              <input
                type="date"
                name="DOB"
                className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                value={signupInfo.DOB}
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
            <Link className="font-medium text-blue-900 hover:underline" to="/seeker/login">
              Login
            </Link>
          </p>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default SeekerSignup;
