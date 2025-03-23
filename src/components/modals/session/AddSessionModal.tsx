"use client";
import React, { useEffect, useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useSessionStore } from "@/store/session.store";
import { useCourseStore } from "@/store/course.store";
import { toast } from "react-toastify";
import { toastOptions } from "@/helpers/toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const AddSessionModal = () => {
  const [sessionTitle, setSessionTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [course, setCourse] = useState("");
  const [video, setVideo] = useState<File | null>(null);
  const [isFree, setIsFree] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const {loading} = useCourseStore()
  const {createSession , courses} = useCourseStore()
  const {getAllSessions} = useSessionStore()
  const handleAddSession = async () => {
    if (!sessionTitle || !duration || !course || !video) {
      toast.info('لطفا تمام فیلدهارا پر کنید')
      return;
    }
    
    try {
      const formData = new FormData()
      formData.append('title', sessionTitle)
      formData.append('time', duration)
      formData.append('courseID', course)
      formData.append('file', video!)
      formData.append('free', isFree ? '1' : '0')
      const response = await createSession(formData);
  
      if (response.success) {
        await getAllSessions()
        toast.success("جلسه با موفقیت افزوده شد.", toastOptions)
        setSessionTitle("");
        setDuration("");
        setCourse("");
        setVideo(null);
        setIsFree(false);
        setIsOpen(false);
      } else {
        toast.error("خطا در افزودن جلسه.", toastOptions)
      }
    } catch (error : any) {
      toast.error(error.message, toastOptions)
    }
  };
  

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="btn btn-success flex items-center mb-4 gap-2 shadow-md transition-transform"
        onClick={() => setIsOpen(true)}
      >
        <FaPlus className="text-lg" /> افزودن جلسه جدید
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
                <h2 className="text-xl font-bold text-base-content">➕ افزودن جلسه</h2>
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
                    <span className="font-medium">عنوان جلسه</span>
                  </label>
                  <input
                    type="text"
                    placeholder="مثلاً هوک useState"
                    className="input w-full border-none"
                    value={sessionTitle}
                    onChange={(e) => setSessionTitle(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="label">
                    <span className="font-medium">مدت زمان جلسه</span>
                  </label>
                  <input
                    type="text"
                    placeholder="مثلاً 45 دقیقه"
                    className="input w-full border-none"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="label">
                    <span className="font-medium">دوره مربوطه</span>
                  </label>
                  <select
                    className="select w-full"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                  >
                    <option value="">انتخاب دوره</option>
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="label">
                    <span className="font-medium">انتخاب ویدیو</span>
                  </label>
                  <input
                    type="file"
                    accept=".mp4"
                    className="file-input file-input-bordered w-full"
                    onChange={(e) => setVideo(e.target.files?.[0] || null)}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isFree}
                    onChange={(e) => setIsFree(e.target.checked)}
                    className="checkbox"
                  />
                  <label className="font-medium">این جلسه رایگان باشد؟</label>
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
                  onClick={handleAddSession}
                >
                  {loading ? <AiOutlineLoading3Quarters className="animate-spin"/> : "ذخیره جلسه"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AddSessionModal;