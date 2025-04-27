import React, { useState } from "react";

import CompanyNavbar from "../Navbar/CompanyNavbar";
import Footer from "../../components/Footer";

import { handleError, handleSuccess } from "../../../Utilities/ToastMSG";
import { useNavigate } from "react-router-dom";
import { API_BASEURL } from "../../../Utilities/constant";

const AddHR = () => {
  const navigate = useNavigate();

  const [hrInfo, setHRInfo] = useState({
    hr_name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    const copyInfo = { ...hrInfo };
    copyInfo[name] = value;
    setHRInfo(copyInfo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { hr_name, email, password } = hrInfo;
    if (!hr_name || !email || !password) {
      handleError("All fields are required !");
      return;
    }

    try {
      const url = `${API_BASEURL}/hr/signup`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          authorization: localStorage.getItem("jwtToken"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(hrInfo),
      });

      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
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
      <CompanyNavbar />
      <section className="bg-gradient-to-b from-blue-100 to-blue-300 min-h-screen flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
          <h1 className="text-center text-3xl font-bold text-blue-800 mb-4">
            Add HR
          </h1>
          <p className="text-center text-blue-600 mb-6">
            Add your HRs to start hiring . . .
          </p>
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="hr_name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                name="hr_name"
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                value={hrInfo.hr_name}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                value={hrInfo.email}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                value={hrInfo.password}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
            >
              Add HR
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AddHR;