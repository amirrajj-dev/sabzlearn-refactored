import Link from 'next/link';
import React, { JSX } from 'react';
import { FaBookOpen, FaChalkboardTeacher, FaLaptopCode } from 'react-icons/fa'; 

interface CourseCategoryProps {
  icon: JSX.Element; 
  text: string;
  count: number;
  from: string;
  to: string;
  link : string
}

const CourseCategory: React.FC<CourseCategoryProps> = ({ icon, text, count, from, to , link }) => {
  return (
    <Link href={link}
      className={`card w-full bg-gradient-to-r ${from} ${to} shadow-lg rounded-md px-6 py-10 text-white`}
    >
      <div className="flex items-center justify-center gap-4">
        <div className="text-5xl">{icon}</div>
        <div>
          <h3 className="text-xl font-semibold">{text}</h3>
          <p className="text-sm">دوره ها: {count}</p>
        </div>
      </div>
    </Link>
  );
}

export default CourseCategory;