// import React from "react";
import { servicesData } from "../data/servicedata";
import { Services } from "./ServicesCard";
import { motion } from "motion/react";

export const Allservice = () => {
  return (
    <div>
      {/* Header */}
      <div className="text-center overflow-x-hidden">
        <div className=" mt-10 p-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl font-bold text-green-800 pb-4"
          >
            Our Services
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-xl font-medium text-green-500"
          >
            Comprehensive dental care tailored to all your needs
          </motion.p>
        </div>
      </div>

      {/* Cards */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: {
            transition: { staggerChildren: 0.15 }
          }
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-5 pb-28  mx-auto"
        id="services"
      >
        {servicesData.map((service, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={{ y: -8 }}
          >
            <Services
              title={service.title}
              description={service.description}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
