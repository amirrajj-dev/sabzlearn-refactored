"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaGraduationCap, FaLock } from "react-icons/fa";
import { useSessionStore } from "@/store/session.store";
import { useCourseStore } from "@/store/course.store";
import dynamic from "next/dynamic";
import { ISession } from "@/interfaces/interfaces";
const ReactPlayer = dynamic(()=>import('react-player') , {ssr : false})

interface Session {
  title: string;
  description: string;
  video: string;
}

const CourseSessions = ({sessions} : {sessions : ISession[]}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <div className="mt-10 gap-6">
      <div className="w-full space-y-4 p-6 bg-base-300 shadow-lg rounded-2xl">
        <div className="flex items-center gap-4 mb-6">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.95 }}
            className="text-warning text-2xl sm:text-3xl md:text-5xl"
          >
            <FaGraduationCap className="text-primary -translate-y-1" />
          </motion.div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-dana-demi text-primary">
            سرفصل ها
          </h2>
        </div>
        {!sessions ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="skeleton h-16 w-full bg-base-200 rounded-xl"
              ></div>
            ))}
          </div>
        ) : sessions.length === 0 ? (
          <div className="text-center text-lg text-gray-500 py-6">
            هیچ جلسه‌ای برای این دوره وجود ندارد.
          </div>
        ) : (
          sessions.map((session, index) => (
            <div
              key={index}
              className="border bg-base-100 border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden"
            >
              <button
                className="w-full flex justify-between items-center px-5 py-4 text-lg font-semibold bg-base-200 transition-all"
                onClick={() =>session.free ? toggleAccordion(index) : null}
              >
                <span className="text-sm sm:text-base">{session.title}</span>
                {session.free === 1 ? activeIndex === index ? <IoIosArrowUp /> : <IoIosArrowDown /> : <FaLock/>}
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-5 py-4 bg-base-300"
                  >
                    <ReactPlayer
                      url={String(session.video)}
                      controls
                      width="100%"
                      height="auto"
                      className="rounded-lg overflow-hidden sm:h-auto"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))
        )}
      </div>
      <div className="hidden md:block md:w-1/3"></div>
    </div>
  );
};

export default CourseSessions;