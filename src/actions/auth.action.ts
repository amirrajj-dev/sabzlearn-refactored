'use server';

import prisma from '@/utils/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { cookies } from 'next/headers';
import { revalidatePath, revalidateTag } from 'next/cache';
import { IUser } from '@/interfaces/interfaces';
import { unstable_cache } from 'next/cache';

const emailReg = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

type ApiResponse<T = any> = {
  message: string;
  success: boolean;
  user?: T;
};

type AuthResponse = ApiResponse<Omit<IUser, 'password'>>;

export const signup = async (formData: FormData): Promise<AuthResponse> => {
  try {
    const { username, email, password, name, phone } = Object.fromEntries(formData) as {
      username: string;
      email: string;
      password: string;
      name: string;
      phone: string;
    };

    if (!username.trim() || !email.trim() || !password.trim() || !name.trim() || !phone.trim()) {
      return { message: 'Please fill all fields', success: false };
    }
    if (!emailReg.test(email)) {
      return { message: 'Invalid email', success: false };
    }
    if (password.length < 6) {
      return { message: 'Password must be at least 6 characters long', success: false };
    }

    const isUserExist = await prisma.user.findFirst({
      where: {
        OR: [{ username: username.trim() }, { email: email.trim() }],
      },
    });
    if (isUserExist) {
      return { message: 'User already exists', success: false };
    }

    const users = await prisma.user.findMany();
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username: username.trim(),
        email: email.trim(),
        password: hashedPassword,
        name: name.trim(),
        phone: phone.trim(),
        role: users.length > 0 ? 'USER' : 'ADMIN',
      },
    });

    if (!user) {
      return { message: 'Something went wrong creating the user', success: false };
    }

    if (typeof process.env.JWT_SECRET !== 'string') {
      throw new Error('JWT_SECRET is not defined');
    }
    const token = jwt.sign({ userId: user.id , role : user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

    const cookiesStore = await cookies();
    cookiesStore.set('sabz-token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      path: '/',
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
    });

    revalidatePath('/');
    revalidateTag('current-user');
    revalidateTag('all-users');

    const newUser: Omit<IUser, 'password'> = {
      ...user,
      courses: [],
      comments: [],
      articles: [],
      tickets: [],
      replies: [],
    };
    return { message: 'User created successfully', success: true, user: newUser };
  } catch (error: any) {
    return { message: error.message, success: false };
  }
};

export const signin = async (formData: FormData): Promise<AuthResponse> => {
  try {
    const { email, password } = Object.fromEntries(formData) as { email: string; password: string };

    if (!email.trim() || !password.trim()) {
      return { message: 'Please fill all fields', success: false };
    }
    if (!emailReg.test(email)) {
      return { message: 'Invalid email', success: false };
    }

    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
      return { message: 'User not found', success: false };
    }
    if (user.isBanned) {
      return { message: 'User is banned', success: false };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { message: 'Invalid password', success: false };
    }

    if (typeof process.env.JWT_SECRET !== 'string') {
      throw new Error('JWT_SECRET is not defined');
    }
    const token = jwt.sign({ userId: user.id , role : user.role }, process.env.JWT_SECRET, { expiresIn: '30d' });

    const cookiesStore = await cookies();
    cookiesStore.set('sabz-token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
      path: '/',
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
    });

    revalidatePath('/');
    revalidateTag('current-user'); 

    const newUser: Omit<IUser, 'password'> = {
      ...user,
      courses: [],
      comments: [],
      articles: [],
      tickets: [],
      replies: [],
    };
    return { message: 'User logged in successfully', success: true, user: newUser };
  } catch (error: any) {
    return { message: error.message, success: false };
  }
};

export const signout = async (): Promise<ApiResponse> => {
  try {
    const cookiesStore = await cookies();
    cookiesStore.delete('sabz-token');

    revalidatePath('/');
    revalidateTag('current-user');

    return { message: 'User logged out successfully', success: true };
  } catch (error: any) {
    return { message: error.message, success: false };
  }
};

