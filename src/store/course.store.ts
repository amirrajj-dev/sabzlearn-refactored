import { create } from "zustand";
import {
  getAllCourses,
  createCourse,
  deleteCourse,
  updateCourse,
  getSingleCourse,
  createSession,
  getSingleCourseSessions,
  getRelatedCourses,
  deleteSession,
  buyCourse,
  getUserPurchases,
} from "@/actions/course.action";
import {
  CourseWithRelations,
  SessionWithRelations,
  ApiResponse,
  PurchaseWithRelations,
} from "@/interfaces/responses";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type CourseStore = {
  courses: CourseWithRelations[];
  singleCourse: CourseWithRelations | null;
  sessions: SessionWithRelations[];
  relatedCourses: CourseWithRelations[];
  purchases: PurchaseWithRelations[];
  loading: boolean;
  error: string | null;

  getAllCourses: () => Promise<{ message: string; success: boolean }>;
  createCourse: (
    formData: FormData
  ) => Promise<{ message: string; success: boolean }>;
  deleteCourse: (
    courseID: string,
    userID: string
  ) => Promise<{ message: string; success: boolean }>;
  updateCourse: (
    formData: FormData
  ) => Promise<{ message: string; success: boolean }>;
  getSingleCourse: (
    shortName: string
  ) => Promise<{ message: string; success: boolean }>;
  createSession: (
    formData: FormData
  ) => Promise<{ message: string; success: boolean }>;
  getSingleCourseSessions: (
    courseID: string
  ) => Promise<{ message: string; success: boolean }>;
  getRelatedCourses: (
    courseID: string
  ) => Promise<{ message: string; success: boolean }>;
  deleteSession: (
    sessionID: string
  ) => Promise<{ message: string; success: boolean }>;
  resetSingleCourse: () => void;
  buyCourse: (courses: string[], userID: string) => Promise<ApiResponse>;
  getUserPurchases?: (
    userID: string
  ) => Promise<{ message: string; success: boolean }>;

  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
};

export const useCourses = () => useCourseStore((state) => state.courses);
export const useSingleCourse = () =>
  useCourseStore((state) => state.singleCourse);
export const useSessions = () => useCourseStore((state) => state.sessions);
export const useRelatedCourses = () =>
  useCourseStore((state) => state.relatedCourses);

