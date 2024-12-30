import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import SeekerNavbar from "../Navbar/SeekerNavbar";
import UserApplicationCard from "../../assets/UserApplicationCard";
import { handleError } from "../../../Utilities/ToastMSG";

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
      const url = "http://localhost:8080/api/seeker/getApplications";
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
      return data.map((apps) => (
        <UserApplicationCard
          title={apps.title}
          type={apps.type}
          role={apps.role}
          salary={apps.salary}
          requirements={apps.requirements}
          created_at={apps.created_at.substring(0, 10)}
          company_name={apps.company_name}
          location={apps.location}
          resume={apps.resume}
          status={apps.status}
          applied_at={apps.applied_at.substring(0, 10)}
          seeker_name={apps.seeker_name}
        />
      ));
    } else {
      return (
        <h1 className="md:text-4xl text-2xl text-blue-800 text-center font-semibold my-4 mx-4">
          No Application found!
        </h1>
      );
    }
  };

  return (
    <>
      <SeekerNavbar />
      <div className="md:max-w-[1400px] mx-auto">
        <h1 className="text-center mt-8 text-2xl md:text-4xl text-blue-800 font-semibold">
          All applications
        </h1>
        <div className="my-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <DisplayApplicationData data={data} />
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Application;