export const getMe = unstable_cache(
  async (token: string): Promise<AuthResponse> => {
    try {
      if (!token) {
        return { message: 'User not authenticated', success: false };
      }

      if (typeof process.env.JWT_SECRET !== 'string') {
        throw new Error('JWT_SECRET is not defined');
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: string };

      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        include: {
          comments: true,
          courses: {
            include : {
              creator : {select : {name : true , }}
            }
          },
          articles: true,
          tickets: {
            include : {
              user : {select : {username : true}}
            }
          },
          replies: true,
        },
      });

      if (!user) {
        return { message: 'User not found', success: false };
      }

      const { password: _, ...newUser } = user;
      return { message: 'User fetched successfully', success: true, user: newUser as unknown as IUser };
    } catch (error: any) {
      return { message: error.message, success: false };
    }
  },
  ['current-user'],
  { revalidate: 3600, tags: ['current-user'] }
);

export const forgotPassword = unstable_cache(
  async (formData: FormData): Promise<ApiResponse> => {
    try {
      const { email } = Object.fromEntries(formData) as { email: string };

      if (!email.trim()) {
        return { message: 'Email is required', success: false };
      }
      if (!emailReg.test(email)) {
        return { message: 'Invalid email', success: false };
      }

      const user = await prisma.user.findUnique({ where: { email: email.trim() } });
      if (!user) {
        return { message: 'User not found', success: false };
      }

      if (typeof process.env.JWT_SECRET !== 'string') {
        throw new Error('JWT_SECRET is not defined');
      }
      const resetToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

      await prisma.user.update({
        where: { id: user.id },
        data: {
          resetToken,
          resetTokenExpiry: new Date(Date.now() + 3600000), 
        },
      });

      const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Password Reset Request',
        html: `
          <p>You requested a password reset. Please click the link below to reset your password:</p>
          <a href="${resetUrl}">${resetUrl}</a>
          <p>This link will expire in 1 hour.</p>
        `,
      };

      await transporter.sendMail(mailOptions);

      return { message: 'Password reset email sent successfully', success: true };
    } catch (error: any) {
      return { message: error.message, success: false };
    }
  },
  ['forgotPassword'], 
  { revalidate: 3600 }
);

export const resetPassword = async (token: string, formData: FormData): Promise<ApiResponse> => {
  try {
    const { password } = Object.fromEntries(formData) as { password: string };

    if (!password.trim()) {
      return { message: 'Password is required', success: false };
    }
    if (password.length < 6) {
      return { message: 'Password must be at least 6 characters', success: false };
    }

    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: { gt: new Date() },
      },
    });
    if (!user) {
      return { message: 'Invalid or expired token', success: false };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });


    revalidatePath('/login');
    revalidateTag('current-user');
    revalidateTag(`user-${user.id}`);

    return { message: 'Password reset successfully', success: true };
  } catch (error: any) {
    return { message: error.message, success: false };
  }
};

export const changePassword = async (formData: FormData): Promise<ApiResponse> => {
  try {
    const { oldPassword, newPassword } = Object.fromEntries(formData) as {
      oldPassword: string;
      newPassword: string;
    };

    const cookiesStore = await cookies();
    const token = cookiesStore.get('sabz-token')?.value;
    if (!token) {
      return { message: 'Unauthorized', success: false };
    }

    if (typeof process.env.JWT_SECRET !== 'string') {
      throw new Error('JWT_SECRET is not defined');
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: string };

    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (!user) {
      return { message: 'User not found', success: false };
    }

    const isValid = await bcrypt.compare(oldPassword, user.password);
    if (!isValid) {
      return { message: 'Invalid old password', success: false };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    revalidatePath('/profile');
    revalidateTag('current-user');
    revalidateTag(`user-${user.id}`);

    return { message: 'Password changed successfully', success: true };
  } catch (error: any) {
    return { message: error.message, success: false };
  }
};