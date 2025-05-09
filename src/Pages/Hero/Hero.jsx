import React, { useState } from "react";
import { Link } from "react-router-dom";

import { MdOutlineWbSunny } from "react-icons/md";
import { RiMoonClearLine } from "react-icons/ri";

function Hero() {
  const [mode, setMode] = useState(false);

  function toggleMode() {
    setMode(!mode);
  }
  return (
    <div>
      <div className={`vh-100 ${mode ? "bg-black" : "bg-whie"}`}>
        <header className="container py-4">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <div
                className="rounded-circle bg-primary"
                style={{ width: "16px", height: "16px" }}
              ></div>
              <span
                className={`fs-4 fw-semibold ${
                  mode ? "text-light" : "text-dark"
                }`}
              >
                FI-Track
              </span>
            </div>
            <nav className="d-none d-md-flex gap-4 fw-medium text-secondary">
              <a
                href="#"
                className="text-decoration-none text-secondary hover-text-dark"
              >
                How it works
              </a>
              <a
                href="#"
                className="text-decoration-none text-secondary hover-text-dark"
              >
                Technology
              </a>
              <a
                href="#"
                className="text-decoration-none text-secondary hover-text-dark"
              >
                Price
              </a>
            </nav>
            <div className="">
              <a
                href="#"
                className="d-none d-md-inline-block px-4 mx-2 py-2 bg-light text-primary rounded shadow-sm fw-medium text-decoration-none"
              >
                Start for Free
              </a>
              <a
                href="#"
                className="d-none d-md-inline-block px-4 py-2 bg-light text-primary rounded shadow-sm fw-medium text-decoration-none"
                onClick={toggleMode}
              >
                {mode ? <MdOutlineWbSunny /> : <RiMoonClearLine />}
              </a>
            </div>
          </div>
        </header>

        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-md-6">
              <h1
                className={`display-5 fw-bold ${
                  mode ? "text-light" : "text-dark"
                }`}
              >
                Make managing <br />
                your finances <span className="text-primary">easier</span>{" "}
                <br />
                with AI
              </h1>
              <p className={`${mode ? "text-light" : "text-muted"} mt-3`}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div className="mt-4 d-flex gap-3">
                <Link
                  to="/login"
                  className={`btn ${mode ? "btn-light" : "btn-dark"} btn-lg`}
                >
                  Get Started
                </Link>
                <a href="#" className={"btn btn-outline-secondary btn-lg"}>
                  See Demo
                </a>
                {/* className=
                {`btn ${
                  mode ? "btn-outline-light" : "btn-outline-secondary"
                } btn-lg`} */}
              </div>
            </div>

            <div className="col-md-6 position-relative">
              <div
                className="bg-warning rounded-3 position-absolute"
                style={{
                  width: "160px",
                  height: "160px",
                  top: "40px",
                  left: "-40px",
                  zIndex: 1,
                }}
              ></div>
              <div
                className="bg-primary bg-opacity-25 rounded-circle position-absolute"
                style={{
                  width: "80px",
                  height: "80px",
                  top: "80px",
                  left: "128px",
                  zIndex: 1,
                }}
              ></div>
              <div
                className="border border-secondary rounded-circle position-absolute"
                style={{
                  width: "48px",
                  height: "48px",
                  bottom: "40px",
                  left: "64px",
                  zIndex: 1,
                }}
              ></div>
              <div
                className="bg-info bg-opacity-50 rounded-circle position-absolute"
                style={{
                  width: "40px",
                  height: "40px",
                  bottom: "80px",
                  right: "64px",
                  zIndex: 1,
                }}
              ></div>

              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6v93uCXnFSRc57Og2PVYOSinP-OfIhyKqQQ&s"
                className="img-fluid position-relative z-2"
                alt="Finance Illustration"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
