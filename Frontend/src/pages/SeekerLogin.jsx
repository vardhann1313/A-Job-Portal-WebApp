import React, {useState} from "react";

import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SeekerLogin = () => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(loginInfo);
    navigate("/seeker/dashboard");
  };

  return (
    <>
      <Navbar />
      <div className="w-full h-screen">
        <div className="border-2 flex flex-col p-4 m-10 max-w-96 mx-auto rounded-md">
          <h1 className="font-bold text-2xl text-center mb-2">Seeker login</h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col m-2">
              <label htmlFor="email">Email :</label>
              <input
                type="email"
                name="email"
                autoFocus
                className="border-2 rounded-md p-2 mt-2"
                onChange={handleChange}
                value={loginInfo.email}
              />
            </div>
            <div className="flex flex-col m-2">
              <label htmlFor="password">Password :</label>
              <input
                type="password"
                name="password"
                className="border-2 rounded-md p-2 mt-2"
                onChange={handleChange}
                value={loginInfo.password}
              />
            </div>
            <button
              className="border-blue-500 border-2 px-4 py-2 rounded-md my-4 w-full bg-blue-600 text-white hover:bg-blue-800"
              type="submit"
            >
              Login
            </button>
          </form>
          <span className="text-center">
            Don't have an account ?{" "}
            <Link className="text-blue-900" to="/seeker/signup">
              Signup
            </Link>
          </span>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SeekerLogin;
