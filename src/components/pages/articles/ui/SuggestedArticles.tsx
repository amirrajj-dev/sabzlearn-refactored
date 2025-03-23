"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useArticleStore } from "@/store/article.store";
import { FaCalendar, FaEye } from "react-icons/fa";
import moment from "moment-jalaali";
import Link from "next/link";
import { motion } from "framer-motion";

const SuggestedArticles = ({articleShortName} : {articleShortName : string}) => {
  const { suggestedArticles, loading , getSuggestedArticles } = useArticleStore();
  useEffect(()=>{
    getSuggestedArticles(articleShortName);
  } , [articleShortName])

  return (
    <div className="mt-10 bg-base-300 rounded-md shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">مقالات پیشنهادی</h3>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="skeleton bg-base-200 rounded-md p-4">
              <div className="skeleton bg-base-200 h-40 w-full rounded-md"></div>
              <div className="skeleton bg-base-200 h-6 w-3/4 mt-2 rounded"></div>
              <div className="skeleton bg-base-200 h-4 w-1/2 mt-2 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {suggestedArticles.map((article: any, index: number) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link href={`/articles/${article.shortName}`}>
                <motion.div
                  className="card bg-base-100 shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition"
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                >
                  <Image
                    src={article.cover}
                    alt={article.title}
                    width={300}
                    height={200}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="font-semibold text-base line-clamp-1">
                      {article.title}
                    </h4>
                    <div className="flex items-center text-sm text-gray-500 mt-2 gap-2">
                      <span>
                        {moment(article.createdAt).format("jYYYY/jMM/jDD")}
                      </span>
                      <FaCalendar />
                      <span>{article.views ?? 0}</span>
                      <FaEye />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SuggestedArticles;