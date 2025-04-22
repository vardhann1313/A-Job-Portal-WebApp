import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import SeekerNavbar from "../Navbar/SeekerNavbar";
import UserApplicationCard from "../../assets/UserApplicationCard";
import { handleError } from "../../../Utilities/ToastMSG";
import { API_BASEURL } from "../../../Utilities/constant";

const Application = () => {
  const [data, setData] = useState([]);

  const getApplications = async () => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (!jwtToken) {
      handleError("Token is required !");
      return;
    }

    try {
      const url = `${API_BASEURL}/seeker/getApplications`;
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

  const DisplayApplicationData = ({ data }) => {
    if (data && data.length > 0) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((apps, index) => (
            <UserApplicationCard key={index} data={apps} />
          ))}
        </div>
      );
    } else {
      return (
        <div className="text-center text-gray-600 py-8 text-lg">
          No Application found!
        </div>
      );
    }
  };

  return (
    <>
      <SeekerNavbar />
      <div className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-6 max-w-screen-xl mx-auto">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-6 text-center">
          All Applications
        </h2>

        <DisplayApplicationData data={data} />
      </div>
      <ToastContainer />
    </>
  );
};

export default Application;
