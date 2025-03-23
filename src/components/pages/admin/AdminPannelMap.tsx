'use client'
import React, { useEffect } from "react";
import AdminPannelCard from "@/components/shared/AdminPannelCard";
import { FaComments, FaHome, FaTicketAlt, FaUsers } from "react-icons/fa";
import { MdArticle, MdCampaign, MdCategory, MdDiscount } from "react-icons/md";
import { RiGraduationCapFill } from "react-icons/ri";
import { IoMdFolder } from "react-icons/io";
import { useCategoryStore } from "@/store/category.store";
import { useCourseStore } from "@/store/course.store";
import { useUserStore } from "@/store/user.store";
import { useArticleStore } from "@/store/article.store";
import { useSessionStore } from "@/store/session.store";
import { useCommentStore } from "@/store/comment.store";
import { useTicketStore } from "@/store/ticket.store";
import { useDiscountStore } from "@/store/discount.store";
import { useAuthStore } from "@/store/auth.store";

const AdminPannelMap = () => {
    const {categories , getAllCategories} = useCategoryStore()
    const {courses , getAllCourses} = useCourseStore()
    const {users , fetchUsers} = useUserStore()
    const {articles , getAllArticles} = useArticleStore()
    const {tickets , getAllTickets} = useTicketStore()
    const {discounts , getAllDiscounts} = useDiscountStore()
    const {sessions , getAllSessions} = useSessionStore()
    const {comments , getAllComments} = useCommentStore()
    const {getMe} = useAuthStore()

    useEffect(()=>{
        getAllCategories()
        getAllCourses()
        fetchUsers()
        getAllArticles()
        getAllTickets()
        getAllDiscounts()
        getAllSessions()
        getAllComments()
        getMe()
    } , [])

  const adminPannelCardInfo = [
    {
      id: 1,
      title: "خانه",
      count: "صفحه اصلی",
      icon: <FaHome />,
      bgColor: "bg-indigo-500",
      link: "/",
    },
    {
      id: 2,
      title: "دسته بندی ها",
      count: categories.length,
      icon: <MdCategory />,
      bgColor: "bg-emerald-500",
      link: "categories",
    },
    {
      id: 3,
      title: "کاربران",
      count: users.length,
      icon: <FaUsers />,
      bgColor: "bg-zinc-500",
      link: "users",
    },
    {
      id: 4,
      title: "مقاله ها",
      count: articles.length,
      icon: <MdArticle />,
      bgColor: "bg-rose-500",
      link: "articles",
    },
    {
      id: 5,
      title: "جلسات",
      count: sessions.length,
      icon: <RiGraduationCapFill />,
      bgColor: "bg-amber-500",
      link: "sessions",
    },
    ,
    {
      id: 6,
      title: "کامنت ها",
      count: comments.length,
      icon: <FaComments />,
      bgColor: "bg-blue-500",
      link: "comments",
    },
    {
      id: 7,
      title: "دوره ها",
      count: courses.length,
      icon: <IoMdFolder />,
      bgColor: "bg-slate-500",
      link: "courses",
    },
    {
      id: 8,
      title: "تخفیف ها",
      count: discounts.length,
      icon: <MdDiscount />,
      bgColor: "bg-warning",
      link: "discounts",
    },
    {
      id: 9,
      title: "تیکت ها",
      count: tickets.length,
      icon: <FaTicketAlt />,
      bgColor: "bg-violet-500",
      link: "tickets",
    },
    {
      id: 10,
      title: "برگزاری کمپین",
      icon: <MdCampaign />,
      bgColor: "bg-lime-500",
      link: "campaigan",
      count : ''
    },
  ];
  return (
    <div className="grid sm:grid-cols-3 md:grid-cols-4 gap-4 mt-14">
      {adminPannelCardInfo.map((item) => (
        <AdminPannelCard
          key={item!.id}
          bgColor={item!.bgColor}
          count={String(item!.count)}
          icon={item!.icon}
          linkUrl={item?.title === "خانه" ? "/" : `/admin-pannel/${item!.link}`}
          title={item!.title}
        />
      ))}
    </div>
  );
};

export default AdminPannelMap;
