"use client";
import React, { useEffect } from "react";
import SectionHeader from "../shared/SectionHeader";
import ArticleCard from "../shared/ArticleCard";
import { useArticleStore } from "@/store/article.store";
import ArticleCardSkeleton from "../skeletons/ArticleCardSkeleton";
const LastArticles = () => {
  const { articles, loading, getAllArticles } = useArticleStore();
  useEffect(() => {
    getAllArticles();
  }, []);
  return (
    <div className="mt-20">
      <SectionHeader
        title="آخـــرین مقالات ما"
        desc="مقاله های بروز برنامه نویسی و تکنولوژی"
        haveLink={true}
        linkText="همه مقالات"
        linkUrl="/articles"
        squareColor="bg-orange-500"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 mt-8">
        {loading ? (
          Array(4)
            .fill(1)
            .map((_, index) => <ArticleCardSkeleton key={index + 1} />)
        ) : articles.length > 0 ? (
          articles.filter(article=>article.publish === 1).slice(0,4).map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            مقاله‌ای یافت نشد!
          </p>
        )}
      </div>
    </div>
  );
};

export default LastArticles;
