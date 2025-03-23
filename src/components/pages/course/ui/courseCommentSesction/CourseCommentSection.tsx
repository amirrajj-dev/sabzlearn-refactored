"use client";
import React, { useState } from "react";
import { FaComments, FaReply, FaSpinner } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LiaCommentSolid } from "react-icons/lia";
import Image from "next/image";
import { IComment } from "@/interfaces/interfaces";
import { useCommentStore } from "@/store/comment.store"; 
import { toastOptions } from "@/helpers/toast";
import moment from "moment-jalaali";
import { useAuthStore } from "@/store/auth.store";

interface CourseCommentSectionProps {
  comments: IComment[];
  courseID : string
}

const CourseCommentSection = ({comments, courseID}: CourseCommentSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const { createComment , loading } =
    useCommentStore();
  const { isAuthenticated , user } = useAuthStore();

  const handleNewCommentClick = () => {
    if (!isAuthenticated) {
      toast.error(
        "برای ارسال نظر باید وارد حساب کاربری خود شوید.",
        toastOptions
      );
      return;
    }
    setIsOpen(true);
    setReplyTo(null);
  };

  const handleSubmitComment = async () => {
    if (!comment.trim()) {
      toast.error("متن نظر خود را وارد کنید.", toastOptions);
      return;
    }
    const formData = new FormData()
    formData.append('courseID', courseID)
    formData.append('body', comment)
    formData.append('score', '5')
    formData.append('mainCommentID', replyTo || '')
    formData.append('userID' , user!.id)
    const res = await createComment(formData);
    if (res.success) {
      toast.success("نظر شما با موفقیت ارسال شد.", toastOptions);
      setComment("");
      setIsOpen(false);
      setReplyTo(null);
    } else {
      toast.error("خطا در ارسال نظر.", toastOptions);
    }
  };

  const renderComments = (commentList: IComment[], parentId: string | null = null) => {
    const filteredComments = commentList.filter(
      (comment) => comment.mainCommentID === parentId && comment.answer === 1 && comment.course.id === courseID
    );
    if (parentId === null && filteredComments.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center p-6 bg-base-200 rounded-lg shadow-md">
          <FaComments className="text-gray-400 text-5xl mb-2" />
          <h3 className="text-lg font-dana-demi text-gray-500">هنوز نظری ثبت نشده است!</h3>
          <p className="text-sm text-gray-400">اولین نفری باشید که نظر می‌دهد.</p>
          {isAuthenticated && (
            <button onClick={() => setIsOpen(true)} className="mt-4 btn btn-success btn-md">
              <LiaCommentSolid className="text-xl" />
              ایجاد نظر جدید
            </button>
          )}
        </div>
      );
    }
  
    return filteredComments.map((comment) => (
      <div
        key={comment.id}
        className={`p-4 rounded-lg shadow-md mb-4 ${
          parentId ? "ml-8 mt-4 border-l-4 border-success bg-base-300 pl-4" : "bg-base-100"
        }`}
      >
        <div className="flex items-center gap-4 mb-2">
          <Image
            width={40}
            height={40}
            src={comment.creator.profile || "https://secure.gravatar.com/avatar/e7b9929942190634b0267c963d2513eb?s=96&d=mm&r=g"}
            alt={comment.creator.name}
            className="rounded-full hidden sm:inline"
          />
          <div>
            <h3 className="font-dana-demi text-base-content text-sm line-clamp-1 sm:line-clamp-none sm:text-base">
              {comment.creator.name} |
              <span className="mr-1">{comment.creator.role === "ADMIN" ? "ادمین" : "کاربر"}</span>
            </h3>
            <span className="text-sm text-gray-400 font-dana-extra-light">
              {moment(comment.createdAt).format("jYYYY/jM/jD")}
            </span>
          </div>
        </div>
        <div className="divider divide-base-content"></div>
        <p className="text-base-content font-dana-extra-light">{comment.body}</p>
        <button
          onClick={() => {
            if (isAuthenticated) {
              setReplyTo(comment.id);
              setIsOpen(true);
            } else {
              toast.error("برای پاسخ دادن باید وارد حساب کاربری خود شوید.", toastOptions);
            }
          }}
          className="mt-2 btn btn-success btn-sm"
        >
          <FaReply /> پاسخ
        </button>
        {renderComments(commentList, comment.id)}
      </div>
    ));
  };

  return (
    <div className="bg-base-300 p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.95 }}
            className="text-warning text-2xl sm:text-3xl md:text-5xl"
          >
            <FaComments className="text-success" />
          </motion.div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-dana-demi text-success">
            نظرات
          </h2>
        </div>
        <button
          onClick={handleNewCommentClick}
          className="btn btn-success sm:btn-lg gap-3"
        >
          <span>ایجاد نظر جدید</span>
          <LiaCommentSolid className="text-2xl hidden sm:block" />
        </button>
      </div>
      {isOpen && (
        <div className="mb-6 bg-base-200 p-6 rounded-lg shadow-md">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="لطفا نظر خود را بنویسید"
            rows={4}
            className="w-full p-4 border border-gray-300 rounded-lg resize-none mb-4"
          />
          <div className="flex justify-between items-center">
            <button
              onClick={() => {
                setIsOpen(false);
                setReplyTo(null);
              }}
              className="btn btn-error px-4 py-2 rounded-lg"
            >
              لغو
            </button>
            <button
              onClick={handleSubmitComment}
              className="btn btn-success px-4 py-2 rounded-lg disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? <FaSpinner className="animate-spin duration-200 transition-all" /> : "ارسال"}
            </button>
          </div>
        </div>
      )}
      <div className="mt-6">
        {!courseID ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="p-4 rounded-lg shadow-md bg-base-100 animate-pulse"
              >
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-10 rounded-full bg-base-300"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-base-300 rounded"></div>
                    <div className="h-3 w-20 bg-base-300 rounded"></div>
                  </div>
                </div>
                <div className="divider divide-base-content"></div>
                <div className="h-4 w-full bg-base-300 rounded"></div>
                <div className="h-4 w-3/4 bg-base-300 rounded mt-2"></div>
              </div>
            ))}
          </div>
        ) : (
          renderComments(comments)
        )}
      </div>
    </div>
  );
};

export default CourseCommentSection;