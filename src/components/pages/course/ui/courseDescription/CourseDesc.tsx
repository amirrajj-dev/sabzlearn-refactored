"use client";
import React, { useState } from "react";
import CourseMaster from "./CourseMaster";
import CourseLink from "./CourseLink";
import { motion } from "framer-motion";
import Image from "next/image";
import { IoDocumentText } from "react-icons/io5";
import { useCourseStore } from "@/store/course.store";
import dompurify from "dompurify";

interface CourseDescProps {
  body : string
  cover  :string
  name : string
}

const CourseDesc : React.FC<CourseDescProps> = ({body , cover , name}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const sanitizeHtml = dompurify.sanitize(body as string, {
    ALLOWED_TAGS: ["p", "ul", "li", "h1", "h2", "h3", "h4", "h5", "h6", "strong", "em", "a"],
    ALLOWED_ATTR: ["href", "target"],
    FORBID_TAGS: ["img", "figure"],
  });

  return (
    <div className="flex flex-1 bg-base-300 shadow-lg p-4 rounded-lg">
      <div className="flex flex-1 p-6 flex-col gap-4">
        <div className="flex items-center gap-4 mb-6">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.95 }}
            className="text-warning text-2xl sm:text-3xl md:text-5xl"
          >
            <IoDocumentText className="text-warning" />
          </motion.div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-dana-demi text-warning">
            توضیحات
          </h2>
        </div>

        {!cover ? (
          <div className="skeleton block w-full bg-base-200 h-[400px] rounded-lg mb-4"></div>
        ) : (
          <Image
            src={cover as string}
            alt="Course Image"
            className="rounded-lg w-full object-cover mb-4"
            width={500}
            height={400}
          />
        )}

        {!name ? (
          <div className="skeleton block w-1/2  bg-base-200 h-6 rounded-lg mb-4"></div>
        ) : (
          <h2 className="text-2xl font-semibold text-base-content mb-4">
            {name}
          </h2>
        )}

        <div className="prose max-w-none">
          {!body ? (
            <div className="space-y-4">
              <div className="skeleton block w-full h-6 rounded-lg bg-base-200"></div>
              <div className="skeleton block w-3/4 h-6 rounded-lg bg-base-200"></div>
              <div className="skeleton block w-5/6 h-6 rounded-lg bg-base-200"></div>
            </div>
          ) : (
            <div
              className="text-base leading-8 font-dana-extra-light text-base-content 
              [&_:is(h1,h2,h3,h4,h5,h6)]:my-6 [&_:is(h1,h2,h3,h4,h5,h6)]:text-xl [&_:is(h1,h2,h3,h4,h5,h6)]:font-dana-bold [&_:is(li)]:my-[4px] [&_:is(li)]:list-disc"
              dangerouslySetInnerHTML={{
                __html: isExpanded ? sanitizeHtml : sanitizeHtml.slice(0, 250) + "..."
              }}
            />
          )}
        </div>

        {!name ? (
          <div className="skeleton block w-32 h-10 bg-base-200 rounded-lg mx-auto mt-4"></div>
        ) : (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="btn btn-success w-fit mx-auto mt-4"
          >
            {isExpanded ? "مشاهده کمتر" : "مشاهده بیشتر"}
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseDesc;