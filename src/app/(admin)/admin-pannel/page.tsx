import { Metadata } from 'next';
export const dynamic = "force-dynamic";
import React from 'react'

export const metadata: Metadata = {
  title: "پنل مدیریت | سبزلرن",
  description: "پنل مدیریت سبزلرن، مدیریت کاربران، دوره‌ها، مقالات، جلسات، تخفیف‌ها و سایر بخش‌های سایت.",
  keywords: ["پنل مدیریت", "سبزلرن", "مدیریت کاربران", "مدیریت دوره‌ها", "مدیریت مقالات", "مدیریت جلسات", "مدیریت تخفیف‌ها"],
  icons: {
    icon: "/logo/fav.png",
  },
  openGraph: {
    title: "پنل مدیریت | سبزلرن",
    description: "پنل مدیریت سبزلرن، مدیریت کاربران، دوره‌ها، مقالات، جلسات، تخفیف‌ها و سایر بخش‌های سایت.",
    url: "https://www.sabzlearn.ir/admin",
    siteName: "سبزلرن",
    images: [
      {
        url: "https://www.sabzlearn.ir/images/admin-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "پنل مدیریت سبزلرن",
      },
    ],
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "پنل مدیریت | سبزلرن",
    description: "پنل مدیریت سبزلرن، مدیریت کاربران، دوره‌ها، مقالات، جلسات، تخفیف‌ها و سایر بخش‌های سایت.",
    images: ["https://www.sabzlearn.ir/images/admin-twitter-image.jpg"],
  },
};

const page = () => {
  return (
    <div></div>
  )
}

export default page