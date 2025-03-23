import { create } from 'zustand';
import { getAllComments, createComment, deleteComment, answerComment, acceptComment, rejectComment } from '@/actions/comment.action';
import { IComment, IUser, ICourse } from '@/interfaces/interfaces';
import { ApiResponse } from '@/interfaces/responses';

type CommentWithRelations = IComment & {
  creator: Pick<IUser, 'id' | 'email' | 'username' | 'name' | 'role' | 'isBanned' | 'profile'>;
  course: Pick<ICourse, 'id' | 'name'>;
  replies?: IComment[];
  parentComment?: IComment;
};

type CommentStore = {
  comments: CommentWithRelations[];
  loading: boolean;
  error: string | null;

  getAllComments: () => Promise<{ message: string; success: boolean }>;
  createComment: (formData: FormData) => Promise<{ message: string; success: boolean }>;
  deleteComment: (commentID: string, userID: string, userRole: string) => Promise<{ message: string; success: boolean }>;
  answerComment: (commentID: string, formData: FormData) => Promise<{ message: string; success: boolean }>;
  acceptComment: (commentID: string, userID: string, userRole: string) => Promise<{ message: string; success: boolean }>;
  rejectComment: (commentID: string, userID: string, userRole: string) => Promise<{ message: string; success: boolean }>;

  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
};

export const useCommentStore = create<CommentStore>((set , get) => ({
  comments: [],
  loading: false,
  error: null,

  getAllComments: async () => {
    set({ loading: true, error: null });
    try {
      const response = await getAllComments();
      if (response.success) {
        set({ comments: response.data!, loading: false });
        return { message: 'Comments fetched successfully', success: true };
      } else {
        set({ error: response.message, loading: false });
        throw new Error(response.message);
      }
    } catch (error: any) {
      set({ error: 'Failed to fetch comments', loading: false });
      return { message: error.message, success: false };
    }
  },

  createComment: async (formData) => {
    set({ loading: true, error: null });
    try {
      const response = await createComment(formData);
      if (response.success) {
        set((state) => ({ comments: [response.data!, ...state.comments], loading: false }));
        return { message: 'Comment created successfully', success: true };
      } else {
        set({ error: response.message, loading: false });
        throw new Error(response.message);
      }
    } catch (error: any) {
      set({ error: 'Failed to create comment', loading: false });
      return { message: error.message, success: false };
    }
  },

  deleteComment: async (commentID, userID, userRole) => {
    set({ loading: true, error: null });
    try {
      const response = await deleteComment(commentID, userID, userRole);
      if (response.success) {
        set((state) => ({
          comments: state.comments.filter((comment) => comment.id !== commentID),
          loading: false,
        }));
        return { message: 'Comment deleted successfully', success: true };
      } else {
        set({ error: response.message, loading: false });
        throw new Error(response.message);
      }
    } catch (error: any) {
      set({ error: 'Failed to delete comment', loading: false });
      return { message: error.message, success: false };
    }
  },

  answerComment: async (commentID, formData) => {
    set({ loading: true, error: null });
    try {
      const response = await answerComment(commentID, formData);
      if (response.success) {
        const updatedComments = get().comments.map(c=>c.id === commentID ? {...c , answer : 1} : c)
        set((state) => ({
          comments : [...updatedComments , response!.data as CommentWithRelations],
          loading: false,
        }));
        return { message: 'Comment answered successfully', success: true };
      } else {
        set({ error: response.message, loading: false });
        throw new Error(response.message);
      }
    } catch (error: any) {
      set({ error: 'Failed to answer comment', loading: false });
      return { message: error.message, success: false };
    }
  },

  acceptComment: async (commentID, userID, userRole) => {
    set({ loading: true, error: null });
    try {
      const response = await acceptComment(commentID, userID, userRole);
      if (response.success) {
        set((state) => ({
          comments: state.comments.map((comment) =>
            comment.id === commentID ? { ...comment, answer: 1 } : comment
          ),
          loading: false,
        }));
        return { message: 'Comment accepted successfully', success: true };
      } else {
        set({ error: response.message, loading: false });
        throw new Error(response.message);
      }
    } catch (error: any) {
      set({ error: 'Failed to accept comment', loading: false });
      return { message: error.message, success: false };
    }
  },

  rejectComment: async (commentID, userID, userRole) => {
    set({ loading: true, error: null });
    try {
      const response = await rejectComment(commentID, userID, userRole);
      if (response.success) {
        set((state) => ({
          comments: state.comments.map((comment) =>
            comment.id === commentID ? { ...comment, answer: 0 } : comment
          ),
          loading: false,
        }));
        return { message: 'Comment rejected successfully', success: true };
      } else {
        set({ error: response.message, loading: false });
        throw new Error(response.message);
      }
    } catch (error: any) {
      set({ error: 'Failed to reject comment', loading: false });
      return { message: error.message, success: false };
    }
  },

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));