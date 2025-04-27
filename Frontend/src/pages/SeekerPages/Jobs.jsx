import React, { useEffect, useState } from "react";

import SeekerNavbar from "../Navbar/SeekerNavbar";
import Footer from "../../components/Footer";
import UserJobCard from "../../assets/UserJobCard";

import { handleError } from "../../../Utilities/ToastMSG";
import { ToastContainer } from "react-toastify";
import { API_BASEURL } from "../../../Utilities/constant";

const Jobs = () => {
  const [data, setData] = useState([]);

  // Fetching all jobs
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

  // Display job cards
  const DisplayJobData = ({ data }) => {
    if (data && data.length > 0) {
      return data.map((job) => (
        <UserJobCard
          key={job.job_id} // Ensure a unique key
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

  return (
    <>
      <SeekerNavbar />
      <section className="bg-gradient-to-b from-blue-100 to-blue-300 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-center text-3xl md:text-4xl font-bold text-blue-800 mb-8">
            All Jobs
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DisplayJobData data={data} />
          </div>
        </div>
      </section>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default Jobs;
