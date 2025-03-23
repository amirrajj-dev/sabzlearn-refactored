import { create } from 'zustand';
import { getAllCategories, createCategory, deleteCategory, updateCategory } from '@/actions/category.action';
import { ICategory, ICourse } from '@/interfaces/interfaces';

type CategoryWithCourses = ICategory & {
  courses: ICourse[];
};

type CategoryStore = {
  categories: CategoryWithCourses[];
  loading: boolean;
  error: string | null;


  getAllCategories: () => Promise<{ message: string; success: boolean }>;
  createCategory: (formData: FormData) => Promise<{ message: string; success: boolean }>;
  deleteCategory: (categoryID: string) => Promise<{ message: string; success: boolean }>;
  updateCategory: (categoryId: string, formData: FormData) => Promise<{ message: string; success: boolean }>;


  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
};

export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  loading: false,
  error: null,

  getAllCategories: async () => {
    set({ loading: true, error: null });
    try {
      const response = await getAllCategories();
      if (response.success) {
        set({ categories: response.data!, loading: false });
        return {
          message: 'Categories fetched successfully',
          success: true,
        };
      } else {
        set({ error: response.message, loading: false });
        throw new Error(response.message);
      }
    } catch (error: any) {
      set({ error: 'Failed to fetch categories', loading: false });
      return {
        message: error.message,
        success: false,
      };
    }
  },

  createCategory: async (formData) => {
    set({ loading: true, error: null });
    try {
      const response = await createCategory(formData);
      if (response.success) {
        set((state) => ({ categories: [response.data!, ...state.categories], loading: false }));
        return {
          message: 'Category created successfully',
          success: true,
        };
      } else {
        set({ error: response.message, loading: false });
        throw new Error(response.message);
      }
    } catch (error: any) {
      console.log(error);
      set({ error: 'Failed to create category', loading: false });
      return {
        message: error.message,
        success: false,
      };
    }
  },

  deleteCategory: async (categoryID) => {
    set({ loading: true, error: null });
    try {
      const response = await deleteCategory(categoryID);
      if (response.success) {
        set((state) => ({
          categories: state.categories.filter((category) => category.id !== categoryID),
          loading: false,
        }));
        return {
          message: 'Category deleted successfully',
          success: true,
        };
      } else {
        set({ error: response.message, loading: false });
        throw new Error(response.message);
      }
    } catch (error: any) {
      set({ error: 'Failed to delete category', loading: false });
      return {
        message: error.message,
        success: false,
      };
    }
  },


  updateCategory: async (categoryId, formData) => {
    set({ loading: true, error: null });
    try {
      const response = await updateCategory(categoryId, formData);
      if (response.success) {
        set((state) => ({
          categories: state.categories.map((category) =>
            category.id === categoryId ? response.data! : category
          ),
          loading: false,
        }));
        return {
          message: 'Category updated successfully',
          success: true,
        };
      } else {
        set({ error: response.message, loading: false });
        throw new Error(response.message);
      }
    } catch (error: any) {
      set({ error: 'Failed to update category', loading: false });
      return {
        message: error.message,
        success: false,
      };
    }
  },


  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));