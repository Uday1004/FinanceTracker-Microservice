import React, { useState } from "react";
import Form from "../../Components/Form";
import Button from "../../Components/Button";
import Input from "../../Components/Input";
import { Link, useNavigate, useParams } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const newUser = { name, email, password, phone };

    try {
      const response = await fetch("http://localhost:5500/registeruser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Registration failed");
      } else {
        alert("Registration successful!");
        const userId = result.data_id;
        localStorage.setItem("regi_id", userId);

        navigate(`/confirm/details/${userId}`);
        console.log(userId);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Something went wrong. Please try again.");
    }

    setEmail("");
    setName("");
    setPhone("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <section>
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
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eveniet, itaque accusantium odio, soluta, corrupti aliquam
                quibusdam tempora at cupiditate quis eum maiores libero
                veritatis? Dicta facilis sint aliquid ipsum atque?
              </p>
            </div>
            <div className="col-lg-5">
              <Form title="Sign Up" funcName={handleSubmit}>
                <Input
                  placeholder="Enter your Name"
                  title="Name"
                  type="text"
                  id="name"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  placeholder="Enter your Email"
                  title="Email"
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="Enter your Phone Number"
                  title="Phone Number (optional)"
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <Input
                  placeholder="Enter your Password"
                  title="Create Password"
                  type="password"
                  id="password1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  placeholder="Confirm Password"
                  title="Confirm Password"
                  type="password"
                  id="password2"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button
                  type="submit"
                  title="Sign Up"
                  className="btn btn-primary"
                />

                <div className="text-center mt-3">
                  Already have an account? <Link to="/login">Sign In</Link>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
