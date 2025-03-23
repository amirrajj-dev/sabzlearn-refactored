
import React from "react";
import CourseForm from "./CourseForm";
import CourseTable from "./CourseTable";

export interface Article {
  id: number;
  title: string;
  link: string;
  description: string;
  abstract: string;
  category: string;
  coverImage: File | null;
  isDraft: boolean;
  status: string;
}

const CoursesPage = () => {

  return (
    <div className="p-6 max-w-5xl mx-auto bg-base-200">
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-0 justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-base-content">🚀 دوره ها</h1>
      </div>

    <CourseForm/>
    <CourseTable />

     
    </div>
  );
};

export default CoursesPage;