"use server";

import prisma from "@/utils/prisma";
import { deleteCloudinaryFile, uploadToCloudinary } from "@/utils/fileUpload";
import { revalidatePath, revalidateTag } from "next/cache";
import { IArticle, IUser, ICategory } from "@/interfaces/interfaces";
import { ApiResponse } from "@/interfaces/responses";
import { unstable_cache } from "next/cache";

interface CreateArticleParams {
  title: string;
  description: string;
  body: string;
  categoryID: string;
  shortName: string;
  publish: string;
  file: File;
  user: IUser;
}

export const createArticle = async (
  userId: string,
  formData: FormData
): Promise<ApiResponse<IArticle>> => {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const body = formData.get("body") as string;
    const categoryID = formData.get("categoryID") as string;
    const shortName = formData.get("shortName") as string;
    const publish = formData.get("publish") as string;
    const file = formData.get("file") as File;

    if (!userId) {
      return { success: false, message: "User not authenticated" };
    }

    if (
      !title ||
      !description ||
      !body ||
      !categoryID ||
      !shortName ||
      !publish
    ) {
      return { success: false, message: "Please fill all the fields" };
    }

    if (!file || file.size === 0) {
      return { success: false, message: "Please upload a valid file" };
    }

    const isCategoryIdValid = await prisma.category.findFirst({
      where: { id: categoryID },
    });

    if (!isCategoryIdValid) {
      return { success: false, message: "Invalid category ID" };
    }

    const coverURL = await uploadToCloudinary(file);

    const article = await prisma.article.create({
      data: {
        title,
        description,
        body,
        cover: coverURL,
        categoryID,
        shortName,
        creatorID: userId,
        publish: parseInt(publish),
      },
    });


    revalidatePath("/admin-pannel/articles");
    revalidateTag("all-articles");
    revalidateTag("suggested-articles");
    revalidateTag(`all-categories`);

    return {
      success: true,
      message: "Article created successfully",
      data: article as IArticle,
    };
  } catch (error) {
    console.error("Error creating article:", error);
    return { success: false, message: "Failed to create article" };
  }
};

