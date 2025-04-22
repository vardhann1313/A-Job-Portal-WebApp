import React, {useState, useEffect} from "react";
import { ToastContainer } from "react-toastify";

import HRNavbar from "../Navbar/HRNavbar";
import AdminApplicationCard from "../../assets/AdminApplicationCard";

import {API_BASEURL} from "../../../Utilities/constant"

const Application = () => {
  const [data, setData] = useState([]);

  // Fetching all applications ------------------
  const getApplications = async () => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (!jwtToken) {
      handleError("Token is required !");
      return;
    }

    try {
      const url = `${API_BASEURL}/hr/jobs/getAllApplications`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: jwtToken,
        },
      });
      const result = await response.json();
      const { success, message, data, error } = result;

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
    getApplications();
  }, []);

  // Displaying all applications ----------------
  const DisplayApplicationData = ({ data }) => {
    if (data && data.length > 0) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 w-full px-4 sm:px-6 lg:px-8">
          {data.map((apps) => (
            <AdminApplicationCard
              key={apps.application_id}
              job_id={apps.job_id}
              title={apps.title}
              type={apps.type}
              role={apps.role}
              salary={apps.salary}
              requirements={apps.requirements}
              created_at={apps.created_at.substring(0, 10)}
              hr_name={apps.hr_name}
              application_id={apps.application_id}
              location={apps.location}
              resume={apps.resume}
              status={apps.status}
              applied_at={apps.applied_at.substring(0, 10)}
              seeker_name={apps.seeker_name}
            />
          ))}
        </div>
      );
    } else {
      return (
        <div className="w-full flex justify-center items-center min-h-[40vh]">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-blue-800 text-center font-semibold my-4 mx-4">
            No Application found!
          </h1>
        </div>
      );
    }
  };

  return (
    <>
      <HRNavbar />
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6">
        <h1 className="text-center mt-6 sm:mt-8 md:mt-10 text-xl sm:text-2xl md:text-3xl lg:text-4xl text-blue-800 font-semibold">
          All applications
        </h1>
        <div className="my-6 sm:my-8 md:my-10">
          <DisplayApplicationData data={data} />
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Application;