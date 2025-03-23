import SignIn from '@/components/pages/auth/Signin';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "ورود به سبزلرن | آموزش آنلاین برنامه‌نویسی و مهارت‌های فناوری",
  description: "وارد حساب کاربری خود در سبزلرن شوید و به دوره‌های آموزشی برنامه‌نویسی و مهارت‌های فناوری دسترسی پیدا کنید. یادگیری آنلاین با کیفیت را با سبزلرن تجربه کنید.",
  keywords: ["ورود به سبزلرن", "آموزش برنامه‌نویسی", "مهارت‌های فناوری", "یادگیری آنلاین", "دوره‌های آموزشی", "سبزلرن"],
  openGraph: {
    title: "ورود به سبزلرن | آموزش آنلاین برنامه‌نویسی و مهارت‌های فناوری",
    description: "وارد حساب کاربری خود در سبزلرن شوید و به دوره‌های آموزشی برنامه‌نویسی و مهارت‌های فناوری دسترسی پیدا کنید.",
    url: "http://localhost:3000/signin",
    siteName: "سبزلرن",
    images: [
      {
        url: "http://localhost:3000/og-image.jpg",
        width: 800,
        height: 600,
        alt: "سبزلرن | آموزش آنلاین برنامه‌نویسی و مهارت‌های فناوری",
      },
    ],
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ورود به سبزلرن | آموزش آنلاین برنامه‌نویسی و مهارت‌های فناوری",
    description: "وارد حساب کاربری خود در سبزلرن شوید و به دوره‌های آموزشی برنامه‌نویسی و مهارت‌های فناوری دسترسی پیدا کنید.",
    images: ["http://localhost:3000/twitter-image.jpg"],
  },
};

const page = () => {
  return (
    <SignIn/>
  )
}

export default page