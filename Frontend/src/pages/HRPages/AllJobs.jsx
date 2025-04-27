import React, { useState, useEffect } from "react";

import { handleError } from "../../../Utilities/ToastMSG";
import HRNavbar from "../Navbar/HRNavbar";
import Footer from "../../components/Footer";
import AdminJobCard from "../../assets/AdminJobCard";

import { API_BASEURL } from "../../../Utilities/constant";

const AllJobs = () => {
  const [data, setData] = useState([]);

  // Fetching all jobs
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

  // Display job cards
  const DisplayCard = ({ data }) => {
    if (data && data.length > 0) {
      return data.map((job) => (
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
      <HRNavbar />
      <section className="bg-gradient-to-b from-blue-100 to-blue-300 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-center text-3xl md:text-4xl font-bold text-blue-800 mb-8">
            All Jobs
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DisplayCard data={data} />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AllJobs;
