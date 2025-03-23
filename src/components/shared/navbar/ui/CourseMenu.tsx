"use client";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { motion } from "framer-motion";
import { useState } from "react";
import { ICategory } from "@/interfaces/interfaces";
import { usePathname } from "next/navigation";

interface CourseMenuProps {
    menuItems : ICategory[],
    currentOption : number | null,
    setCurrentOption : (valur : number | null) => void,
    handleSetCurrentOption : (value : number) => void
}

const CoursesMenu = ({ menuItems, currentOption, setCurrentOption, handleSetCurrentOption } : CourseMenuProps) => {
  const [hovered, setHovered] = useState(false);
  const pathname = usePathname()
  return (
    <div
      className="relative group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link
        href="/"
        className="btn btn-ghost gap-2 text-base font-medium text-base-content flex items-center transition-all duration-300"
      >
        دوره های آموزشی
        <motion.span
          animate={{ rotate: hovered ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <IoIosArrowDown className="text-lg" />
        </motion.span>
      </Link>

      {/* Dropdown Menu */}
      {hovered && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute right-0 bg-base-300 shadow-xl rounded-xl z-10 w-64 transition-all p-2 border border-gray-700"
        >
          {menuItems.filter(item=>item!.courses!.length > 0).map((item, index : number) => (
            <div
              key={index}
              className="relative group"
              onMouseEnter={() => handleSetCurrentOption(index)}
              onMouseLeave={() => setCurrentOption(null)}
            >
              {/* Submenu Item */}
              <Link
                href={`/courses?sort=${item.title}`}
                className="block px-4 py-3 text-xs font-medium text-base-content hover:bg-primary hover:text-primary-content rounded-lg transition-colors"
              >
                {item.name}
              </Link>

              {/* Nested Submenu */}
              {currentOption === index && (
                <motion.div
                  initial={{ opacity: 0, x: -10, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -10, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute right-full top-0 bg-base-300 shadow-lg rounded-lg z-10 w-48 mt-0 p-2 border border-gray-700"
                >
                  {item!.courses!.map((option, index) => (
                    <Link
                      href={`/courses/${option.shortName}`}
                    key={option.id}
                      className={`block px-4 py-2 text-xs ${pathname.slice(9) === option.shortName ? 'text-success' : 'text-base-content'} hover:bg-primary hover:text-primary-content rounded-md transition-colors`}
                    >
                      {option.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default CoursesMenu;