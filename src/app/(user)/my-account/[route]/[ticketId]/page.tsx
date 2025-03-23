"use client";
import { useEffect, useState, useMemo, useCallback, useRef, use } from "react";
import { redirect, usePathname } from "next/navigation";
import { toast } from "react-toastify";
import { toastOptions } from "@/helpers/toast";
import { useTicketStore } from "@/store/ticket.store";
import TicketHeader from "@/components/ticketDetail/TicketHeader";
import TicketMetadata from "@/components/ticketDetail/TicketMetaData";
import ChatMessage from "@/components/ticketDetail/ChatMessage";
import ReplyInputBox from "@/components/ticketDetail/ReplyInputBox";
import { ITicket, IReply } from "@/interfaces/interfaces";
import { useAuthStore } from "@/store/auth.store";

const TicketDetailsPage = ({
  params,
}: {
  params: Promise<{ ticketId: string }>;
}) => {
  const { tickets, getAllTickets, replyTicket, loading } = useTicketStore();
  const { user } = useAuthStore();
  const [replyContent, setReplyContent] = useState("");
  const [ticket, setTicket] = useState<ITicket | null>(null);
  const { ticketId } = use(params);
  const pathname = usePathname();
  const chatAreaRef = useRef<HTMLDivElement | null>(null);
  const ws = useRef<WebSocket | null>(null);

  if (!pathname.includes("/tickets")) {
    redirect("/my-account");
  }

  useEffect(() => {
    getAllTickets();
  }, [getAllTickets]);

  useEffect(() => {
    if (tickets.length > 0) {
      const foundTicket = tickets.find((t) => t.id === ticketId);
      setTicket(foundTicket || null);
    }
  }, [tickets, ticketId]);

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8080');
  
    ws.current.onmessage = async (event) => {
      const message = await event.data.text();
      const newReply: IReply = JSON.parse(message);
  
      if (newReply.ticketId === ticketId) {
        setTicket((prevTicket) => {
          if (prevTicket) {
            return {
              ...prevTicket,
              replies: [...prevTicket.replies, newReply],
            };
          }
          return prevTicket;
        });
      }
    };
  
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [ticketId]);

  const memoizedTicket = useMemo(() => ticket, [ticket]);

  const handleReply = useCallback(async () => {
    if (!replyContent.trim()) {
      toast.info("لطفا محتوای پاسخ را وارد کنید", toastOptions);
      return;
    }
    const formData = new FormData();
    formData.append('content', replyContent);
    formData.append('userID', user!.id);
    const result = await replyTicket(ticketId, formData);
    if (result.success) {
      setReplyContent("");
      getAllTickets();
      toast.success("پاسخ با موفقیت ثبت شد", toastOptions);
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.send(JSON.stringify(result.data));
      }
    } else {
      toast.error(result.message || "خطا در ارسال پاسخ", toastOptions);
    }
  }, [replyContent, ticketId, replyTicket, getAllTickets, user]);

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [memoizedTicket?.replies]);

  if (!memoizedTicket) {
    return <div className="p-4">تیکت مورد نظر یافت نشد.</div>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto bg-base-300 rounded-md shadow-md">
      <TicketHeader title={memoizedTicket.title} />
      <TicketMetadata
        user={memoizedTicket.user}
        createdAt={String(memoizedTicket.createdAt)}
        priority={memoizedTicket.priority}
        status={memoizedTicket.status}
      />
      <div
        className="bg-base-100 p-4 rounded-lg shadow-md mb-6 max-h-96 overflow-auto"
        ref={chatAreaRef}
      >
        <div className="space-y-4">
          <ChatMessage
            content={memoizedTicket.content}
            createdAt={String(memoizedTicket.createdAt)}
            user={memoizedTicket.user}
          />
          {memoizedTicket.replies.map((reply) => (
            <ChatMessage
              key={reply.id}
              content={reply.content}
              createdAt={String(reply.createdAt)}
              isReply={reply.user.id !== memoizedTicket.user.id}
              user={reply.user}
            />
          ))}
        </div>
      </div>
      <ReplyInputBox
        replyContent={replyContent}
        isLoading={loading}
        onReplyChange={(e) => setReplyContent(e.target.value)}
        onReplySubmit={handleReply}
      />
    </div>
  );
};

export default TicketDetailsPage;