import React, { useState } from "react";
import "../css/login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);

  const handleEmailChange = (e) => {
    const enteredEmail = e.target.value;
    setEmail(enteredEmail);
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    setIsValidEmail(emailPattern.test(enteredEmail));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!isValidEmail) {
      alert("Please enter a valid email.");
    } else if (password.length < 4) {
      alert("Password must have at least 4 characters.");
    } else {
      navigate("/products");
    }
  };

  return (
    <div className="login-form">
      <h1>Login Form</h1>
      <br />
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
