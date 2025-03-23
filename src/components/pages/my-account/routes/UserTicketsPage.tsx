import React from "react";
import { FaPlusCircle, FaTicketAlt } from "react-icons/fa";
import { IoMailOpenSharp, IoTicket } from "react-icons/io5";
import UserPannelCard from "../shared/UserPannelCard";
import Link from "next/link";
import TicketCardSkeleton from "@/components/skeletons/TicketCardSkeleton";
import { getMe } from "@/actions/auth.action";
import { getToken } from "@/helpers/getToken";
import TicketsList from "./ui/TicketsList";

const UserTicketsPage = async () => {
  const token = await getToken();
  let user = null;

  try {
    user = (await getMe(token as string)).user;
  } catch (error) {
    console.log(error);
  }

  const cardsData = [
    {
      title: "همه ی تیکت ها",
      desc: "تیکت",
      length: user?.tickets.length,
      bgColor: "bg-green-500",
      icon: <FaTicketAlt />,
    },
    {
      title: "تیکت های باز",
      desc: "تیکت",
      length: user?.tickets.filter(t => t.status === 'open').length,
      bgColor: "bg-blue-500",
      icon: <IoMailOpenSharp />,
    },
    {
      title: "بسته شده",
      desc: "تیکت",
      length: user?.tickets.filter(t => t.status === 'closed').length,
      bgColor: "bg-purple-500",
      icon: <IoTicket />,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {user ? cardsData.map((card, index) => (
          <UserPannelCard
            key={index}
            title={card.title}
            desc={card.desc}
            length={card.length as number}
            bgColor={card.bgColor}
            icon={card.icon}
          />
        )) : Array(3).fill(0).map((_, index) => (
          <UserPannelCard
            key={index}
            title="Loading..."
            desc="Loading..."
            length={0}
            bgColor="bg-gray-300"
            icon={<FaTicketAlt />}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <Link href={"/my-account/tickets/add-ticket"}>
          <button className="btn btn-success w-40 sm:w-64 md:w-80 h-16 mr-4 text-lg">
            <span className="translate-y-px">تیکت جدید</span>
            <FaPlusCircle />
          </button>
        </Link>
      </div>
      <div className="bg-base-300 p-4 rounded-md shadow-md">
        <div className="flex flex-col sm:flex-row items-center justify-between w-full">
          <h2 className="text-xl font-dana-medium mb-4 sm:mb-0">تیکت ها</h2>
        </div>
        <div className="divider divide-base-100 my-4" />
        <div className="flex w-full flex-col items-center gap-4">
          {user ? (
            user.tickets?.length > 0 ? (
              <TicketsList userId={user.id} tickets={user.tickets} />
            ) : (
              <p>تا به الان تیکتی ارسال نکرده اید</p>
            )
          ) : (
            Array(3)
              .fill(0)
              .map((_, index) => <TicketCardSkeleton key={index + 1} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default UserTicketsPage;