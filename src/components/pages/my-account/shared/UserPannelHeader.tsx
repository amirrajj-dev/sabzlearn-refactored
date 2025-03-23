"use client";
import ThemeMenu from "@/components/shared/navbar/ui/ThemeMenu";
import { themeItems } from "@/data/data";
import { useAuthStore } from "@/store/auth.store";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";

const UserPannelHeader = () => {
  const { user, getMe } = useAuthStore();
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const handleThemeChange = useCallback((newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  }, []);
  useEffect(() => {
    getMe();
    document.documentElement.setAttribute(
      "data-theme",
      localStorage.getItem("theme") as string
    );
  }, []);

  return (
    <div className="flex flex-col justify-center md:flex-row items-center md:justify-between">
      <div className="text-xl translate-y-3 md:text-2xl font-dana-demi mb-10">
       {user?.username} عزیز؛ خوش اومدی 🙌
      </div>
      <div className="flex items-center justify-center gap-6">
        <Image
          className="rounded-full"
          src={
            user?.profile || "https://secure.gravatar.com/avatar/3f58c412b0a58283b996679c819684d0?s=96&d=mm&r=g"
          }
          width={50}
          height={50}
          alt="user logo"
        ></Image>
        <ThemeMenu
          handleThemeChange={handleThemeChange}
          setThemeMenuOpen={setThemeMenuOpen}
          theme={theme}
          themeItems={themeItems}
          themeMenuOpen={themeMenuOpen}
        />
        <details className="dropdown dropdown-end">
          <summary className="btn btn-primary btn-circle btn-soft"><FaBell/></summary>
          <ul className="menu dropdown-content bg-base-300 rounded-box z-1 w-52 p-2 shadow-sm">
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </details>
      </div>
    </div>
  );
};

export default UserPannelHeader;
