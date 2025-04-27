import React, { useEffect, useState } from "react";

import CompanyNavbar from "../Navbar/CompanyNavbar";
import Footer from "../../components/Footer";
import HRCard from "../../assets/HRCard";

import { handleError } from "../../../Utilities/ToastMSG";
import { API_BASEURL } from "../../../Utilities/constant";

const AllHR = () => {
  const [data, setData] = useState([]);

  const getHR = async () => {
    try {
      const jwtToken = localStorage.getItem("jwtToken");
      if (!jwtToken) {
        handleError("Authorization token is missing!");
        return;
      }

      const url = `${API_BASEURL}/company/getallhr`;
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
    getHR();
  }, []);

  return (
    <>
      <CompanyNavbar />
      <section className="bg-gradient-to-b from-blue-100 to-blue-300 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-blue-800 mb-6">
            List of all HRs
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((hr) => (
              <HRCard
                key={hr.hr_id}
                hr_id={hr.hr_id}
                hr_name={hr.hr_name}
                email={hr.email}
                created_at={hr.created_at.substring(0, 10)}
                refreshHRList={getHR} // Pass the API call function as a prop
              />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AllHR;