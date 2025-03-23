"use client";
import React, { useEffect } from "react";
import SectionHeader from "../shared/SectionHeader";
import CourseCard from "../shared/CourseCard";
import CourseCardSkeleton from "../skeletons/CourseCardSkeleton";
import { useCourseStore } from "@/store/course.store";
import { ICourse } from "@/interfaces/interfaces";

const LastCourses = () => {
  const { getAllCourses, courses, loading } = useCourseStore();

  useEffect(() => {
    getAllCourses();
  }, []);

  const lastCourses: ICourse[] = courses.slice(0, 4)

  return (
    <div className="mt-20">
      <SectionHeader
        title="آخرین دوره های سبزلرن"
        squareColor="bg-yellow-500"
        desc="سکوی پرتاب شما به سمت موفقیت"
        haveLink={true}
        linkText="مشاهده همه دوره ها"
        linkUrl="/courses"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 mt-8">
        {loading
          ? Array(4)
              .fill(null)
              .map((_, index) => (
                <CourseCardSkeleton key={index} />
              ))
          : lastCourses.length > 0 ? (
              lastCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))
            ) : (
              <p className="col-span-4 text-center text-lg text-gray-500">هیچ دوره‌ای یافت نشد 😔</p>
            )}
      </div>
    </div>
  );
};

export default LastCourses;