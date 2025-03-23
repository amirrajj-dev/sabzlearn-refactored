import Courses from "@/components/pages/courses/Courses";
import { Metadata } from "next";
import React from "react";


interface CoursesPageProps {
  params: Promise<void>;
  searchParams: Promise<{ sort: string }>;
}

export const metadata: Metadata = {
  title: "دوره‌های آموزشی | سبزلرن - یادگیری آسان و حرفه‌ای",
  description: "به صفحه دوره‌های آموزشی سبزلرن خوش آمدید! در اینجا می‌توانید بهترین دوره‌های برنامه‌نویسی، طراحی وب، و سایر مهارت‌های فناوری اطلاعات را پیدا کنید. با آموزش‌های ویدیویی، پروژه‌های عملی، و پشتیبانی حرفه‌ای، مهارت‌های خود را ارتقا دهید.",
  keywords: ["دوره‌های آموزشی", "برنامه‌نویسی", "طراحی وب", "سبزلرن", "آموزش آنلاین", "یادگیری حرفه‌ای"],
  icons: {
    icon: "/logo/fav.png",
  },
  openGraph: {
    title: "دوره‌های آموزشی | سبزلرن - یادگیری آسان و حرفه‌ای",
    description: "به صفحه دوره‌های آموزشی سبزلرن خوش آمدید! در اینجا می‌توانید بهترین دوره‌های برنامه‌نویسی، طراحی وب، و سایر مهارت‌های فناوری اطلاعات را پیدا کنید.",
    url: "https://www.sabzlearn.ir/courses",
    siteName: "سبزلرن",
    images: [
      {
        url: "https://www.sabzlearn.ir/images/courses-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "دوره‌های آموزشی سبزلرن",
      },
    ],
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "دوره‌های آموزشی | سبزلرن - یادگیری آسان و حرفه‌ای",
    description: "به صفحه دوره‌های آموزشی سبزلرن خوش آمدید! در اینجا می‌توانید بهترین دوره‌های برنامه‌نویسی، طراحی وب، و سایر مهارت‌های فناوری اطلاعات را پیدا کنید.",
    images: ["https://www.sabzlearn.ir/images/courses-twitter-image.jpg"],
  },
};

const CoursesPage = ({ params, searchParams }: CoursesPageProps) => {

  return (
  <Courses searchParams={searchParams} />
  );
};

export default CoursesPage;