import { create } from 'zustand';
import { getAllTickets, createTicket, replyTicket, deleteTicket } from '@/actions/ticket.action';
import { TicketWithRelations, ApiResponse } from '@/interfaces/responses';
import { IReply, IReplyUser } from '@/interfaces/interfaces';

type TicketStore = {
  tickets: TicketWithRelations[];
  loading: boolean;
  error: string | null;

  getAllTickets: () => Promise<{ message: string; success: boolean }>;
  createTicket: (formData: FormData) => Promise<{ message: string; success: boolean }>;
  replyTicket: (ticketID: string, formData: FormData) => Promise<{ message: string; success: boolean , data : IReply }>;
  deleteTicket: (ticketID: string, userID: string) => Promise<{ message: string; success: boolean }>;

  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
};

export const useTicketStore = create<TicketStore>((set) => ({
  tickets: [],
  loading: false,
  error: null,

  getAllTickets: async () => {
    set({ loading: true, error: null });
    try {
      const response = await getAllTickets();
      if (response.success) {
        set({ tickets: response.data!, loading: false });
        return { message: 'Tickets fetched successfully', success: true };
      } else {
        set({ error: response.message, loading: false });
        throw new Error(response.message);
      }
    } catch (error: any) {
      set({ error: 'Failed to fetch tickets', loading: false });
      return { message: error.message, success: false };
    }
  },

  createTicket: async (formData) => {
    set({ loading: true, error: null });
    try {
      const response = await createTicket(formData);
      if (response.success) {
        set((state) => ({ tickets: [response.data!, ...state.tickets], loading: false }));
        return { message: 'Ticket created successfully', success: true };
      } else {
        set({ error: response.message, loading: false });
        throw new Error(response.message);
      }
    } catch (error: any) {
      set({ error: 'Failed to create ticket', loading: false });
      return { message: error.message, success: false };
    }
  },

  replyTicket: async (ticketID, formData) => {
    set({ loading: true, error: null });
    try {
      const response = await replyTicket(ticketID, formData);
      if (response.success && response.data) {
        set((state) => ({
          tickets: state.tickets.map((ticket) =>
            ticket.id === ticketID
              ? { ...ticket, replies: [...ticket.replies, response.data!] }
              : ticket
          ),
          loading: false,
        }));
        return { message: 'Reply added successfully', success: true, data: response.data };
      } else {
        set({ error: response.message, loading: false });
        return { message: response.message, success: false, data: null as unknown as IReply };
      }
    } catch (error: any) {
      set({ error: 'Failed to reply to ticket', loading: false });
      return { message: error.message, success: false, data: null as unknown as IReply };
    }
  },

  deleteTicket: async (ticketID, userID) => {
    set({ loading: true, error: null });
    try {
      const response = await deleteTicket(ticketID, userID);
      if (response.success) {
        set((state) => ({
          tickets: state.tickets.filter((ticket) => ticket.id !== ticketID),
          loading: false,
        }));
        return { message: 'Ticket deleted successfully', success: true };
      } else {
        set({ error: response.message, loading: false });
        throw new Error(response.message);
      }
    } catch (error: any) {
      set({ error: 'Failed to delete ticket', loading: false });
      return { message: error.message, success: false };
    }
  },

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));