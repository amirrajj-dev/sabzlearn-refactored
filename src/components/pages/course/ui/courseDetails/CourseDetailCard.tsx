"use client";
import React, { JSX } from "react";
import { motion } from "framer-motion";
import { useCourseStore } from "@/store/course.store";

interface CourseDetailCardProps {
  title: string;
  Icon: JSX.Element;
  desc: string;
}

const CourseDetailCard: React.FC<CourseDetailCardProps> = ({ Icon, desc, title }) => {
  const { loading } = useCourseStore();

  return (
    <motion.div
      className="flex items-center gap-4 bg-base-300 rounded-2xl shadow-lg p-3.5 w-full md:w-auto border border-base-300"
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-success/50 p-4 rounded-xl text-2xl flex items-center justify-center">
        {Icon}
      </div>

      <div className="flex flex-col gap-1">
        {loading ? (
          <>
            <span className="skeleton w-24 h-4 block"></span>
            <span className="skeleton w-40 h-3 block"></span>
          </>
        ) : (
          <>
            <span className="font-semibold text-base-content">{title}</span>
            <span className="text-xs text-gray-600">{desc}</span>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default CourseDetailCard;