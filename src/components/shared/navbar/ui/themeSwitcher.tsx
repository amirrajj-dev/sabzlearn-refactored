import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { motion } from "framer-motion";

const ThemeSwitcher = ({ 
  themeItems, 
  handleThemeToggle, 
  themeDropDownOpen, 
  handleThemeChange 
}: { 
  themeItems: any[]; 
  handleThemeToggle: () => void; 
  themeDropDownOpen: boolean; 
  handleThemeChange: (value: string) => void; 
}) => {
  return (
    <ul className="menu w-full space-y-3 p-4 pt-0">
      <li className="w-full">
        <button
          onClick={handleThemeToggle}
          className="w-full text-left px-4 py-2 bg-base-100 hover:bg-primary hover:text-white rounded-md flex justify-between items-center"
        >
          تغیر تم
          {themeDropDownOpen ? (
            <FiChevronUp className="ml-2" />
          ) : (
            <FiChevronDown className="ml-2" />
          )}
        </button>
        <motion.ul
          className={`${
            themeDropDownOpen ? "block" : "hidden"
          } bg-base-200 rounded-md mt-2`}
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: themeDropDownOpen ? "auto" : 0,
            opacity: themeDropDownOpen ? 1 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 30,
          }}
        >
          {themeItems.map((item, index) => (
            <li
              onClick={() => handleThemeChange(item.value)}
              key={index}
              className="hover:bg-primary hover:text-white rounded-md transition-colors duration-300"
            >
              <a href="#" className="block px-4 py-2">
                {item.label}
              </a>
            </li>
          ))}
        </motion.ul>
      </li>
    </ul>
  );
};

export default ThemeSwitcher;
