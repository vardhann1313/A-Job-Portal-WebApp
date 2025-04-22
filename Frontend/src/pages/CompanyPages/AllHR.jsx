import React, { useEffect, useState } from "react";

import CompanyNavbar from "../Navbar/CompanyNavbar";
import { handleError, handleSuccess } from "../../../Utilities/ToastMSG";
import HRCard from "../../assets/HRCard";

import {API_BASEURL} from "../../../Utilities/constant"

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

  const DisplayCard = ({ data }) => {
    // console.log(data)
    if (data && data.length > 0) {
      return data.map((person) => (
        <HRCard 
          key={person.hr_id}
          hr_id={person.hr_id}
          hr_name={person.hr_name}
          email={person.email}
          created_at={person.created_at.substring(0, 10)}
        />
      ));
    } else {
      return <h1 className="text-xl sm:text-2xl md:text-4xl text-blue-800 text-center font-semibold my-4 px-2">No HR found!</h1>;
    }
  };

  return (
    <>
    <CompanyNavbar />
      <div className="w-full px-4 sm:px-6 md:max-w-7xl mx-auto">
        <h1 className="text-xl sm:text-2xl md:text-3xl text-blue-800 font-semibold my-3 md:my-4">
          List of all HRs . . .
        </h1>

        <div className="my-4 sm:my-6 md:my-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          <DisplayCard data={data} />
        </div>
      </div>
    </>
  );
};

export default AllHR;