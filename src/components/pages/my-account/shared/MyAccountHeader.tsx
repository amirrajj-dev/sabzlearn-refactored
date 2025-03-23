import React, { useEffect } from "react";
import UserPannelCard from "./UserPannelCard";
import { FaMoneyBillAlt, FaBook, FaTicketAlt, FaWallet } from "react-icons/fa";
import { useAuthStore } from "@/store/auth.store";

const MyAccountHeader = ({ ticketsAmount }: { ticketsAmount: number }) => {
  const cardsData = [
    {
      title: "مجموع پرداخت ها",
      desc: "تومان",
      length: 0,
      bgColor: "bg-blue-500",
      icon: <FaMoneyBillAlt />,
    },
    {
      title: "دوره های من",
      desc: "دوره",
      length: 0,
      bgColor: "bg-purple-500",
      icon: <FaBook />,
    },
    {
      title: "مجموع تیکت ها",
      desc: "تیکت",
      length: ticketsAmount,
      bgColor: "bg-green-500",
      icon: <FaTicketAlt />,
    },
    {
      title: "موجودی حساب",
      desc: "تومان",
      length: 0,
      bgColor: "bg-orange-500",
      icon: <FaWallet />,
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {cardsData.map((card, index) => (
        <UserPannelCard
          key={index}
          title={card.title}
          desc={card.desc}
          length={card.length}
          bgColor={card.bgColor}
          icon={card.icon}
        />
      ))}
    </div>
  );
};

export default MyAccountHeader;
