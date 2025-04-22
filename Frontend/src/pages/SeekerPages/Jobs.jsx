import React, { useEffect, useState } from "react";

import SeekerNavbar from "../Navbar/SeekerNavbar";
import { handleError } from "../../../Utilities/ToastMSG";

import UserJobCard from "../../assets/UserJobCard";
import { ToastContainer } from "react-toastify";

import { API_BASEURL } from "../../../Utilities/constant";

const Jobs = () => {
  const [data, setData] = useState([]);

  const getAllJobs = async () => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (!jwtToken) {
      handleError("Token is required !");
      return;
    }

    try {
      const url = `${API_BASEURL}/seeker/getAllJobs`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: jwtToken,
        },
      });

      const result = await response.json();
      const { success, message, error, data } = result;

      if (success) {
        setData(data);
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

  useEffect(() => {
    getAllJobs();
  }, []);

  const DisplayJobData = ({ data }) => {
    if (data && data.length > 0) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {data.map((job) => (
            <UserJobCard
              key={job.job_id}
              job_id={job.job_id}
              title={job.title}
              location={job.location}
              type={job.type}
              role={job.role}
              salary={job.salary}
              requirements={job.requirements}
              created_at={job.created_at.substring(0, 10)}
              company_name={job.company_name}
            />
          ))}
        </div>
      );
    } else {
      return (
        <h1 className="text-center text-lg sm:text-xl md:text-2xl lg:text-3xl text-blue-800 font-semibold my-8">
          No Job found!
        </h1>
      );
    }
  };

  return (
    <>
      <SeekerNavbar />
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-10 py-6">
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl text-blue-800 font-bold mb-8">
          All Jobs
        </h1>
        <DisplayJobData data={data} />
      </div>
      <ToastContainer />
    </>
  );
};

export default Jobs;
