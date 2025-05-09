import React, { useState } from "react";
import Form from "../../Components/Form";
import Button from "../../Components/Button";
import Input from "../../Components/Input";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { ImLinkedin } from "react-icons/im";
import { Link, useNavigate, useParams } from "react-router-dom";

function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5500/loginuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: Email, password: Password }),
      });
      const data = await response.json();

      if (response.status === 200) {
        if (!data._id) {
          throw new Error("User ID not received from server");
        }

        localStorage.setItem("token", data.token);
        localStorage.setItem("log_id", data._id);

        // Verify ID before navigating
        if (data._id && data._id !== "null" && data._id !== "undefined") {
          navigate(`/Dashboard/${data._id}`);
        } else {
          throw new Error("Invalid user ID received");
        }
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login error: " + error.message);
    } finally {
      setEmail("");
      setPassword("");
    }
  };

  return (
    <section className="">
      <div
        className="px-4 py-5 px-md-5 text-center text-lg-start vh-100"
        style={{ backgroundColor: "hsl(0, 0%, 96%)" }}
      >
        <div className="container">
          <div className="row gx-lg-5 gap-5 align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <h1 className="my-5 display-3 fw-bold ls-tight">
                The best offer <br />
                <span className="text-primary">for your business</span>
              </h1>
              <p style={{ backgroundColor: "hsl(0, 0%, 96%)" }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eveniet, itaque accusantium odio, soluta, corrupti aliquam
                quibusdam tempora at cupiditate quis eum maiores libero
                veritatis? Dicta facilis sint aliquid ipsum atque?
              </p>
            </div>
            <div className="col-lg-5">
              <Form title="Sing In" funcName={handleSubmit}>
                <div>
                  <Input
                    placeholder="Enter your Email"
                    title="Email"
                    type="email"
                    id="email"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    placeholder="Enter your Password"
                    title="Password"
                    type="password"
                    id="password"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <Button
                  type="submit"
                  title="Login"
                  className="btn btn-primary"
                />

                <div className="text-muted d-flex justify-content-center align-items-center mt-3">
                  Or Continue With:
                </div>
                <div className="rounded text-center d-flex flex-row aign-items-center justify-content-center gap-3 mt-2">
                  <span className="h4">
                    <FcGoogle />
                  </span>
                  <span className="h4">
                    <FaGithub />
                  </span>
                  <span className="h4">
                    <ImLinkedin />
                  </span>
                </div>

                <div className="text-center mt-1">
                  don't have an account? <Link to="/signup">Sign Up</Link>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
