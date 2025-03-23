"use client";

import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { FaPlay } from "react-icons/fa";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import Link from "next/link";

const Landing = () => {
  const [textIndex, setTextIndex] = useState(0);
  const texts = [
    "با آکادمی خصوصی سبزلرن، علم برنامه نویسی رو با خیال راحت یاد بگیر و پیشرفت کن",
    "ما به هر قیمتی دوره آموزشی تولید نمی کنیم",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleGoToTheRoadMaps = () => {
    const roadMap = document.querySelector('#roadmaps') as HTMLDivElement;
    roadMap.scrollIntoView({ behavior: "smooth" });
  }
  

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 sm:gap-20 lg:gap-10 p-6 max-w-7xl mx-auto"
    >
      <div className="flex-1 flex flex-col gap-10 text-center lg:text-right">
        <motion.h1
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="font-dana-extra-bold text-3xl sm:text-5xl max-w-[420px] leading-tight"
        >
          آکادمی آموزش برنامه نویسی سبزلرن
        </motion.h1>
        <motion.h4
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-dana-medium text-xl lg:text-2xl max-w-[420px] leading-9 h-[60px] flex items-center"
        >
          <Typewriter
            options={{
              strings: texts,
              autoStart: true,
              loop: true,
              deleteSpeed: 80,
              delay: 80,
            }}
          />
        </motion.h4>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 lg:gap-8"
        >
          <button onClick={handleGoToTheRoadMaps} className="btn btn-primary btn-lg w-full sm:w-auto">
            از این مسیرها شروع کن
          </button>
          <Link href={'/courses/?sort=free'} className="flex items-center gap-3">
            <button className="btn btn-success btn-circle btn-lg flex items-center">
              <FaPlay />
            </button>
            <span>دوره های رایگان</span>
          </Link>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="flex-1"
      >
        <Image
          src={"/landing/hero-dark.svg"}
          width={786}
          height={530}
          alt="landing pic sabzlearn"
          className="w-full max-w-[400px] md:max-w-[600px] lg:max-w-[786px]"
        />
      </motion.div>
    </motion.div>
  );
};

export default Landing;
