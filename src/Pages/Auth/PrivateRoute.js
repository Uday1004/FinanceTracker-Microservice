import React, { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const regi_id = localStorage.getItem("regi_id");

    // If token doesn't exist, redirect to login
    if (!regi_id) {
      navigate("/login");
      return;
    } else {
      try {
        const decodedToken = jwtDecode(token); // Decode the JWT token

        const currentTime = Date.now() / 1000; // Current time in seconds

        // Check if the token has expired
        if (decodedToken.exp < currentTime) {
          localStorage.removeItem("token"); // Remove the expired token
          navigate("/login");
        }
      } catch (error) {
        // If token is invalid or not a valid JWT format
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  }, [navigate]);

  // If token is valid and not expired, render the children (protected route)
  return children;
};

export default ProtectedRoute;
