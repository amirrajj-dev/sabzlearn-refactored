'use client'
import React from "react";
import { FaStar, FaUsers } from "react-icons/fa"; 
import { motion } from "framer-motion";
import Image from "next/image"; 

const CourseCardSkeleton = () => {
  return (
    <motion.div
      className="card w-full bg-base-200 shadow-lg rounded-2xl hover:shadow-xl transition-shadow duration-300 border border-gray-700"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <div className="skeleton h-40 w-full rounded-t-2xl bg-base-200" />
      </div>
      <div className="card-body p-4">
        <div className="skeleton h-6 w-3/4 mb-2" /> 
        <div className="skeleton h-4 w-full mb-4" /> 
        
        <div className="skeleton h-6 w-1/3 mt-2 mb-4" /> 

        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center text-sm text-warning gap-1">
            <div className="skeleton h-4 w-4 rounded-full" /> 
            <div className="skeleton h-4 w-12" />
          </div>

          <div className="flex flex-col items-end space-y-1">
            <div className="skeleton h-5 w-20" /> 
            <div className="skeleton h-5 w-20 mt-1" />
          </div>
        </div>

        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center gap-1 text-xs text-base-content">
            <div className="skeleton h-4 w-4 rounded-full" /> 
            <div className="skeleton h-4 w-12" />
          </div>
          <div>
            <div className="skeleton h-4 w-24" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCardSkeleton;