
import React from "react";
import ArticleFrom from "./ArticleFrom";
import ArticleTable from "./ArticleTable";

export interface Article {
  id: number;
  title: string;
  link: string;
  description: string;
  abstract: string;
  category: string;
  coverImage: File | null;
  isDraft: boolean;
  status: string;
}

const ArticlesPage = () => {

  return (
    <div className="p-6 max-w-5xl mx-auto bg-base-200">
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-0 justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-base-content">📄 مقالات</h1>
      </div>

    <ArticleFrom/>
    <ArticleTable />

     
    </div>
  );
};

export default ArticlesPage;