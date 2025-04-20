import React, { useState } from "react";

import CompanyNavbar from "../Navbar/CompanyNavbar";
import { handleError, handleSuccess } from "../../../Utilities/ToastMSG";
import { useNavigate } from "react-router-dom";

import {API_BASEURL} from "../../../Utilities/constant"

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
      console.log(result);

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
      <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </aside>

          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="border-2 p-6 rounded-md max-w-xl lg:max-w-3xl">
              <h1 className="text-center mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Add HR
              </h1>

              <p className="text-center mt-4 leading-relaxed text-blue-500">
                Add your HRs to start hiring . . .
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-8 flex flex-col gap-4 w-80"
              >
                <div className="">
                  <label
                    htmlFor="hr_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name :
                  </label>

                  <input
                    type="text"
                    name="hr_name"
                    className="p-2 mt-1 w-full rounded-md border-2 border-gray-100 bg-white text-sm text-gray-700 shadow-sm"
                    onChange={handleChange}
                    value={hrInfo.hr_name}
                  />
                </div>

                <div className="">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email :
                  </label>

                  <input
                    type="email"
                    name="email"
                    className="p-2 mt-1 w-full rounded-md border-2 border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    onChange={handleChange}
                    value={hrInfo.email}
                  />
                </div>

                <div className="">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password :
                  </label>

                  <input
                    type="password"
                    name="password"
                    className="p-2 mt-1 w-full rounded-md border-2 border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    onChange={handleChange}
                    value={hrInfo.password}
                  />
                </div>

                <button className="hover:text-white hover:bg-blue-600 text-blue-600 border-blue-400 border-2 rounded-md mt-4 p-2">
                  ADD
                </button>
              </form>
            </div>
          </main>
        </div>
      </section>
    </>
  );
};

export default AddHR;
