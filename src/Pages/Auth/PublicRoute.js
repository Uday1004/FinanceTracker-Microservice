import React, { useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Make sure jwtDecode is imported properly
import { useNavigate, useParams } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedId = localStorage.getItem("log_id");
    const regiID = localStorage.getItem("regi_id");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp > currentTime) {
          // Validate the ID before navigating
          if (storedId && storedId !== "null" && storedId !== "undefined") {
            navigate(`/Dashboard/${storedId}`);
          } else if (regiID && regiID !== "null" && regiID !== "undefined") {
            navigate(`/Dashboard/${storedId}`);
          } else {
            console.warn("No valid user ID found");
            navigate("/login");
          }
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("log_id");
        }
      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("log_id");
        console.error("Invalid token", error);
      }
    }
  }, [navigate]);

  return children;
};

export default PublicRoute;
