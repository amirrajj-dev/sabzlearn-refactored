import ForgotPassword from '@/components/pages/auth/ForgotPassword';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "فراموشی رمز عبور | سبزلرن | آموزش آنلاین برنامه‌نویسی و مهارت‌های فناوری",
  description: "رمز عبور خود را فراموشی کنید و به حساب کاربری خود در سبزلرن دسترسی پیدا کنید. آموزش آنلاین برنامه‌نویسی و مهارت‌های فناوری را با سبزلرن ادامه دهید.",
  keywords: ["فراموشی رمز عبور", "فراموشی رمز عبور", "سبزلرن", "آموزش برنامه‌نویسی", "یادگیری آنلاین", "دوره‌های آموزشی"],
  openGraph: {
    title: "فراموشی رمز عبور | سبزلرن | آموزش آنلاین برنامه‌نویسی و مهارت‌های فناوری",
    description: "رمز عبور خود را فراموشی کنید و به حساب کاربری خود در سبزلرن دسترسی پیدا کنید. آموزش آنلاین برنامه‌نویسی و مهارت‌های فناوری را با سبزلرن ادامه دهید.",
    url: "http://localhost:3000/forgot-password",
    siteName: "سبزلرن",
    images: [
      {
        url: "http://localhost:3000/og-image-forgot-password.jpg",
        width: 800,
        height: 600,
        alt: "سبزلرن | فراموشی رمز عبور",
      },
    ],
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "فراموشی رمز عبور | سبزلرن | آموزش آنلاین برنامه‌نویسی و مهارت‌های فناوری",
    description: "رمز عبور خود را فراموشی کنید و به حساب کاربری خود در سبزلرن دسترسی پیدا کنید. آموزش آنلاین برنامه‌نویسی و مهارت‌های فناوری را با سبزلرن ادامه دهید.",
    images: ["http://localhost:3000/twitter-image-forgot-password.jpg"]
  },
};

const page = () => {
  return (
    <ForgotPassword/>
  )
}

export default page