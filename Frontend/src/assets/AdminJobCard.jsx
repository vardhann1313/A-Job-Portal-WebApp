import React, { useState } from "react";

import {handleError, handleSuccess} from '../../Utilities/ToastMSG'
import {API_BASEURL} from "../../Utilities/constant"

const AdminJobCard = ({
  job_id,
  title,
  location,
  type,
  role,
  salary,
  requirements,
  is_active,
  created_at,
}) => {
  const [jobData, setJobData] = useState({
    title: title,
    location: location,
    type: type,
    role: role,
    salary: salary,
    requirements: requirements,
    is_active: is_active === 1 ? true : false
  });

  // Handle updation of job -----------------
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

  const handleSubmit = async (e) => {
    e.preventDefault()

    const confirm = prompt("Are you sure !! \nType YES or NO");
    if (confirm === "NO") {
      return;
    }
    if (confirm === "YES") {
      try {
        const url = `${API_BASEURL}/hr/jobs/updateJob${job_id}`;
        const response = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("jwtToken"),
          },
          body: JSON.stringify(jobData)
        });

        const result = await response.json();
        const { message, success, error } = result;
        console.log(jobData)
        console.log(result)

        if (success) {
          handleSuccess(message);
        } else if (!success) {
          handleError(message);
        } else if (error) {
          const details = error?.details[0].message;
          handleError(details);
        }
      } catch (error) {
        handleError(error);
      }
    }
  };

  // Handle deletion of Job
  const deleteJob = async () => {
    const confirm = prompt("Are you sure !! \nType YES or NO");
    if (confirm === "NO") {
      return;
    }
    if (confirm === "YES") {
      try {
        const url = `${API_BASEURL}/hr/jobs/deleteJob${job_id}`;
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("jwtToken"),
          },
        });

        const result = await response.json();
        const { message, success, error } = result;

        if (success) {
          handleSuccess(message);
        } else if (!success) {
          handleError(message);
        } else if (error) {
          const details = error?.details[0].message;
          handleError(details);
        }
      } catch (error) {
        handleError(error);
      }
    }
  };

  return (
    <>
      <section className="bg-gray-100">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
            <h1 className="text-xl md:text-3xl text-blue-900 text-center mb-4 font-semibold">
              Job Id : {job_id} || Created at : {created_at}
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
                  Save
                </button>
                <button
                  type="button"
                  className="inline-block w-full rounded-lg border-2 border-red-800 hover:bg-red-800 hover:text-white px-5 py-3 font-medium text-red-800 sm:w-auto mx-4"
                  onClick={deleteJob}
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminJobCard;
