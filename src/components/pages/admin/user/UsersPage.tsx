"use client";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaBan, FaUserShield } from "react-icons/fa";
import { motion } from "framer-motion";
import ChangeRoleModal from "@/components/modals/user/ChangeRoleModal";
import DeleteModal from "@/components/modals/shared/DeleteModal";
import BanModal from "@/components/modals/shared/BanModal";
import { useUserStore } from "@/store/user.store";
import { toast } from "react-toastify";
import { toastOptions } from "@/helpers/toast";
import { useAuthStore } from "@/store/auth.store";

const UsersPage = () => {
  const { users, fetchUsers, loading, deleteUser, banUser } = useUserStore();
  const { user } = useAuthStore();
  const handleDelete = async (id: string) => {
    const res = await deleteUser(id);
    if (res.success) {
      toast.success("کاربر با موفقیت حذف شد", toastOptions);
    } else if (
      res.message === "only 'amirrajj' can ban users with admin role"
    ) {
      toast.error(
        "تنها amirrajj میتواند کاربران با نقش مدیر را حذف کند",
        toastOptions
      );
    } else {
      toast.error("خطا در حذف کاربر", toastOptions);
    }
  };

  const handleBan = async (id: string) => {
    const res = await banUser(id, user!.id);
    if (res.success) {
      res.message === "User unbanned successfully"
        ? toast.success("کاربر با موفقیت از بن خارج شد", toastOptions)
        : toast.success("کاربر با موفقیت بن شد", toastOptions);
    } else if (
      res.message === "only 'amirrajj' can ban users with admin role"
    ) {
      toast.error(
        "تنها amirrajj میتواند کاربران با نقش مدیر را بن کند",
        toastOptions
      );
    } else {
      toast.error("خطا در بن کاربر", toastOptions);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-0 justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-base-content">
          👥 کاربران
        </h1>
      </div>

      <div className="shadow-lg rounded-xl overflow-x-auto">
        <table className="table bg-base-300 min-w-[800px] w-full text-center">
          <thead className="bg-base-300 text-base-content">
            <tr>
              <th className="p-4 whitespace-nowrap">شناسه</th>
              <th className="p-4 whitespace-nowrap">نام</th>
              <th className="p-4 whitespace-nowrap">نام کاربری</th>
              <th className="p-4 whitespace-nowrap">ایمیل</th>
              <th className="p-4 whitespace-nowrap">نقش</th>
              <th className="p-4 whitespace-nowrap">حذف</th>
              <th className="p-4 whitespace-nowrap">تغییر نقش</th>
              <th className="p-4 whitespace-nowrap">بن</th>
            </tr>
          </thead>

          <tbody>
            {loading
              ? [...Array(3)].map((_, index) => (
                  <tr
                    key={index}
                    className="border-b bg-base-200 animate-pulse"
                  >
                    <td className="p-4">
                      <div className="skeleton h-4 w-10 mx-auto"></div>
                    </td>
                    <td className="p-4">
                      <div className="skeleton h-4 w-20 mx-auto"></div>
                    </td>
                    <td className="p-4">
                      <div className="skeleton h-4 w-24 mx-auto"></div>
                    </td>
                    <td className="p-4">
                      <div className="skeleton h-4 w-32 mx-auto"></div>
                    </td>
                    <td className="p-4">
                      <div className="skeleton h-4 w-16 mx-auto"></div>
                    </td>
                    <td className="p-4">
                      <div className="skeleton h-8 w-10 mx-auto rounded-md"></div>
                    </td>
                    <td className="p-4">
                      <div className="skeleton h-8 w-10 mx-auto rounded-md"></div>
                    </td>
                    <td className="p-4">
                      <div className="skeleton h-8 w-10 mx-auto rounded-md"></div>
                    </td>
                  </tr>
                ))
              : users.map((user, index) => (
                  <tr
                    key={user.id}
                    className={`border-b hover:bg-base-300 transition ${
                      index % 2 === 0 ? "bg-base-200" : "bg-base-100"
                    }`}
                  >
                    <td className="p-4 font-medium text-base-content">
                      {index + 1}
                    </td>
                    <td className="p-4 font-semibold text-base-content">
                      {user.name}
                    </td>
                    <td className="p-4 font-semibold text-base-content">
                      {user.username}
                    </td>
                    <td className="p-4 font-medium text-base-content">
                      {user.email}
                    </td>
                    <td className="p-4 font-medium text-base-content">
                      {user.role}
                    </td>
                    <td className="p-4">
                      <DeleteModal
                        onDelete={handleDelete}
                        deleteId={user.id}
                        title="حذف کاربر 👤"
                        message="آیا از حذف کاربر اطمینان دارید ؟"
                        messageDesc="این اقدام قابل بازگشت نیست !"
                        deleteBtnText="حذف کاربر"
                      />
                    </td>
                    <td className="p-4">
                      <ChangeRoleModal user={user} />
                    </td>
                    <td className="p-4">
                      <BanModal onBan={handleBan} user={user} />
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;
