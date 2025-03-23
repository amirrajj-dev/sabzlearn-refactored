"use server";

import { uploadToCloudinary } from "@/utils/fileUpload";
import prisma from "@/utils/prisma";
import { UserWithRelations, ApiResponse } from "@/interfaces/responses";
import { ICourse, IUser } from "@/interfaces/interfaces";
import { Role } from "@prisma/client";
import { unstable_cache, revalidatePath, revalidateTag } from "next/cache";

export const getAllUsers = unstable_cache(async (): Promise<
  ApiResponse<UserWithRelations[]>
> => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        role: true,
        createdAt: true,
        phone: true,
        isBanned: true,
      },
    });

    return {
      success: true,
      data: users as unknown as UserWithRelations[],
      message: "users fetched succesfully",
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    return { success: false, message: "Failed to fetch users" };
  }
}, ["all-users"]);

const emailReg = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

export const updateUser = async (
  userID: string,
  formData: FormData
): Promise<ApiResponse<UserWithRelations>> => {
  try {
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const file = formData.get("file") as File;
    if (!username && !email && !phone && !file) {
      return { success: false, message: "At least one field must be updated" };
    }

    let updateData: Partial<IUser> = {};

    if (username) updateData.username = username;
    if (email) {
      if (!emailReg.test(email)) {
        return { success: false, message: "Invalid email format" };
      }
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser && existingUser.id !== userID) {
        return { success: false, message: "Email is already in use" };
      }
      updateData.email = email;
    }
    if (phone) updateData.phone = phone;

    if (file && file.size > 0) {
      const coverURL = await uploadToCloudinary(file);
      updateData.profile = coverURL;
    }

    const updatedUser = await prisma.user.update({
      where: { id: userID },
      data: updateData as any,
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        phone: true,
        profile: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    revalidateTag("current-user");
    return {
      success: true,
      message: "User updated successfully",
      data: updatedUser as UserWithRelations,
    };
  } catch (error) {
    console.error("Error updating user:", error);
    return { success: false, message: "Failed to update user" };
  }
};

const deleteUserComments = async (userID: string): Promise<void> => {
  const userComments = await prisma.comment.findMany({
    where: { creatorID: userID },
    select: { id: true },
  });
  const commentIds = userComments.map((c) => c.id);

  await prisma.comment.updateMany({
    where: {
      OR: [{ id: { in: commentIds } }, { mainCommentID: { in: commentIds } }],
    },
    data: {
      mainCommentID: null,
    },
  });

  await prisma.comment.deleteMany({
    where: { creatorID: userID },
  });
};

export const deleteUser = async (userID: string): Promise<ApiResponse> => {
  try {
    if (!userID) {
      return { success: false, message: "User ID is required" };
    }

    const user = await prisma.user.findUnique({ where: { id: userID } });
    if (!user) {
      return { success: false, message: "User not found" };
    }
    if (user.role === "ADMIN") {
      return { success: false, message: "Admins cannot be deleted" };
    }

    await deleteUserComments(userID);

    await Promise.all([
      prisma.ticket.deleteMany({ where: { userId: userID } }),
      prisma.reply.deleteMany({ where: { userId: userID } }),
      prisma.article.deleteMany({ where: { creatorID: userID } }),
    ]);

    await prisma.user.delete({ where: { id: userID } });
    revalidatePath("/admin-pannel/users");
    revalidateTag("all-users");
    return { success: true, message: "User deleted successfully" };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, message: "Failed to delete user" };
  }
};

export const banUser = async (
  userID: string,
  currentUserId: string
): Promise<ApiResponse<UserWithRelations>> => {
  try {
    const currentUser = await prisma.user.findFirst({
      where: { id: currentUserId },
    });
    if (!userID) {
      return { success: false, message: "User ID is required" };
    }

    const user = await prisma.user.findUnique({ where: { id: userID } });
    if (!user) {
      return { success: false, message: "User not found" };
    }
    if (user.role === "ADMIN" && currentUser?.username !== "amirrajj") {
      return {
        success: false,
        message: "only 'amirrajj' can ban users with admin role",
      };
    }

    const updatedUser = await prisma.user.update({
      where: { id: userID },
      data: { isBanned: !user.isBanned },
      select: {
        id: true,
        username: true,
        isBanned: true,
      },
    });

    revalidatePath("/admin-pannel/users");
    revalidateTag("all-users");
    return {
      success: true,
      message: `User ${
        updatedUser.isBanned ? "banned" : "unbanned"
      } successfully`,
      data: updatedUser as UserWithRelations,
    };
  } catch (error) {
    console.error("Error banning user:", error);
    return { success: false, message: "Failed to ban user" };
  }
};

export const getUserCourses = async (
  userID: string
): Promise<ApiResponse<ICourse[]>> => {
  try {
    if (!userID) {
      return { success: false, message: "User ID is required" };
    }

    const userWithCourses = await prisma.user.findUnique({
      where: { id: userID },
      include: { courses: { orderBy: { updatedAt: "desc" } } },
    });

    if (!userWithCourses) {
      return { success: false, message: "User not found" };
    }

    return {
      success: true,
      message: "Courses retrieved successfully",
      data: (userWithCourses.courses as any) || [],
    };
  } catch (error) {
    console.error("Error fetching user courses:", error);
    return { success: false, message: "Failed to fetch user courses" };
  }
};

export const changeUserRole = async (
  userID: string,
  role: Role,
  currentUserId: string
): Promise<ApiResponse<UserWithRelations>> => {
  try {
    const currentUser = await prisma.user.findFirst({
      where: { id: currentUserId },
    });
    if (!currentUser || currentUser.role !== "ADMIN") {
      return {
        success: false,
        message: "Only admin users can change user roles",
      };
    }
    if (!userID || !role) {
      return { success: false, message: "User ID and role are required" };
    }

    if (role !== "USER" && role !== "ADMIN") {
      return {
        success: false,
        message: "Invalid role. Allowed roles: USER, ADMIN",
      };
    }

    const user = await prisma.user.findUnique({ where: { id: userID } });
    if (!user) {
      return { success: false, message: "User not found" };
    }

    if (user.role === "ADMIN" && role === "USER") {
      const adminCount = await prisma.user.count({ where: { role: "ADMIN" } });
      if (adminCount <= 1) {
        return { success: false, message: "Cannot remove the last admin" };
      }
    }
    if (
      user.role === "ADMIN" &&
      role === "USER" &&
      currentUser.username !== "amirrajj"
    ) {
      return {
        success: false,
        message: "Only 'amirrajj' can remove users from admin role",
      };
    }

    const updatedUser = await prisma.user.update({
      where: { id: userID },
      data: { role },
      select: {
        id: true,
        username: true,
        role: true,
      },
    });
    revalidatePath("/admin-pannel/users");
    revalidateTag("all-users");
    return {
      success: true,
      message: `User role updated successfully to ${role}`,
      data: updatedUser as UserWithRelations,
    };
  } catch (error) {
    console.error("Error changing user role:", error);
    return { success: false, message: "Failed to change user role" };
  }
};
