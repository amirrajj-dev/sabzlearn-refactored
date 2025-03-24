import { Session } from "inspector/promises";
import {
  ICategory,
  IComment,
  ICourse,
  IDiscount,
  IMenu,
  IPurchase,
  IReply,
  ISession,
  ITicket,
  IUser,
} from "./interfaces";
import { Course } from "@prisma/client";

export type ApiResponse<T = any> = {
  success: boolean;
  message: string;
  data?: T;
  user?: Omit<IUser, "password">;
};

export type PurchaseWithRelations = IPurchase & {
  user: Pick<IUser, "id" | "name" | "email">;
  course: Pick<ICourse, "id" | "name" | "shortName">;
};

export type AuthResponse = ApiResponse<Omit<IUser, "password">>;

export type CourseWithRelations = ICourse & {
  category: Pick<ICategory, "id" | "name">;
  creator: Pick<IUser, "id" | "name">;
  comments: Pick<IComment, "id">[];
  sessions?: ISession[];
  purchases?: PurchaseWithRelations[];
};

export type SessionWithRelations = ISession & {
  course?: Pick<ICourse, "id" | "name">;
};

export type DiscountWithRelations = IDiscount & {
  course: Pick<Course, "id" | "name">;
};

export type MenuWithRelations = IMenu & {
  children: IMenu[];
  parent?: IMenu | null;
};

export type ReplyWithRelations = IReply & {
  user: Pick<IUser, "id" | "name" | "email">;
};

export type TicketWithRelations = ITicket & {
  user: Pick<IUser, "id" | "name" | "email">;
  replies: ReplyWithRelations[];
};

export type UserWithRelations = IUser & {
  enrolledCourses?: ICourse[]; 
  comments?: IComment[];
  purchases?: PurchaseWithRelations[];
};