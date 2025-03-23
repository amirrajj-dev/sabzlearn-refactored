"use client";
import SortOptions from "@/components/shared/SortOptions";
import SectionHeader from "@/components/shared/SectionHeader";
import ArticleCardSkeleton from "@/components/skeletons/ArticleCardSkeleton";
import ArticleCard from "@/components/shared/ArticleCard";
import { useArticleStore } from "@/store/article.store";
import React, { useEffect, useState } from "react";
import {
  FaArrowDown,
  FaArrowUp,
  FaSearch,
  FaExclamationTriangle,
} from "react-icons/fa";



const sortingOptions = [
  {
    label: "جدیدترین",
    key: "newest",
    icon: <FaArrowDown className="text-lg" />,
  },
  {
    label: "قدیمی ترین",
    key: "oldest",
    icon: <FaArrowUp className="text-lg" />,
  },
];


const Articles = () => {
    const { articles, getAllArticles, loading } = useArticleStore();
    const [selectedSort, setSelectedSort] = useState("newest");
    const [searchQuery, setSearchQuery] = useState("");
    const [visibleArticles, setVisibleArticles] = useState(3);
  
    useEffect(() => {
      getAllArticles();
    }, []);
  
    const filteredArticles = articles
      .filter((article) =>
        article.publish === 1 &&
        article.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        if (selectedSort === "newest") {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        } else {
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        }
      });
  
      useEffect(() => {
          const handleScroll = () => {
            if (
              window.innerHeight + document.documentElement.scrollTop >=
              document.documentElement.offsetHeight - 550
            ) {
              if (visibleArticles < filteredArticles.length) {
                setVisibleArticles((prev) => prev + 6);
              }
            }
          };
      
          window.addEventListener("scroll", handleScroll);
          return () => window.removeEventListener("scroll", handleScroll);
        }, [visibleArticles, filteredArticles]);
  
    return (
      <div className="max-w-7xl mx-auto my-20 flex flex-col gap-6 px-4">
        <div className="flex flex-col items-start sm:flex-row sm:items-center justify-between">
          <SectionHeader
            title="مقاله ها"
            squareColor="bg-warning"
            desc=""
            haveLink={false}
            linkText=""
            linkUrl=""
          />
          <span className="text-2xl text-base-content text-nowrap">
            {filteredArticles.length} مقاله
          </span>
        </div>
  
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="relative mb-4 flex-1">
            <FaSearch className="absolute left-3 text-lg top-7 text-gray-500" />
            <input
              type="text"
              placeholder="جستجوی بین مقاله ها"
              className="input w-full pl-10 bg-base-300 border-none rounded-lg shadow-md h-19.5 focus:ring-2 focus:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
  
          <div className="lg:w-3/4 w-full">
            <SortOptions
              selectedSort={selectedSort}
              setSelectedSort={setSelectedSort}
              sortingOptions={sortingOptions}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {loading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <ArticleCardSkeleton key={index} />
                ))
              ) : filteredArticles.length > 0 ? (
                filteredArticles.slice(0 , visibleArticles).map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center text-center p-10 bg-base-200 rounded-lg shadow-md">
                  <FaExclamationTriangle className="text-4xl text-warning mb-4" />
                  <p className="text-lg font-semibold text-base-content">
                    متاسفیم! مقاله‌ای یافت نشد.
                  </p>
                  <p className="text-sm text-base-content opacity-70 mt-2">
                    کلمه دیگری را امتحان کنید یا فیلترها را تغییر دهید.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
}

export default Articles