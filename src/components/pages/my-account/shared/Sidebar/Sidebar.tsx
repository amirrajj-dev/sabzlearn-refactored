"use client";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { userMenuItems } from "@/data/data";
import Image from "next/image";
import SabzText from "@/components/shared/SabzText";
import Link from "next/link";
import { useAuthStore } from "@/store/auth.store";
import { toast } from "react-toastify";
import { toastOptions } from "@/helpers/toast";
import { useRouter } from "next/navigation";

interface SidebarProps {
  isExpanded: boolean;
  isTablet: boolean;
  setIsTablet: (isTablet: boolean) => void;
}

const Sidebar = ({ isExpanded, isTablet, setIsTablet }: SidebarProps) => {
  const sidebarVariants = {
    collapsed: { width: 58 },
    expanded: { width: 384 },
  };

  const itemVariants = {
    collapsed: { opacity: 0, x: -20 },
    expanded: { opacity: 1, x: 0 },
  };

  const hoverVariants = {
    hover: { scale: 1.1, originX: 0 },
    rest: { scale: 1 },
  };

  const {signout} = useAuthStore()
  const router = useRouter()

  const handleLogOut = async ()=>{
    if (confirm('آیا از خروج اطمینان دارید ؟')){
      signout()
      router.replace('/')
      toast.success("خروج با موفقیت به انجام رسید" , toastOptions)
    }
  }

  return (
    <motion.div
      className="bg-base-300 min-h-screen z-50 fixed shadow-xl"
      initial="collapsed"
      animate={isExpanded && !isTablet ? "expanded" : "collapsed"}
      variants={sidebarVariants}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ width: isTablet ? 58 : undefined }}
    >
      <div
        className={`flex flex-col pt-16 ${
          isExpanded ? "pr-10" : "pr-2"
        } items-start`}
      >
        {!isTablet && (
          <motion.div
            className="flex items-center gap-4 ml-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: isExpanded ? 1 : 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link href={"/"} className="flex items-center gap-4">
              <Image
                src={"/logo/logo.webp"}
                alt="sabzlearn logo"
                width={80}
                height={80}
                className="rounded-lg"
              />
              <AnimatePresence>
                {isExpanded && <SabzText size="size-30" />}
              </AnimatePresence>
            </Link>
          </motion.div>
        )}

        <ul className="flex flex-col gap-6 mt-12 w-full px-.5">
          {userMenuItems
            .filter(
              (item) =>
                item.label !== "پنل ادمین" &&
                item.label !== "divider" &&
                item.label !== "پنل کاربر"
            )
            .map((item, index) => (
              <motion.li
                key={index}
                className="relative group"
                variants={hoverVariants}
                onClick={item.label === 'خروج' ? handleLogOut : ()=>{}}
                whileHover="hover"
                animate="rest"
              >
                <Link href={item.href} className="flex items-center gap-4">
                  <motion.span
                    className={`text-2xl p-2 rounded-lg bg-base-100 shadow-md ${
                      isTablet ? "tooltip tooltip-left" : ""
                    }`}
                    whileHover={{ rotate: 10 }}
                    data-tip={isTablet ? item.label : ""}
                  >
                    {item.icon}
                  </motion.span>

                  {!isTablet && (
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.span
                          className="text-lg font-dana-extra-light absolute left-20 bg-base-100 px-4 py-2 rounded-lg shadow-md"
                          initial="collapsed"
                          animate="expanded"
                          exit="collapsed"
                          variants={itemVariants}
                          transition={{ type: "spring", stiffness: 200 }}
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  )}
                </Link>
              </motion.li>
            ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default Sidebar;
