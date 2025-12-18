import React from "react";
import { servicesData } from "../data/servicedata";
import { Hero } from "../MainInterface Components/Hero";
import Carosuel from "../MainInterface Components/Carosuel";
import { MiddleSection } from "../MainInterface Components/MiddleSection";
import { Contact } from "../MainInterface Components/Contact";
import { Services } from "../MainInterface Components/ServicesCard";
const Home = () => {
  return (
    <>
      <div id="home">
        <Hero />
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-4 py-5 pb-28 bg-cyan-50 mx-auto"
        id="services"
      >
        {servicesData.map((service) => (
          <Services title={service.title} description={service.description} />
        ))}
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
