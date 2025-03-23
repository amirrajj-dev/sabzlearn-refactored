'use client';
import React from "react";
import { FaRegCopy } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const CourseLink = () => {
  const txt = "sabzlearn.ir/?p=5418";
  
  return (
    <div className="flex flex-col items-center gap-4 bg-base-100 py-6 px-4 rounded-2xl shadow-lg w-full mx-auto">
      <span className="text-xl font-semibold text-base-content">
        لینک کوتاه آموزش
      </span>

      <motion.div
        className="flex items-center justify-between w-full p-4 bg-success/20 border-2 border-dashed rounded-xl shadow-sm opacity-90"
        whileHover={{ scale: 1.05, boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)" }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-lg font-medium text-success">{txt}</span>

        <button 
          onClick={() =>{ navigator.clipboard.writeText(txt);toast.info('لینک با موفقیت کپی گردید')}}
          className="btn btn-success btn-circle border-none hover:bg-success/90 focus:outline-none"
        >
          <FaRegCopy className="text-xl text-white" />
        </button>
      </motion.div>
    </div>
  );
};

export default CourseLink;