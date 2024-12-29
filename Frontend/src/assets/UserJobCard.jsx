import React from "react";

const UserJobCard = () => {
  return (
    <>
      <div id="webcrumbs">
        <div className="w-[400px] rounded-lg bg-white shadow-lg p-6 relative overflow-hidden flex flex-col gap-8">
          <div className="absolute -top-10 -right-10 w-[100px] h-[100px] bg-primary rounded-full opacity-10"></div>
          <div className="absolute top-4 -left-4 w-[60px] h-[60px] bg-primary rounded-full opacity-5"></div>

          <h2 className="font-title text-2xl mb-4 relative z-10">
            Job Posting
          </h2>

          <div className="relative z-10 space-y-4">
            <div>
              <h3 className="font-semibold text-lg">Software Developer</h3>
              <p className="text-sm text-neutral-500">TechCorp Inc.</p>
            </div>

            <div className="grid grid-cols-2 gap-y-2 text-sm">
              <p>
                <strong>Role:</strong> Frontend Developer
              </p>
              <p>
                <strong>Type:</strong> Full-time
              </p>
              <p>
                <strong>Salary:</strong> $70,000 - $90,000/year
              </p>
              <p>
                <strong>Location:</strong> Remote
              </p>
            </div>
          </div>

          <div className="relative z-10">
            <label
              htmlFor="resume"
              className="block mb-2 text-sm font-medium text-neutral-700"
            >
              Upload Resume
            </label>
            <input
              type="file"
              id="resume"
              name="resume"
              className="block w-full text-sm text-neutral-700 border rounded-md p-2 focus:outline-primary-500"
            />
          </div>

          <div className="relative z-10 text-right">
            <button className="bg-primary text-white rounded-md px-6 py-2 hover:bg-primary-600">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserJobCard;
