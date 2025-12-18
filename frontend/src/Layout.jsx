import { Outlet } from "react-router-dom";
import React from "react";
import { Footer } from "./MainInterface Components/Footer";
import { Header } from "./MainInterface Components/Header";

const Layout = () => {
  return (
    <div>
      <Header />

      <Outlet />

      <Footer />
    </div>
  );
};
export default Layout;