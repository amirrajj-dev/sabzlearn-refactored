import Image from "next/image";
import React from "react";
import SabzText from "../SabzText";
import { FaInstagram, FaTelegram } from "react-icons/fa";
import Link from "next/link";
import { RiTelegram2Line } from "react-icons/ri";
import { IoMailOutline } from "react-icons/io5";
import { MdOutlineLocalPhone } from "react-icons/md";

const Footer = () => {
  return (
    <div className="bg-base-300 mt-20 p-6 sm:p-10">

      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4 sm:gap-0">
        <div className="flex items-center gap-4">
          <Image
            src={"/logo/logo.webp"}
            width={70}
            height={70}
            alt="sabzlearn logo"
          />
          <SabzText size="size-30" />
        </div>
        <div className="flex gap-4">
          <Link
            href="https://www.instagram.com/sabzlearn"
            className="btn glass btn-circle text-xl"
          >
            <FaInstagram />
          </Link>
          <Link
            href="https://t.me/sabzlearn"
            className="btn glass btn-circle text-xl"
          >
            <FaTelegram />
          </Link>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center sm:justify-center gap-4 sm:gap-6 text-sm">
        <Link href="#" className="flex items-center gap-2">
          <MdOutlineLocalPhone />
          <span>02191030926</span>
        </Link>
        <Link href="#" className="flex items-center gap-2">
          <RiTelegram2Line />
          <span>info@sabzlearn.ir</span>
        </Link>
        <Link href="#" className="flex items-center gap-2">
          <IoMailOutline />
          <span>sabzlearn_support@</span>
        </Link>
      </div>

      <div className="divider"></div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 text-center sm:text-right">

        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-xl">درباره سبزلرن</h3>
          <p className="text-sm leading-relaxed">
            شروع هرچیزی سخته، ولی وقتی مسیر درستی رو انتخاب کنی، با خیال راحت و
            بدون استرس میتونی از مسیر لذت ببری. ما در سبزلرن، توی سفر به دنیای
            برنامه‌نویسی کنارت هستیم تا باهم رشد کنیم و از نتیجه زحمات‌مون لذت
            ببریم.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-10">
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-xl">دوره‌های پرطرفدار</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/courses/eslint" className="text-base-content">
                  آموزش کاربردی Eslint
                </Link>
              </li>
              <li>
                <Link href="/courses/next-js" className="text-base-content">
                  آموزش Next.js
                </Link>
              </li>
              <li>
                <Link href="/courses/bash-script" className="text-base-content">
                  آموزش Bash Script
                </Link>
              </li>
              <li>
                <Link href="/courses/fastify" className="text-base-content">
                  آموزش  Fastify
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-xl">لینک‌های مفید</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms-conditions" className="text-base-content">
                  قوانین و مقررات
                </Link>
              </li>
              <li>
                <Link href="#" className="text-base-content">
                  ارسال تیکت
                </Link>
              </li>
              <li>
                <Link href="#" className="text-base-content">
                  همه دوره‌ها
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <Image
            src="https://sabzlearn.ir/wp-content/themes/sabzlearn-theme/images/enamad.png"
            width={160}
            height={160}
            alt="enamad"
            className="w-32 h-32 sm:w-40 sm:h-40"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-right mt-8 text-sm">
        <span>کلیه حقوق مادی و معنوی سایت برای سبزلرن محفوظ است.</span>
        <span>ساخته شده با ❤️ در سبزلرن</span>
      </div>
    </div>
  );
};

export default Footer;
