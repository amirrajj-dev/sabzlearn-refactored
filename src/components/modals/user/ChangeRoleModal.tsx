"use client";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { PiUserSwitchFill } from "react-icons/pi";
import { IUser } from "@/interfaces/interfaces";
import { useUserStore } from "@/store/user.store";
import { toast } from "react-toastify";
import { toastOptions } from "@/helpers/toast";
import { useAuthStore } from "@/store/auth.store";

const ChangeRoleModal = ({ user }: { user: IUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newRole, setNewRole] = useState(user?.role || "");
  const { changeUserRole, fetchUsers } = useUserStore();

  const roles = ["ADMIN", "USER"];
  const { user: currentUser } = useAuthStore();
  const handleChangeRole = async () => {
    if (!newRole) {
      alert("لطفاً نقش جدید را انتخاب کنید");
      return;
    }
    setIsOpen(false);
    const res = await changeUserRole(user.id, newRole, currentUser!.id);
    if (res.success) {
      toast.success("نقش کاربر با موفقیت تغییر یافت", toastOptions);
    } else if (
      res.message === "Only 'amirrajj' can remove users from admin role"
    ) {
      toast.error("تنها amirrajj میتواند نقش مدیران را تغیر دهد", toastOptions);
    } else {
      toast.error("خطا در تغییر نقش کاربر", toastOptions);
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="btn btn-info flex items-center gap-2 shadow-md transition-transform"
        onClick={() => setIsOpen(true)}
      >
        <PiUserSwitchFill />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
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
                <h2 className="text-xl font-bold text-base-content">
                  ⚙️ تغییر نقش کاربر
                </h2>
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-base-content hover:text-error transition"
                  onClick={() => setIsOpen(false)}
                >
                  <FaTimes className="text-lg" />
                </motion.button>
              </div>

              <div className="mt-4 space-y-4">
                <div className="flex flex-col gap-2">
                  <label className="label">
                    <span className="font-medium">نقش جدید</span>
                  </label>
                  <select
                    className="select w-full border-none"
                    value={newRole}
                    onChange={(e) =>
                      setNewRole(e.target.value as "USER" | "ADMIN")
                    }
                  >
                    <option value="" disabled>
                      انتخاب نقش
                    </option>
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>
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
                  className="btn btn-info"
                  onClick={handleChangeRole}
                >
                  تغییر نقش
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChangeRoleModal;