export const getAllArticles = unstable_cache(
  async (): Promise<ApiResponse<IArticle[]>> => {
    try {
      const articles = await prisma.article.findMany({
        include: {
          category: true,
          creator: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return {
        success: true,
        data: articles as IArticle[],
        message: "Articles fetched successfully",
      };
    } catch (error) {
      console.error("Error fetching articles:", error);
      return { success: false, message: "Failed to fetch articles" };
    }
  },
  ["all-articles"], 
  { revalidate: 3600, tags: ["all-articles"] }
);

export const saveDraft = async (
  formData: FormData
): Promise<ApiResponse<IArticle>> => {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const body = formData.get("body") as string;
    const categoryID = formData.get("categoryID") as string;
    const shortName = formData.get("shortName") as string;
    const file = formData.get("file") as File;
    const user = JSON.parse(formData.get("user") as string) as IUser;

    if (!user) {
      return { success: false, message: "User not authenticated" };
    }

    if (!title || !description || !body || !categoryID || !shortName) {
      return { success: false, message: "Please fill all the fields" };
    }

    if (!file || file.size === 0) {
      return { success: false, message: "Please upload a valid file" };
    }

    const isCategoryIdValid = await prisma.category.findFirst({
      where: { id: categoryID },
    });

    if (!isCategoryIdValid) {
      return { success: false, message: "Invalid category ID" };
    }

    const coverURL = await uploadToCloudinary(file);

    const article = await prisma.article.create({
      data: {
        title,
        description,
        body,
        cover: coverURL,
        categoryID,
        shortName,
        creatorID: user.id,
        publish: 0,
      },
    });

    revalidatePath("/admin-pannel/articles");
    revalidateTag("all-articles"); 
    revalidateTag("suggested-articles");
    revalidateTag(`all-categories`);

    return {
      success: true,
      message: "Article saved as draft successfully",
      data: article as IArticle,
    };
  } catch (error) {
    console.error("Error saving draft:", error);
    return { success: false, message: "Failed to save draft" };
  }
};

export const deleteArticle = async (
  articleID: string,
  userID: string
): Promise<ApiResponse> => {
  try {
    if (!articleID) {
      return { success: false, message: "Please provide article ID" };
    }

    if (!userID) {
      return { success: false, message: "User not authenticated" };
    }

    const article = await prisma.article.findUnique({
      where: { id: articleID },
    });

    if (!article) {
      return { success: false, message: "Article not found" };
    }

    if (article.creatorID !== userID) {
      return {
        success: false,
        message: "You are not authorized to delete this article",
      };
    }

    await deleteCloudinaryFile(article.cover);
    await prisma.article.delete({ where: { id: articleID } });


    revalidatePath("/admin-pannel/articles");
    revalidateTag("all-articles"); 
    revalidateTag("suggested-articles");
    revalidateTag(`all-categories`);


    return { success: true, message: "Article deleted successfully" };
  } catch (error) {
    console.error("Error deleting article:", error);
    return { success: false, message: "Failed to delete article" };
  }
};

export const updateArticle = async (
  articleID: string,
  body: string,
  publish: string,
  userID: string
): Promise<ApiResponse<IArticle>> => {
  try {
    if (!articleID) {
      return { success: false, message: "Please provide article ID" };
    }

    if (!body) {
      return { success: false, message: "Please provide article body" };
    }

    if (!userID) {
      return { success: false, message: "User not authenticated" };
    }

    const article = await prisma.article.findUnique({
      where: { id: articleID },
    });

    if (!article) {
      return { success: false, message: "Article not found" };
    }

    if (article.creatorID !== userID) {
      return {
        success: false,
        message: "You are not authorized to update this article",
      };
    }

    const updatedArticle = await prisma.article.update({
      where: { id: articleID },
      data: {
        body,
        publish: parseInt(publish),
      },
    });

    revalidatePath("/admin-pannel/articles");
    revalidateTag("all-articles"); 
    revalidateTag("suggested-articles"); 
    revalidateTag(`article-${articleID}`); 
    revalidateTag(`all-categories`); 
    revalidateTag(`user-${userID}`); 

    return {
      success: true,
      message: "Article updated successfully",
      data: updatedArticle as IArticle,
    };
  } catch (error) {
    console.error("Error updating article:", error);
    return { success: false, message: "Failed to update article" };
  }
};

export const getArticle = unstable_cache(
  async (shortName: string): Promise<ApiResponse<IArticle>> => {
    try {
      if (!shortName) {
        return { success: false, message: "Please provide article short name" };
      }

      const article = await prisma.article.findFirst({
        where: { shortName },
        include: { creator: true, category: true },
      });

      if (!article) {
        return { success: false, message: "Article not found" };
      }

      return {
        success: true,
        data: article as IArticle,
        message: "Article fetched successfully",
      };
    } catch (error) {
      console.error("Error fetching article:", error);
      return { success: false, message: "Failed to fetch article" };
    }
  },
  ["getArticle"], 
  { revalidate: 3600 }
);

export const getSuggestedArticles = unstable_cache(
  async (shortName: string): Promise<ApiResponse<IArticle[]>> => {
    try {
      if (!shortName) {
        return { success: false, message: "Please provide article short name" };
      }

      const article = await prisma.article.findFirst({
        where: { shortName },
      });

      if (!article) {
        return { success: false, message: "Article not found" };
      }

      const suggestedArticles = await prisma.article.findMany({
        where: {
          categoryID: article.categoryID,
          NOT: { shortName },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 3,
      });

      return {
        success: true,
        data: suggestedArticles as IArticle[],
        message: "Suggested articles fetched successfully",
      };
    } catch (error) {
      console.error("Error fetching suggested articles:", error);
      return { success: false, message: "Failed to fetch suggested articles" };
    }
  },
  ["suggested-articles"],
  { revalidate: 3600, tags: ["suggested-articles"] }
);