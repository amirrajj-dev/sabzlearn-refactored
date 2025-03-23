import SignUp from '@/components/pages/auth/SignUp';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "ثبت‌نام در سبزلرن | آموزش آنلاین برنامه‌نویسی و مهارت‌های فناوری",
  description: "در سبزلرن ثبت‌نام کنید و به دوره‌های آموزشی برنامه‌نویسی و مهارت‌های فناوری دسترسی پیدا کنید. یادگیری آنلاین با کیفیت را با سبزلرن شروع کنید.",
  keywords: ["ثبت‌نام در سبزلرن", "آموزش برنامه‌نویسی", "مهارت‌های فناوری", "یادگیری آنلاین", "دوره‌های آموزشی", "سبزلرن"],
  openGraph: {
    title: "ثبت‌نام در سبزلرن | آموزش آنلاین برنامه‌نویسی و مهارت‌های فناوری",
    description: "در سبزلرن ثبت‌نام کنید و به دوره‌های آموزشی برنامه‌نویسی و مهارت‌های فناوری دسترسی پیدا کنید.",
    url: "https://example.com/signup",
    siteName: "سبزلرن",
    images: [
      {
        url: "https://example.com/og-image-signup.jpg",
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
    title: "ثبت‌نام در سبزلرن | آموزش آنلاین برنامه‌نویسی و مهارت‌های فناوری",
    description: "در سبزلرن ثبت‌نام کنید و به دوره‌های آموزشی برنامه‌نویسی و مهارت‌های فناوری دسترسی پیدا کنید.",
    images: ["https://example.com/twitter-image-signup.jpg"]
  },
};

const page = () => {
  return (
    <SignUp/>
  )
}

export default page