export const useCourseStore = create<CourseStore>((set) => ({
  courses: [],
  singleCourse: null,
  sessions: [],
  relatedCourses: [],
  purchases: [],
  loading: false,
  error: null,

  getAllCourses: async () => {
    set({ loading: true, error: null });
    try {
      const response = await getAllCourses();
      if (response.success) {
        set({ courses: response.data!, loading: false });
        return { message: "Courses fetched successfully", success: true };
      } else {
        set({ error: response.message, loading: false });
        throw new Error(response.message);
      }
    } catch (error: any) {
      set({ error: "Failed to fetch courses", loading: false });
      return { message: error.message, success: false };
    }
  },

  createCourse: async (formData) => {
    set({ loading: true, error: null });
    try {
      const response = await createCourse(formData);
      if (response.success) {
        set((state) => ({
          courses: [response.data!, ...state.courses],
          loading: false,
        }));
        return { message: "Course created successfully", success: true };
      } else {
        set({ error: response.message, loading: false });
        throw new Error(response.message);
      }
    } catch (error: any) {
      set({ error: "Failed to create course", loading: false });
      return { message: error.message, success: false };
    }
  },

  deleteCourse: async (courseID, userID) => {
    set({ loading: true, error: null });
    try {
      const response = await deleteCourse(courseID, userID);
      if (response.success) {
        set((state) => ({
          courses: state.courses.filter((course) => course.id !== courseID),
          loading: false,
        }));
        return { message: "Course deleted successfully", success: true };
      } else {
        set({ error: response.message, loading: false });
        throw new Error(response.message);
      }
    } catch (error: any) {
      set({ error: "Failed to delete course", loading: false });
      return { message: error.message, success: false };
    }
  },

  updateCourse: async (formData) => {
    set({ loading: true, error: null });
    try {
      const response = await updateCourse(formData);
      if (response.success) {
        set((state) => ({
          courses: state.courses.map((course) =>
            course.id === response.data!.id ? response.data! : course
          ),
          loading: false,
        }));
        return { message: "Course updated successfully", success: true };
      } else {
        set({ error: response.message, loading: false });
        throw new Error(response.message);
      }
    } catch (error: any) {
      set({ error: "Failed to update course", loading: false });
      return { message: error.message, success: false };
    }
  },

  getSingleCourse: async (shortName) => {
    set({ loading: true, error: null });
    try {
      const response = await getSingleCourse(shortName);
      if (response.success) {
        set({ singleCourse: response.data!, loading: false });
        return { message: "Course fetched successfully", success: true };
      } else {
        set({ error: response.message, loading: false });
        throw new Error(response.message);
      }
    } catch (error: any) {
      set({ error: "Failed to fetch course", loading: false });
      return { message: error.message, success: false };
    }
  },

  createSession: async (formData) => {
    set({ loading: true, error: null });
    try {
      const response = await createSession(formData);
      if (response.success) {
        set((state) => ({
          sessions: [response.data!, ...state.sessions],
          loading: false,
        }));
        return { message: "Session created successfully", success: true };
      } else {
        set({ error: response.message, loading: false });
        throw new Error(response.message);
      }
    } catch (error: any) {
      set({ error: "Failed to create session", loading: false });
      return { message: error.message, success: false };
    }
  },

  getSingleCourseSessions: async (courseID) => {
    set({ loading: true, error: null });
    try {
      const response = await getSingleCourseSessions(courseID);
      if (response.success) {
        set({ sessions: response.data!, loading: false });
        return { message: "Sessions fetched successfully", success: true };
      } else {
        set({ error: response.message, loading: false });
        throw new Error(response.message);
      }
    } catch (error: any) {
      set({ error: "Failed to fetch sessions", loading: false });
      return { message: error.message, success: false };
    }
  },

  getRelatedCourses: async (courseID) => {
    set({ loading: true, error: null });
    try {
      const response = await getRelatedCourses(courseID);
      if (response.success) {
        set({ relatedCourses: response.data!, loading: false });
        return {
          message: "Related courses fetched successfully",
          success: true,
        };
      } else {
        set({ error: response.message, loading: false });
        throw new Error(response.message);
      }
    } catch (error: any) {
      set({ error: "Failed to fetch related courses", loading: false });
      return { message: error.message, success: false };
    }
  },

  deleteSession: async (sessionID) => {
    set({ loading: true, error: null });
    try {
      const response = await deleteSession(sessionID);
      if (response.success) {
        set((state) => ({
          sessions: state.sessions.filter(
            (session) => session.id !== sessionID
          ),
          loading: false,
        }));
        return { message: "Session deleted successfully", success: true };
      } else {
        set({ error: response.message, loading: false });
        throw new Error(response.message);
      }
    } catch (error: any) {
      set({ error: "Failed to delete session", loading: false });
      return { message: error.message, success: false };
    }
  },

  resetSingleCourse: () => {
    set({ singleCourse: null, loading: false, error: null });
  },

  buyCourse: async (courses, userID) => {
    set({ loading: true, error: null });
    try {
      const response = await buyCourse(courses, userID);
      if (response.success) {
        set({ loading: false });
        return {
          success: true,
          message: "Course purchased successfully",
        };
      } else {
        set({ error: response.message, loading: false });
        return {
          success: false,
          message: response.message,
        };
      }
    } catch (error) {
      console.error(error);
      set({ loading: false });
      return {
        success: false,
        message: "Error buying course",
      };
    }
  },
  getUserPurchases: async (userID) => {
    set({ loading: true, error: null });
    try {
      const response = await getUserPurchases(userID);
      if (response.success) {
        set({ purchases: response.data!, loading: false });
        return { message: "Purchases fetched successfully", success: true };
      } else {
        set({ error: response.message, loading: false });
        throw new Error(response.message);
      }
    } catch (error: any) {
      set({ error: "Failed to fetch purchases", loading: false });
      return { message: error.message, success: false };
    }
  },
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
