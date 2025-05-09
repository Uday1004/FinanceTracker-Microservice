import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Hero from "./Pages/Hero/Hero";
import Signup from "./Pages/Auth/Signup";
import Login from "./Pages/Auth/Login";
import Demo from "./Pages/Garbage/Demo";
import PublicRoute from "./Pages/Auth/PublicRoute";
import MultiStepForm from "./Pages/User/UserDetails";
import StepperForm from "./Pages/User/MuiStepper";
import Landing from "./Pages/Landing/Landing";
import Dashboard from "./Pages/Garbage/Dashboard";
import ProtectedRoute from "./Pages/Auth/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/demo" element={<Demo />} />
        <Route
          path="/Dashboard/:id"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="confirm/details/:id" element={<MultiStepForm />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
