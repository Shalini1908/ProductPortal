import React from "react";
import "../css/nav.css";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    const confirmLogout = window.confirm("Are you sure you want to log out?");

    if (confirmLogout) {
      navigate("/");
    }
  };

  return (
    <div id="nav">
      <div id="linkContainer">
        <p>
          <Link to="/">Home</Link>
        </p>
        <p>
          <Link to="/" onClick={handleLogout}>
            Logout
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Navbar;
