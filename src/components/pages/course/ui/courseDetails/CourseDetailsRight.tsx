import React, { memo } from "react";
import CourseDetailCard from "./CourseDetailCard";
import { SlCalender } from "react-icons/sl";
import { FaCertificate, FaChartLine, FaClipboardList, FaClock } from "react-icons/fa";
import { TbMoodConfuzedFilled , TbMoodHappyFilled } from "react-icons/tb";
import { useCourseStore } from "@/store/course.store";
import moment from 'moment-jalaali'

const CourseDetailsRight = ({updatedAt} : {updatedAt : Date}) => {
  const {singleCourse} = useCourseStore()
  const formatedDate = moment(singleCourse?.updatedAt as Date).format("jYYYY/jMM/jDD");
  const courseDetails = [
    {
      title: "آخرین بروزرسانی",
      Icon: <SlCalender/>,
      desc: formatedDate,
    },
    {
      title: "مدت زمان دوره",
      Icon: <FaClock/>,
      desc: "12 ساعت آموزش ویدیویی",
    },
    {
      title: "وضعیت دوره",
      Icon: singleCourse?.status === 'active' ? <TbMoodHappyFilled/> : <TbMoodConfuzedFilled/>,
      desc: singleCourse?.status === 'active' ? 'فعال' : "در حال ضبط",
    },
    {
      title: "سطح دوره",
      Icon: <FaChartLine/>,
      desc: "مقدماتی تا پیشرفته",
    },
    {
      title: "گواهینامه پایان دوره",
      Icon: <FaCertificate/>,
      desc: "مدرک معتبر از سبزلرن",
    },
    {
      title: "پیش نیازها",
      Icon: <FaClipboardList/>,
      desc: "آشنایی مقدماتی با جاوااسکریپت",
    },
  ];
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 w-full lg:w-3/4 gap-4">
      {courseDetails.map((item, index) => (
        <CourseDetailCard key={index} {...item} />
      ))}
    </div>
  );
};

export default memo(CourseDetailsRight);
