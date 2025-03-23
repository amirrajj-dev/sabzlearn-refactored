'use client'
import BreadCrumb from "@/components/shared/breadCrumb/BreadCrumb";
import moment from "moment-jalaali";
import Image from "next/image";
import React from "react";
import { FaCalendar, FaEye, FaUser } from "react-icons/fa";
import dompurify from "dompurify";
import SuggestedArticles from "@/components/pages/articles/ui/SuggestedArticles";
import { IArticle } from "@/interfaces/interfaces";

const Article = ({article} : {article : IArticle}) => {
    const sanitizeHtml = dompurify.sanitize(article?.body ?? "");
    return (
      <div className="max-w-6xl p-4 mx-auto mt-10">
        <BreadCrumb
        sectionLink="/articles"
          title={article?.title ?? "در حال بارگذاری..."}
          section="مقاله ها"
          categoryLink=""
        />
  
        <div className="mt-10 bg-base-300 rounded-md shadow-md p-6">
          {!article.shortName ? (
            <div className="flex flex-col gap-6">
              <div className="skeleton bg-base-200 h-8 w-3/4 rounded"></div>
              <div className="divider divide-base-content"></div>
  
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-2">
                  <div className="skeleton bg-base-200 w-20 h-4 rounded"></div>
                  <FaUser className="text-neutral-content" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="skeleton bg-base-200 w-16 h-4 rounded"></div>
                  <FaCalendar className="text-neutral-content" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="skeleton bg-base-200 w-10 h-4 rounded"></div>
                  <FaEye className="text-neutral-content" />
                </div>
              </div>
  
              <div className="skeleton bg-base-200 w-full h-64 rounded-md"></div>
  
              <div className="flex flex-col gap-2 mt-6">
                <div className="skeleton w-full h-6 bg-base-200"></div>
                <div className="skeleton w-full h-6 bg-base-200"></div>
                <div className="skeleton w-3/4 h-6 bg-base-200"></div>
                <div className="skeleton w-2/3 h-6 bg-base-200"></div>
                <div className="skeleton w-full h-6 bg-base-200"></div>
                <div className="skeleton w-1/2 h-6 bg-base-200"></div>
              </div>
            </div>
          ) : (
            article && (
              <div className="flex flex-col gap-6">
                <h2 className="text-xl font-bold">{article?.title}</h2>
                <div className="divider divide-base-content"></div>
  
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-2">
                    <span>{article?.creator?.name ?? "نامشخص"}</span>
                    <FaUser />
                  </div>
                  <div className="flex items-center gap-2">
                    <span>
                      {article?.createdAt
                        ? moment(article?.createdAt).format("jYYYY/jMM/jDD")
                        : "تاریخ نامشخص"}
                    </span>
                    <FaCalendar />
                  </div>
                  <div className="flex items-center gap-2">
                    <span>14</span>
                    <FaEye />
                  </div>
                </div>
  
                <Image
                  src={String(article?.cover)}
                  alt={article?.title ?? "تصویر مقاله"}
                  className="rounded-lg w-full object-cover mb-4"
                  width={500}
                  height={400}
                />
                <div
                  className="text-base leading-8 font-dana-extra-light text-base-content 
                [&_:is(h1,h2,h3,h4,h5,h6)]:my-6 [&_:is(h1,h2,h3,h4,h5,h6)]:text-xl [&_:is(h1,h2,h3,h4,h5,h6)]:font-dana-bold [&_:is(li)]:my-[4px] [&_:is(li)]:list-disc"
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtml,
                  }}
                />
              </div>
            )
          )}
        </div>
        {article && article.shortName && <SuggestedArticles articleShortName={article.shortName} />}
      </div>
    );
}

export default Article