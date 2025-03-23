"use server";

import prisma from "@/utils/prisma";
import {
  TicketWithRelations,
  ApiResponse,
} from "@/interfaces/responses";
import {
  IReply,
  TicketPriority,
  TicketType
} from "@/interfaces/interfaces";
import { unstable_cache, revalidatePath, revalidateTag } from "next/cache";

export const getAllTickets = unstable_cache(
  async (): Promise<ApiResponse<TicketWithRelations[]>> => {
    try {
      const tickets = await prisma.ticket.findMany({
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              profile : true
            },
          },
          replies: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  profile : true
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return {
        success: true,
        data: tickets as unknown as TicketWithRelations[],
        message: "tickets fetched successfully",
      };
    } catch (error) {
      console.error("Error fetching tickets:", error);
      return { success: false, message: "Failed to fetch tickets" };
    }
  },
  ["all-tickets"], 
  { tags: ["all-tickets"], revalidate: 3600 }
);

export const createTicket = async (
  formData: FormData
): Promise<ApiResponse<TicketWithRelations>> => {
  try {
    const department = formData.get("department") as string;
    const type = formData.get("type") as TicketType;
    const title = formData.get("title") as string;
    const priority = formData.get("priority") as TicketPriority;
    const content = formData.get("content") as string;
    const userID = formData.get("userID") as string;

    if (!department || !type || !title || !priority || !content || !userID) {
      return { success: false, message: "Please fill all fields" };
    }

    const newTicket = await prisma.ticket.create({
      data: {
        department,
        type,
        title,
        priority,
        content,
        userId: userID,
        status: "open",
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        replies: true,
      },
    });

    revalidatePath("/my-account/tickets");
    revalidatePath("/my-account");
    revalidateTag('current-user')
    revalidateTag("all-tickets"); 
    revalidateTag(`user-${userID}`);

    return {
      success: true,
      message: "Ticket created successfully",
      data: newTicket as TicketWithRelations,
    };
  } catch (error) {
    console.error("Error creating ticket:", error);
    return { success: false, message: "Failed to create ticket" };
  }
};

export const replyTicket = async (
  ticketID: string,
  formData: FormData
): Promise<ApiResponse<IReply>> => { 
  try {
    const content = formData.get("content") as string;
    const userID = formData.get("userID") as string;

    if (!content || !userID) {
      return { success: false, message: "Please provide content and user ID" };
    }

    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketID },
      include: { replies: true },
    });

    if (!ticket) {
      return { success: false, message: "Ticket not found" };
    }

    const reply = await prisma.reply.create({
      data: {
        content,
        userId: userID,
        ticketId: ticketID,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            profile : true
          },
        },
      },
    });

    if (ticket.status === "open") {
      await prisma.ticket.update({
        where: { id: ticketID },
        data: { status: "in_progress" },
      });
    }

    revalidatePath("/my-account/tickets");
    revalidatePath("/my-account");
    revalidateTag("all-tickets");
    revalidateTag(`user-${userID}`);

    return {
      success: true,
      message: "Reply added successfully",
      data: reply as IReply
    };
  } catch (error) {
    console.error("Error replying to ticket:", error);
    return { success: false, message: "Failed to reply to ticket" };
  }
};
export const deleteTicket = async (
  ticketID: string,
  userID: string
): Promise<ApiResponse> => {
  try {
    if (!ticketID || !userID) {
      return { success: false, message: "Ticket ID and User ID are required" };
    }

    const ticket = await prisma.ticket.findUnique({ where: { id: ticketID } });

    if (!ticket) {
      return { success: false, message: "Ticket not found" };
    }

    if (ticket.userId !== userID) {
      return {
        success: false,
        message: "You are not authorized to delete this ticket",
      };
    }

    await prisma.reply.deleteMany({
      where: { ticketId: ticketID },
    });

    await prisma.ticket.delete({ where: { id: ticketID } });

    revalidatePath("/my-account/tickets");
    revalidatePath("/my-account");
    revalidateTag('current-user')
    revalidateTag("all-tickets"); 
    revalidateTag(`user-${userID}`);

    return { success: true, message: "Ticket deleted successfully" };
  } catch (error) {
    console.error("Error deleting ticket:", error);
    return { success: false, message: "Failed to delete ticket" };
  }
};