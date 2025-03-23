'use client'
import React from "react";
import { services } from "@/data/data";
import SectionHeader from "../shared/SectionHeader";
import { motion } from "framer-motion";
import clsx from "clsx";

const Services = () => {
  return (
    <div className="mt-20 relative">
      <SectionHeader
        title="ما چه کمکی میتونیم بهت بکنیم ؟"
        desc="از شروع مسیر کنارتیم نمی زاریم آب نو دلت تکون بخوره"
        haveLink={false}
        linkText=""
        linkUrl=""
        squareColor="bg-indigo-500"
      />

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
        {services.map((service) => (
          <motion.div
            key={service.id}
            className="relative bg-base-200 rounded-2xl p-6 shadow-xl border border-gray-700 overflow-hidden transition-all duration-300 group"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{
              scale: 1.05,
              rotate: 0.5,
              boxShadow: "0px 10px 30px rgba(255, 255, 255, 0.1)",
            }}
          >
            <div
              className={clsx(
                "absolute -inset-20 blur-3xl opacity-20 transition-all duration-300",
                service.color
              )}
            ></div>
            <div
              className={clsx(
                "relative w-16 h-16 flex items-center justify-center rounded-xl text-white text-3xl shadow-xl border border-white/10 backdrop-blur-xl",
                service.color
              )}
            >
              {service.icon}
              <div className="absolute inset-0 bg-white/10 rounded-xl blur-xl opacity-30"></div>
            </div>
            <h3 className="text-xl font-bold mt-6 text-white group-hover:text-base-content transition-all duration-300">
              {service.title}
            </h3>
            <p className="text-sm text-gray-400 mt-2 leading-relaxed">
              {service.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Services;