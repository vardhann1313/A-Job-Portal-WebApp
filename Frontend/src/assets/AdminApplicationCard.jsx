import React, { useState } from "react";
import { handleError, handleSuccess } from "../../Utilities/ToastMSG";
import { API_BASEURL } from "../../Utilities/constant";

const AdminApplicationCard = ({
  job_id,
  title,
  type,
  role,
  salary,
  requirements,
  created_at,
  hr_name,
  location,
  application_id,
  resume,
  status,
  applied_at,
  seeker_name,
}) => {
  const [responseStatus, setResponseStatus] = useState({
    status: status,
  });

  const [score, setScore] = useState("Get Score");
  const [isScoreButtonDisabled, setIsScoreButtonDisabled] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResponseStatus({ ...responseStatus, [name]: value });
  };

  const handleDownloadResume = () => {
    if (!resume) {
      handleError("Resume is missing!");
      return;
    }

    try {
      const byteArray = new Uint8Array(resume.data);
      const blob = new Blob([byteArray], { type: "application/pdf" });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${seeker_name}_Resume`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      handleError("Error downloading file!");
    }
  };

  const handleRespond = async () => {
    try {
      const url = `${API_BASEURL}/hr/jobs/respond${application_id}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("jwtToken"),
        },
        body: JSON.stringify(responseStatus),
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

  const getScore = async () => {
    try {
      setScore("Fetching...");
      setIsScoreButtonDisabled(true);

      const url = `${API_BASEURL}/hr/jobs/get-score${application_id}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("jwtToken"),
        },
      });

      const result = await response.json();
      const { score } = result;

      if (score !== undefined) {
        setScore(score);
      } else {
        setScore("No Score");
      }
    } catch (error) {
      setScore("Error");
      console.error(error);
    }
  };

  // Determine button color based on score
  const getScoreButtonColor = () => {
    if (score === "Fetching..." || score === "Error" || score === "No Score") {
      return "bg-gray-400 text-gray-700 cursor-not-allowed";
    }
    if (score === "Get Score") {
      return "bg-blue-300 text-white hover:bg-blue-400 cursor-pointer";
    }
    if (score < 50) {
      return "bg-red-500 text-white";
    }
    if (score >= 50 && score < 75) {
      return "bg-yellow-500 text-white";
    }
    if (score >= 75) {
      return "bg-green-500 text-white";
    }
    return "bg-gray-400 text-gray-700"; // Default fallback
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Application ID: {application_id}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
        <p>
          <strong>Job Title:</strong> {title}
        </p>
        <p>
          <strong>Applicant Name:</strong> {seeker_name}
        </p>
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
        <p>
          <strong>Posted By:</strong> {hr_name}
        </p>
        <p>
          <strong>Posted On:</strong> {created_at}
        </p>
        <p>
          <strong>Applied On:</strong> {applied_at}
        </p>
        <div className="col-span-1 sm:col-span-2">
          <label htmlFor="status" className="block font-medium text-gray-700">
            Status:
          </label>
          <select
            name="status"
            value={responseStatus.status}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="Pending">Pending</option>
            <option value="Viewed">Viewed</option>
            <option value="Rejected">Rejected</option>
            <option value="Accepted">Accepted</option>
          </select>
        </div>
        <div className="col-span-1 sm:col-span-2">
          <strong>Requirements:</strong>
          <p className="mt-2 text-gray-700">{requirements}</p>
        </div>
      </div>
      <div className="mt-6 flex justify-between">
        <button
          onClick={handleDownloadResume}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Download Resume
        </button>
        <button
          onClick={handleRespond}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
        >
          Respond
        </button>
      </div>
      <div className="mt-4">
        <button
          onClick={getScore}
          disabled={isScoreButtonDisabled}
          className={`w-full px-4 py-2 rounded-md ${getScoreButtonColor()}`}
        >
          {score}
        </button>
      </div>
    </div>
  );
};

export default AdminApplicationCard;
