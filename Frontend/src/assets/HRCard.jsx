import React from "react";
import { handleSuccess } from "../../Utilities/ToastMSG";

const HRCard = ({ hr_id, hr_name, email, created_at }) => {
  const deleteHR = async () => {
    const confirm = prompt("Are you sure !! \nType YES or NO");
    if (confirm === "NO") {
      return;
    }
    if (confirm === "YES") {
      try {
        const url = `http://localhost:8080/api/company/deletehr${hr_id}`;
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
        } else if (!success) {
          handleError(message);
        } else if (error) {
          const details = error?.details[0].message;
          handleError(details);
        }
      } catch (error) {
        handleError(error);
      }
    }
  };

  return (
    <>
      <section className="max-w-96 rounded-lg border border-gray-200 p-4 shadow-sm transition hover:shadow-lg sm:p-6">
        <div className="flex gap-4 m-2">
          <div className=" border-2 rounded p-2 text-white">
            <img
              className="w-4 h-4"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE-zwWv8bp1lh4vW8nzkdyXESlZV0Qdciwlw&s"
              alt=""
            />
          </div>

          <h3 className="mt-0.5 text-lg font-medium text-gray-900">
            Name : {hr_name}
          </h3>
        </div>

        <div className="flex flex-col gap-2 m-2">
          <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
            Id : {hr_id}
          </p>
          <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
            Email : {email}
          </p>
          <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
            Created At : {created_at}
          </p>
        </div>

        <button
          onClick={deleteHR}
          className="border-2 border-red-600 rounded-md m-2 py-2 px-4 group mt-4 inline-flex items-center gap-1 text-sm font-medium text-red-600 hover:bg-red-400 hover:text-white"
        >
          Delete HR
        </button>
      </section>
    </>
  );
};

export default HRCard;
