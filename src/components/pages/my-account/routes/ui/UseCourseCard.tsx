"use client";
import React from "react";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ICourse } from "@/interfaces/interfaces";

const UserCourseCard = ({ course }: { course: ICourse }) => {
  const img = course.cover && course.cover.slice(course.cover.lastIndexOf('/upload')).slice(8)
  const optimizedImageUrl = `https://res.cloudinary.com/dnrws0axe/image/upload/w_500,h_300,q_auto,f_auto/${img}`;

  return (
    <motion.div
      className="card w-full relative bg-gradient-to-br from-base-200 to-base-300 shadow-xl rounded-xl hover:shadow-2xl transition-all duration-300 border border-gray-700/30 hover:border-primary/20 overflow-hidden group"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
    >
      <Link href={`/courses/${course.shortName}`} className="relative block">
        <div className="relative h-40 overflow-hidden">
          <Image
            src={optimizedImageUrl || course.cover as string}
            alt={course.name}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            width={500}
            height={200}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-base-300/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        {course.discount > 0 && (
          <div className="badge badge-primary absolute top-3 left-3 -rotate-12 shadow-lg animate-pulse">
            {course.discount}% تخفیف
          </div>
        )}
      </Link>

      <div className="card-body p-5">
        <Link 
          href={`/courses/${course.shortName}`} 
          className="card-title text-lg font-bold text-primary hover:text-primary-focus transition-colors line-clamp-2 h-14"
        >
          {course.name}
        </Link>
        
        <p className="text-sm text-base-content/80 line-clamp-2 mt-2 mb-4">
          {course.description}
        </p>

        <div className="w-full mt-4">
          <div className="flex justify-between text-xs text-base-content/70 mb-1">
            <span>پیشرفت دوره</span>
            <span>0%</span>
          </div>
          <div className="w-full bg-base-content/10 rounded-full h-2">
            <div 
              className="bg-primary rounded-full h-2 transition-all duration-500 ease-out" 
              style={{ width: '0%' }}
            ></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserCourseCard;