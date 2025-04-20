import React, {useState, useEffect} from "react";

import { handleError, handleSuccess } from "../../../Utilities/ToastMSG";

import AdminJobCard from "../../assets/AdminJobCard";
import CompanyNavbar from "../Navbar/CompanyNavbar";

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
      return data.map((job) => (
        <AdminJobCard
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
    <CompanyNavbar />
      <div className="my-10 p-4 ">
        <DisplayCard data={data} />
      </div>
    </>
  );
};

export default AllJobs;
