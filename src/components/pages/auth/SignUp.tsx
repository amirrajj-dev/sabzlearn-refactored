"use client";
import React, { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";
import SabzText from "@/components/shared/SabzText";
import Link from "next/link";
import { schema, SignupSchemaType } from "@/utils/schemas/signupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/store/auth.store";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { toastOptions } from "@/helpers/toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signup, loading } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<SignupSchemaType>({
    resolver: zodResolver(schema),
    mode: "onBlur"
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", localStorage.theme);
  }, []);

  const router = useRouter();

  const onSubmit = async (data: SignupSchemaType) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const res = await signup(formData);

    if (res.success) {
      toast.success("ثبت نام شما با موفقیت به انجام رسید", toastOptions);
      router.replace("/");
      return;
    }

    if (res.message.toLowerCase() === "user already exists") {
      toast.error("کاربری با این نام کاربری یا ایمیل وجود دارد", toastOptions);
    } else {
      toast.error(res.message || "ثبت نام شما با خطا مواجه شد", toastOptions);
    }
  };

  return (
    <div className="flex flex-col w-full items-center justify-center font-dana-regular">
      <Link href={"/"}>
        <motion.div
          className="flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Image
            src="/logo/logo.webp"
            alt="SabzLearn Logo"
            width={80}
            height={80}
          />
          <SabzText size={"size-30"} />
        </motion.div>
      </Link>
      <motion.div
        className="w-full max-w-sm mx-auto p-6 bg-base-300 backdrop-blur-lg shadow-lg rounded-2xl border border-white/20"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className="text-3xl font-dana-bold text-center text-base-content mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          ثبت نام
        </motion.h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {[
            { name: "name", icon: FaUser, placeholder: "نام و نام خانوادگی" },
            { name: "username", icon: FaUser, placeholder: "نام کاربری" },
            { name: "phone", icon: FaPhone, placeholder: "09xxxxxxxxx" },
            { name: "email", icon: FaEnvelope, placeholder: "ایمیل" },
          ].map(({ name, icon: Icon, placeholder }) => (
            <motion.div
              key={name}
              className="relative"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <Icon className="absolute left-3 top-3 text-base-content opacity-75" />
              <input
                {...register(name as keyof SignupSchemaType)}
                className="w-full input border-none pl-10 bg-white/10 text-base-content placeholder:text-base-content rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                placeholder={placeholder}
              />
              {errors[name as keyof SignupSchemaType] &&
                touchedFields[name as keyof SignupSchemaType] && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors[name as keyof SignupSchemaType]?.message}
                  </p>
                )}
            </motion.div>
          ))}

          <motion.div
            className="relative"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              className="w-full input border-none pl-10 bg-white/10 text-base-content placeholder-base-content rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              placeholder="رمز عبور"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-3 top-3 text-base-content opacity-75"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.password && touchedFields.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            <input
              {...register("confirmPassword")}
              type={showPassword ? "text" : "password"}
              className="w-full input border-none pl-10 bg-white/10 text-base-content placeholder-base-content rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              placeholder="تکرار رمز عبور"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-3 top-3 text-base-content opacity-75"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.confirmPassword && touchedFields.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </motion.div>

          <motion.button
            type="submit"
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 5px rgba(72, 255, 160, 0.8)",
            }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-success w-full mt-5 text-lg shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.4 }}
            disabled={loading || Object.keys(errors).length > 0}
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              "ثبت نام"
            )}
          </motion.button>
        </form>

        <motion.p
          className="text-sm text-center mt-4 text-base-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          حساب کاربری دارید؟{" "}
          <Link
            href="/signin"
            className="text-base-content font-dana-bold hover:underline"
          >
            ورود
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default SignUp;