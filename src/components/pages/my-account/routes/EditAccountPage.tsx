'use client'
import { toastOptions } from "@/helpers/toast";
import { useAuthStore } from "@/store/auth.store";
import Image from "next/image";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { FaSpinner } from "react-icons/fa";
import { TbCameraPlus, TbEye, TbEyeOff } from "react-icons/tb";
import { toast } from "react-toastify";
import { TfiBackLeft } from "react-icons/tfi";
import useUserStore from "@/store/user.store";

const emailReg = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

const EditAccountPage = () => {
  const { user, getMe, changePassword, loading } = useAuthStore();
  const {updateUser , loading : loadingUpdateUser} = useUserStore();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState("");

  useEffect(() => {
    getMe();
  }, [getMe]);

  useEffect(() => {
    if (user) {
      setUsername(user.username || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setProfilePreview(user.profile || "");
    }
  }, [user]);

  const handleProfileImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setProfilePreview(URL.createObjectURL(file));
    }
  }, []);

  const resetProfileImage = useCallback(() => {
    setProfileImage(null);
    setProfilePreview(user?.profile || "");
  }, [user?.profile]);


  const handleUpdateUser = useCallback(async () => {
    if (!username && !email && !phone && !profileImage) {
      toast.info("لطفاً حداقل یک فیلد را پر کنید.", toastOptions);
      return;
    }
    if (email && !emailReg.test(email)) {
      toast.info("لطفاً یک ایمیل معتبر وارد کنید.", toastOptions);
      return;
    }

    try {
      const formData = new FormData()
      formData.append('email' , email)
      formData.append('phone' , phone)
      if (profileImage){
        formData.append('file' , profileImage)
      }
      formData.append('username' , username)
      const res = await updateUser(user!.id , formData);
      if (res.success) {
        toast.success("پروفایل با موفقیت به‌روزرسانی شد.", toastOptions);
      } else {
        toast.error(res.message || "خطایی در به‌روزرسانی پروفایل رخ داده است.", toastOptions);
      }
    } catch (error) {
      toast.error("خطایی در به‌روزرسانی پروفایل رخ داده است.", toastOptions);
    }
  }, [email, phone, username, profileImage, updateUser, resetProfileImage]);

  const handleChangePassword = useCallback(async () => {
    if (!oldPassword || !newPassword) {
      toast.info("لطفاً هر دو فیلد را پر کنید.", toastOptions);
      return;
    }

    if (newPassword.length < 8) {
      toast.info("رمز عبور جدید باید حداقل 8 کاراکتر باشد.", toastOptions);
      return;
    }

    try {
      const formData = new FormData()
      formData.append('oldPassword', oldPassword)
      formData.append('newPassword', newPassword)
      const res = await changePassword(formData);
      if (res.success) {
        toast.success("رمز عبور با موفقیت تغییر کرد.", toastOptions);
        setOldPassword("");
        setNewPassword("");
      }
    } catch (error) {
      toast.error("خطایی در تغییر رمز عبور رخ داده است.", toastOptions);
    }
  }, [oldPassword, newPassword, changePassword]);

  const profileImageSrc = useMemo(() => {
    return profilePreview || "https://secure.gravatar.com/avatar/59cdb83049569198d15c47f81f23da74?s=96&d=mm&r=g";
  }, [profilePreview]);


  return (
    <div className="flex flex-col lg:flex-row items-start gap-6 mt-10 p-4">
      {/* User Details Section */}
      <div className="w-full lg:w-3/5 bg-base-300 p-6 rounded-md shadow-md">
        <h2 className="text-xl font-dana-demi mb-4">جزییات حساب کاربری</h2>
        <div className="divider divide-base-100 mb-6" />
        <div className="flex flex-col gap-6">
          <div className="relative w-fit mx-auto">
            <Image
              src={profileImageSrc}
              width={150}
              height={150}
              className="rounded-full"
              alt="user logo"
            />
            <div className="absolute bottom-0 right-0 w-12 h-12 rounded-full">
              <div className="w-full h-full relative">
                <button className="btn btn-primary btn-lg border-4 border-base-300 btn-circle">
                  <TbCameraPlus />
                </button>
                <input
                  type="file"
                  accept="image/*"
                  aria-label="hidden"
                  className="w-full h-full absolute bottom-0 right-0 opacity-0"
                  onChange={handleProfileImageChange}
                />
              </div>
            </div>
            {profileImage && (
              <button
                className="btn btn-error btn-soft btn-dash btn-circle rotate-45 absolute top-0 -left-6"
                onClick={resetProfileImage}
              >
                <TfiBackLeft />
              </button>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">شماره موبایل</label>
              <input
                type="text"
                className="input border-none w-full"
                placeholder="شماره موبایل"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">نام کاربری</label>
              <input
                type="text"
                className="input border-none w-full"
                placeholder="نام کاربری"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-400">ایمیل</label>
              <input
                type="email"
                className="input border-none w-full"
                placeholder="ایمیل"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              className="btn btn-primary w-full mt-4"
              onClick={handleUpdateUser}
              disabled={loading}
            >
              {loadingUpdateUser ? <FaSpinner className="animate-spin" /> : "ثبت اطلاعات"}
            </button>
          </div>
        </div>
      </div>

      {/* Change Password Section */}
      <div className="w-full lg:w-2/5 bg-base-300 p-6 rounded-md shadow-md">
        <h2 className="text-xl font-dana-demi mb-4">تغییر رمز عبور</h2>
        <div className="divider divide-base-100 mb-6" />
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-400">رمز عبور فعلی</label>
            <div className="relative">
              <input
                type={showOldPassword ? "text" : "password"}
                placeholder="رمز فعلی را وارد کنید"
                className="input border-none w-full"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <button
                className="absolute inset-y-0 left-0 flex items-center px-3 text-gray-400 hover:text-primary"
                onClick={() => setShowOldPassword(!showOldPassword)}
              >
                {showOldPassword ? <TbEyeOff /> : <TbEye />}
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-400">رمز عبور جدید</label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="رمز جدید را وارد کنید"
                className="input border-none w-full"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                className="absolute inset-y-0 left-0 flex items-center px-3 text-gray-400 hover:text-primary"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <TbEyeOff /> : <TbEye />}
              </button>
            </div>
          </div>
          <button
            className="btn btn-primary w-full mt-4"
            onClick={handleChangePassword}
            disabled={loading}
          >
            {loading ? <FaSpinner className="animate-spin" /> : "تغییر رمز"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(EditAccountPage);