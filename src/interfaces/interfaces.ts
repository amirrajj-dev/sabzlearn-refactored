
import { Role } from "@prisma/client";
export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  name: string;
  profile?: string | null;
  isBanned: boolean;
  phone: string;
  role: Role;
  courses: ICourse[];
  comments: IComment[];
  articles: IArticle[];
  tickets: ITicket[];
  replies: IReply[];
  resetToken?: string | null;
  resetTokenExpiry?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICourse {
  id: string;
  name: string;
  description: string;
  body: string;
  cover?: string | null;
  support?: string | null;
  shortName: string;
  price: number;
  isComplete: number;
  status: string;
  discount: number;
  categoryID: string;
  creatorID?: string | null;
  category?: ICategory;
  creator?: IUser | null;
  comments: IComment[];
  sessions: ISession[];
  _count? : {
    comments : number
  }
  createdAt: Date;
  updatedAt: Date;
}

export interface ICategory {
  id: string;
  title: string;
  name: string;
  articles: IArticle[];
  courses?: ICourse[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IComment {
  id: string;
  body: string;
  courseID: string;
  creatorID: string;
  answer: number;
  score: number;
  isAnswer: number;
  mainCommentID?: string | null;
  course: ICourse;
  creator: IUser;
  replies: IComment[];
  parentComment?: IComment | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISession {
  id: string;
  title: string;
  time: string;
  video?: string | null;
  free: number;
  course?: ICourse | null;
  courseId?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMenu {
  id: string;
  title: string;
  href: string;
  parentID?: string | null;
  parent?: IMenu | null;
  children: IMenu[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IArticle {
  id: string;
  title: string;
  description: string;
  body: string;
  cover?: string | null;
  shortName: string;
  categoryID: string;
  creatorID?: string | null;
  publish: number;
  category?: ICategory;
  creator?: IUser | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDiscount {
  id: string;
  discount: number;
  code: string;
  maxUse: number;
  courseID: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITicket {
  id: string;
  department: string;
  type: TicketType;
  title: string;
  priority: TicketPriority;
  content: string;
  status: TicketStatus;
  userId: string;
  replies: IReply[];
  user: IUser;
  createdAt: Date;
  updatedAt: Date;
}

export interface IReply {
  id: string;
  content: string;
  userId: string;
  ticketId: string;
  ticket?: ITicket;
  user: IReplyUser;
  createdAt: Date;
  updatedAt: Date;
}

export interface IReplyUser {
  id: string;
  name: string;
  email: string;
  profile?: string | null;
}

export enum TicketStatus {
  OPEN = "open",
  IN_PROGRESS = "in_progress",
  CLOSED = "closed"
}

export enum TicketPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high"
}

export enum TicketType {
  ISSUE = "issue",
  REQUEST = "request",
  SUGGESTION = "suggestion",
  QUESTION = "question"
}