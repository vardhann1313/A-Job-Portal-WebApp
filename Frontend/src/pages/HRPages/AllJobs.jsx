import React, {useState, useEffect} from "react";

import {handleError, handleSuccess} from '../../../Utilities/ToastMSG'

import HRNavbar from "../Navbar/HRNavbar";
import AdminJobCard from "../../assets/AdminJobCard";

import {API_BASEURL} from "../../../Utilities/constant"

const AllJobs = () => {
  const [data, setData] = useState([]);

  const getJobs = async () => {
    try {
      const jwtToken = localStorage.getItem("jwtToken");
      if (!jwtToken) {
        handleError("Authorization token is missing!");
        return;
      }

      const url = `${API_BASEURL}/hr/jobs/getJobs`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: jwtToken,
        },
      });

      const result = await response.json();
      const { message, success, error, data } = result;

      if (success) {
        setData(data);
      } else if (!success) {
        handleError(message);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      }
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  const DisplayCard = ({ data }) => {
    if (data && data.length > 0) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {data.map((job) => (
            <AdminJobCard
              key={job.job_id}
              job_id={job.job_id}
              title={job.title}
              type={job.type}
              location={job.location}
              requirements={job.requirements}
              role={job.role}
              salary={job.salary}
              is_active={job.is_active}
              created_at={job.created_at.substring(0, 10)}
            />
          ))}
        </div>
      );
    } else {
      return (
        <div className="w-full flex justify-center items-center min-h-[50vh]">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-blue-800 text-center font-semibold my-4 mx-4">
            No Job found!
          </h1>
        </div>
      );
    }
  };

  return (
    <>
      <HRNavbar />
      <div className="container mx-auto my-6 sm:my-8 md:my-10 px-4 sm:px-6 lg:px-8">
        <DisplayCard data={data} />
      </div>
    </>
  );
};

export default AllJobs;