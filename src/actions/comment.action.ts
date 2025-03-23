"use server";

import prisma from "@/utils/prisma";
import { IComment, IUser, ICourse } from "@/interfaces/interfaces";
import { revalidatePath, unstable_cache, revalidateTag } from "next/cache";

type ApiResponse<T = any> = {
  success: boolean;
  message?: string;
  data?: T;
};

type CommentWithRelations = IComment & {
  creator: Pick<
    IUser,
    "id" | "email" | "username" | "name" | "role" | "isBanned" | "profile"
  >;
  course: Pick<ICourse, "id" | "name">;
  replies?: IComment[];
  parentComment?: Pick<IComment, "id" | "body">;
};

export const getAllComments = unstable_cache(
  async (): Promise<ApiResponse<CommentWithRelations[]>> => {
    try {
      const comments = await prisma.comment.findMany({
        include: {
          creator: {
            select: {
              id: true,
              email: true,
              username: true,
              name: true,
              role: true,
              isBanned: true,
              profile: true,
            },
          },
          course: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return {
        success: true,
        message: "Comments fetched successfully",
        data: comments as CommentWithRelations[],
      };
    } catch (error) {
      console.error("Error fetching comments:", error);
      return { success: false, message: "Failed to fetch comments" };
    }
  },
  ["all-comments"],
  { tags: ["all-comments"], revalidate: 3600 }
);

export const createComment = async (
  formData: FormData
): Promise<ApiResponse<CommentWithRelations>> => {
  try {
    const userID = formData.get("userID") as string;
    const body = formData.get("body") as string;
    const courseID = formData.get("courseID") as string;
    const score = formData.get("score") as string;
    const mainCommentID = formData.get("mainCommentID") as string | null;

    if (!userID) {
      return { success: false, message: "User not authenticated" };
    }

    if (!body || !courseID || !score) {
      return { success: false, message: "Please provide all required fields" };
    }

    const isCourseExist = await prisma.course.findUnique({
      where: { id: courseID },
    });

    if (!isCourseExist) {
      return { success: false, message: "Course not found" };
    }

    if (+score < 1 || +score > 5) {
      return { success: false, message: "Score must be between 1 and 5" };
    }

    let parentComment = null;

    if (mainCommentID) {
      parentComment = await prisma.comment.findUnique({
        where: { id: mainCommentID },
        include: { replies: true },
      });

      if (!parentComment) {
        return { success: false, message: "Parent comment not found" };
      }

      if (parentComment.courseID !== courseID) {
        return {
          success: false,
          message: "Reply must belong to the same course",
        };
      }

      if (parentComment.replies.some((reply) => reply.id === mainCommentID)) {
        return { success: false, message: "Reply already exists" };
      }

      if (parentComment.replies.length >= 3) {
        return {
          success: false,
          message: "Cannot reply to a parent comment more than 3 times",
        };
      }
    }

    const comment = await prisma.comment.create({
      data: {
        body,
        courseID,
        score: +score,
        creatorID: userID,
        answer: 0,
        isAnswer: 0,
        mainCommentID: mainCommentID || null,
      },
      include: {
        creator: {
          select: {
            id: true,
            username: true,
            email: true,
            name: true,
            role: true,
          },
        },
        parentComment: mainCommentID
          ? { select: { id: true, body: true } }
          : undefined,
        course: {
          include: {
            comments: {
              include: {
                creator: true,
                replies: true,
              },
            },
            sessions: true,
          },
        },
        replies: true,
      },
    });

    revalidatePath("/admin-pannel/comments");
    revalidateTag("all-comments");

    return {
      success: true,
      message: "Comment created successfully",
      data: comment as unknown as CommentWithRelations,
    };
  } catch (error) {
    console.error("Error creating comment:", error);
    return { success: false, message: "Failed to create comment" };
  }
};

export const deleteComment = async (
  commentID: string,
  userID: string,
  userRole: string
): Promise<ApiResponse> => {
  try {
    if (!commentID) {
      return { success: false, message: "Please provide comment ID" };
    }

    if (!userID) {
      return { success: false, message: "User not authenticated" };
    }

    const comment = await prisma.comment.findUnique({
      where: { id: commentID },
      include: { replies: true },
    });
    if (!comment) {
      return { success: false, message: "Comment not found" };
    }

    if (!(userRole === "ADMIN" || comment.creatorID === userID)) {
      return {
        success: false,
        message: "You are not authorized to delete this comment",
      };
    }

    if (comment.replies.length > 0) {
      await prisma.comment.deleteMany({
        where: { mainCommentID: commentID },
      });
    }

    await prisma.comment.delete({
      where: { id: commentID },
    });

    revalidatePath("/admin-pannel/comments");
    revalidateTag("all-comments");

    return { success: true, message: "Comment deleted successfully" };
  } catch (error) {
    return { success: false, message: "Failed to delete comment" };
  }
};

export const answerComment = async (
  commentID: string,
  formData: FormData
): Promise<ApiResponse<CommentWithRelations>> => {
  try {
    const userID = formData.get("userID") as string;
    const body = formData.get("body") as string;
    const courseID = formData.get("courseID") as string;

    if (!commentID || !body || !courseID) {
      return { success: false, message: "Please provide all required fields" };
    }

    if (!userID) {
      return { success: false, message: "User not authenticated" };
    }

    const isCourseExist = await prisma.course.findUnique({
      where: { id: courseID },
    });

    if (!isCourseExist) {
      return { success: false, message: "Course not found" };
    }

    const originalComment = await prisma.comment.findUnique({
      where: { id: commentID },
    });

    if (!originalComment) {
      return { success: false, message: "Comment not found" };
    }

    const user = await prisma.user.findUnique({ where: { id: userID } });

    if (!user || user.role !== "ADMIN") {
      return {
        success: false,
        message: "You are not authorized to answer this comment",
      };
    }

    if (originalComment.creatorID === userID) {
      return { success: false, message: "You cannot answer your own comment" };
    }

    const replyComment = await prisma.comment.create({
      data: {
        body,
        courseID,
        creatorID: userID,
        mainCommentID: commentID,
        score: 0,
        answer: 1,
        isAnswer: 1,
      },
      include: {
        creator: {
          select: {
            id: true,
            username: true,
            email: true,
            name: true,
            role: true,
          },
        },
        parentComment: { select: { id: true, body: true } },
        course: { select: { name: true } },
      },
    });

    await prisma.comment.update({
      where: { id: commentID },
      data: { isAnswer: 1, answer: 1 },
    });

    revalidatePath("/admin-pannel/comments");
    revalidateTag("all-comments");

    return {
      success: true,
      message: "Reply added successfully",
      data: replyComment as CommentWithRelations,
    };
  } catch (error) {
    console.error("Error answering comment:", error);
    return { success: false, message: "Failed to answer comment" };
  }
};

export const acceptComment = async (
  commentID: string,
  userID: string,
  userRole: string
): Promise<ApiResponse> => {
  try {
    if (!commentID) {
      return { success: false, message: "Please provide comment ID" };
    }

    if (!userID || userRole !== "ADMIN") {
      return {
        success: false,
        message: "You are not authorized to accept this comment",
      };
    }

    const comment = await prisma.comment.findUnique({
      where: { id: commentID },
    });

    if (!comment) {
      return { success: false, message: "Comment not found" };
    }

    await prisma.comment.update({
      where: { id: commentID },
      data: { answer: 1 },
    });

    revalidatePath("/admin-pannel/comments");
    revalidateTag("all-comments");

    return { success: true, message: "Comment accepted successfully" };
  } catch (error) {
    console.error("Error accepting comment:", error);
    return { success: false, message: "Failed to accept comment" };
  }
};

export const rejectComment = async (
  commentID: string,
  userID: string,
  userRole: string
): Promise<ApiResponse> => {
  try {
    if (!commentID) {
      return { success: false, message: "Please provide comment ID" };
    }

    if (!userID || userRole !== "ADMIN") {
      return {
        success: false,
        message: "You are not authorized to reject this comment",
      };
    }

    const comment = await prisma.comment.findUnique({
      where: { id: commentID },
    });

    if (!comment) {
      return { success: false, message: "Comment not found" };
    }

    await prisma.comment.update({
      where: { id: commentID },
      data: { answer: 0 },
    });

    revalidatePath("/admin-pannel/comments");
    revalidateTag("all-comments");

    return { success: true, message: "Comment rejected successfully" };
  } catch (error) {
    console.error("Error rejecting comment:", error);
    return { success: false, message: "Failed to reject comment" };
  }
};