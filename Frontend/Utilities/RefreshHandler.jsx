import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RefreshHandler = ({ setIsAuthenticated }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("jwtToken")) {
      setIsAuthenticated(true);
      if (localStorage.getItem("role") === "HR") {
        if (
          location.pathname === "/" ||
          location.pathname === "/company/signup" ||
          location.pathname === "/company/login" ||
          location.pathname === "/seeker/signup" ||
          location.pathname === "/seeker/login" ||
          location.pathname === "/hr/login"
        ) {
          navigate("/hr/dashboard", { replace: false });
        }
      } else if (localStorage.getItem("role") === "SEEKER") {
        if (
          location.pathname === "/" ||
          location.pathname === "/company/signup" ||
          location.pathname === "/company/login" ||
          location.pathname === "/seeker/signup" ||
          location.pathname === "/seeker/login" ||
          location.pathname === "/hr/login"
        ) {
          navigate("/seeker/dashboard", { replace: false });
        }
      } else if (localStorage.getItem("role") === "COMPANY") {
        if (
          location.pathname === "/" ||
          location.pathname === "/company/signup" ||
          location.pathname === "/company/login" ||
          location.pathname === "/seeker/signup" ||
          location.pathname === "/seeker/login" ||
          location.pathname === "/hr/login"
        ) {
          navigate("/company/dashboard", { replace: false });
        }
      }
    } else {
      navigate("/");
    }
  }, [setIsAuthenticated]);
  return null;
};

export default RefreshHandler;
