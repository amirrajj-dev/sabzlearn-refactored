import React from "react";
import { notFound } from "next/navigation";
import UsersPage from "@/components/pages/admin/user/UsersPage";
import CategoriesPage from "@/components/pages/admin/category/CategoriesPage";
import SessionsPage from "@/components/pages/admin/session/SessionsPage";
import ArticlesPage from "@/components/pages/admin/article/ArticlesPage";
import CoursesPage from "@/components/pages/admin/course/CoursesPage";
import CommentsPage from '@/components/pages/admin/comment/CommentsPage';
import CampaigansPage from "@/components/pages/admin/campaigan/CampaigansPage";
import TicketsPage from "@/components/pages/admin/ticket/TicketsPage";
import DiscountsPage from "@/components/pages/admin/discount/DiscountsPage";
import { Metadata } from "next";

const validRoutes = [
  "users",
  "categories",
  "sessions",
  "articles",
  "courses",
  "comments",
  "campaigan",
  "tickets",
  "discounts",
] as const;

type ValidRoute = typeof validRoutes[number];

interface PageProps {
  params: Promise<{ route: string }>;
}

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const route = (await params).route.toLowerCase() as ValidRoute;

  if (!validRoutes.includes(route)) {
    return {
      title: "صفحه پیدا نشد | سبزلرن",
      description: "صفحه مورد نظر یافت نشد.",
    };
  }

  const routeMetadata: Record<ValidRoute, Metadata> = {
    users: {
      title: "مدیریت کاربران | سبزلرن",
      description: "مدیریت کاربران در پنل مدیریت سبزلرن.",
    },
    categories: {
      title: "مدیریت دسته‌بندی‌ها | سبزلرن",
      description: "مدیریت دسته‌بندی‌ها در پنل مدیریت سبزلرن.",
    },
    sessions: {
      title: "مدیریت جلسات | سبزلرن",
      description: "مدیریت جلسات دوره‌ها در پنل مدیریت سبزلرن.",
    },
    articles: {
      title: "مدیریت مقالات | سبزلرن",
      description: "مدیریت مقالات در پنل مدیریت سبزلرن.",
    },
    courses: {
      title: "مدیریت دوره‌ها | سبزلرن",
      description: "مدیریت دوره‌ها در پنل مدیریت سبزلرن.",
    },
    comments: {
      title: "مدیریت نظرات | سبزلرن",
      description: "مدیریت نظرات کاربران در پنل مدیریت سبزلرن.",
    },
    campaigan: {
      title: "برگزاری کمپین‌ | سبزلرن",
      description: "مدیریت کمپین‌ها در پنل مدیریت سبزلرن.",
    },
    tickets: {
      title: "مدیریت تیکت‌ها | سبزلرن",
      description: "مدیریت تیکت‌های پشتیبانی در پنل مدیریت سبزلرن.",
    },
    discounts: {
      title: "مدیریت تخفیف‌ها | سبزلرن",
      description: "مدیریت تخفیف‌ها در پنل مدیریت سبزلرن.",
    },
  };

  return {
    ...routeMetadata[route],
    openGraph: {
      title: routeMetadata[route].title as string,
      description: routeMetadata[route].description as string,
      url: `https://www.sabzlearn.ir/admin/${route}`,
      siteName: "سبزلرن",
      images: [
        {
          url: "https://www.sabzlearn.ir/images/admin-og-image.jpg",
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
      images: ["https://www.sabzlearn.ir/images/admin-twitter-image.jpg"],
    },
  };
};

const Page = async ({ params }: PageProps) => {
  const route = (await params).route.toLowerCase() as ValidRoute;

  if (!validRoutes.includes(route)) {
    notFound();
  }

  const renderComponent = () => {
    switch (route) {
      case "users":
        return <UsersPage />;
      case "categories":
        return <CategoriesPage />;
      case "sessions":
        return <SessionsPage />;
      case "articles":
        return <ArticlesPage />;
      case "courses":
        return <CoursesPage />;
      case "comments":
        return <CommentsPage />;
      case "campaigan":
        return <CampaigansPage />;
      case "tickets":
        return <TicketsPage />;
      case "discounts":
        return <DiscountsPage />;
      default:
        return notFound();
    }
  };

  return <div className="mt-20">{renderComponent()}</div>;
};

export default Page;