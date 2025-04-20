import React, { useState } from "react";

import HRNavbar from "../Navbar/HRNavbar";
import { handleError, handleSuccess } from "../../../Utilities/ToastMSG";
import { useNavigate } from "react-router-dom";

import {API_BASEURL} from "../../../Utilities/constant"

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

      <section className="bg-gray-100">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
            <h1 className="text-xl md:text-3xl text-blue-900 text-center mb-4 font-semibold">
              Job Post
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm border-2"
                  placeholder="Title"
                  type="text"
                  name="title"
                  onChange={handleChange}
                  value={jobData.title}
                />
              </div>

              <div>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm border-2"
                  placeholder="Job role"
                  type="text"
                  name="role"
                  onChange={handleChange}
                  value={jobData.role}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm border-2"
                    placeholder="Location"
                    type="text"
                    name="location"
                    onChange={handleChange}
                    value={jobData.location}
                  />
                </div>

                <div>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm border-2"
                    placeholder="Salary in numbers"
                    type="number"
                    name="salary"
                    onChange={handleChange}
                    value={jobData.salary}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="p-2 my-4" htmlFor="type">
                    Job type :
                  </label>
                  <select
                    className="w-full rounded-lg border-gray-200 p-3 text-sm border-2"
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
                  <label className="p-2 my-4" htmlFor="type">
                    Is active :
                  </label>
                  <select
                    className="w-full rounded-lg border-gray-200 p-3 text-sm border-2"
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
                  className="w-full rounded-lg border-gray-200 p-3 text-sm border-2"
                  placeholder="Requirements and Responsibilities"
                  rows="8"
                  name="requirements"
                  onChange={handleChange}
                  value={jobData.requirements}
                ></textarea>
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="inline-block w-full rounded-lg border-2 border-blue-800 hover:bg-blue-800 hover:text-white px-5 py-3 font-medium text-blue-800 sm:w-auto"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddJob;
