import { create } from 'zustand';
import { getAllSessions } from '@/actions/session.action';
import { SessionWithRelations, ApiResponse } from '@/interfaces/responses';

type SessionStore = {
  sessions: SessionWithRelations[];
  loading: boolean;
  error: string | null;

  getAllSessions: () => Promise<{ message: string; success: boolean }>;

  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
};

export const useSessionStore = create<SessionStore>((set) => ({
  sessions: [],
  loading: false,
  error: null,

  getAllSessions: async () => {
    set({ loading: true, error: null });
    try {
      const response = await getAllSessions();
      if (response.success) {
        set({ sessions: response.data!, loading: false });
        return { message: 'Sessions fetched successfully', success: true };
      } else {
        set({ error: response.message, loading: false });
        throw new Error(response.message);
      }
    } catch (error: any) {
      set({ error: 'Failed to fetch sessions', loading: false });
      return { message: error.message, success: false };
    }
  },

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));