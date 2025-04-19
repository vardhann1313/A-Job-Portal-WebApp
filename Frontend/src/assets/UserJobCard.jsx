import React, { useState } from "react";

import { handleError, handleSuccess } from "../../Utilities/ToastMSG";
import {API_BASEURL} from "../../Utilities/constant"

const UserJobCard = ({
  job_id,
  title,
  location,
  type,
  role,
  salary,
  requirements,
  created_at,
  company_name,
}) => {
  const [resume, setResume] = useState(null);

  // Handle resume upload -------------------------------------
  const handleResume = (e) => {
    const resumeInput = e.target.files[0];
    if (resumeInput) {
      console.log(resumeInput);
      setResume(resumeInput);
    }
  };

  // Handling application -------------------------------------
  const handleApply = async (e) => {
    e.preventDefault()
    try {
      if (!resume) {
        handleError("Resume is mandatory !");
        return;
      }

      const formData = new FormData();
      formData.append('resume', resume);

      const url = `${API_BASEURL}/hr/jobs/apply${job_id}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          authorization: localStorage.getItem("jwtToken"),
        },
        body: formData,
      });

      const result = await response.json();
      const { success, message, error } = result;

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
      <div className="w-[406px]">
        <div className="w-[400px] rounded-lg border-2 bg-white shadow-lg p-6 relative overflow-hidden flex flex-col gap-4">
          <div className="absolute -top-10 -right-10 w-[100px] h-[100px] bg-primary rounded-full opacity-10"></div>
          <div className="absolute top-4 -left-4 w-[60px] h-[60px] bg-primary rounded-full opacity-5"></div>

          <h2 className="text-center font-title text-2xl relative z-10">
            Job Posting
          </h2>

          <div className="relative z-10 space-y-2">
            <div className="text-center">
              <h2 className="font-semibold text-lg">{title}</h2>
              <h3 className="text-neutral-500">{company_name}</h3>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm shadow-lg rounded-md p-4">
              <p>
                <strong>Role :</strong> {role}
              </p>
              <p>
                <strong>Type :</strong> {type}
              </p>
              <p>
                <strong>Salary :</strong> {salary}/year
              </p>
              <p>
                <strong>Location :</strong> {location}
              </p>
            </div>
            <div className="relative z-10 shadow-lg rounded-md p-4">
              <p>
                <strong>Posted On :</strong> {created_at}
              </p>
            </div>

            <div className="relative z-10 shadow-lg rounded-md p-4 h-40 overflow-y-scroll">
              <p>
                <strong>Requirements :</strong> <br></br> {requirements}
              </p>
            </div>
          </div>

          <div className="relative z-10 shadow-lg rounded-md p-4">
            <form onSubmit={handleApply} encType="multipart/form-data">
              <label
                htmlFor="resume"
                className="block mb-2 text-sm font-medium text-neutral-700"
              >
                Upload Resume in pdf
              </label>
              <input
                type="file"
                name="resume"
                id="resume"
                accept=".pdf"
                className="block w-full text-sm text-neutral-700 border rounded-md p-2 focus:outline-primary-500 mb-4"
                onChange={handleResume}
              />
              <div className="relative text-center">
                <button
                  type="submit"
                  className="bg-primary border-blue-800 border-2 text-blue-800 rounded-md px-6 py-2 hover:bg-blue-600 hover:text-white"
                >
                  Apply Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserJobCard;
