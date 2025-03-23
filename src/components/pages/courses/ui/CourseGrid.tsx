import React from "react";
import CourseCardSkeleton from "@/components/skeletons/CourseCardSkeleton";
import CourseCard from "@/components/shared/CourseCard";
import { ICourse } from "@/interfaces/interfaces";
import NoCoursesMessage from "./NoCoursesMessage";
import { FaSpinner } from "react-icons/fa";

interface CourseGridProps {
  isLoading: boolean;
  sortedCourses: ICourse[];
  hasMoreCourses: boolean;
}

const CourseGrid: React.FC<CourseGridProps> = ({
  isLoading,
  sortedCourses,
  hasMoreCourses,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {isLoading ? (
        Array.from({ length: 6 }).map((_, index) => (
          <CourseCardSkeleton key={index} />
        ))
      ) : sortedCourses.length > 0 ? (
        <>
          {sortedCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
          {hasMoreCourses && (
            <div className="col-span-full flex justify-center py-4">
              <FaSpinner className="animate-spin text-2xl text-primary" />
            </div>
          )}
        </>
      ) : (
        <NoCoursesMessage />
      )}
    </div>
  );
};

export default CourseGrid;