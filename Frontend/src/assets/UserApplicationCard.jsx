import React from "react";
import { handleError } from "../../Utilities/ToastMSG";

const UserApplicationCard = ({
  title,
  type,
  role,
  salary,
  requirements,
  created_at,
  company_name,
  location,
  resume,
  status,
  applied_at,
  seeker_name,
}) => {
  const handleDownloadResume = () => {
    if (!resume) {
      handleError("Resume is missing !");
      return;
    }

    try {
      const byteArray = new Uint8Array(resume.data);
      const blob = new Blob([byteArray], { type: "application/pdf" });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${seeker_name}_Resume`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      handleError("Error downloading file !");
    }
  };

  return (
    <>
      <div className="w-[406px]">
        <div className="w-[400px] rounded-lg border-2 bg-white shadow-lg p-6 relative overflow-hidden flex flex-col gap-4">
          <div className="absolute -top-10 -right-10 w-[100px] h-[100px] bg-primary rounded-full opacity-10"></div>
          <div className="absolute top-4 -left-4 w-[60px] h-[60px] bg-primary rounded-full opacity-5"></div>

          <h2 className="text-center font-title text-2xl relative z-10">
            Application status
          </h2>

          <div className="relative z-10 space-y-2">
            <div className="text-center">
              <h2 className="font-semibold text-lg">{title}</h2>
              <h3 className="text-neutral-500">{company_name}</h3>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm shadow-lg rounded-md p-4">
              <p>
                <strong>Role :</strong> {role}
              </p>
              <p>
                <strong>Type :</strong> {type}
              </p>
              <p>
                <strong>Salary :</strong> {salary}/year
              </p>
              <p>
                <strong>Location :</strong> {location}
              </p>
            </div>
            <div className="relative z-10 shadow-lg rounded-md p-4">
              <p>
                <strong>Posted On :</strong> {created_at}
              </p>
            </div>
            <div className="relative z-10 shadow-lg rounded-md p-4">
              <p>
                <strong>Applied On :</strong> {applied_at}
              </p>
            </div>
            <div className="relative z-10 shadow-lg rounded-md p-4">
              <p>
                <strong>Status of application :</strong> {status}
              </p>
            </div>

            <div className="relative z-10 shadow-lg rounded-md p-4 h-40 overflow-y-scroll">
              <p>
                <strong>Requirements :</strong> <br></br> {requirements}
              </p>
            </div>
          </div>

          <div className="relative z-10 shadow-lg rounded-md p-4">
            <button
              className="border-2 rounded-md border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white px-4 py-2 w-full h-full"
              onClick={handleDownloadResume}
            >
              Download Resume
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserApplicationCard;
