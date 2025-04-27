import React, { useState } from "react";
import { handleSuccess, handleError } from "../../Utilities/ToastMSG";
import { API_BASEURL } from "../../Utilities/constant";

const HRCard = ({ hr_id, hr_name, email, created_at, refreshHRList }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const deleteHR = async () => {
    try {
      const url = `${API_BASEURL}/company/deletehr${hr_id}`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("jwtToken"),
        },
      });

      const result = await response.json();
      const { message, success, error } = result;

      if (success) {
        handleSuccess(message);
        refreshHRList(); // Re-call the parent API to update the state
      } else if (!success) {
        handleError(message);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      }
    } catch (error) {
      handleError(error);
    }
    setShowConfirm(false); // Close the confirmation popup
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition">
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-blue-500 text-white rounded-full p-3">
          <img
            className="w-6 h-6"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE-zwWv8bp1lh4vW8nzkdyXESlZV0Qdciwlw&s"
            alt="HR Icon"
          />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">Name: {hr_name}</h3>
      </div>
      <div className="text-sm text-gray-600 space-y-2">
        <p>
          <strong>ID:</strong> {hr_id}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Created At:</strong> {created_at}
        </p>
      </div>
      <button
        onClick={() => setShowConfirm(true)}
        className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
      >
        Delete HR
      </button>

      {/* Confirmation Popup */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Are you sure you want to delete this HR?
            </h2>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition"
              >
                No
              </button>
              <button
                onClick={deleteHR}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HRCard;
