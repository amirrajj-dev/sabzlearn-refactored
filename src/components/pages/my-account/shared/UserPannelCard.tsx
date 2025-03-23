'use client'
import React from "react";
import { motion } from "framer-motion";

interface UserPannelCardProps {
  title: string;
  desc: string;
  length: number;
  bgColor: string;
  icon: React.ReactNode;
}

const UserPannelCard: React.FC<UserPannelCardProps> = ({
  title,
  desc,
  length,
  bgColor,
  icon,
}) => {
  return (
    <motion.div
      className={`relative ${bgColor} text-white rounded-xl z-0 overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300`}
      whileHover={{ scale: 1.05, rotate: -1 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-black/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />

      <div className="p-6 relative z-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">{title}</h2>
          <motion.div
            className="text-3xl opacity-80"
            whileHover={{ scale: 1.2, rotate: 10 }}
          >
            {icon}
          </motion.div>
        </div>
        <motion.p
          className="text-3xl font-semibold mt-4"
          whileHover={{ scale: 1.05 }}
        >
          {length.toLocaleString("fa-IR")} {desc}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default UserPannelCard;