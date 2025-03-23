import {
    FaTachometerAlt,
    FaBook,
    FaTicketAlt,
    FaCog,
    FaSignOutAlt,
    FaUserShield
  } from "react-icons/fa";
  import { LuClipboardCheck } from "react-icons/lu";
  import { IoBarChartOutline, IoMenu } from "react-icons/io5";
  import { IoBookOutline } from "react-icons/io5";
  import { LiaComments } from "react-icons/lia";
  
  export const userMenuItems = [
    { label: "پیشخوان", icon: <FaTachometerAlt />, showFor: "all" , href : "/my-account" },
    { label: "دوره های من", icon: <FaBook />, showFor: "all" , href : "/my-account/courses" },
    { label: "تیکت ها", icon: <FaTicketAlt />, showFor: "all" , href : "/my-account/tickets"},
    { label: "جزئیات حساب", icon: <FaCog />, showFor: "all" , href : "/my-account/edit-account" },
    { label: "divider", showFor: "all"  , href : ""},
    { label: "پنل ادمین", icon: <FaUserShield />, showFor: "admin" , href : "/admin-pannel" },
    { label: "پنل کاربر", icon: <FaUserShield />, showFor: "all" , href : "/my-account" },
    { label: "خروج", icon: <FaSignOutAlt />, showFor: "all" , href : "javascript:void(0)" },
  ];
  
  export const themeItems = [
    { label: "روشن", value: "light" },
    { label: "تاریک", value: "dark" },
    { label: "قهوه ای", value: "coffee" },
    { label: "جنگلی", value: "abyss" },
    { label: "فنجون قهوه", value: "cupcake" },
    { label: "شب", value: "night" },
    { label: "هالووین", value: "halloween" },
    { label: "آبی", value: "aqua" },
    { label: "رترو", value: "retro" },
    { label: "سینتویو", value: "synthwave" },
  ];
  
  export const services = [
    {
      id: 1,
      title: "تضمین کاملترین محتوا",
      desc: "بزار خیالت راحت کنم توی دوره هامون به ریز ترین موارد پرداختیم بعداز دیدن این دوره نیاز به هیچ آموزش دیگه ای نداری.",
      icon: <IoBookOutline />,
      color: "bg-primary",
    },
    {
      id: 2,
      title: "پشتیبانی دائمی",
      desc: "هرجا سوالی داشتی به مشکل خوردی بچه های تیم آمادن که مشکلت رو حل کنن تلاشمون اینه بدون نگرانی دوره رو کامل کنی.",
      icon: <LiaComments />,
      color: "bg-warning",
    },
    {
      id: 3,
      title: "پروژه محور در راستای بازار کار",
      desc: "کل تمرکز ما رو این هستش بعداز تموم شدن دوره شخص بتونه با اعتماد به نفس کامل پروژه بزنه واقدام کنه برای کسب درآمد.",
      icon: <IoBarChartOutline />,
      color: "bg-success",
    },
    {
      id: 4,
      title: "سراغ حرفه ای ها رفتیم",
      desc: "به جرعت میتونم بگم سخت گیرترین شرایط جذب مدرس داریم چون برامون مهمه محتوا خیلی ساده و روان بیان بشه که توی یادگیری به مشکل نخورید.",
      icon: <LuClipboardCheck />,
      color: "bg-error",
    },
  ];