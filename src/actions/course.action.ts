"use server";
import { revalidateTag, unstable_cache } from "next/cache";

import prisma from "@/utils/prisma";
import { deleteCloudinaryFile, uploadToCloudinary } from "@/utils/fileUpload";
import { revalidatePath } from "next/cache";
import {
  CourseWithRelations,
  SessionWithRelations,
  ApiResponse,
} from "@/interfaces/responses";
import { IUser } from "@/interfaces/interfaces";

export const getAllCourses = unstable_cache(
  async (): Promise<ApiResponse<CourseWithRelations[]>> => {
    try {
      const courses = await prisma.course.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          cover: true,
          shortName: true,
          category: { select: { id: true, name: true, title: true } },
          creator: { select: { id: true, name: true } },
          _count: { select: { comments: true } },
          discount: true,
        },
        orderBy: { createdAt: "desc" },
      });

      return {
        success: true,
        data: courses as unknown as CourseWithRelations[],
        message: "Courses fetched successfully",
      };
    } catch (error) {
      console.error("Error fetching courses:", error);
      return { success: false, message: "Failed to fetch courses" };
    }
  },
  ["all-courses"],
  { revalidate: 3600, tags: ["all-courses"] } 
);

export const createCourse = async (
  formData: FormData
): Promise<ApiResponse<CourseWithRelations>> => {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const body = formData.get("body") as string;
    const price = formData.get("price") as string;
    const isComplete = formData.get("isComplete") as string;
    const status = formData.get("status") as string;
    const discount = formData.get("discount") as string;
    const categoryID = formData.get("categoryID") as string;
    const shortName = formData.get("shortName") as string;
    const file = formData.get("file") as File;
    const user = JSON.parse(formData.get("user") as string) as Pick<
      IUser,
      "id" | "name"
    >;

    if (!user) {
      return { success: false, message: "User not authenticated" };
    }

    if (
      !name ||
      !description ||
      !body ||
      !price ||
      !isComplete ||
      !status ||
      !discount ||
      !categoryID ||
      !shortName
    ) {
      return { success: false, message: "Please fill all the fields" };
    }

    let coverURL = "";
    if (file && file.size > 0) {
      coverURL = await uploadToCloudinary(file);
    }

    const newCourse = await prisma.course.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        isComplete: parseInt(isComplete),
        status,
        body,
        discount: parseFloat(discount),
        creator: { connect: { id: user.id } },
        cover: coverURL,
        shortName,
        category: { connect: { id: categoryID } },
      },
      include: {
        category: { select: { id: true, name: true } },
        creator: { select: { id: true, name: true } },
        comments: { select: { id: true } },
      },
    });

    revalidatePath("/admin-pannel/courses");
    revalidateTag("all-courses");
    revalidateTag("related-courses");
    revalidateTag("all-comments");

    return {
      success: true,
      message: "Course created successfully",
      data: newCourse as CourseWithRelations,
    };
  } catch (error) {
    console.error("Error creating course:", error);
    return { success: false, message: "Failed to create course" };
  }
};

export const deleteCourse = async (
  courseID: string,
  userID: string
): Promise<ApiResponse> => {
  try {
    if (!courseID) {
      return { success: false, message: "Please provide course ID" };
    }

    if (!userID) {
      return { success: false, message: "User not authenticated" };
    }

    const course = await prisma.course.findUnique({
      where: { id: courseID },
      include: { sessions: true, comments: true },
    });

    if (!course) {
      return { success: false, message: "Course not found" };
    }

    if (course.creatorID !== userID) {
      return {
        success: false,
        message: "You are not authorized to delete this course",
      };
    }

    await deleteCloudinaryFile(course.cover);

    const usersWithCourse = await prisma.user.findMany({
      where: { courses: { some: { id: courseID } } },
      select: { id: true },
    });

    await Promise.all(
      usersWithCourse.map((user) =>
        prisma.user.update({
          where: { id: user.id },
          data: { courses: { disconnect: { id: courseID } } },
        })
      )
    );

    await prisma.$transaction([
      prisma.comment.deleteMany({ where: { courseID } }),
      prisma.session.deleteMany({ where: { courseId: courseID } }),
      prisma.course.delete({ where: { id: courseID } }),
    ]);

    revalidatePath("/admin-pannel/courses");
    revalidateTag("all-courses");
    revalidateTag("related-courses");
    revalidateTag("all-comments");

    return { success: true, message: "Course deleted successfully" };
  } catch (error) {
    console.error("Error deleting course:", error);
    return { success: false, message: "Failed to delete course" };
  }
};

