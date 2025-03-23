import MyAccount from "@/components/pages/my-account/MyAccount";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "حساب کاربری | سبزلرن",
  description: "مدیریت حساب کاربری شما در سبزلرن. مشاهده دوره‌ها، تنظیمات حساب، و فعالیت‌های اخیر.",
  keywords: ["حساب کاربری", "سبزلرن", "مدیریت حساب", "دوره‌های من", "تنظیمات حساب", "فعالیت‌های اخیر"],
  icons: {
    icon: "/logo/fav.png",
  },
  openGraph: {
    title: "حساب کاربری | سبزلرن",
    description: "مدیریت حساب کاربری شما در سبزلرن. مشاهده دوره‌ها، تنظیمات حساب، و فعالیت‌های اخیر.",
    url: "https://www.sabzlearn.ir/my-account",
    siteName: "سبزلرن",
    images: [
      {
        url: "https://www.sabzlearn.ir/images/my-account-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "حساب کاربری | سبزلرن",
      },
    ],
    locale: "fa_IR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "حساب کاربری | سبزلرن",
    description: "مدیریت حساب کاربری شما در سبزلرن. مشاهده دوره‌ها، تنظیمات حساب، و فعالیت‌های اخیر.",
    images: ["https://www.sabzlearn.ir/images/my-account-twitter-image.jpg"],
  },
};

const UserPannel = () => {
  return <MyAccount />;
};

export default UserPannel;