"use client";

import React, { useState } from "react";
import { FaEdit, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const CKEditor = dynamic(
  () => import("@ckeditor/ckeditor5-react").then((mod) => mod.CKEditor),
  { ssr: false }
);

const EditArticleModal = ({ id , content , onSave } : {id : string , content : string , onSave : (id : string , body : string , publish : string)=>void}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [body, setBody] = useState(content);
  const [isDraft, setIsDraft] = useState(false);

  const handleSave = () => {
    onSave(id , body , isDraft ? '0' : '1');
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
              className="bg-base-300 p-6 rounded-2xl shadow-xl max-w-lg w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="flex justify-between items-center border-b pb-3">
                <h2 className="text-xl font-dana-demi text-base-content">📝 ویرایش مقاله</h2>
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-600 hover:text-red-500 transition"
                  onClick={() => setIsOpen(false)}
                >
                  <FaTimes className="text-lg" />
                </motion.button>
              </div>

              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-base-content text-right font-medium">
                    چکیده مقاله:
                  </label>
                  <div className="bg-base-300 p-2 rounded-lg">
                    <CKEditor
                      editor={ClassicEditor}
                      data={body}
                      onChange={(event, editor) => setBody(editor.getData())}
                      config={{ language: "fa" }}
                      {...({} as any) }
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isDraft}
                    onChange={(e) => setIsDraft(e.target.checked)}
                    className="checkbox checkbox-primary"
                  />
                  <label className="text-base-content font-medium">
                    پیش نویس کردن مقاله
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-outline btn-error btn-sm"
                  onClick={() => setIsOpen(false)}
                >
                  انصراف
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary btn-sm"
                  onClick={handleSave}
                >
                  {isDraft ? "ذخیره پیش نویس" : "ذخیره مقاله"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EditArticleModal;