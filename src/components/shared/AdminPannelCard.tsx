import React, { JSX } from "react";
import Link from "next/link";

interface CategoryCardProps {
  title: string;
  icon: JSX.Element;
  count: string;
  bgColor: string;
  linkUrl: string;
}

const AdminPannelCard: React.FC<CategoryCardProps> = ({
  title,
  icon,
  count,
  bgColor,
  linkUrl,
}) => {
  return (
    <Link href={linkUrl} className="group">
      <div
        className={`p-6 rounded-2xl shadow-md flex flex-col items-center h-[144px] justify-center text-white ${bgColor} transition-transform duration-300 transform group-hover:scale-105`}
      >
        <div className="text-4xl">{icon}</div>
        <h3 className="mt-3 text-lg font-bold">{title}</h3>
        <span className="text-sm opacity-80">{count ? count : ''}</span>
      </div>
    </Link>
  );
};

export default AdminPannelCard;