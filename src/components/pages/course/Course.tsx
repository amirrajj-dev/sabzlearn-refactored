"use client";
import React from 'react';
import BreadCrumb from '@/components/shared/breadCrumb/BreadCrumb';
import CourseHeader from './ui/courseHeader/CourseHeader';
import CourseDetails from './ui/courseDetails/CourseDetails';
import CourseDesc from './ui/courseDescription/CourseDesc';
import CourseSessions from './ui/courseSessions/CourseSessions';
import RelatedCourses from './ui/relatedCourses/RelatedCourses';
import CourseCommentSection from './ui/courseCommentSesction/CourseCommentSection';
import CourseMaster from './ui/courseDescription/CourseMaster';
import CourseLink from './ui/courseDescription/CourseLink';
import { ICourse } from '@/interfaces/interfaces';

const Course = ({ course }: {course : ICourse}) => {
  return (
    <div className="max-w-7xl mx-auto my-10 p-4">
      <BreadCrumb
        title={course?.name as string}
        category={course.category!.name}
        categoryLink={`/courses?sort=${course.category!.title}`}
        section="دوره ها"
        sectionLink='/courses'
      />
      <CourseHeader singleCourse={course} />
      <CourseDetails singleCourse={course} />
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <CourseDesc body={course.body} name={course.name} cover={course.cover as string} />
          <CourseSessions sessions={course.sessions} />
          <RelatedCourses courseId={course.id} />
          <CourseCommentSection comments={course.comments} courseID={course.id} />
        </div>
        <div className="lg:col-span-1">
          <div className="flex flex-col h-fit shadow-lg gap-6 bg-base-300 p-4 rounded-lg">
            <CourseMaster masterName={course.creator!.name} masterProfile={course.creator!.profile as string} />
            <CourseLink />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;