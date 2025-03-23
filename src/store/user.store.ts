import { create } from 'zustand';
import {
  getAllUsers,
  updateUser,
  deleteUser,
  banUser,
  getUserCourses,
  changeUserRole,
} from '@/actions/user.action';
import { UserWithRelations, ApiResponse } from '@/interfaces/responses';
import { ICourse, IUser } from '@/interfaces/interfaces';
import { Role } from '@prisma/client';

interface UserState {
  users: UserWithRelations[];
  courses: ICourse[];
  loading: boolean;
  error: string | null;

  fetchUsers: () => Promise<{ message: string; success: boolean }>;
  updateUser: (userID: string, formData: FormData) => Promise<{ message: string; success: boolean }>;
  deleteUser: (userID: string) => Promise<{ message: string; success: boolean }>;
  banUser: (userID: string , currentUserId : string) => Promise<{ message: string; success: boolean }>;
  getUserCourses: (userID: string) => Promise<{ message: string; success: boolean }>;
  changeUserRole: (userID: string, role: Role , currentUserId : string) => Promise<{ message: string; success: boolean }>;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  courses: [],
  loading: false,
  error: null,

  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const response: ApiResponse<UserWithRelations[]> = await getAllUsers();
      if (response.success) {
        set({ users: response.data || [], loading: false });
        return { message: 'Users fetched successfully', success: true };
      } else {
        set({ error: response.message || 'Failed to fetch users', loading: false });
        throw new Error(response.message);
      }
    } catch (error: any) {
      set({ error: 'Failed to fetch users', loading: false });
      return { message: error.message, success: false };
    }
  },


  updateUser: async (userID, formData) => {
    set({ loading: true, error: null });
    try {
      const response: ApiResponse<UserWithRelations> = await updateUser(userID, formData);
      if (response.success && response.data) {
        set((state) => ({
          users: state.users.map((user) => (user.id === userID ? response.data! : user)),
          loading: false,
        }));
        return { message: 'User updated successfully', success: true };
      } else {
        set({ error: response.message || 'Failed to update user', loading: false });
        throw new Error(response.message);
      }
    } catch (error: any) {
      set({ error: 'Failed to update user', loading: false });
      return { message: error.message, success: false };
    }
  },


  deleteUser: async (userID) => {
    set({ loading: true, error: null });
    try {
      const response: ApiResponse = await deleteUser(userID);
      if (response.success) {
        set((state) => ({
          users: state.users.filter((user) => user.id !== userID),
          loading: false,
        }));
        return { message: 'User deleted successfully', success: true };
      } else {
        set({ error: response.message || 'Failed to delete user', loading: false });
        throw new Error(response.message);
      }
    } catch (error: any) {
      set({ error: 'Failed to delete user', loading: false });
      return { message: error.message, success: false };
    }
  },


  banUser: async (userID , currentUserId) => {
    set({ loading: true, error: null });
    try {
      const response: ApiResponse<UserWithRelations> = await banUser(userID , currentUserId);
      if (response.success && response.data) {
        set((state) => ({
          users: state.users.map((user) => (user.id === userID ? {...user , isBanned : response.data!.isBanned} : user)),
          loading: false,
        }));
        return { message: response.message, success: true };
      } else {
        set({ error: response.message || 'Failed to ban user', loading: false });
        throw new Error(response.message);
      }
    } catch (error: any) {
      set({ error: 'Failed to ban user', loading: false });
      return { message: error.message, success: false };
    }
  },


  getUserCourses: async (userID) => {
    set({ loading: true, error: null });
    try {
      const response: ApiResponse<ICourse[]> = await getUserCourses(userID);
      if (response.success) {
        set({ courses: response.data || [], loading: false });
        return { message: 'User courses fetched successfully', success: true };
      } else {
        set({ error: response.message || 'Failed to fetch user courses', loading: false });
        throw new Error(response.message);
      }
    } catch (error: any) {
      set({ error: 'Failed to fetch user courses', loading: false });
      return { message: error.message, success: false };
    }
  },


  changeUserRole: async (userID, role , currentUserId) => {
    set({ loading: true, error: null });
    try {
      const response: ApiResponse<UserWithRelations> = await changeUserRole(userID, role , currentUserId);
      if (response.success && response.data) {
        set((state) => ({
          users: state.users.map((user) => (user.id === userID ? {...user , role} : user)),
          loading: false,
        }));
        return { message: 'User role updated successfully', success: true };
      } else {
        set({ error: response.message || 'Failed to change user role', loading: false });
        throw new Error(response.message);
      }
    } catch (error: any) {
      set({ error: 'Failed to change user role', loading: false });
      return { message: error.message, success: false };
    }
  },
}));

export default useUserStore;