import { create } from 'zustand';
import { createDiscount, deleteDiscount, getAllDiscounts, createCampaign, cancelCampaign } from '@/actions/discount.action';
import { DiscountWithRelations } from '@/interfaces/responses';

type DiscountStore = {
  discounts: DiscountWithRelations[];
  loading: boolean;
  error: string | null;

  createDiscount: (formData: FormData) => Promise<{ message: string; success: boolean }>;
  deleteDiscount: (discountID: string, userID: string) => Promise<{ message: string; success: boolean }>;
  getAllDiscounts: () => Promise<{ message: string; success: boolean }>;
  createCampaign: (formData: FormData) => Promise<{ message: string; success: boolean }>;
  cancelCampaign: () => Promise<{ message: string; success: boolean }>;

  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
};

export const useDiscountStore = create<DiscountStore>((set) => ({
  discounts: [],
  loading: false,
  error: null,

  createDiscount: async (formData) => {
    set({ loading: true, error: null });
    try {
      const response = await createDiscount(formData);
      if (response.success) {
        set((state) => ({ discounts: [response.data!, ...state.discounts], loading: false }));
        return { message: 'Discount created successfully', success: true };
      } else {
        set({ error: response.message, loading: false });
        throw new Error(response.message);
      }
    } catch (error: any) {
      set({ error: 'Failed to create discount', loading: false });
      return { message: error.message, success: false };
    }
  },

  deleteDiscount: async (discountID, userID) => {
    set({ loading: true, error: null });
    try {
      const response = await deleteDiscount(discountID, userID);
      if (response.success) {
        set((state) => ({
          discounts: state.discounts.filter((discount) => discount.id !== discountID),
          loading: false,
        }));
        return { message: 'Discount deleted successfully', success: true };
      } else {
        set({ error: response.message, loading: false });
        throw new Error(response.message);
      }
    } catch (error: any) {
      set({ error: 'Failed to delete discount', loading: false });
      return { message: error.message, success: false };
    }
  },

  getAllDiscounts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await getAllDiscounts();
      if (response.success) {
        set({ discounts: response.data!, loading: false });
        return { message: 'Discounts fetched successfully', success: true };
      } else {
        set({ error: response.message, loading: false });
        throw new Error(response.message);
      }
    } catch (error: any) {
      set({ error: 'Failed to fetch discounts', loading: false });
      return { message: error.message, success: false };
    }
  },

  createCampaign: async (formData) => {
    set({ loading: true, error: null });
    try {
      const response = await createCampaign(formData);
      if (response.success) {
        set({ loading: false });
        return { message: 'Campaign created successfully', success: true };
      } else {
        set({ error: response.message, loading: false });
        throw new Error(response.message);
      }
    } catch (error: any) {
      set({ error: 'Failed to create campaign', loading: false });
      return { message: error.message, success: false };
    }
  },

  cancelCampaign: async () => {
    set({ loading: true, error: null });
    try {
      const response = await cancelCampaign();
      if (response.success) {
        set({ loading: false });
        return { message: 'Campaign canceled successfully', success: true };
      } else {
        set({ error: response.message, loading: false });
        throw new Error(response.message);
      }
    } catch (error: any) {
      set({ error: 'Failed to cancel campaign', loading: false });
      return { message: error.message, success: false };
    }
  },

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));