'use client';
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDiscountStore } from "@/store/discount.store";
import { toast } from "react-toastify";
import { useCourseStore } from "@/store/course.store";
import { useAuthStore } from "@/store/auth.store";

interface Category {
  id: number;
  name: string;
};

const DiscountFrom = () => {
  const [code, setCode] = useState<string>("");
  const [discount, setDiscount] = useState<string>("");
  const [maxUse, setMaxUse] = useState<string>("");
  const [courseId, setCourseId] = useState<string>("");
  const {courses} = useCourseStore()
  const { createDiscount, loading , getAllDiscounts } = useDiscountStore();
  const {user} = useAuthStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || !discount || !maxUse || !courseId) {
      toast.error("لطفا تمام فیلدها را پر کنید");
      return;
    }
    const discountValue = parseFloat(discount);
    const maxUseValue = parseInt(maxUse);

    if (isNaN(discountValue)) {
      toast.error("درصد تخفیف باید یک عدد باشد");
      return;
    }

    if (isNaN(maxUseValue)) {
      toast.error("حداکثر استفاده باید یک عدد باشد");
      return;
    }
    const formData = new FormData()
    formData.append('userID' , user!.id)
    formData.append('discount' , String(discountValue))
    formData.append('code' , code)
    formData.append('courseID' , courseId)
    formData.append('maxUse' , String(maxUseValue))

    const response = await createDiscount(formData);

    if (response.success) {
      toast.success("تخفیف با موفقیت اضافه شد");
      setCode("");
      setDiscount("");
      setMaxUse("");
      setCourseId("");
    } else {
      toast.error("خطا در اضافه کردن تخفیف");
    }
  };

  return (
    <div className="bg-base-100 p-6 rounded-xl shadow-lg mb-6">
      <h2 className="text-xl font-bold text-base-content mb-4">
        اضافه کردن تخفیف
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-2">
          <label className="label">
            <span className="font-medium">کد تخفیف</span>
          </label>
          <input
            type="text"
            placeholder="کد تخفیف"
            className="input w-full"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="label">
            <span className="font-medium">درصد تخفیف</span>
          </label>
          <input
            type="text"
            placeholder="لطفا درصد تخفیف را وارد نمایید"
            className="input w-full"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="label">
            <span className="font-medium">حداکثر استفاده</span>
          </label>
          <input
            type="text"
            placeholder="لطفا حداکثر استفاده از کد تخفیف را وارد نمایید"
            className="input w-full"
            value={maxUse}
            onChange={(e) => setMaxUse(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="label">
            <span className="font-medium">این تخفیف برای کدام دوره است ؟</span>
          </label>
          <select
            className="select w-full"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
          >
            <option value="">انتخاب دوره</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id.toString()}>
                {course.name}
              </option>
            ))}
          </select>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-primary mt-4 w-full"
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "اضافه کردن تخفیف"
          )}
        </motion.button>
      </form>
    </div>
  );
};

export default DiscountFrom;