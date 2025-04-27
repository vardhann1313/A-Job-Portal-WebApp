import React, { useState } from "react";
import { handleError, handleSuccess } from "../../Utilities/ToastMSG";
import { API_BASEURL } from "../../Utilities/constant";

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

  // Handle resume upload
  const handleResume = (e) => {
    const resumeInput = e.target.files[0];
    if (resumeInput) {
      setResume(resumeInput);
    }
  };

  // Handle job application
  const handleApply = async (e) => {
    e.preventDefault();
    try {
      if (!resume) {
        handleError("Resume is mandatory!");
        return;
      }

      const formData = new FormData();
      formData.append("resume", resume);

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
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition w-full max-w-md mx-auto">
      <h2 className="text-center font-semibold text-xl text-gray-800 mb-4">
        Job Posting
      </h2>
      <div className="text-center mb-4">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-gray-500">{company_name}</p>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
        <p>
          <strong>Role:</strong> {role}
        </p>
        <p>
          <strong>Type:</strong> {type}
        </p>
        <p>
          <strong>Salary:</strong> {salary}/year
        </p>
        <p>
          <strong>Location:</strong> {location}
        </p>
      </div>
      <div className="text-sm text-gray-600 mb-4">
        <p>
          <strong>Posted On:</strong> {created_at}
        </p>
      </div>
      <div className="text-sm text-gray-600 mb-4 max-h-40 overflow-y-auto">
        <p>
          <strong>Requirements:</strong> <br /> {requirements}
        </p>
      </div>
      <form onSubmit={handleApply} encType="multipart/form-data" className="mb-4">
        <label
          htmlFor="resume"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Upload Resume (PDF only)
        </label>
        <input
          type="file"
          name="resume"
          id="resume"
          accept=".pdf"
          className="block w-full text-sm text-gray-700 border rounded-md p-2 focus:outline-blue-500 mb-4"
          onChange={handleResume}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
        >
          Apply Now
        </button>
      </form>
    </div>
  );
};

export default UserJobCard;
