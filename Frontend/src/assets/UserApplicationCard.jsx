import React from "react";
import { useState } from "react";
import { handleError } from "../../Utilities/ToastMSG";
import { API_BASEURL } from "../../Utilities/constant";

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
  const [questions, setQuestions] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handlePrepare = async () => {
    if (!requirements) {
      handleError("Job description is missing !");
      return;
    }
    setLoading(true);

    try {
      const url = `${API_BASEURL}/seeker/generateQuestions`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("jwtToken"),
        },
        body: JSON.stringify({
          jd: requirements,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setQuestions(data.questions);
      setShowModal(true); // show the modal
      console.log("Questions generated:", data);
      // Optionally display questions or redirect somewhere
    } catch (error) {
      console.error("Error generating questions:", error);
      handleError("Failed to generate questions. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg flex flex-col items-center gap-4 shadow-lg">
            <svg
              className="animate-spin h-10 w-10 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            <p className="text-sm text-gray-700">
              Generating your interview questions...
            </p>
          </div>
        </div>
      )}
      {showModal && questions && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-h-[90vh] overflow-y-auto w-[90vw] md:w-[800px] shadow-xl relative">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Practice Questions
            </h2>
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-4 text-gray-600 hover:text-black text-xl"
            >
              &times;
            </button>
            <div className="space-y-4">
              {Object.values(questions).map((q, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded shadow">
                  <p className="font-semibold">
                    Q{index + 1}: {q.question}
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    <strong>Suggested Answer:</strong> {q.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
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
                <strong>Requirements :</strong> <br /> {requirements}
              </p>
            </div>
          </div>

          <button
            className="border-2 rounded-md border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white px-4 py-2 w-full h-full"
            onClick={handlePrepare}
          >
            Prepare
          </button>

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
