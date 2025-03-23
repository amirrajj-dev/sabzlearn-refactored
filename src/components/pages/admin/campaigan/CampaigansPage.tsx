'use client';
import React from "react";
import CampaigansForm from "./CampaiganForm";
import { useCourseStore } from "@/store/course.store";
import { motion } from "framer-motion";
import { useDiscountStore } from "@/store/discount.store";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import { toastOptions } from "@/helpers/toast";

const CampaigansPage = () => {

  const {discounts , cancelCampaign , getAllDiscounts , loading} = useDiscountStore()
  const discount = discounts.find(discount=>discount.code === 'campaign')
   const handleCancelCampaigan = async ()=>{
      const response = await cancelCampaign()
      if (response.success){
        await getAllDiscounts()
        toast.success("کمپین با موفقیت برداشته شد" , toastOptions)
      }else{
        toast.error("خطایی رخ داد" , toastOptions)
      }
    }
  return (
    <div className="p-6 max-w-5xl mx-auto bg-base-200 rounded-lg shadow-md">
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-0 justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-base-content">
          🎈 برگزاری کمپین جدید
        </h1>
      </div>

      {discount ? (
        <div className="bg-base-100 p-6 rounded-xl shadow-lg mb-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-base-content">
              کمپین فعال
            </h2>
            <p className="text-base-content/80">
              یک کمپین با تخفیف <span className="font-bold">{discount?.discount}%</span> در حال اجرا است.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-error mt-4"
              onClick={handleCancelCampaigan}
            >
             {loading ? <FaSpinner className="animate-spin transition-all duration-200" /> :  " لغو کمپین"}
            </motion.button>
          </div>
        </div>
      ) : (
        <CampaigansForm />
      )}
    </div>
  );
};

export default CampaigansPage;