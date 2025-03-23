import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "سبزلرن | آموزش آنلاین برنامه‌نویسی و مهارت‌های فناوری",
  description: "سبزلرن، پلتفرم آموزش آنلاین برنامه‌نویسی و مهارت‌های فناوری. با دوره‌های ویدیویی، پروژه‌های عملی، و پشتیبانی حرفه‌ای، مهارت‌های خود را ارتقا دهید و به یک توسعه‌دهنده حرفه‌ای تبدیل شوید.",
  keywords: ["آموزش برنامه‌نویسی", "سبزلرن", "آموزش آنلاین", "دوره‌های برنامه‌نویسی", "توسعه وب", "یادگیری آنلاین", "فناوری اطلاعات"],
  icons: {
    icon: "/logo/fav.png",
  },
  openGraph: {
    title: "سبزلرن | آموزش آنلاین برنامه‌نویسی و مهارت‌های فناوری",
    description: "سبزلرن، پلتفرم آموزش آنلاین برنامه‌نویسی و مهارت‌های فناوری. با دوره‌های ویدیویی، پروژه‌های عملی، و پشتیبانی حرفه‌ای، مهارت‌های خود را ارتقا دهید.",
    url: "https://www.sabzlearn.ir",
    siteName: "سبزلرن",
    images: [
      {
        url: "https://www.sabzlearn.ir/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "سبزلرن | آموزش آنلاین برنامه‌نویسی",
      },
    ],
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "سبزلرن | آموزش آنلاین برنامه‌نویسی و مهارت‌های فناوری",
    description: "سبزلرن، پلتفرم آموزش آنلاین برنامه‌نویسی و مهارت‌های فناوری. با دوره‌های ویدیویی، پروژه‌های عملی، و پشتیبانی حرفه‌ای، مهارت‌های خود را ارتقا دهید.",
    images: ["https://www.sabzlearn.ir/images/twitter-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en" data-theme="dark" className="font-dana-regular">
      <body>
        {children}
        <ToastContainer/>
      </body>
    </html>
  );
}
