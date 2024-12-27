import React, { useEffect, useState } from "react";

import CompanyNavbar from "../Navbar/CompanyNavbar";
import { handleError, handleSuccess } from "../../../Utilities/ToastMSG";
import HRCard from "../../assets/HRCard";

const AllHR = () => {
  const [data, setData] = useState([]);

  const getHR = async () => {
    try {
      const jwtToken = localStorage.getItem("jwtToken");
      if (!jwtToken) {
        handleError("Authorization token is missing!");
        return;
      }

      const url = "http://localhost:8080/api/company/getallhr";
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
          created_at={person.created_at}
        />
      ));
    } else {
      return <h1 className="md:text-4xl text-2xl text-blue-800 text-center font-semibold my-4 mx-4">No HR found!</h1>;
    }
  };

  return (
    <>
      <CompanyNavbar />

      <div className="max-w-sm md:max-w-7xl mx-auto">
        <h1 className="md:text-3xl text-2xl text-blue-800 font-semibold my-4 mx-4">
          List of all HRs . . .
        </h1>

        <div className="my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <DisplayCard data={data} />
        </div>
      </div>
    </>
  );
};

export default AllHR;
