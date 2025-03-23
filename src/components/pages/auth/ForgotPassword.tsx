"use client";

import React, { useEffect } from "react";
import { FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";
import SabzText from "@/components/shared/SabzText";
import Link from "next/link";
import { ForgotPasswordSchemaType, schema } from "@/utils/schemas/forgotPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/store/auth.store";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "react-toastify";
import { toastOptions } from "@/helpers/toast";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(schema),
    mode: "onBlur", 
  });

  const router = useRouter();
  const { loading, forgotPassword } = useAuthStore();

  const onSubmit = async (data: ForgotPasswordSchemaType) => {
    const formData = new FormData();
    formData.append("email", data.email);

    const res = await forgotPassword(formData);

    if (res.success) {
      toast.success("لینک بازیابی پسورد برای شما ارسال شد", toastOptions);
    } else {
      toast.error(res.message || "خطا در ارسال لینک بازیابی", toastOptions);
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", localStorage.theme);
  }, []);

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
          className="text-3xl font-extrabold text-center text-base-content font-dana-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          فراموشی رمز عبور
        </motion.h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <FaEnvelope className="absolute left-3 top-3 text-base-content opacity-75" />
            <input
              type="email"
              {...register("email")}
              className="w-full input border-none pl-10 bg-white/10 text-base-content placeholder-base-content rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              placeholder="ایمیل"
            />
            {errors.email && touchedFields.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
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
            transition={{ delay: 1.1, duration: 0.4 }}
            disabled={loading || Object.keys(errors).length > 0}
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              "فرستادن لینک بازیابی"
            )}
          </motion.button>
        </form>

        <motion.div
          className="text-sm text-center mt-4 text-base-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.5 }}
        >
          <p className="mt-2">
            حساب کاربری ندارید؟{" "}
            <Link
              href="/signup"
              className="text-base-content font-dana-bold hover:underline"
            >
              ثبت نام
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;