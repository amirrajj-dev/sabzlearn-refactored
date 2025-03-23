'use client'
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { FaLayerGroup } from "react-icons/fa";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { motion } from "framer-motion";
import { useCourseStore } from "@/store/course.store";

const RelatedCourses = ({courseId} : {courseId : string}) => {
  const { relatedCourses , getRelatedCourses, loading } = useCourseStore();
  useEffect(()=>{
    getRelatedCourses(courseId)
  } , [courseId])
  return (
    <div className="mt-10 p-6 bg-base-300 shadow-lg rounded-2xl hidden sm:block">
      <div className="flex items-center gap-4 mb-6">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.95 }}
          className="text-warning text-2xl sm:text-3xl md:text-5xl"
        >
          <FaLayerGroup className="text-error" />
        </motion.div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-dana-demi text-error">
          دوره های مرتبط
        </h2>
      </div>

      {loading ? (
        <div className="flex flex-col gap-4">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="bg-base-100 rounded-lg overflow-hidden shadow-md p-4 flex justify-between items-center gap-4 animate-pulse"
            >
              <div className="flex items-center gap-3">
                <div className="skeleton w-24 h-14 rounded-md"></div>
                <div className="skeleton h-4 w-40"></div>
              </div>
              <div className="skeleton h-6 w-16"></div>
            </div>
          ))}
        </div>
      ) : relatedCourses.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center p-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.5 }}
            className="text-error text-5xl mb-4"
          >
            <MdOutlineLibraryBooks />
          </motion.div>
          <h3 className="text-lg font-semibold text-base-content">
            هیچ دوره‌ای مرتبط یافت نشد!
          </h3>
          <p className="text-sm text-base-content opacity-80">
            لطفاً دوره‌های دیگر را بررسی کنید.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {relatedCourses.map((course, index) => (
            <div
              key={index}
              className="bg-base-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all p-4 flex justify-between items-center gap-4"
            >
              <div className="flex items-center gap-3">
                <Image
                  width={100}
                  height={50}
                  src={course?.cover as string}
                  alt={course?.name}
                  className="object-cover rounded-md"
                />
                <h3 className="text-md font-semibold text-base-content">
                  {course?.name}
                </h3>
              </div>
              <Link href={`/courses/${course.shortName}`} className="flex items-center text-error text-xl gap-2">
                <span className="text-sm">مشاهده</span>
                <IoArrowBackCircleSharp />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RelatedCourses;