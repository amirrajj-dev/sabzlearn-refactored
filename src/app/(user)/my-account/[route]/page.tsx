import React from "react";
import EditAccountPage from "@/components/pages/my-account/routes/EditAccountPage";
import UserCoursesPage from "@/components/pages/my-account/routes/UserCoursesPage";
import UserTicketsPage from "@/components/pages/my-account/routes/UserTicketsPage";
import { redirect } from "next/navigation";
import { Metadata } from "next";

interface MyAccountSubProps {
  params: Promise<{ route: string }>;
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ route: string }>;
}): Promise<Metadata> => {
  const { route } = (await params);
  const validRoutes = ["courses", "tickets", "edit-account"];

  if (!validRoutes.includes(route)) {
    return {
      title: "صفحه پیدا نشد | سبزلرن",
      description: "صفحه مورد نظر یافت نشد.",
    };
  }

  const routeMetadata: { [key: string]: Metadata } = {
    courses: {
      title: "دوره‌های من | سبزلرن",
      description: "مشاهده و مدیریت دوره‌های خریداری‌شده شما در سبزلرن.",
    },
    tickets: {
      title: "تیکت‌های پشتیبانی | سبزلرن",
      description: "مدیریت تیکت‌های پشتیبانی شما در سبزلرن.",
    },
    "edit-account": {
      title: "ویرایش حساب کاربری | سبزلرن",
      description: "ویرایش اطلاعات حساب کاربری شما در سبزلرن.",
    },
  };

  return {
    ...routeMetadata[route],
    openGraph: {
      title: routeMetadata[route].title as string,
      description: routeMetadata[route].description as string,
      url: `https://www.sabzlearn.ir/my-account/${route}`,
      siteName: "سبزلرن",
      images: [
        {
          url: "https://www.sabzlearn.ir/images/my-account-og-image.jpg",
          width: 1200,
          height: 630,
          alt: routeMetadata[route].title as string,
        },
      ],
      locale: "fa_IR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: routeMetadata[route].title as string,
      description: routeMetadata[route].description as string,
      images: ["https://www.sabzlearn.ir/images/my-account-twitter-image.jpg"],
    },
  };
};

const MyAccountSub: React.FC<MyAccountSubProps> = async ({ params }) => {
  const { route } = (await params);
  const validRoutes = ["courses", "tickets", "edit-account"];

  if (!validRoutes.includes(route)) {
    redirect("/my-account");
  }

  if (route === "courses") {
    return <UserCoursesPage />;
  }
  if (route === "tickets") {
    return <UserTicketsPage />;
  }
  if (route === "edit-account") {
    return <EditAccountPage />;
  }
  return null;
};

export default MyAccountSub;
