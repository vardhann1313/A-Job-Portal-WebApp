import React, { useState } from "react";
import { handleError, handleSuccess } from "../../Utilities/ToastMSG";

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
  // handle change to bind status -----------------
  const [responseStatus, setResponseStatus] = useState({
    status: status,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyResponseData = { ...responseStatus };
    copyResponseData[name] = value;
    setResponseStatus(copyResponseData);
  };

  // download resume function ---------------------
  const handleDownloadResume = () => {
    if (!resume) {
      handleError("Resume is missing !");
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
      handleError("Error downloading file !");
    }
  };

  // respond on application function --------------
  const handleRespond = async () => {
    try {
      const url = `http://localhost:8080/api/hr/jobs/respond${application_id}`;
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

  return (
    <>
      <div className="w-[406px]">
        <div className="w-[400px] rounded-lg border-2 bg-white shadow-lg p-6 relative overflow-hidden flex flex-col gap-4">
          <div className="absolute -top-10 -right-10 w-[100px] h-[100px] bg-primary rounded-full opacity-10"></div>
          <div className="absolute top-4 -left-4 w-[60px] h-[60px] bg-primary rounded-full opacity-5"></div>

          <h2 className="text-center font-title text-2xl relative z-10">
            Application status || Id {application_id}
          </h2>

          <div className="relative z-10 space-y-2">
            <div className="text-center">
              <h2 className="font-semibold text-lg">
                {title} || Id {job_id}
              </h2>
              <h3 className="text-neutral-500">
                Applicant name : {seeker_name}
              </h3>
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
                <strong>Posted By :</strong> {hr_name}
              </p>
            </div>
            <div className="relative z-10 shadow-lg rounded-md p-4">
              <p>
                <strong>Posted On :</strong> {created_at}
              </p>
            </div>
            <div className="relative z-10 shadow-lg rounded-md p-4">
              <p>
                <strong>Applied On :</strong> {applied_at}
              </p>
            </div>
            <div className="relative z-10 shadow-lg rounded-md p-4">
              <div>
                <label className="p-2 my-4" htmlFor="type">
                  Status :
                </label>
                <select
                  className="w-full rounded-lg border-gray-200 p-3 text-sm border-2"
                  name="status"
                  onChange={handleChange}
                  value={responseStatus.status}
                >
                  <option value="Pending">Pending</option>
                  <option value="Viewed">Viewed</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Accepted">Accepted</option>
                </select>
              </div>
            </div>

            <div className="relative z-10 shadow-lg rounded-md p-4 h-40 overflow-y-scroll">
              <p>
                <strong>Requirements :</strong> <br></br> {requirements}
              </p>
            </div>
          </div>

          <div className="relative z-10 shadow-lg rounded-md p-4 flex gap-2">
            <button
              className="border-2 rounded-md border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white px-4 py-2 w-[45%] h-full"
              onClick={handleDownloadResume}
            >
              Resume
            </button>
            <button
              className="border-2 rounded-md border-red-800 text-red-800 hover:bg-red-800 hover:text-white px-4 py-2 w-[45%] h-full"
              onClick={handleRespond}
            >
              Respond
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminApplicationCard;
