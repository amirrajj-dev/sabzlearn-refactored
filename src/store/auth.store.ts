import { create } from 'zustand';
import { changePassword , forgotPassword , getMe , resetPassword , signin , signout , signup } from '@/actions/auth.action';
import { IUser } from '@/interfaces/interfaces';
import { getToken } from '@/helpers/getToken';

type AuthStore = {
  user: Omit<IUser, 'password'> | null;
  loading: boolean;
  error: string | null;
  isAuthenticated : boolean,

  signup: (formData: FormData) => Promise<{ message: string; success: boolean }>;
  signin: (formData: FormData) => Promise<{ message: string; success: boolean }>;
  signout: () => Promise<{ message: string; success: boolean }>;
  getMe: () => Promise<{ message: string; success: boolean }>;
  forgotPassword: (formData: FormData) => Promise<{ message: string; success: boolean }>;
  resetPassword: (token: string, formData: FormData) => Promise<{ message: string; success: boolean }>;
  changePassword: (formData: FormData) => Promise<{ message: string; success: boolean }>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
};

export const useAuthStore = create<AuthStore>((set , get) => ({
  user: null,
  loading: false,
  error: null,
  isAuthenticated : false ,


  signup: async (formData) => {
    set({ loading: true, error: null });
    try {
      const response = await signup(formData);
      if (response.success) {
        set({ user: response.user || null, loading: false , isAuthenticated : true });
        return {
          message: 'Signup successful',
          success: true,
        };
      } else {
        set({ error: response.message, loading: false });
        throw new Error(response.message);
      }
    } catch (error: any) {
      set({ error: 'Failed to sign up', loading: false });
      return {
        message: error.message,
        success: false,
      };
    }
  },

  signin: async (formData) => {
    set({ loading: true, error: null });
    try {
      const response = await signin(formData);
      if (response.success) {
        set({ user: response.user || null, loading: false , isAuthenticated : true });
        return {
          message: 'Signin successful',
          success: true,
        };
      } else {
        set({ error: response.message, loading: false });
        throw new Error(response.message);
      }
    } catch (error: any) {
      set({ error: 'Failed to sign in', loading: false });
      return {
        message: error.message,
        success: false,
      };
    }
  },

  signout: async () => {
    set({ loading: true, error: null });
    try {
      const response = await signout();
      if (response.success) {
        set({ user: null, loading: false , isAuthenticated : false });
        return {
          message: 'Signout successful',
          success: true,
        };
      } else {
        set({ error: response.message, loading: false });
        throw new Error(response.message);
      }
    } catch (error: any) {
      set({ error: 'Failed to sign out', loading: false });
      return {
        message: error.message,
        success: false,
      };
    }
  },

  getMe: async () => {
    set({ loading: true, error: null });
    try {
      const token = await  getToken()
      const response = await getMe(token as string)
      if (response.success) {
        set({ user: response.user || null, loading: false , isAuthenticated : true });
        return {
          message: 'User fetched successfully',
          success: true,
        };
      } else {
        set({ error: response.message, loading: false });
        throw new Error(response.message);
      }
    } catch (error: any) {
      set({ error: 'Failed to fetch user', loading: false });
      return {
        message: error.message,
        success: false,
      }
    }finally{
      set({ loading: false });
    }
  },


  forgotPassword: async (formData) => {
    set({ loading: true, error: null });
    try {
      const response = await forgotPassword(formData);
      if (response.success) {
        set({ loading: false });
        return {
          message: 'Reset email sent successfully',
          success: true,
        };
      } else {
        set({ error: response.message, loading: false });
        throw new Error(response.message);
      }
    } catch (error: any) {
      set({ error: 'Failed to send reset email', loading: false });
      return {
        message: error.message,
        success: false,
      };
    }
  },

  resetPassword: async (token, formData) => {
    set({ loading: true, error: null });
    try {
      const response = await resetPassword(token, formData);
      if (response.success) {
        set({ loading: false });
        return {
          message: 'Password reset successfully',
          success: true,
        };
      } else {
        set({ error: response.message, loading: false });
        throw new Error(response.message);
      }
    } catch (error: any) {
      set({ error: 'Failed to reset password', loading: false });
      return {
        message: error.message,
        success: false,
      };
    }
  },

  changePassword: async (formData) => {
    set({ loading: true, error: null });
    try {
      const response = await changePassword(formData);
      if (response.success) {
        set({ loading: false });
        return {
          message: 'Password changed successfully',
          success: true,
        };
      } else {
        set({ error: response.message, loading: false });
        throw new Error(response.message);
      }
    } catch (error: any) {
      set({ error: 'Failed to change password', loading: false });
      return {
        message: error.message,
        success: false,
      };
    }
  },
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));