export const updateCourse = async (
  formData: FormData
): Promise<ApiResponse<CourseWithRelations>> => {
  try {
    const courseID = formData.get("courseID") as string;
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price") as string;
    const discount = formData.get("discount") as string;
    const shortName = formData.get("shortName") as string;
    const user = JSON.parse(formData.get("user") as string) as Pick<
      IUser,
      "id" | "name"
    >;
    if (!courseID) {
      return { success: false, message: "Please provide course ID" };
    }

    if (!name || !description || !price || !discount || !shortName) {
      return {
        success: false,
        message: "Please fill all the fields correctly",
      };
    }

    const course = await prisma.course.findUnique({ where: { id: courseID } });

    if (!course) {
      return { success: false, message: "Course not found" };
    }

    if (course.creatorID !== user.id) {
      return {
        success: false,
        message: "You are not authorized to update this course",
      };
    }

    const updatedCourse = await prisma.course.update({
      where: { id: courseID },
      data: {
        name: name || course.name,
        description: description || course.description,
        price: parseFloat(price),
        discount: parseFloat(discount) || course.discount,
        shortName: shortName || course.shortName,
      },
      include: {
        category: { select: { id: true, name: true } },
        creator: { select: { id: true, name: true } },
        comments: { select: { id: true } },
      },
    });
    revalidatePath("/admin-pannel/courses");
    revalidateTag("all-courses");
    revalidateTag("related-courses");
    revalidateTag(`category-${course.categoryID}`); 
    revalidateTag(`user-${user.id}`); 
    revalidateTag("all-comments");

    return {
      success: true,
      message: "Course updated successfully",
      data: updatedCourse as CourseWithRelations,
    };
  } catch (error) {
    console.error("Error updating course:", error);
    return { success: false, message: "Failed to update course" };
  }
};

export const getSingleCourse = unstable_cache(
  async (shortName: string): Promise<ApiResponse<CourseWithRelations>> => {
    try {
      const course = await prisma.course.findFirst({
        where: { shortName },
        select: {
          id: true,
          name: true,
          description: true,
          body: true,
          price: true,
          cover: true,
          shortName: true,
          status: true,
          discount: true,
          createdAt: true,
          updatedAt: true,
          category: { select: { id: true, name: true, title: true } },
          creator: { select: { id: true, name: true, profile: true } },
          sessions: true,
          _count: { select: { comments: true } },
          comments: {
            select: {
              creator: {
                select: {
                  name: true,
                  profile: true,
                  createdAt: true,
                  role: true,
                },
              },
              createdAt: true,
              body: true,
              mainCommentID: true,
              answer: true,
              course: { select: { id: true } },
              id: true,
            },
          },
        },
      });

      if (!course) {
        return { success: false, message: "Course not found" };
      }

      return {
        success: true,
        data: course as unknown as CourseWithRelations,
        message: "Course fetched successfully",
      };
    } catch (error) {
      console.error("Error fetching course:", error);
      return { success: false, message: "Failed to fetch course" };
    }
  },
  ["course"],
  { revalidate: 60 }
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
    revalidateTag("course-sessions");

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

export const getRelatedCourses = unstable_cache(
  async (courseID: string): Promise<ApiResponse<CourseWithRelations[]>> => {
    try {
      if (!courseID) {
        return { success: false, message: "Please provide course ID" };
      }

      const course = await prisma.course.findUnique({
        where: { id: courseID },
        include: { category: { select: { title: true } } },
      });

      if (!course) {
        return { success: false, message: "Course not found" };
      }

      const relatedCourses = await prisma.course.findMany({
        where: {
          categoryID: course.categoryID,
          id: { not: courseID },
        },
        orderBy: { createdAt: "desc" },
        include: { creator: true, category: true },
      });

      return {
        success: true,
        message: "Related courses retrieved successfully",
        data: relatedCourses as CourseWithRelations[],
      };
    } catch (error) {
      console.error("Error fetching related courses:", error);
      return { success: false, message: "Failed to fetch related courses" };
    }
  },
  ["related-courses"], 
  { revalidate: 3600, tags: ["related-courses"] }
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
    revalidateTag("course-sessions");
    revalidateTag(`course-${session.courseId}`);

    return { success: true, message: "Session deleted successfully" };
  } catch (error) {
    console.error("Error deleting session:", error);
    return { success: false, message: "Failed to delete session" };
  }
};

export const buyCourse = async (courses: string[], userID: string): Promise<ApiResponse> => {
  try {
    if (courses.length === 0) {
      return {
        success: false,
        message: "Please select at least one course",
      };
    }
    if (!userID) {
      return {
        success: false,
        message: "Please provide user ID",
      };
    }

    const user = await prisma.user.findUnique({ where: { id: userID } });
    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    const allCourses = await prisma.course.findMany({});
    const courseNames = allCourses.map((course) => course.name);

    // Validate course names
    const validCourses = courseNames.filter((course) => courses.includes(course));
    if (validCourses.length !== courses.length) {
      return {
        success: false,
        message: "One or more courses not found",
      };
    }

    // Find valid courses by name and extract their IDs
    const userCourses = await Promise.all(
      validCourses.map((course) =>
        prisma.course.findFirst({
          where: { name: course },
          select: { id: true }, // Only fetch the ID
        })
      )
    );

    if (userCourses.some((course) => !course)) {
      return {
        success: false,
        message: "One or more courses not found",
      };
    }

    const updatedUser = await prisma.user.update({
      where: { id: userID },
      data: {
        courses: {
          connect: userCourses.map((course) => ({ id: course!.id }))
        },
      },
      include : {
        courses : true
      }
    });

    revalidatePath('/my-account/courses')
    revalidateTag('current-user')

    return {
      success: true,
      message: "Courses added successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Error buying course",
    };
  }
};