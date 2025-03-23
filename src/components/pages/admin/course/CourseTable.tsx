"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa";
import { useCourseStore } from "@/store/course.store";
import DeleteModal from "@/components/modals/shared/DeleteModal";
import { toast } from "react-toastify";
import { toastOptions } from "@/helpers/toast";
import EditCourseModal from "@/components/modals/course/EditCourseModal";
import { ICourse } from "@/interfaces/interfaces";
import { useAuthStore } from "@/store/auth.store";

const CourseTable = () => {
  const { courses, getAllCourses, deleteCourse, updateCourse, loading } = useCourseStore();
  const {user} = useAuthStore()

  const handleDeleteCourse = async (id : string) => {
    if (!id) {
      toast.error("شناسه دوره را وارد کنید", toastOptions);
      return;
    }
    const res = await deleteCourse(id , user!.id);
    if (res.success) {
      toast.success("دوره با موفقیت حذف شد", toastOptions);
    } else {
      toast.error("خطا در حذف دوره", toastOptions);
    }
  };

  const handleEditCourse = async (id : string, data : Partial<ICourse>) => {
    const formData = new FormData()
    formData.append('name', data.name as string)
    formData.append('description', data.description as string)
    formData.append('courseID' , data.id as string)
    formData.append('price', String(data.price))
    formData.append('discount', String(data.discount))
    formData.append('shortName', data.shortName as string)
    formData.append('user', JSON.stringify({ id: user!.id, name: user!.name }))

    const res = await updateCourse(formData);
    if (res.success) {
      toast.success("دوره با موفقیت ویرایش شد", toastOptions);
    } else {
      toast.error("خطا در ویرایش دوره", toastOptions);
    }
  };

  return (
    <div className="shadow-lg rounded-xl overflow-x-auto">
      <table className="table bg-base-300 w-full text-center">
        <thead className="bg-base-300 text-base-content">
          <tr>
            <th className="p-4">شناسه</th>
            <th className="p-4">عنوان</th>
            <th className="p-4">مدرس</th>
            <th className="p-4">دسته بندی</th>
            <th className="p-4">لینک</th>
            <th className="p-4">قیمت</th>
            <th className="p-4">وضعیت</th>
            <th className="p-4">حذف</th>
            <th className="p-4">ویرایش</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            [...Array(4)].map((_, index) => (
              <tr key={index} className="animate-pulse">
                {Array(9).fill(0).map((_, i) => (
                  <td key={i} className="p-4">
                    <div className="skeleton h-6 w-full mx-auto rounded-lg bg-base-100 shimmer"></div>
                  </td>
                ))}
              </tr>
            ))
          ) : courses.length === 0 ? (
            <tr>
              <td className="text-center p-6 text-lg font-semibold text-base-content">
                هیچ دوره‌ای یافت نشد 😔
              </td>
            </tr>
          ) : (
            courses.map((course, index) => (
              <tr
                key={course.id}
                className={`border-b hover:bg-base-300 transition ${index % 2 === 0 ? "bg-base-200" : "bg-base-100"}`}
              >
                <td className="p-4 font-medium text-base-content">{index + 1}</td>
                <td className="p-4 font-semibold text-base-content">{course.name}</td>
                <td className="p-4">{course.creator?.name}</td>
                <td className="p-4">{course.category?.name}</td>
                <td className="p-4">{course.shortName}</td>
                <td className="p-4">{course.price > 0 ? Math.ceil(+course.price).toLocaleString() : "رایگان"}</td>
                <td className="p-4">فعال</td>
                <td className="p-4">
                  <DeleteModal
                    deleteId={course.id}
                    onDelete={handleDeleteCourse}
                    message="آیا از حذف این دوره اطمینان دارید ؟"
                    title="حذف دوره 🚀"
                    deleteBtnText="حذف دوره"
                    messageDesc="این اقدام قابل بازگشت نیست !"
                  />
                </td>
                <td className="p-4">
                  <EditCourseModal onSave={(id, data) => handleEditCourse(id, data)} editId={course.id} courseData={course} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CourseTable;