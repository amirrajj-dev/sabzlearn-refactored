import { motion } from "framer-motion";
import UserSection from "./UserSection";
import MenuItem from "./MenuItem";
import ThemeSwitcher from "./themeSwitcher";
import { useEffect, useState } from "react";
import { ICategory } from "@/interfaces/interfaces";
import Link from "next/link";

const MobileDrawer = ({
  drawerOpen,
  setDrawerOpen,
  menuRef,
  menuItems,
  themeItems,
}: {
  drawerOpen: boolean;
  setDrawerOpen: (value: boolean) => void;
  menuRef: React.RefObject<HTMLDivElement | null>;
  menuItems: ICategory[];
  themeItems: any[];
}) => {
  const [themeDropDownToggle, setThemeDropdownToggle] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setTimeout(() => {
        setDrawerOpen(false);
      }, 700);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.documentElement.setAttribute(
      "data-theme",
      localStorage.getItem("theme") as string
    );
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleThemeToggle = () => {
    setThemeDropdownToggle(!themeDropDownToggle);
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const toggleMenuItem = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div
      className={`${
        drawerOpen ? "absolute min-h-screen" : ""
      } z-50 inset-0 bg-black/50`}
    >
      <motion.div
        ref={menuRef}
        className="fixed top-0 right-0 w-68 sm:w-80 h-full bg-base-100 shadow-xl rounded-tl-lg overflow-y-auto"
        initial={{ x: "100%" }}
        animate={{ x: drawerOpen ? 0 : "100%" }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <UserSection />
        <ul className="menu p-4 space-y-3 w-full">
          {menuItems.map((item, index) => (
            <MenuItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              toggleOpen={() => toggleMenuItem(index)}
              setDrawerOpen={setDrawerOpen}
            />
          ))}
          <Link
            href={"/courses"}
            className="w-full px-4 py-2 bg-base-100 hover:bg-primary hover:text-white rounded-md flex"
          >
            دوره ها
          </Link>
          <Link
            href={"/articles"}
            className="w-full px-4 py-2 bg-base-100 hover:bg-primary hover:text-white rounded-md flex"
          >
            مقالات
          </Link>
        </ul>
        <div className="divider divide-base-300 p-2 pt-0"></div>
        <ThemeSwitcher
          themeItems={themeItems}
          handleThemeToggle={handleThemeToggle}
          handleThemeChange={handleThemeChange}
          themeDropDownOpen={themeDropDownToggle}
        />
      </motion.div>
    </div>
  );
};

export default MobileDrawer;
