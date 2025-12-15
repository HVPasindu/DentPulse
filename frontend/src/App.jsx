import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";



import MainLogin from "./LoginRegister Pages/MainLogin";
import RegisterPage from "./LoginRegister Pages/RegisterPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
     
        <Route path="/login" element={<MainLogin />} />

        <Route path="/register" element={<RegisterPage />} />


       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
