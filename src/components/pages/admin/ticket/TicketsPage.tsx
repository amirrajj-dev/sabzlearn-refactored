"use client";
import React, { useEffect, useState } from "react";
import { FaCheck, FaEye, FaReply } from "react-icons/fa";
import { motion } from "framer-motion";
import { useTicketStore } from "@/store/ticket.store";
import ReplyTicketModal from "@/components/modals/ticket/ReplyTicketModal";
import SeeModal from "@/components/modals/shared/SeeModal";
import { IoMdArrowUp, IoMdClose } from "react-icons/io";
import Link from "next/link";

const TicketsPage = () => {
  const { tickets , loading } = useTicketStore();

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-extrabold text-base-content mb-4">
        🎫 تیکت ها
      </h1>
      <div className="shadow-lg rounded-xl overflow-x-auto">
        <table className="table bg-base-300 min-w-[800px] w-full text-center">
          <thead className="bg-base-300 text-base-content">
            <tr>
              <th className="p-4">شناسه</th>
              <th className="p-4">کاربر</th>
              <th className="p-4">عنوان</th>
              <th className="p-4">تیکت</th>
              <th className="p-4">الویت</th>
              <th className="p-4">مشاهده</th>
              <th className="p-4">پاسخ</th>
              <th className="p-4">وضعیت پاسخ گویی</th>
              <th className="p-4">جزعیات</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="border-b">
                  <td className="p-4">
                    <div className="skeleton h-6 w-10 mx-auto bg-base-200"></div>
                  </td>
                  <td className="p-4">
                    <div className="skeleton h-6 w-24 mx-auto bg-base-200"></div>
                  </td>
                  <td className="p-4">
                    <div className="skeleton h-6 w-32 mx-auto bg-base-200"></div>
                  </td>
                  <td className="p-4">
                    <div className="skeleton h-6 w-40 mx-auto bg-base-200"></div>
                  </td>
                  <td className="p-4">
                    <div className="skeleton h-6 w-16 mx-auto bg-base-200"></div>
                  </td>
                  <td className="p-4">
                    <div className="skeleton h-10 w-10 mx-auto bg-base-200 rounded-full"></div>
                  </td>
                  <td className="p-4">
                    <div className="skeleton h-10 w-10 mx-auto bg-base-200 rounded-full"></div>
                  </td>
                  <td className="p-4">
                    <div className="skeleton h-6 w-24 mx-auto bg-base-200"></div>
                  </td>
                  <td className="p-4">
                    <div className="skeleton h-6 w-24 mx-auto bg-base-200"></div>
                  </td>
                </tr>
              ))
            ) : tickets.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-6 text-center text-base-content">
                  <div className="flex flex-col items-center justify-center gap-4">
                    <span className="text-2xl">🎫</span>
                    <p className="text-lg font-semibold">هیچ تیکتی یافت نشد!</p>
                  </div>
                </td>
              </tr>
            ) : (
              tickets.map((ticket, index) => (
                <tr
                  key={ticket.id}
                  className={`border-b hover:bg-base-300 transition ${
                    index % 2 === 0 ? "bg-base-200" : "bg-base-100"
                  }`}
                >
                  <td className="p-4 font-medium text-base-content">
                    {index + 1}
                  </td>
                  <td className="p-4 font-semibold text-base-content">
                    {ticket.user.name}
                  </td>
                  <td className="p-4 font-semibold text-base-content">
                    {ticket.title}
                  </td>
                  <td className="p-4 text-base-content">{ticket.title}</td>
                  <td className="p-4 text-base-content">
                    {ticket.priority === "high" ? (
                      <span className="size-5 inline-block bg-red-500 rounded-full"></span>
                    ) : ticket.priority === "low" ? (
                      <span className="size-5 inline-block bg-indigo-500 rounded-full"></span>
                    ) : (
                      <span className="size-5 inline-block bg-emerald-500 rounded-full"></span>
                    )}
                  </td>
                  <td className="p-4">
                    <SeeModal content={ticket.content} />
                  </td>
                  <td className="p-4">
                    <ReplyTicketModal ticketId={ticket.id} />
                  </td>
                  <td className="p-4 text-base-content">
                    {ticket.status === "open" ? (
                      <IoMdClose className="text-error mx-auto text-xl" />
                    ) : (
                      <FaCheck className="text-success mx-auto text-xl" />
                    )}
                  </td>
                  <td className="p-4">
                    <Link href={`/my-account/tickets/${ticket.id}`}>
                      <button className="btn btn-sm btn-primary">
                        <IoMdArrowUp className="-rotate-45 text-lg" />
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketsPage;