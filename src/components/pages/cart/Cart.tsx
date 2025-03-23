"use client";
import React, { useEffect, useState } from "react";
import { FaTrash, FaShoppingCart , FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import { toastOptions } from "@/helpers/toast";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cart.store";
import { useCourseStore } from "@/store/course.store";
import { useAuthStore } from "@/store/auth.store";

const CartPage = () => {
  const {
    cartItems,
    totalPrice,
    totalDiscount,
    additionalDiscount,
    discountApplied,
    deleteCart,
    applyDiscount,
    calculateTotals,
    loading,
    resetCartItems
  } = useCartStore();
  const {buyCourse , loading : loadingBuyCourse} = useCourseStore()
  const {user} = useAuthStore()
  const [discountCode, setDiscountCode] = useState("");

  useEffect(() => {
    calculateTotals();
  }, [calculateTotals]);

  const handleApplyDiscount = async () => {
    if (discountCode.trim()){
        applyDiscount(discountCode);
    }
  };

  const handleBuyCourse = async () => {
    if (cartItems.length > 0) {
      const response = await buyCourse(cartItems.map(item=>item.title) , user!.id)
      if (response.success) {
        toast.success(cartItems.length > 1 ? "دوره ها با موفقیت خریداری شدند :)" : "دوره با موفقیت خریداری شد :)", toastOptions);
        resetCartItems();
      }else{
        toast.error("خطا در خریداری دوره", toastOptions);
      }
    }else{
      toast.error("لطفا ابتدا محصول را به سبد خرید اضافه کنید", toastOptions);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4 my-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2 rounded-xl shadow-lg bg-base-200 overflow-hidden"
        >
          <h2 className="text-2xl font-semibold mb-2 bg-primary text-primary-content p-4 rounded-tl-xl rounded-tr-xl">
            سبد خرید شما
          </h2>
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-500">
              <FaShoppingCart className="text-6xl mx-auto mb-4 text-primary" />
              <p className="text-lg">سبد خرید شما خالی است.</p>
            </div>
          ) : (
            <div className="space-y-6 bg-base-200 p-4">
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    className="flex flex-col md:flex-row items-center justify-between border-b pb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-4">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="relative rounded-lg overflow-hidden shadow-md"
                      >
                        <Image
                          src={item.cover}
                          alt={item.title}
                          width={150}
                          height={100}
                        />
                      </motion.div>
                      <div>
                        <h3 className="font-semibold text-lg text-base-content">
                          {item.title}
                        </h3>
                        <p className="text-sm mt-2 text-info">{item.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-4 md:mt-0">
                      <div className="text-right">
                        {item.discount || 0 > 0 && (
                          <p className="text-sm text-success line-through">
                            {item.price.toLocaleString()} تومان
                          </p>
                        )}
                        <p className="font-semibold text-lg">
                          {(
                            item.price -
                            (item.discount ? (item.price * item.discount) / 100 : 0)
                          ).toLocaleString()}{" "}
                          تومان
                        </p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          deleteCart(item.title);
                          toast.success(
                            "محصول از سبد خرید حذف شد.",
                            toastOptions
                          );
                        }}
                        className="text-red-500 hover:text-red-700 cursor-pointer transition-colors duration-200"
                      >
                        <FaTrash className="text-sm" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-base-200 h-fit rounded-xl shadow-lg pb-2"
        >
          <h2 className="text-2xl font-semibold bg-primary rounded-tl-xl rounded-tr-xl mb-6 text-primary-content p-4">
            اطلاعات پرداخت
          </h2>
          <div className="space-y-4 p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col gap-2"
            >
              <label className="text-base-content/80">کد تخفیف دارید؟</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="کد تخفیف را وارد کنید"
                  className="input input-bordered border-none w-full"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleApplyDiscount}
                  className="btn btn-primary"
                  disabled={discountApplied}
                >
                  {loading ? <FaSpinner className="animate-spin transition-all duration-200" /> : 'اعمال'}
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex justify-between"
            >
              <p className="text-base-content/80">جمع کل:</p>
              <p className="font-semibold">
                {totalPrice.toLocaleString()} تومان
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="flex justify-between"
            >
              <p className="text-base-content/80">تخفیف:</p>
              <p className="font-semibold text-green-500">
                {(totalDiscount + additionalDiscount).toLocaleString()} تومان
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="flex justify-between border-t pt-4"
            >
              <p className="text-base-content/80">مبلغ قابل پرداخت:</p>
              <p className="font-semibold text-primary text-xl">
                {(
                  totalPrice -
                  (totalDiscount + additionalDiscount)
                ).toLocaleString()}{" "}
                تومان
              </p>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full btn btn-lg btn-primary"
              disabled={cartItems.length === 0}
              onClick={handleBuyCourse}
            >
              {loadingBuyCourse ? <FaSpinner className="animate-spin transition-all duration-200" /> : "پرداخت"}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CartPage;