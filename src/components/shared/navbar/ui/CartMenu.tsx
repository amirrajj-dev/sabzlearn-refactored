"use client";

import { FaShoppingCart, FaTrash } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cart.store";

const CartMenu = ({
  cartOpen,
  setCartOpen,
  position,
}: {
  cartOpen: boolean;
  setCartOpen: (value: boolean) => void;
  position: string;
}) => {
  const { cartItems, getCartItems, deleteCart } = useCartStore();
  useEffect(() => {
    getCartItems();
  }, []);

  const totalPrice: number =
    cartItems.length > 0
      ? cartItems.reduce((total, item) => total + (item.discount ? (item.price * (100 - item.discount)) / 100 : item.price), 0)
      : 0;

  return (
    <div className="relative">
      <button
        onClick={() => setCartOpen(!cartOpen)}
        className="relative flex items-center justify-center p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        <FaShoppingCart className="text-xl text-base-content" />
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
            {cartItems.length}
          </span>
        )}
      </button>

      <AnimatePresence>
        {cartOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`absolute ${position}-0 mt-3 w-80 md:w-96 bg-base-100 shadow-xl rounded-xl z-20 border border-gray-700 overflow-hidden`}
          >
            <div className="p-4 border-b border-gray-300 dark:border-gray-700 font-medium text-lg">
              🛍️ سبد خرید شما
            </div>

            {cartItems.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                سبد خرید شما خالی است!
              </div>
            ) : (
              <ul className="max-h-60 overflow-y-auto">
                {cartItems.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center justify-between px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition rounded-lg"
                  >
                    <Link
                      href={`/courses/${item.shortName}`}
                      className="flex items-center gap-3"
                    >
                      {item.cover && (
                        <Image
                          src={item.cover}
                          width={100}
                          height={50}
                          className="rounded-md"
                          alt={item.title}
                        />
                      )}
                      <div className="flex flex-col gap-1">
                        <span className="max-w-40 max-h-10 line-clamp-2 text-sm font-dana-medium">
                          {item.title}
                        </span>
                        {item?.discount && item.discount > 0 ? (
                          <span className="text-sm text-emerald-500 font-dana-extra-light">
                          {(item.price * (100 - item.discount) / 100).toLocaleString()} تومان
                        </span>
                        ) : (
                        <span className="text-sm font-dana-extra-light">
                          {item.price > 0  ? item.price.toLocaleString() + " تومان" : 'رایگان!'} 
                        </span>
                        )}
                      </div>
                    </Link>
                    <button
                      className="btn btn-soft btn-circle hover:btn-error"
                      onClick={() => deleteCart(item.title)}
                    >
                      <FaTrash />
                    </button>
                  </motion.li>
                ))}
              </ul>
            )}

            {cartItems.length > 0 && (
              <div className="p-4 border-t border-gray-300 dark:border-gray-700">
                <div className="flex items-center my-4 justify-between">
                  <span className="font-dana-demi">مبلغ قابل پرداخت : </span>
                  <span className="font-dana-extra-bold">
                    {totalPrice.toLocaleString()} تومان
                  </span>
                </div>
                <Link
                  href="/cart"
                  className="block text-center bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition"
                >
                  تسویه حساب
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CartMenu;
