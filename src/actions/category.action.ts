"use server";

import prisma from "@/utils/prisma";
import { revalidatePath, revalidateTag } from "next/cache";
import { ICategory, ICourse } from "@/interfaces/interfaces";
import { unstable_cache } from "next/cache";

type ApiResponse<T = any> = {
  success: boolean;
  message?: string;
  data?: T;
};

type CategoryWithCourses = ICategory & {
  courses: ICourse[];
};

export const getAllCategories = unstable_cache(
  async (): Promise<ApiResponse<CategoryWithCourses[]>> => {
    try {
      const categories = await prisma.category.findMany({
        include: {
          courses: {
            select: {
              id: true,
              status: true,
              price: true,
              name: true,
              shortName: true,
              category: { select: { title: true } },
            },
          },
        },
      });

      return { success: true, data: categories as CategoryWithCourses[] };
    } catch (error) {
      console.error("Error fetching categories:", error);
      return { success: false, message: "Failed to fetch categories" };
    }
  },
  ["all-categories"],
  { revalidate: 3600, tags: ["all-categories"] }
);

export const createCategory = async (
  formData: FormData
): Promise<ApiResponse<ICategory & { courses: ICourse[] }>> => {
  try {
    const title = formData.get("title") as string;
    const name = formData.get("name") as string;

    if (!title || !name) {
      return { success: false, message: "All fields are required" };
    }

    const isCategoryExist = await prisma.category.findFirst({
      where: { title },
    });

    if (isCategoryExist) {
      return { success: false, message: "Category already exists" };
    }

    const newCategory = await prisma.category.create({
      data: { title, name },
      include: {
        courses: true,
      },
    });

    revalidatePath("/admin-pannel/categories");
    revalidateTag("all-categories");
    revalidateTag("all-articles");
    revalidateTag("all-courses");

    return {
      success: true,
      data: newCategory as ICategory & { courses: ICourse[] },
    };
  } catch (error) {
    console.error("Error creating category:", error);
    return { success: false, message: "Failed to create category" };
  }
};

export const deleteCategory = async (
  categoryID: string
): Promise<ApiResponse> => {
  try {
    if (!categoryID) {
      return { success: false, message: "Please provide category ID" };
    }

    const category = await prisma.category.findUnique({
      where: { id: categoryID },
    });

    if (!category) {
      return { success: false, message: "Category not found" };
    }

    await prisma.$transaction(async (prisma) => {
      try {
        const deleteCoursesResult = await prisma.course.deleteMany({
          where: { categoryID },
        });
        const deleteCategoryResult = await prisma.category.delete({
          where: { id: categoryID },
        });
      } catch (error) {
        console.error("Transaction error:", error);
        throw new Error("Failed to delete category and associated courses");
      }
    });

    revalidatePath("/admin-pannel/categories");
    revalidateTag("all-categories");
    revalidateTag("all-articles"); 
    revalidateTag("all-courses");

    return { success: true, message: "Category deleted successfully" };
  } catch (error) {
    console.error("Error deleting category:", error);
    return { success: false, message: "Failed to delete category" };
  }
};

export const updateCategory = async (
  categoryId: string,
  formData: FormData
): Promise<ApiResponse<CategoryWithCourses>> => {
  try {
    const title = formData.get("title") as string;
    const name = formData.get("name") as string;

    if (!categoryId) {
      return { success: false, message: "Please provide category ID" };
    }

    if (!title || !name) {
      return { success: false, message: "Please provide title and name" };
    }

    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return { success: false, message: "Category not found" };
    }

    const updatedCategory = await prisma.category.update({
      where: { id: categoryId },
      data: { title, name },
      include: {
        courses: {
          select: {
            id: true,
            name: true,
            shortName: true,
            price: true,
            status: true,
            category: { select: { title: true } },
          },
        },
      },
    });

    revalidatePath("/admin-pannel/categories");
    revalidateTag("all-categories"); 
    revalidateTag("all-articles"); 
    revalidateTag("all-courses");

    return {
      success: true,
      message: "Category updated successfully",
      data: updatedCategory as CategoryWithCourses,
    };
  } catch (error) {
    console.error("Error updating category:", error);
    return { success: false, message: "Failed to update category" };
  }
};