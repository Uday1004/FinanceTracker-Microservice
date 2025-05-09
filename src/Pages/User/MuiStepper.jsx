import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  Typography,
  Paper,
} from "@mui/material";

const steps = ["Basic Info", "Contact Info", "Confirmation"];

const Step1 = ({ formData, setFormData }) => (
  <Box>
    <Typography variant="h6">Basic Info</Typography>
    <input
      type="text"
      placeholder="First Name"
      value={formData.firstName}
      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
    />
    <input
      type="text"
      placeholder="Last Name"
      value={formData.lastName}
      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
    />
  </Box>
);

const Step2 = ({ formData, setFormData }) => (
  <Box>
    <Typography variant="h6">Contact Info</Typography>
    <input
      type="email"
      placeholder="Email"
      value={formData.email}
      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
    />
    <input
      type="tel"
      placeholder="Phone"
      value={formData.phone}
      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
    />
  </Box>
);

const Step3 = ({ formData }) => (
  <Box>
    <Typography variant="h6">Confirm Details</Typography>
    <pre>{JSON.stringify(formData, null, 2)}</pre>
  </Box>
);

const StepperForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <Step1 formData={formData} setFormData={setFormData} />;
      case 1:
        return <Step2 formData={formData} setFormData={setFormData} />;
      case 2:
        return <Step3 formData={formData} />;
      default:
        return "Unknown step";
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 500, mx: "auto", mt: 5 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box my={3}>{getStepContent(activeStep)}</Box>

      <Box display="flex" justifyContent="space-between">
        <Button disabled={activeStep === 0} onClick={handleBack} title="Back" />

        {activeStep === steps.length - 1 ? (
          <Button
            variant="contained"
            onClick={() => alert("Form Submitted ✅")}
            title="Submit"
          />
        ) : (
          <Button variant="contained" onClick={handleNext} title="Next" />
        )}
      </Box>
    </Paper>
  );
};

export default StepperForm;
