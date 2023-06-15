import React, { useEffect, useState } from "react";
// import CasbinDemo from "./CasbinDemo";

import "./App.css";
import Login from "./components/login/index";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
