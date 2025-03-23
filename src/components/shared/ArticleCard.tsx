"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaBookReader } from "react-icons/fa";
import { IArticle } from "@/interfaces/interfaces";
import moment from 'moment-jalaali'

const ArticleCard = ({ article } : {article : IArticle}) => {
  const formatedDate = moment(article?.createdAt as Date).format("jYYYY/jMM/jDD");
  return (
    <motion.div
      className="relative w-full bg-base-200 border border-base-300 shadow-xl rounded-3xl p-4 overflow-hidden group transition-all duration-300 hover:scale-[1.05] hover:shadow-2xl"
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
    
      <div className="relative w-full h-44 overflow-hidden rounded-xl">
        <Image
          src={String(article.cover)}
          alt={article.title}
          layout="fill"
          objectFit="cover"
          className="rounded-xl transition-all duration-300 group-hover:brightness-110"
          priority
        />
      </div>

      <div className="p-4">
        <h2 className="text-lg font-extrabold text-base-content truncate">{article.title}</h2>
        <p className="text-base-content text-xs opacity-70 mt-2 line-clamp-2">{article.description}</p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-xs text-base-content opacity-80">{article.creator?.name}</span>
          <span className="text-xs text-base-content opacity-50">{formatedDate}</span>
        </div>

        <div className="mt-6">
          <Link
            href={`/articles/${article.shortName}`}
            className="btn btn-primary w-full transition-all duration-300 font-semibold text-sm"
          >
            مطالعه مقاله
          </Link>
        </div>
      </div>

      <div className="absolute -top-5 -left-5 w-16 h-16 bg-primary blur-[80px] opacity-20"></div>
      <div className="absolute -bottom-5 -right-5 w-20 h-20 bg-secondary blur-[80px] opacity-20"></div>
    </motion.div>
  );
};

export default ArticleCard;