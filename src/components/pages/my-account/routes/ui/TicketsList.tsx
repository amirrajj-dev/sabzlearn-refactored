'use client'
import { deleteTicket } from "@/actions/ticket.action";
import TicketCard from "@/components/ui/TicketCard";
import { toastOptions } from "@/helpers/toast";
import { ITicket } from "@/interfaces/interfaces";
import React from "react";
import { toast } from "react-toastify";

const TicketsList = ({ userId , tickets }: {userId : string , tickets: ITicket[] }) => {
  const handleDeleteTicket = async (id: string) => {
    const res = await deleteTicket(id, userId);
    if (res.success) {
      toast.success("تیکت با موفقیت حذف شد", toastOptions);
    } else {
      toast.error("خطایی در حذف تیکت رخ داد", toastOptions);
    }
  };
  return (
    tickets
      ?.slice(0, 3)
      ?.map((ticket) => (
        <TicketCard
          onDelete={handleDeleteTicket}
          key={ticket?.id}
          ticket={ticket}
        />
      ))
  );
};

export default TicketsList;
