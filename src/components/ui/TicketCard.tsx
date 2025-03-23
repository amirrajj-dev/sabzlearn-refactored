"use client";
import {
  FaComment,
  FaUser,
  FaFire,
  FaClock,
  FaCheckCircle,
  FaExclamationCircle,
  FaTrash,
} from "react-icons/fa";
import { ITicket } from "@/interfaces/interfaces";
import Link from "next/link";
import { motion } from "framer-motion";

interface TicketCardProps {
  ticket: ITicket;
  onDelete: (ticketId: string) => void;
}

const TicketCard = ({ ticket, onDelete }: TicketCardProps) => {
  const handleDelete = () => {
    if (confirm("آیا از حذف این تیکت اطمینان دارید؟")) {
      onDelete(ticket.id);
    }
  };

  return (
    <motion.div
      className="bg-gradient-to-br w-full from-base-100 to-base-200 rounded-xl shadow-2xl p-6 hover:shadow-3xl transition-all transform relative"
      whileTap={{ scale: 0.98 }}
    >
      <button
        onClick={handleDelete}
        className="absolute top-20 left-4 p-2 btn btn-sm btn-error btn-circle btn-soft"
        aria-label="حذف تیکت"
      >
        <FaTrash className="text-lg" />
      </button>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span
            className={`badge ${
              ticket?.priority === "high"
                ? "badge-error"
                : ticket.priority === "medium"
                ? "badge-warning"
                : "badge-success"
            } flex items-center gap-1`}
          >
            {ticket?.priority === "high" ? (
              <FaFire className="text-sm -translate-y-[2px]" />
            ) : ticket.priority === "medium" ? (
              <FaExclamationCircle className="text-sm -translate-y-[2px]" />
            ) : (
              <FaCheckCircle className="text-sm -translate-y-[2px]" />
            )}
            {ticket?.priority === "high"
              ? "بالا"
              : ticket.priority === "medium"
              ? "متوسط"
              : "کم"}
          </span>

          <span
            className={`badge ${
              ticket.status === "open"
                ? "badge-info"
                : ticket.status === "in_progress"
                ? "badge-warning"
                : "badge-success"
            } flex items-center gap-1`}
          >
            {ticket?.status === "open" ? (
              <FaClock className="text-sm -translate-y-[2px]" />
            ) : ticket?.status === "in_progress" ? (
              <FaExclamationCircle className="text-sm -translate-y-[2px]" />
            ) : (
              <FaCheckCircle className="text-sm -translate-y-[2px]" />
            )}
            {ticket?.status === "open"
              ? "باز"
              : ticket.status === "in_progress"
              ? "در حال بررسی"
              : "بسته"}
          </span>
        </div>

        <span className="text-sm text-base-content/70 flex items-center gap-1">
          <FaClock className="text-sm -translate-y-[2px]" />
          {new Date(ticket?.createdAt).toLocaleDateString("fa-IR")}
        </span>
      </div>

      <h2 className="text-2xl font-bold text-base-content mb-3">
        {ticket?.title}
      </h2>
      <p className="text-base-content/80 mb-4 line-clamp-3">{ticket?.content}</p>

      <div className="flex items-center justify-between text-sm text-base-content/70">
        <div className="flex items-center gap-2">
          <div className="">
            <div className="bg-primary flex items-center justify-center rounded-full size-8">
              {ticket?.user?.username[0]?.toUpperCase()}
            </div>
          </div>
          <span>{ticket?.user.name}</span>
        </div>

        <div className="flex items-center gap-2">
          <FaComment className="text-base-content/70" />
          <span>{ticket?.replies?.length} پاسخ</span>
        </div>
      </div>
      <div className="mt-6">
        <Link
          href={`/my-account/tickets/${ticket?.id}`}
          className="btn btn-primary btn-sm w-full hover:bg-primary-focus transition-colors"
          aria-label={`مشاهده جزئیات تیکت ${ticket?.title}`}
        >
          مشاهده جزئیات
        </Link>
      </div>
    </motion.div>
  );
};

export default TicketCard;