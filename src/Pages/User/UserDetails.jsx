import React, { useState } from "react";
import Button from "../../Components/Button";
import { useNavigate, useParams } from "react-router-dom";
// import Input from "../../Components/Input";

const MultiStepForm = () => {
  // const [FixedIncome, setFixedIncome] = useState("");
  // const [FixedSaving, setFixedSaving] = useState("");
  // const [AlertAmount, setAlertAmount] = useState("");
  // const [MonthDate, SetMonthDate] = useState("");
  // const [Profile, setProfile] = useState("");
  const [DailyExpense, setDailyExpense] = useState([]);
  const [DailyEarning, setDailyEarning] = useState([]);
  const [check, setCheck] = useState(false);
  const [step, setStep] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    FixedIncome: "",
    FixedSaving: "",
    AlertAmount: "",
    MonthDate: "",
    Profile: null,
  });

  const details = {
    fixedincome: formData.FixedIncome,
    fixedesaving: formData.FixedSaving,
    alertamount: formData.AlertAmount,
    monthdate: formData.MonthDate,
    dailyexpense: DailyExpense,
    dailyearning: DailyEarning,
  };

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  // console.log("Form Data", formData);

  // const nextStep = () => {
  //   const { FixedIncome, FixedSaving } = formData;

  //   if (!FixedIncome.trim() || !FixedSaving.trim()) {
  //     alert("Please fill in all required fields.");
  //     return;
  //   }

  //   setStep(step + 1); // or however you increment the step
  // };
  // const prevStep = () => setStep((prev) => prev - 1);

  const nextStep = () => {
    setStep(step + 1);
  };
  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/details/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(
          "Details added successfully!@, Please Login to reach out Dashboard"
        );
        const id = localStorage.getItem("regi_id");
        navigate(`/Dashboard/${id}`);
      })
      .catch((err) => {
        alert("Something went wrong", err);
      });
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-4 col-md-6 mx-auto">
        <div className="h2   text-primary">Profile & Utilies Preferences</div>
        <p className="text-muted small mb-1">
          This is a short product description.
        </p>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <div className="mb-4 mt-3">
                <h5 className="m-0">
                  Fixed Monthly Income{" "}
                  <span className="text-danger small">*</span>
                </h5>
                {/* <p className="text-muted mt-0">Enter your full name</p> */}
                <p className="text-muted small mb-1">
                  This is a short product description.
                </p>
                <input
                  type="text"
                  className="form-control mt-2"
                  name="FixedIncome"
                  value={formData.FixedIncome}
                  onChange={handleChange}
                  // required
                />
              </div>

              <div className="mb-4 mt-3">
                <h5 className="m-0">
                  Fixed Monthly Expense{" "}
                  <span className="text-danger small">*</span>
                </h5>
                {/* <p className="text-muted mt-0">Enter your full name</p> */}
                <p className="text-muted small mb-1">
                  This is a short product description.
                </p>
                <input
                  type="text"
                  className="form-control mt-2"
                  name="FixedSaving"
                  value={formData.FixedSaving}
                  onChange={handleChange}
                  // required
                />
              </div>

              <Button
                type="button"
                className="btn btn-primary"
                onClick={nextStep}
                title="Next"
              />
            </>
          )}

          {step === 2 && (
            <>
              <div className="mb-4 mt-3 ranges" data-mdb-range-init>
                <h5 className="m-0">
                  Start Date of the Month Expense{" "}
                  <span className="text-danger small">*</span>
                </h5>
                {/* <p className="text-muted mt-0">Enter your full name</p> */}
                <p className="text-muted small mb-1">
                  This is a short product description.
                </p>
                <input
                  type="range"
                  className="form-range mt-2"
                  name="MonthDate"
                  min="1"
                  max="31"
                  id="customRange1"
                  value={formData.MonthDate}
                  onChange={handleChange}
                  required
                />
                <p className="text-muted small">
                  Selected day: {formData.MonthDate}
                </p>
              </div>

              <div className="mb-4 mt-3">
                <h5 className="m-0">
                  Alert Amount
                  <span className="text-muted small mx-2">(optional)</span>
                </h5>
                {/* <p className="text-muted mt-0">Enter your full name</p> */}
                <p className="text-muted small mb-1">
                  This is a short product description.
                </p>
                <input
                  type="text"
                  className="form-control mt-2"
                  name="AlertAmount"
                  value={formData.AlertAmount}
                  onChange={handleChange}
                />
              </div>
              {/* <Input title="Phone" type='tel' value={formData.phone} onChange={handleChange}     /> */}

              <div className="d-flex justify-content-between">
                <Button
                  type="button"
                  className="btn btn-secondary"
                  onClick={prevStep}
                  title="Back"
                />

                <Button
                  type="button"
                  className="btn btn-primary"
                  title="Next"
                  onClick={nextStep}
                />
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <div className="mb-4 mt-3 text-center">
                <h5 className="m-0">
                  Upload Your Profile Picture{" "}
                  <span className="text-danger small">(Optional)</span>
                </h5>
                <p className="text-muted small mb-2">
                  Please upload a clear, front-facing photo.
                </p>

                {/* Hidden File Input */}
                <input
                  type="file"
                  name="Profile"
                  accept="image/*"
                  id="profileInput"
                  onChange={handleChange}
                  style={{ display: "none" }}
                />

                {/* Circular Preview with Camera Icon */}
                <label htmlFor="profileInput" style={{ cursor: "pointer" }}>
                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle bg-light border"
                    style={{
                      width: "120px",
                      height: "120px",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {formData.Profile ? (
                      <img
                        src={URL.createObjectURL(formData.Profile)}
                        alt="Preview"
                        className="img-fluid"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <i
                        className="bi bi-camera"
                        style={{ fontSize: "2rem", color: "#6c757d" }}
                      ></i>
                    )}
                  </div>
                </label>
              </div>

              {/* <Input title="Phone" type='tel' value={formData.phone} onChange={handleChange}     /> */}

              <div className="d-flex justify-content-between">
                <Button
                  type="button"
                  className="btn btn-secondary"
                  onClick={prevStep}
                  title="Back"
                />

                <Button
                  type="button"
                  className="btn btn-primary"
                  title="Next"
                  onClick={nextStep}
                />
              </div>
            </>
          )}
          {step === 4 && (
            <>
              <div className="d-flex justify-content-center align-items-center">
                <div className="mb-4 mt-3 w-100">
                  <h5 className="mb-3 text-center">Confirm Details</h5>

                  <div className="row mb-3">
                    <div className="col-6">
                      <div className="h5 text-primary">Fixed Income</div>
                      <div className="text-muted h6">
                        {formData.FixedIncome}
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="h5 text-primary">Fixed Saving</div>
                      <div className="text-muted h6">
                        {formData.FixedSaving}
                      </div>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-6">
                      <div className="h5 text-primary">
                        Month Start of Expense Date
                      </div>
                      <div className="text-muted h6">{formData.MonthDate}</div>
                    </div>
                    <div className="col-6">
                      <div className="h5 text-primary">Alert Amount</div>
                      <div className="text-muted h6">
                        {formData.AlertAmount ? formData.AlertAmount : "N/A"}
                      </div>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-12">
                      <div className="form-check d-flex align-items-center">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="termsCheckbox"
                          checked={check}
                          onChange={() => setCheck(!check)}
                        />
                        <label
                          htmlFor="termsCheckbox"
                          className="text-muted small mx-2"
                        >
                          I agree to the terms and conditions
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-between">
                <Button
                  type="button"
                  className="btn btn-secondary"
                  onClick={prevStep}
                  title="Back"
                />
                <Button
                  type="submit"
                  className="btn btn-success"
                  title="Submit"
                  onClick={handleSubmit}
                />
              </div>
            </>
          )}
        </form>
        <h5 className="mb-2 mt-3 text-center">Step {step} of 4</h5>
      </div>
    </div>
  );
};

export default MultiStepForm;
