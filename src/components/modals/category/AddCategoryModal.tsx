"use client";
import React, { useState } from "react";
import { FaPlus, FaSpinner, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useCategoryStore } from "@/store/category.store";
import { toast } from "react-toastify";
import { toastOptions } from "@/helpers/toast";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(3, "عنوان باید حداقل ۳ کاراکتر باشد."),
  link: z.string().min(3, "لینک باید حداقل ۳ کاراکتر باشد."),
});

const AddCategoryModal = () => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; link?: string }>({});
  const { createCategory, loading } = useCategoryStore();

  const handleAddCategory = async () => {
    const validationResult = schema.safeParse({ title, link });
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      setErrors({
        title: fieldErrors.title?.[0],
        link: fieldErrors.link?.[0],
      });
      return;
    }

    setErrors({});


    const formData = new FormData();
    formData.append("title", link);
    formData.append("name", title);

    const res = await createCategory(formData);

    if (res.success) {
      toast.success("دسته بندی جدید با موفقیت اضافه شد", toastOptions);
      setTitle("");
      setLink("");
      setIsOpen(false);
    } else if (res.message === "Category already exists") {
      toast.error("دسته بندی با این عنوان وجود دارد", toastOptions);
    } else {
      toast.error("خطا در اضافه کردن دسته بندی جدید", toastOptions);
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="btn btn-success flex items-center gap-2 shadow-md transition-transform"
        onClick={() => setIsOpen(true)}
      >
        <FaPlus className="text-lg" /> اضافه کردن دسته‌بندی جدید
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
                  ➕ اضافه کردن دسته‌بندی
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
                    <span className="font-medium">عنوان دسته‌بندی جدید</span>
                  </label>
                  <input
                    type="text"
                    placeholder="مثلاً پایتون"
                    className="input w-full border-none"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-xs mt-1">{errors.title}</p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="label">
                    <span className="font-medium">لینک دسته‌بندی جدید</span>
                  </label>
                  <input
                    type="text"
                    placeholder="مثلاً python"
                    className="input border-none w-full"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                  />
                  {errors.link && (
                    <p className="text-red-500 text-xs mt-1">{errors.link}</p>
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
                  className="btn btn-success"
                  onClick={handleAddCategory}
                  disabled={loading}
                >
                  {loading ? (
                    <FaSpinner className="animate-spin duration-200 transition-all" />
                  ) : (
                    "ذخیره دسته بندی"
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

export default AddCategoryModal;