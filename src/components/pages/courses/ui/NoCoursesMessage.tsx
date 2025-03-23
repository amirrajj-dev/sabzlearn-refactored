import React from "react";
import { motion } from "framer-motion";
import { MdOutlineSentimentDissatisfied } from "react-icons/md";

const NoCoursesMessage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: -50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="col-span-3 flex flex-col items-center justify-center text-center p-12 bg-base-300 rounded-3xl shadow-xl relative overflow-hidden"
    >
      <motion.div
        initial={{ rotate: -10, scale: 1 }}
        animate={{ rotate: 0, scale: 1.2 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
        className="flex items-center justify-center mb-6"
      >
        <MdOutlineSentimentDissatisfied className="text-7xl text-white animate-bounce" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-2xl font-dana-bold text-white"
      >
        هیچ دوره‌ای یافت نشد!
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-lg text-white mt-4 font-dana-light"
      >
        متأسفیم، اما در حال حاضر دوره‌ای برای نمایش وجود ندارد.
      </motion.p>
    </motion.div>
  );
};

export default NoCoursesMessage;