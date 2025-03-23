"use server";

import prisma from "@/utils/prisma";
import { DiscountWithRelations, ApiResponse } from "@/interfaces/responses";
import { revalidatePath, revalidateTag } from "next/cache";
import { unstable_cache } from "next/cache";

export const createDiscount = async (
  formData: FormData
): Promise<ApiResponse<DiscountWithRelations>> => {
  try {
    const userID = formData.get("userID") as string;
    const discount = formData.get("discount") as string;
    const code = formData.get("code") as string;
    const courseID = formData.get("courseID") as string;
    const maxUse = formData.get("maxUse") as string;

    if (!userID) {
      return { success: false, message: "Unauthorized" };
    }

    if (!discount || !code || !courseID || !maxUse) {
      return { success: false, message: "Invalid request" };
    }

    const course = await prisma.course.findUnique({ where: { id: courseID } });
    if (!course) {
      return { success: false, message: "Course not found" };
    }

    const discountExists = await prisma.discount.findFirst({
      where: { code },
    });

    if (discountExists) {
      return { success: false, message: "Discount code already exists" };
    }

    const newDiscount = await prisma.discount.create({
      data: {
        code,
        courseID,
        discount: parseFloat(discount),
        maxUse: parseInt(maxUse),
      },
    });

    revalidatePath("/admin-pannel/discounts");
    revalidateTag("all-discounts");
    revalidateTag("all-courses");

    return {
      success: true,
      message: "Discount created successfully",
      data: newDiscount as unknown as DiscountWithRelations,
    };
  } catch (error) {
    console.error("Error creating discount:", error);
    return { success: false, message: "Failed to create discount" };
  }
};

export const deleteDiscount = async (
  discountID: string,
  userID: string
): Promise<ApiResponse> => {
  try {
    if (!discountID) {
      return { success: false, message: "Invalid request" };
    }

    if (!userID) {
      return { success: false, message: "Unauthorized" };
    }

    const discount = await prisma.discount.findUnique({
      where: { id: discountID },
    });

    if (!discount) {
      return { success: false, message: "Discount not found" };
    }

    await prisma.discount.delete({
      where: { id: discountID },
    });

    revalidatePath("/admin-pannel/discounts");
    revalidateTag("all-discounts"); 
    revalidateTag("all-courses");
    revalidateTag(`course-${discount.courseID}`);

    return { success: true, message: "Discount deleted successfully" };
  } catch (error) {
    console.error("Error deleting discount:", error);
    return { success: false, message: "Failed to delete discount" };
  }
};

export const getAllDiscounts = unstable_cache(
  async (): Promise<ApiResponse<DiscountWithRelations[]>> => {
    try {
      const discounts = await prisma.discount.findMany({
        select: {
          code: true,
          courseID: true,
          createdAt: true,
          discount: true,
          id: true,
          maxUse: true,
        },
      });
      return {
        success: true,
        message: "Discounts fetched successfully",
        data: discounts as DiscountWithRelations[],
      };
    } catch (error) {
      console.error("Error fetching discounts:", error);
      return { success: false, message: "Failed to fetch discounts" };
    }
  },
  ["all-discounts"],
  { revalidate: 3600, tags: ["all-discounts"] }
);

export const createCampaign = async (
  formData: FormData
): Promise<ApiResponse> => {
  try {
    const discountAmount = formData.get("discountAmount") as string;

    if (+discountAmount < 0 || +discountAmount > 100) {
      return {
        success: false,
        message: "Discount amount must be between 0 and 100",
      };
    }

    await prisma.course.updateMany({
      where: {
        price: { gt: 0 },
        discount: { equals: 0 },
      },
      data: {
        discount: parseFloat(discountAmount),
      },
    });

    await prisma.discount.create({
      data: {
        discount: parseFloat(discountAmount),
        code: "campaign",
        courseID: "67c20495a46a4844f84d61b7", // Random object ID
        maxUse: 0,
      },
    });

    revalidatePath("/admin-pannel/campaigan");
    revalidateTag("all-discounts");
    revalidateTag("all-courses"); 

    return {
      success: true,
      message: `Discount campaign created successfully with ${discountAmount}% discount`,
    };
  } catch (error) {
    console.error("Error creating campaign:", error);
    return { success: false, message: "Failed to create campaign" };
  }
};

export const cancelCampaign = async (): Promise<ApiResponse> => {
  try {
    const campaign = await prisma.discount.findFirst({
      where: { code: "campaign" },
    });

    if (!campaign) {
      return { success: false, message: "Campaign not found" };
    }

    await prisma.course.updateMany({
      where: {
        discount: { equals: campaign.discount },
      },
      data: {
        discount: 0,
      },
    });

    await prisma.discount.deleteMany({
      where: { code: "campaign" },
    });

    revalidatePath("/admin-pannel/campaigan");
    revalidateTag("all-discounts");
    revalidateTag("all-courses"); 

    return {
      success: true,
      message: "Discount campaign canceled successfully",
    };
  } catch (error) {
    console.error("Error canceling campaign:", error);
    return { success: false, message: "Failed to cancel campaign" };
  }
};

export const applyDiscount = async (code : string) : Promise<ApiResponse>=>{
  try {
    if (!code.trim()){
      return {
        success: false,
        message: "Invalid discount code",
      }
    }
    const discount = await prisma.discount.findFirst({
      where: { code: code.trim() }
    })
    if (!discount) {
      return {
        success: false,
        message: "Discount code not found"
      }
    }
    if (discount.usage > discount.maxUse){
      return {
        success: false,
        message: "Discount code has been used the maximum number of times"
      }
    }
    await prisma.discount.update({
      where: { id: discount.id },
      data: {
        usage: discount.usage + 1,
      }
    })
    return {
      success: true,
      message: "Discount applied successfully",
      data : discount
    }
  } catch (error) {
    return { success: false, message: "Failed to apply discount" };
  }
} 