import React from "react";
import { Header } from "./MainInterface Components/Header";
import { Footer } from "./MainInterface Components/Footer";
import { Hero } from "./MainInterface Components/Hero";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Services } from "./MainInterface Components/ServicesCard";
import { MiddleSection } from "./MainInterface Components/MiddleSection";
import { Contact } from "./MainInterface Components/Contact";
import Carosuel from "./MainInterface Components/Carosuel";
import Layout from "./Layout";
import Home from "./index/Home";
import MainLogin from "./LoginRegister Pages/MainLogin";
import RegisterPage from "./LoginRegister Pages/RegisterPage";
import MainInterface from "./Patient Pages/MainInterface";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/login" element={<MainLogin />} />

        <Route path="/register" element={<RegisterPage />} />


        <Route path="/patient" element={<MainInterface/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
