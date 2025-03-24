"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { useCourseStore } from "@/store/course.store";
import { ICourse } from "@/interfaces/interfaces";
import { toast } from "react-toastify";
import { useCartStore } from "@/store/cart.store";
import { useAuthStore } from "@/store/auth.store";
import Link from "next/link";

const CourseHeader = ({ singleCourse }: { singleCourse: ICourse }) => {
  const { addToCart, cartItems } = useCartStore();
  const { user, getMe } = useAuthStore();

  useEffect(() => {
    getMe();
  }, []);

  const isEnrolled = user?.enrolledCourses?.some(
    (course) => course.id === singleCourse.id
  );

  const handleAddToCart = (
    course: Pick<
      ICourse,
      "name" | "price" | "cover" | "shortName" | "discount"
    > & { category: string }
  ) => {
    if (!course.cover) return toast.error("تصویری برای این دوره موجود نیست");
    addToCart({
      id: cartItems.length + 1,
      category: course.category,
      title: course.name,
      price: course.price,
      cover: course.cover,
      shortName: course.shortName,
      discount: course.discount,
    });
  };

  const calculateDiscountedPrice = (price: number, discount: number) => {
    return (price * (100 - discount)) / 100;
  };
  
  const handleGoToTheSessions = () => {
    const sessionsSec = document.querySelector('#sessions') as HTMLDivElement;
    sessionsSec.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="mt-10 flex justify-center ">
      <motion.div
        className="flex flex-col-reverse bg-base-300 w-full max-w-6xl p-6 rounded-xl lg:rounded-none lg:p-0 lg:bg-transparent lg:flex-row items-center lg:items-start justify-between gap-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.div
          className="flex flex-col items-start sm:items-center lg:items-stretch justify-between w-full lg:w-1/2 text-center lg:text-right"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        >
          <h2 className="font-dana-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight">
            {!singleCourse.name ? (
              <span className="skeleton w-40 sm:w-56 md:w-72 h-8 block"></span>
            ) : (
              `${singleCourse?.name} 🚀`
            )}
          </h2>

          <p className="mt-4 text-sm w-full sm:text-base md:text-lg line-clamp-3 font-dana-light text-base-content leading-7 sm:leading-8 max-w-2xl text-justify lg:text-right lg:w-full">
            {!singleCourse.description ? (
              <span className="skeleton w-full h-24 sm:h-32 md:h-40 block"></span>
            ) : (
              singleCourse?.description
            )}
          </p>

          <div className="flex flex-col w-full sm:w-auto sm:flex-row items-center justify-center lg:justify-between mt-6 sm:mt-8 gap-4 sm:gap-6">
            {!singleCourse ? (
              <span className="skeleton w-36 sm:w-44 md:w-52 h-10 sm:h-12 block"></span>
            ) : isEnrolled ? (
              <>
                <div className="text-xl">شما دانشجوی دوره هستید !</div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary btn-lg rounded-xl"onClick={handleGoToTheSessions}
                >
                  مشاهده دوره
                </motion.button>
              </>
            ) : (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-success btn-lg w-full sm:w-auto px-6 py-3 rounded-full shadow-md transition-all"
                  onClick={() =>
                    handleAddToCart({
                      name: singleCourse?.name as string,
                      category: singleCourse.category?.name as string,
                      price: singleCourse?.price as number,
                      cover: singleCourse?.cover as string,
                      shortName: singleCourse?.shortName as string,
                      discount: singleCourse?.discount as number,
                    })
                  }
                >
                  🎯 افزودن به سبد خرید
                </motion.button>
                <div className="flex flex-col items-end gap-1">
                  {singleCourse && singleCourse.discount > 0 ? (
                    <>
                      <span className="text-sm line-through text-base-content/60">
                        {(
                          Math.ceil((singleCourse?.price as number) / 1000) *
                          1000
                        ).toLocaleString("fa-IR")}{" "}
                        تومان
                      </span>
                      <span className="font-semibold text-lg sm:text-2xl text-emerald-500">
                        {calculateDiscountedPrice(
                          singleCourse?.price as number,
                          singleCourse?.discount as number
                        ).toLocaleString("fa-IR")}{" "}
                        تومان
                      </span>
                    </>
                  ) : (
                    <span className="font-semibold text-lg sm:text-2xl text-base-content">
                      {singleCourse && singleCourse?.price > 0 ? (
                        (
                          Math.ceil((singleCourse?.price as number) / 1000) *
                          1000
                        ).toLocaleString("fa-IR") +
                        " " +
                        "تومان"
                      ) : (
                        <span className="text-emerald-500">رایگان!</span>
                      )}
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
        </motion.div>

        <motion.div
          className="w-full lg:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
        >
          {!singleCourse?.cover ? (
            <div className="skeleton w-full sm:w-full md:w-3/4 lg:w-[500px] xl:w-[700px] h-[250px] sm:h-[300px] md:h-[400px] lg:h-[300px] rounded-2xl"></div>
          ) : (
            <Image
              src={singleCourse?.cover as string}
              className="rounded-2xl shadow-lg max-w-full h-auto"
              width={700}
              height={700}
              alt="main course cover"
            />
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default React.memo(CourseHeader);
