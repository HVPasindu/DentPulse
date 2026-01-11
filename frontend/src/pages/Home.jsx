import React from "react";

import { Hero } from "../MainInterface Components/Hero";
import Carosuel from "../MainInterface Components/Carosuel";
import { MiddleSection } from "../MainInterface Components/MiddleSection";
import { Contact } from "../MainInterface Components/Contact";
import { Allservice } from "../MainInterface Components/Allservice";
import { Features } from "../MainInterface Components/Features";
const Home = () => {
  return (
    <>
      <div id="home">
        <Hero />
      </div>
      <div>
        <Features />
      </div>
      <div id="services">
        <Allservice />
      </div>
      <div id="about">
        <Carosuel />

        <MiddleSection />
      </div>

      <div id="contact">
        <Contact />
      </div>
    </>
  );
};

export default Home;
