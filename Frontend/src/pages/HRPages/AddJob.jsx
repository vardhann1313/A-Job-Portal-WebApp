import React, { useState } from "react";

import HRNavbar from "../Navbar/HRNavbar";
import Footer from "../../components/Footer";

import { handleError, handleSuccess } from "../../../Utilities/ToastMSG";
import { API_BASEURL } from "../../../Utilities/constant";

const AddJob = () => {
  const [jobData, setJobData] = useState({
    title: "",
    location: "",
    type: "Full-time",
    role: "",
    salary: 0,
    requirements: "",
    is_active: true,
  });

  // Taking user input and storing it -----
  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyJobDAta = { ...jobData };

    if (name === "is_active" && value === "false") {
      copyJobDAta[name] = false;
    } else if (name === "is_active" && (value === "true" || value == true)) {
      copyJobDAta[name] = true;
    } else {
      copyJobDAta[name] = value;
    }
    setJobData(copyJobDAta);
  };

  // Handling form submit -----
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, location, role, requirements, is_active, type, salary } =
      jobData;

    if (!title || !location || !requirements || !role) {
      handleError("All fields are mandatory !");
    }

    const jwtToken = localStorage.getItem("jwtToken");
    if (!jwtToken) {
      handleError("Jwt Token needed !");
      return;
    }

    try {
      const url = `${API_BASEURL}/hr/jobs/addJob`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: jwtToken,
        },
        body: JSON.stringify(jobData),
      });

      const result = await response.json();

      const { message, success, error } = result;

      if (success) {
        handleSuccess(message);
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
      <HRNavbar />

      <section className="bg-gradient-to-b from-blue-100 to-blue-300 min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-blue-800 text-center mb-6">
              Add a New Job
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  className="w-full rounded-lg border border-gray-300 p-3 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-blue-500"
                  placeholder="Job Title"
                  type="text"
                  name="title"
                  onChange={handleChange}
                  value={jobData.title}
                />
              </div>

              <div>
                <input
                  className="w-full rounded-lg border border-gray-300 p-3 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-blue-500"
                  placeholder="Job Role"
                  type="text"
                  name="role"
                  onChange={handleChange}
                  value={jobData.role}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-blue-500"
                    placeholder="Location"
                    type="text"
                    name="location"
                    onChange={handleChange}
                    value={jobData.location}
                  />
                </div>

                <div>
                  <input
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-blue-500"
                    placeholder="Salary (in numbers)"
                    type="number"
                    name="salary"
                    onChange={handleChange}
                    value={jobData.salary}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Type
                  </label>
                  <select
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-blue-500"
                    name="type"
                    onChange={handleChange}
                    value={jobData.type}
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Is Active
                  </label>
                  <select
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-blue-500"
                    name="is_active"
                    onChange={handleChange}
                    value={jobData.is_active}
                  >
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                </div>
              </div>

              <div>
                <textarea
                  className="w-full rounded-lg border border-gray-300 p-3 text-sm shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-blue-500"
                  placeholder="Requirements and Responsibilities"
                  rows="6"
                  name="requirements"
                  onChange={handleChange}
                  value={jobData.requirements}
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-3 px-5 rounded-lg font-medium hover:bg-blue-600 transition"
                >
                  Add Job
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AddJob;
