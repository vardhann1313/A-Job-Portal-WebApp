import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";

import HRNavbar from "../Navbar/HRNavbar";
import AdminApplicationCard from "../../assets/AdminApplicationCard";

import { API_BASEURL } from "../../../Utilities/constant";

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

  return (
    <>
      <HRNavbar />
      <section className="bg-gradient-to-b from-blue-100 to-blue-300 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-center text-3xl md:text-4xl font-bold text-blue-800 mb-8">
            All Applications
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data && data.length > 0 ? (
              data.map((apps) => (
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
              ))
            ) : (
              <h1 className="md:text-4xl text-2xl text-blue-800 text-center font-semibold my-4 mx-4">
                No Application found!
              </h1>
            )}
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default Application;