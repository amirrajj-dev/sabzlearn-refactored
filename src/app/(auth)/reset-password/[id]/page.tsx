import ResetPasword from '@/components/pages/auth/ResetPassword';
import { Metadata } from 'next';
import React from 'react'

interface ResetPasswordProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "بازنشانی رمز عبور | سبزلرن | آموزش آنلاین برنامه‌نویسی و مهارت‌های فناوری",
  description: "رمز عبور خود را بازنشانی کنید و به حساب کاربری خود در سبزلرن دسترسی پیدا کنید. آموزش آنلاین برنامه‌نویسی و مهارت‌های فناوری را با سبزلرن ادامه دهید.",
  keywords: ["بازنشانی رمز عبور", "تغییر رمز عبور", "سبزلرن", "آموزش برنامه‌نویسی", "یادگیری آنلاین", "دوره‌های آموزشی"],
  openGraph: {
    title: "بازنشانی رمز عبور | سبزلرن | آموزش آنلاین برنامه‌نویسی و مهارت‌های فناوری",
    description: "رمز عبور خود را بازنشانی کنید و به حساب کاربری خود در سبزلرن دسترسی پیدا کنید. آموزش آنلاین برنامه‌نویسی و مهارت‌های فناوری را با سبزلرن ادامه دهید.",
    url: "http://localhost:3000/reset-password",
    siteName: "سبزلرن",
    images: [
      {
        url: "http://localhost:3000/og-image-reset-password.jpg",
        width: 800,
        height: 600,
        alt: "سبزلرن | بازنشانی رمز عبور",
      },
    ],
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "بازنشانی رمز عبور | سبزلرن | آموزش آنلاین برنامه‌نویسی و مهارت‌های فناوری",
    description: "رمز عبور خود را بازنشانی کنید و به حساب کاربری خود در سبزلرن دسترسی پیدا کنید. آموزش آنلاین برنامه‌نویسی و مهارت‌های فناوری را با سبزلرن ادامه دهید.",
    images: ["http://localhost:3000/twitter-image-reset-password.jpg"]
  },
};

const page: React.FC<ResetPasswordProps> = async ({ params }) => {
  const { id } = await params;
  return (
    <ResetPasword token={id} />
  );
};

export default page;