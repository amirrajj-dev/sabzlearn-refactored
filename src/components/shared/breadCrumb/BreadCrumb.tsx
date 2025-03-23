"use client";
import React, { memo } from "react";
import { motion } from "framer-motion";
import { FaHome, FaFolder, FaTag } from "react-icons/fa";
import Link from "next/link";
import { useCourseStore } from "@/store/course.store";

interface BreadCrumbProps {
  title: string;
  category?: string;
  categoryLink: string;
  section: string;
  sectionLink? : string
}

const BreadCrumb = ({
  title,
  category,
  categoryLink,
  section,
  sectionLink
}: BreadCrumbProps) => {
  const { loading } = useCourseStore();

  return (
    <motion.div
      className="text-xs sm:text-sm md:text-base breadcrumbs w-full py-3 sm:py-4 px-4 sm:px-8 bg-base-300 rounded-xl shadow-lg mx-auto md:mx-0"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
    >
      <ul className="flex flex-wrap gap-2 sm:gap-4 items-center" dir="rtl">
        <li className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/"
            aria-label="Go to Home"
            className="p-2 rounded-md bg-base-100 hover:bg-base-200 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <FaHome className="text-lg sm:text-xl text-base-600" />
          </Link>
        </li>

        <li className="flex items-center gap-1 sm:gap-2">
          <FaFolder className="text-sm sm:text-lg text-base-600" />
          <Link
            href={sectionLink as string}
            aria-label={`Browse ${section} courses`}
            className="transition font-medium text-base-700 focus:outline-none"
          >
            {section}
          </Link>
        </li>

        {category && categoryLink && (
          <li className="flex items-center gap-1 sm:gap-2">
            {loading ? (
              <span className="skeleton w-20 h-5 block rounded-md"></span>
            ) : (
              <>
                <FaTag className="text-sm sm:text-lg text-base-600" />
                <Link
                  href={categoryLink as string}
                  aria-label={`Browse courses in ${category}`}
                  className="transition text-base-700 focus:outline-none"
                >
                  {category}
                </Link>
              </>
            )}
          </li>
        )}

        <li className="font-bold truncate">
          {loading ? (
            <span className="skeleton w-32 h-5 block rounded-md"></span>
          ) : (
            <span className="text-base-900">{title}</span>
          )}
        </li>
      </ul>
    </motion.div>
  );
};

export default memo(BreadCrumb);
