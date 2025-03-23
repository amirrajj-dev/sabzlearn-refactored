import React from "react";
import CourseDetailsLeft from "./CourseDetailsLeft";
import CourseDetailsRight from "./CourseDetailsRight";
import { ICourse } from "@/interfaces/interfaces";

const CourseDetails = ({singleCourse} : {singleCourse : ICourse}) => {
  return (
    <div className="mt-10 flex flex-col lg:flex-row items-start gap-8">
      {/* Course Details Grid */}
      <CourseDetailsRight updatedAt={singleCourse.updatedAt} />

      {/* Course Rating & Progress Section */}
      <CourseDetailsLeft courseName={singleCourse.name} />
    </div>
  );
};

export default CourseDetails;
