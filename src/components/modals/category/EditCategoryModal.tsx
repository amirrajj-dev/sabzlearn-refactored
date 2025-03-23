"use client";
import React, { useState } from "react";
import { FaEdit, FaSpinner, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useCategoryStore } from "@/store/category.store";
import { toast } from "react-toastify";
import { toastOptions } from "@/helpers/toast";

const EditCategoryModal = ({
  category,
}: {
  category: { name: string; title: string; id: string };
}) => {
  const [title, setTitle] = useState(category.name);
  const [link, setLink] = useState(category.title);
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; link?: string }>({});
  const { updateCategory, loading } = useCategoryStore();

  const validateForm = () => {
    const newErrors: { title?: string; link?: string } = {};

    if (!title.trim()) {
      newErrors.title = "عنوان دسته‌بندی الزامی است.";
    } else if (title.length > 50) {
      newErrors.title = "عنوان دسته‌بندی نمی‌تواند بیشتر از ۵۰ کاراکتر باشد.";
    }

    if (!link.trim()) {
      newErrors.link = "لینک دسته‌بندی الزامی است.";
    } else if (!/^[a-z0-9-]+$/.test(link)) {
      newErrors.link =
        "لینک دسته‌بندی باید فقط شامل حروف کوچک، اعداد و خط تیره باشد.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const handleUpdate = async () => {
    if (!validateForm()) return;

    setIsOpen(false);
    const formData = new FormData();
    formData.append("name", title);
    formData.append("title", link);

    const res = await updateCategory(category.id, formData);
    if (res.success) {
      toast.success("دسته‌بندی با موفقیت ویرایش شد", toastOptions);
    } else {
      toast.error("خطا در ویرایش دسته‌بندی", toastOptions);
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="btn btn-warning btn-sm hover:scale-110 transition-transform"
        onClick={() => setIsOpen(true)}
      >
        <FaEdit />
      </motion.button>

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
                <h2 className="text-xl font-bold text-base-content">
                  ✏️ ویرایش دسته‌بندی
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
                <div className="flex flex-col gap-3">
                  <label className="label">
                    <span className="font-medium">عنوان دسته‌بندی</span>
                  </label>
                  <input
                    type="text"
                    placeholder="مثلاً پایتون"
                    className={`input border-none w-full ${
                      errors.title ? "input-error" : ""
                    }`}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  {errors.title && (
                    <span className="text-error text-sm text-right">{errors.title}</span>
                  )}
                </div>
              </div>

              <div className="mt-4 space-y-4">
                <div className="flex flex-col gap-3">
                  <label className="label">
                    <span className="font-medium">لینک دسته‌بندی</span>
                  </label>
                  <input
                    type="text"
                    placeholder="مثلاً python"
                    className={`input border-none w-full ${
                      errors.link ? "input-error" : ""
                    }`}
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                  />
                  {errors.link && (
                    <span className="text-error text-sm text-right">{errors.link}</span>
                  )}
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
                  className="btn btn-warning disabled:cursor-not-allowed"
                  onClick={handleUpdate}
                  disabled={loading}
                >
                  {loading ? (
                    <FaSpinner className="animate-spin duration-200 transition-all" />
                  ) : (
                    "ذخیره تغییرات"
                  )}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EditCategoryModal;