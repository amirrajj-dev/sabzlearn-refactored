"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaStar, FaUsers } from "react-icons/fa";
import { useCourseStore } from "@/store/course.store";

const CourseDetailsLeft = ({courseName} : {courseName :string}) => {
  const progress = Math.floor(Math.random() * 100);

  return (
    <motion.div
      className="flex flex-col gap-3 p-3 rounded-lg shadow-md bg-base-300 w-full lg:w-1/4"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Course Rating */}
      <div className="flex items-center justify-between bg-base-100 p-2 rounded-md shadow-sm">
        {!courseName ? (
          <div className="flex items-center gap-1 text-sm font-semibold">
            <div className="skeleton w-6 h-6 rounded-full"></div>
            <div className="skeleton w-16 h-4 block"></div>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-sm font-semibold">
            <FaStar className="text-yellow-500 text-base" />
            <span className="translate-y-px">4.8</span>
          </div>
        )}
        <span className="text-gray-500 text-xs">
          {!courseName ? (
            <div className="skeleton w-24 h-4 block"></div>
          ) : (
            `(${Math.floor(Math.random() * 1000)} نظر)`
          )}
        </span>
      </div>

      {/* Total Users */}
      <div className="flex items-center justify-between bg-base-100 p-2 rounded-md shadow-sm">
        {!courseName ? (
          <div className="flex items-center gap-1 text-sm font-semibold">
            <div className="skeleton w-6 h-6 rounded-full"></div>
            <div className="skeleton w-24 h-4 block"></div>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-sm font-semibold">
            <FaUsers className="text-primary text-base" />
            <span>{Math.floor(Math.random() * 1000)} شرکت‌کننده</span>
          </div>
        )}
      </div>

      {/* Course Progress Bar */}
      <div className="bg-base-100 p-2 rounded-md shadow-sm">
        <h4 className="text-sm font-semibold mb-1">
          {!courseName ? (
            <div className="skeleton w-24 h-4 block"></div>
          ) : (
            "پیشرفت دوره"
          )}
        </h4>
        <div className="w-full bg-gray-300 h-2 rounded-full overflow-hidden">
          {!courseName ? (
            <div className="skeleton w-full h-2 bg-gray-300 rounded-full"></div>
          ) : (
            <motion.div
              className="bg-success h-full rounded-full"
              style={{ width: `${progress}%` }} // Adjust dynamically
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8 }}
            />
          )}
        </div>
        <span className="text-xs text-gray-500 mt-1 block">
          {!courseName ? (
            <div className="skeleton w-16 h-4 block"></div>
          ) : (
            `${progress}% تکمیل شده`
          )}
        </span>
      </div>
    </motion.div>
  );
};

export default CourseDetailsLeft;