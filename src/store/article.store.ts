import { create } from 'zustand';
import { createArticle, getAllArticles, saveDraft, deleteArticle, updateArticle, getArticle, getSuggestedArticles } from '@/actions/article.action';
import { IArticle } from '@/interfaces/interfaces';
import { ApiResponse } from '@/interfaces/responses';

type ArticleStore = {
  articles: IArticle[];
  article : IArticle | null;
  suggestedArticles: IArticle[];
  loading: boolean;
  error: string | null;

  createArticle: (userId : string , formData: FormData) => Promise<{message : string , success : boolean}>;
  getAllArticles: () => Promise<{message : string , success : boolean}>;
  saveDraft: (formData: FormData) => Promise<{message : string , success : boolean}>;
  deleteArticle: (articleID: string, userID: string) => Promise<{message : string , success : boolean}>;
  updateArticle: (articleID: string, body: string, publish: string, userID: string) => Promise<{message : string , success : boolean}>;
  getArticle: (shortName: string) => Promise<{message : string , success : boolean}>;
  getSuggestedArticles: (shortName: string) => Promise<{message : string , success : boolean}>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
};

export const useArticleStore = create<ArticleStore>((set) => ({
  articles: [],
  article : null,
  suggestedArticles: [],
  loading: false,
  error: null,

  createArticle: async (userId , formData) => {
    set({ loading: true, error: null });
    try {
      const response = await createArticle(userId , formData);
      if (response.success) {
        set((state) => ({ articles: [response.data!, ...state.articles], loading: false }));
        return {
          message: 'Article created successfully',
          success: true
        }
      } else {
        set({ error: response.message, loading: false });
        throw  new Error(response.message)
      }
    } catch (error : any) {
      set({ error: 'Failed to create article', loading: false });
      return {
        message: error.message,
        success: false
      }
    }
  },


  getAllArticles: async () => {
    set({ loading: true, error: null });
    try {
      const response = await getAllArticles();
      if (response.success) {
        set({ articles: response.data!, loading: false });
        return {
          message: 'Articles fetched successfully',
          success: true
        }
      } else {
        set({ error: response.message, loading: false });
        throw new Error(response.message)
      }
    } catch (error : any) {
      set({ error: 'Failed to fetch articles', loading: false });
      return {
        message: error.message,
        success: false
      }
    }
  },

  saveDraft: async (formData) => {
    set({ loading: true, error: null });
    try {
      const response = await saveDraft(formData);
      if (response.success) {
        set((state) => ({ articles: [response.data!, ...state.articles], loading: false }));
        return {
          message: 'Article saved successfully',
          success: true
        }
      } else {
        set({ error: response.message, loading: false });
        throw new Error(response.message)
      }
    } catch (error : any) {
      set({ error: 'Failed to save draft', loading: false });
      return {
        message: error.message,
        success: false
      }
    }
  },

  deleteArticle: async (articleID, userID) => {
    set({ loading: true, error: null });
    try {
      const response = await deleteArticle(articleID, userID);
      if (response.success) {
        set((state) => ({
          articles: state.articles.filter((article) => article.id !== articleID),
          loading: false,
        }));
        return {
          message: 'Article deleted successfully',
          success: true
        }
      } else {
        set({ error: response.message, loading: false });
        throw new Error(response.message)
      }
    } catch (error: any) {
      set({ error: 'Failed to delete article', loading: false });
      return{
        message: error.message,
        success: false
      }
    }
  },


  updateArticle: async (articleID, body, publish, userID) => {
    set({ loading: true, error: null });
    try {
      const response = await updateArticle(articleID, body, publish, userID);
      if (response.success) {
        set((state) => ({
          articles: state.articles.map((article) =>
            article.id === articleID ? response.data! : article
          ),
          loading: false,
        }));
        return{
          message: 'Article updated successfully',
          success: true
        }
      } else {
        set({ error: response.message, loading: false });
        throw new Error(response.message)
      }
    } catch (error : any) {
      set({ error: 'Failed to update article', loading: false });
      return{
        message: error.message,
        success: false
      }
    }
  },


  getArticle: async (shortName) => {
    set({ loading: true, error: null });
    try {
      const response = await getArticle(shortName);
      if (response.success) {
        set({ loading: false , article : response.data });
        return{
          message: 'article fethced succesfully',
          success: true
        }
      } else {
        set({ error: response.message, loading: false });
        throw new Error(response.message)
      }
    } catch (error : any) {
      set({ error: 'Failed to fetch article', loading: false });
      return{
        message: error.message,
        success: false
      }
    }
  },


  getSuggestedArticles: async (shortName) => {
    set({ loading: true, error: null });
    try {
      const response = await getSuggestedArticles(shortName);
      if (response.success) {
        set({ suggestedArticles: response.data!, loading: false });
        return{
          message: 'suggested articles fetched succesfully',
          success: true
        }
      } else {
        set({ error: response.message, loading: false });
        throw new Error(response.message)
      }
    } catch (error : any) {
      set({ error: 'Failed to fetch suggested articles', loading: false });
      return{
        message: error.message,
        success: false
      }
    }
  },

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));