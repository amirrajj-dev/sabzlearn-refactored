"use server";

import prisma from "@/utils/prisma";
import { SessionWithRelations, ApiResponse } from "@/interfaces/responses";
import { unstable_cache, revalidatePath, revalidateTag } from "next/cache";
import { uploadToCloudinary } from "@/utils/fileUpload";

export const getAllSessions = unstable_cache(
  async (): Promise<ApiResponse<SessionWithRelations[]>> => {
    try {
      const sessions = await prisma.session.findMany({
        include: {
          course: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      return {
        success: true,
        message: "Sessions fetched successfully",
        data: sessions as unknown as SessionWithRelations[],
      };
    } catch (error) {
      console.error("Error fetching sessions:", error);
      return { success: false, message: "Failed to fetch sessions" };
    }
  },
  ["all-sessions"], 
  { tags: ["all-sessions"], revalidate: 3600 }
);

export const createSession = async (
  formData: FormData
): Promise<ApiResponse<SessionWithRelations>> => {
  try {
    const courseID = formData.get("courseID") as string;
    const title = formData.get("title") as string;
    const time = formData.get("time") as string;
    const free = formData.get("free") as string;
    const file = formData.get("file") as File;

    if (!courseID || !title || !time || !free) {
      return { success: false, message: "Please fill all fields correctly" };
    }

    const course = await prisma.course.findUnique({ where: { id: courseID } });

    if (!course) {
      return { success: false, message: "Course not found" };
    }

    if (!file || file.size === 0) {
      return { success: false, message: "Please upload a valid file" };
    }

    const videoUrl = await uploadToCloudinary(file);

    const newSession = await prisma.session.create({
      data: {
        title,
        time,
        free: parseInt(free),
        video: videoUrl,
        course: { connect: { id: courseID } },
      },
      include: { course: { select: { id: true, name: true } } },
    });

    revalidatePath(`/admin-pannel/sessions`);
    revalidateTag("all-sessions"); 
    revalidateTag(`course-${courseID}`);

    return {
      success: true,
      message: "Session created successfully",
      data: newSession as unknown as SessionWithRelations,
    };
  } catch (error) {
    console.error("Error creating session:", error);
    return { success: false, message: "Failed to create session" };
  }
};

export const getSingleCourseSessions = unstable_cache(
  async (courseID: string): Promise<ApiResponse<SessionWithRelations[]>> => {
    try {
      if (!courseID) {
        return { success: false, message: "Please provide course ID" };
      }

      const course = await prisma.course.findUnique({
        where: { id: courseID },
        include: { sessions: true },
      });

      if (!course) {
        return { success: false, message: "Course not found" };
      }

      return {
        success: true,
        message: "Sessions retrieved successfully",
        data: course.sessions as unknown as SessionWithRelations[],
      };
    } catch (error) {
      console.error("Error fetching sessions:", error);
      return { success: false, message: "Failed to fetch sessions" };
    }
  },
  ["course-sessions"], 
  { revalidate: 3600 } 
);

export const deleteSession = async (
  sessionID: string
): Promise<ApiResponse> => {
  try {
    if (!sessionID) {
      return { success: false, message: "Please provide session ID" };
    }

    const session = await prisma.session.findUnique({
      where: { id: sessionID },
    });

    if (!session) {
      return { success: false, message: "Session not found" };
    }

    await prisma.session.delete({ where: { id: sessionID } });

    revalidatePath(`/admin-pannel/sessions`);
    revalidateTag("all-sessions"); 
    revalidateTag(`course-${session.courseId}`); 

    return { success: true, message: "Session deleted successfully" };
  } catch (error) {
    console.error("Error deleting session:", error);
    return { success: false, message: "Failed to delete session" };
  }
};