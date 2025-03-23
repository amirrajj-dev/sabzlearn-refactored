import Articles from "@/components/pages/articles/Articles";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "مقالات آموزشی | سبزلرن - مرجع آموزش برنامه‌نویسی و فناوری",
  description:
    "به بخش مقالات سبزلرن خوش آمدید! در اینجا می‌توانید بهترین مقالات آموزشی در زمینه برنامه‌نویسی، توسعه وب، و فناوری اطلاعات را مطالعه کنید. با مقالات به‌روز و کاربردی، دانش خود را ارتقا دهید.",
  keywords: [
    "مقالات آموزشی",
    "برنامه‌نویسی",
    "توسعه وب",
    "سبزلرن",
    "آموزش آنلاین",
    "فناوری اطلاعات",
    "یادگیری برنامه‌نویسی",
  ],
  icons: {
    icon: "/logo/fav.png",
  },
  openGraph: {
    title: "مقالات آموزشی | سبزلرن - مرجع آموزش برنامه‌نویسی و فناوری",
    description:
      "به بخش مقالات سبزلرن خوش آمدید! در اینجا می‌توانید بهترین مقالات آموزشی در زمینه برنامه‌نویسی، توسعه وب، و فناوری اطلاعات را مطالعه کنید.",
    url: "https://www.sabzlearn.ir/articles",
    siteName: "سبزلرن",
    images: [
      {
        url: "https://www.sabzlearn.ir/images/articles-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "مقالات آموزشی سبزلرن",
      },
    ],
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "مقالات آموزشی | سبزلرن - مرجع آموزش برنامه‌نویسی و فناوری",
    description:
      "به بخش مقالات سبزلرن خوش آمدید! در اینجا می‌توانید بهترین مقالات آموزشی در زمینه برنامه‌نویسی، توسعه وب، و فناوری اطلاعات را مطالعه کنید.",
    images: ["https://www.sabzlearn.ir/images/articles-twitter-image.jpg"],
  },
};

const Page = () => {
  return <Articles />;
};

export default Page;
