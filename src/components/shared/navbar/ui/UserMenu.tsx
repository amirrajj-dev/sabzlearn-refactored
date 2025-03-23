"use client";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { userMenuItems } from "@/data/data";
import { useAuthStore } from "@/store/auth.store";

const UserMenu = ({
  menuOpen,
  setMenuOpen,
  username,
}: {
  menuOpen: boolean;
  setMenuOpen: (value: boolean) => void;
  username: string;
}) => {
  const { signout, user , isAuthenticated } = useAuthStore();
  const handleLogOut = () => {
    const isSure = confirm("آیا از خروج اطمینان دارید ؟");
    if (isSure) {
      signout();
      setMenuOpen(false)
    }
  };
  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setMenuOpen(!menuOpen)}
        className="btn btn-ghost text-white hover:text-primary transition-all duration-300"
      >
        <FaUser className="text-xl text-base-content" />
      </motion.button>

      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute left-0 mt-2 w-52 bg-base-300 shadow-xl rounded-xl z-10 menu menu-sm border border-gray-700"
          >
            <li>
              <div className="flex gap-4">
                <Image
                  width={40}
                  height={40}
                  alt="user logo"
                  className="rounded-full"
                  src={
                    user?.profile || "https://secure.gravatar.com/avatar/3f58c412b0a58283b996679c819684d0?s=96&d=mm&r=g"
                  }
                />
                <div className="flex flex-col">
                  <span>{username}</span>
                  <span>موجودی : 0</span>
                </div>
              </div>
            </li>
            <div className="divider divide-base-content py-0  my-0"></div>
            {userMenuItems.map((item, index) => {
              if (item.showFor === "admin" && user?.role !== "ADMIN")
                return null;
              if (item.label === "divider") {
                return (
                  <li
                    key={index}
                    className="divider divide-base-content h-px my-0"
                  />
                );
              }
              if (item.label === "خروج") {
                return (
                  <motion.li
                  key={Math.random()}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <button
                      onClick={() => handleLogOut()}
                      className="flex items-center gap-3 px-4 py-3 text-base-content hover:bg-primary hover:text-primary-content rounded-lg transition duration-300 ease-in-out"
                    >
                      {item.icon && (
                        <span className="text-lg">{item.icon}</span>
                      )}
                      <span className="font-medium">{item.label}</span>
                    </button>
                  </motion.li>
                );
              }
              if (item.label === 'پنل کاربری' && !isAuthenticated){
                return null
              }
              return (
                <motion.li
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  onClick={()=>setMenuOpen(false)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 text-base-content hover:bg-primary hover:text-primary-content rounded-lg transition duration-300 ease-in-out"
                  >
                    {item.icon && <span className="text-lg">{item.icon}</span>}
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserMenu;
