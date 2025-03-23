import React from "react";
import Course from "@/components/pages/course/Course";
import { ICourse } from "@/interfaces/interfaces";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSingleCourse } from "@/actions/course.action";


interface MainCourseProps {
  params: Promise<{ course: string }>;
}

export const generateMetadata = async ({ params }: { params: Promise<{ course: string }> }): Promise<Metadata> => {
  const course: ICourse = (await getSingleCourse((await params).course)).data as ICourse;
  if (!course) redirect('/')
  return {
    title: `${course.name} | سبزلرن`,
    description: course.description || "دوره‌ای جامع و کاربردی در زمینه برنامه‌نویسی و فناوری اطلاعات.",
    keywords: [course.name, course.category!.name, "برنامه‌نویسی", "توسعه وب", "سبزلرن", "آموزش آنلاین"],
    openGraph: {
      title: `${course.name} | سبزلرن`,
      description: course.description || "دوره‌ای جامع و کاربردی در زمینه برنامه‌نویسی و فناوری اطلاعات.",
      url: `https://www.sabzlearn.ir/courses/${course.shortName}`,
      siteName: "سبزلرن",
      images: [
        {
          url: course.cover ? `https://www.sabzlearn.ir/images/${course.cover}` : "https://www.sabzlearn.ir/images/default-course-og.jpg",
          width: 1200,
          height: 630,
          alt: course.name,
        },
      ],
      locale: "fa_IR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${course.name} | سبزلرن`,
      description: course.description || "دوره‌ای جامع و کاربردی در زمینه برنامه‌نویسی و فناوری اطلاعات.",
      images: [course.cover ? `https://www.sabzlearn.ir/images/${course.cover}` : "https://www.sabzlearn.ir/images/default-course-twitter.jpg"],
    },
  };
};

const MainCourse: React.FC<MainCourseProps> = async ({ params }) => {
  const course: ICourse = (await getSingleCourse((await params).course)).data as ICourse;
 return (
  <Course course={course} />
 )
};

export default MainCourse;