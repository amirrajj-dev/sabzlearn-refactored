'use client'
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { motion } from "framer-motion";
import Link from "next/link";
import { ICategory} from "@/interfaces/interfaces";
import { usePathname , useSearchParams } from "next/navigation";

const MenuItem = ({ item, isOpen, toggleOpen , setDrawerOpen }: { item: ICategory, isOpen: boolean, toggleOpen: () => void , setDrawerOpen: (value: boolean) => void; }) => {
  const pathname = usePathname()
  const searchParam = useSearchParams().get('sort')
  const queryUrl = `${pathname}?sort=${searchParam}`
  return (
    <li className="w-full">
      <div
        className="w-full cursor-default px-4 py-2 bg-base-100 hover:bg-primary hover:text-white rounded-md flex justify-between items-center"
        onClick={toggleOpen}
      >
        <Link onClick={()=>setDrawerOpen(false)} href={`/courses?sort=${item.title}`} className={`cursor-pointer ${queryUrl === `/courses?sort=${item.title}` ? 'text-primary' : null}`}>{item.name}</Link>
        {isOpen ? <FiChevronUp className="cursor-pointer" /> : <FiChevronDown className="cursor-pointer" />}
      </div>
      <motion.ul
        className={`${isOpen ? "block" : "hidden"} bg-base-200 rounded-md mt-2`}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 30 }}
      >
        {item!.courses!.map((course, index) => (
          <li key={course.id} className={`hover:bg-primary hover:text-white rounded-md`}>
            <Link href={`/courses/${course.shortName}`} onClick={()=>setDrawerOpen(false)} className={`block px-4 py-2 ${`/courses/${course.shortName}` === pathname ? 'text-primary' : null}`}>
              {course.name}
            </Link>
          </li>
        ))}
      </motion.ul>
    </li>
  );
};

export default MenuItem;