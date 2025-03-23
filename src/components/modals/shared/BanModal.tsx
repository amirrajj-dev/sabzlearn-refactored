'use client'
import React, { useState } from "react";
import { FaBan, FaCheck, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { IUser } from "@/interfaces/interfaces";

const BanModal = ({ user, onBan } : {user : IUser ,onBan : (id : string)=>void}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleBanUser = () => {
    if (user) {
      onBan(user.id);
      setIsOpen(false);
    }
  };

  return (
    <>
      {user?.isBanned ? (
        <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="btn btn-success btn-soft flex items-center gap-2 shadow-md transition-transform"
        onClick={() => setIsOpen(true)}
      >
        <FaCheck/>
      </motion.button>
      ) : (
        <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="btn btn-error btn-soft flex items-center gap-2 shadow-md transition-transform"
        onClick={() => setIsOpen(true)}
      >
        <FaBan/>
      </motion.button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >

            <motion.div
              className="bg-base-100 p-6 rounded-xl shadow-lg max-w-md w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >

              <div className="flex justify-between items-center border-b pb-3">
                <h2 className="text-xl font-bold text-base-content">⚠️ بن کردن کاربر</h2>
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-base-content hover:text-error transition"
                  onClick={() => setIsOpen(false)}
                >
                  <FaTimes className="text-lg" />
                </motion.button>
              </div>

              <div className="mt-4 text-center">
                <p className="text-lg text-base-content">
                  {user?.isBanned ? "آیا از بیرون آوردن کاربر از حالت بن اطمینان دارید؟" : "آیا از بن کردن این کاربر اطمینان دارید؟"}
                </p>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-outline btn-error"
                  onClick={() => setIsOpen(false)}
                >
                  انصراف
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-warning"
                  onClick={handleBanUser}
                >
                  {user?.isBanned ? "بیرون آوردن" : "بن کردن"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BanModal;