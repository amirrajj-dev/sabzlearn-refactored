import React from "react";
import SectionHeader from "../shared/SectionHeader";
import CourseCategory from "./CourseCategory";
import { HiOutlineCodeBracket } from "react-icons/hi2";
import { LuShieldCheck, LuPuzzle } from "react-icons/lu";
import { AiOutlinePython } from "react-icons/ai";
import { useCourseStore } from "@/store/course.store";
import { getAllCourses } from "@/actions/course.action";

const RoadMaps = async () => {
  const courses = (await getAllCourses()).data
  const courseCategories = [
    {
      id: 1,
      title: "فرانت اند",
      icon: <HiOutlineCodeBracket />,
      count: courses!.filter(c=>c.category.name === 'فرانت اند').length,
      from: "from-yellow-400",
      to: "to-yellow-600",
      link: "/courses?sort=frontend",
    },
    {
      id: 2,
      title: "امنیت",
      icon: <LuShieldCheck />,
      count: courses!.filter(c=>c.category.name === "امنیت").length,
      from: "from-green-500",
      to: "to-green-700",
      link: "/courses?sort=security",
    },
    {
      id: 3,
      title: "پایتون",
      icon: <AiOutlinePython />,
      count: courses!.filter(c=>c.category.name === "پایتون").length,
      from: "from-blue-500",
      to: "to-blue-700",
      link: "/courses?sort=python",
    },
    {
      id: 4,
      title: "مهارت های نرم",
      icon: <LuPuzzle />,
      count: courses!.filter(c=>c.category.name ===  "ارتقای مهارت ها").length,
      from: "from-pink-500",
      to: "to-purple-700",
      link: "/courses?sort=skillUp",
    },
  ];

  return (
    <div className="mt-20" id="roadmaps">
      <SectionHeader
        title="نقشه راه ها"
        desc="نقشه های راه برای شروع اصولی یادگیری"
        squareColor="bg-red-500"
        haveLink={false}
        linkText=""
        linkUrl=""
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 mt-8">
        {courseCategories.map((item) => (
          <CourseCategory
            key={item.id}
            count={item.count}
            from={item.from}
            icon={item.icon}
            text={item.title}
            to={item.to}
            link={item.link}
          />
        ))}
      </div>
    </div>
  );
};

export default RoadMaps;
