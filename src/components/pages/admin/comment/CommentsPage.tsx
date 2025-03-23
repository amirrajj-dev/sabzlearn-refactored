"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FaStar, FaEdit, FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import DeleteModal from "@/components/modals/shared/DeleteModal";
import ReplyCommentModal from "@/components/modals/comment/ReplyComment";
import BanModal from "@/components/modals/shared/BanModal";
import { useCommentStore } from "@/store/comment.store";
import { toast } from "react-toastify";
import { toastOptions } from "@/helpers/toast";
import { useUserStore } from "@/store/user.store";
import { RiAdminLine } from "react-icons/ri";
import SeeModal from "@/components/modals/shared/SeeModal";
import { useAuthStore } from "@/store/auth.store";

const CommentsTable = () => {
  const { comments, acceptComment, loading , rejectComment , deleteComment , answerComment } = useCommentStore();
  const {banUser} = useUserStore()
  const {user} = useAuthStore()

  const handleAcceptComment = async (id : string) => {
    const res = await acceptComment(id , user!.id , user!.role);
    if (res.success) {
      toast.success("پیام با موفقیت تایید شد", toastOptions);
    } else {
      toast.error("خطایی رخ داد", toastOptions);
    }
  };

  const handleRejectComment = async (id : string) => {
    const res = await rejectComment(id , user!.id , user!.role);
    if (res.success) {
      toast.success("پیام با موفقیت رد شد", toastOptions);
    } else {
      toast.error("خطایی رخ داد", toastOptions);
    }
  }

  const handleDeleteComment = async (id : string) => {
    const res = await deleteComment(id , user!.id , user!.role);
    if (res.success) {
      toast.success("پیام با موفقیت حذف شد", toastOptions);
    } else {
      toast.error("خطا در حذف پیام", toastOptions);
    }
  }

  const handleReplyComment = async (id : string , data : {body : string , courseID : string}) => {
    const formData = new FormData()
    formData.append('body' , data.body)
    formData.append('courseID' , data.courseID)
    formData.append('userID' , user!.id)
    const res = await answerComment(id , formData);
    if (res.success) {
      toast.success("پاسخ با موفقیت ارسال شد", toastOptions);
    } else {
      toast.error("خطا در ارسال پاسخ", toastOptions);
    }
  } 

    const handleBan = async (id: string) => {
      const res = await banUser(id , user!.id);
      if (res.success) {
        res.message === "User unbanned successfully"
          ? toast.success("کاربر با موفقیت از بن خارج شد", toastOptions)
          : toast.success("کاربر با موفقیت بن شد", toastOptions);
      } else {
        toast.error("خطا در بن کاربر", toastOptions);
      }
    };
  return (
    <div className="shadow-lg rounded-xl overflow-x-auto">
      <table className="table bg-base-300 w-full text-center">
        <thead className="bg-base-300 text-base-content">
          <tr>
            <th className="p-4">شناسه</th>
            <th className="p-4">کاربر</th>
            <th className="p-4">دوره</th>
            <th className="p-4">امتیاز</th>
            <th className="p-4">مشاهده</th>
            <th className="p-4">پاسخ</th>
            <th className="p-4">حذف</th>
            <th className="p-4">بن</th>
            <th className="p-4">تایید</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            [...Array(4)].map((_, index) => (
              <tr key={index} className="animate-pulse bg-base-200">
                <td className="p-4"><div className="skeleton h-4 w-10"></div></td>
                <td className="p-4"><div className="skeleton h-4 w-20"></div></td>
                <td className="p-4"><div className="skeleton h-4 w-24"></div></td>
                <td className="p-4 flex justify-center">
                  <div className="skeleton h-4 w-24"></div>
                </td>
                <td className="p-4"><div className="skeleton h-4 w-10"></div></td>
                <td className="p-4"><div className="skeleton h-4 w-10"></div></td>
                <td className="p-4"><div className="skeleton h-4 w-10"></div></td>
                <td className="p-4"><div className="skeleton h-4 w-10"></div></td>
                <td className="p-4"><div className="skeleton h-4 w-10"></div></td>
              </tr>
            ))
          ) : comments.length === 0 ? (
            <tr>
              <td colSpan={10} className="p-4 text-center text-gray-500">هیچ نظری یافت نشد.</td>
            </tr>
          ) : (
            comments.map((comment, index) => (
              <tr key={comment?.id} className={`border-b hover:bg-base-300 transition ${index % 2 === 0 ? "bg-base-200" : "bg-base-100"}`}>
                <td className="p-4 font-medium text-base-content">{index + 1}</td>
                <td className="p-4 font-semibold text-base-content">{comment?.creator?.name}</td>
                <td className="p-4">{comment?.course?.name}</td>
                <td className="p-4 flex justify-center items-center">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500" />
                  ))}
                </td>
                <td className="p-4"><SeeModal content={comment?.body} /></td>
                <td className="p-4">{comment?.mainCommentID ? <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={()=>toast.info('این کامنت یک پاسخ از طرف ادمین است و امکان پاسخگویی به آن وجود ندارد')}
                        className="btn btn-secondary btn-soft btn-sm hover:scale-110 transition-transform"
                      >
                        <RiAdminLine />
                      </motion.button>  : <ReplyCommentModal commentId={comment?.id} courseID={comment?.course?.id} onReply={handleReplyComment} />}</td>
                
                <td className="p-4"><DeleteModal onDelete={handleDeleteComment} deleteId={comment?.id} title="حذف کامنت" message="آیا از حذف کامنت اطمینان دارید؟" messageDesc="این اقدام قابل بازگشت نیست!" deleteBtnText="حذف کامنت" /></td>
                <td className="p-4"><BanModal onBan={handleBan} user={comment.creator} /></td>
                <td className="p-4">
                  {comment.answer === 1 ? (
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn btn-success btn-sm" onClick={()=>handleRejectComment(comment.id)}>
                      <FaCheck />
                    </motion.button>
                  ) : (
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn btn-error btn-sm" onClick={() => handleAcceptComment(comment.id)}>
                      <IoClose />
                    </motion.button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CommentsTable;