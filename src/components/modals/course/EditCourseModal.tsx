"use client";
import React, { useState } from "react";
import { FaEdit, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { ICourse } from "@/interfaces/interfaces";

const EditCourseModal = ({ courseData, onSave , editId } : {courseData : Partial<ICourse> , onSave : (id : string , course : Partial<ICourse>)=>void , editId : string}) => {
  const [title, setTitle] = useState(courseData?.name || "");
  const [link, setLink] = useState(courseData?.shortName || "");
  const [price, setPrice] = useState(courseData?.price || "");
  const [description, setDescription] = useState(courseData?.description || "");
  const [discount , setDisocunt] = useState(courseData?.discount || "")
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = () => {
    if (!title || !link || !price || !description) return;
    onSave(editId , { ...courseData, name : title, shortName : link, price : parseInt(price as string), description , discount : parseFloat(discount as string) });
    setIsOpen(false);
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
                <h2 className="text-xl font-bold">✏️ ویرایش دوره</h2>
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
                  <label className="label font-medium">عنوان دوره</label>
                  <input
                    type="text"
                    className="input w-full border-none"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="label font-medium">لینک دوره</label>
                  <input
                    type="text"
                    className="input w-full border-none"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="label font-medium">قیمت دوره</label>
                  <input
                    type="number"
                    className="input w-full border-none"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="label font-medium">تخفیف</label>
                  <input
                    type="number"
                    className="input w-full border-none"
                    value={discount}
                    onChange={(e) => setDisocunt(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="label font-medium">توضیحات دوره</label>
                  <textarea
                    className="textarea w-full border-none"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
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
                  onClick={handleSave}
                >
                  ذخیره تغییرات
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EditCourseModal;