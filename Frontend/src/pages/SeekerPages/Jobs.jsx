import React, { useEffect, useState } from "react";

import SeekerNavbar from "../Navbar/SeekerNavbar";
import { handleError } from "../../../Utilities/ToastMSG";

import UserJobCard from "../../assets/UserJobCard";
import { ToastContainer } from "react-toastify";

const Jobs = () => {
  const [data, setData] = useState([]);

  // Fetching all jobs ------------------------------
  const getAllJobs = async () => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (!jwtToken) {
      handleError("Token is required !");
      return;
    }

    try {
      const url = "http://localhost:8080/api/seeker/getAllJobs";
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
  // ----------------------------------------------
  // Display job cards ----------------------------
  const DisplayJobData = ({ data }) => {
    if (data && data.length > 0) {
      return data.map((job) => (
        <UserJobCard
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
      ));
    } else {
      return (
        <h1 className="md:text-4xl text-2xl text-blue-800 text-center font-semibold my-4 mx-4">
          No Job found!
        </h1>
      );
    }
  };
  // ------------------------------------------------

  return (
    <>
      <SeekerNavbar />
      <div className="md:max-w-[1400px] mx-auto">
        <h1 className="text-center mt-8 text-2xl md:text-4xl text-blue-800 font-semibold">All jobs </h1>
        <div className="my-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <DisplayJobData data={data} />
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Jobs;
