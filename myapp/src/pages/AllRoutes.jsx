import React from "react";
import { Routes, Route } from "react-router-dom";
import Products from "../Components/Products";
import Login from "./Login";

const Allroutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
};

export default Allroutes;
