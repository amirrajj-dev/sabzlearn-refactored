import { getArticle, getSuggestedArticles } from "@/actions/article.action";
import Article from "@/components/pages/article/Article";

import { IArticle } from "@/interfaces/interfaces";
import { Metadata } from "next";
import { redirect } from "next/navigation";
interface MainArticleProps {
  params: Promise<{ articleName: string }>;
}

export const generateMetadata = async ({ params }: { params: Promise<{ articleName: string }> }): Promise<Metadata> => {
  const article: IArticle = await (await getArticle((await params).articleName)).data as IArticle
  if (!article) redirect('/')

  return {
    title: `${article.title} | سبزلرن`,
    description: article.description || "مقاله‌ای جامع و کاربردی در زمینه برنامه‌نویسی و فناوری اطلاعات.",
    keywords: [article.title, article!.category!.name, "برنامه‌نویسی", "توسعه وب", "سبزلرن", "آموزش آنلاین"],
    openGraph: {
      title: `${article.title} | سبزلرن`,
      description: article.description || "مقاله‌ای جامع و کاربردی در زمینه برنامه‌نویسی و فناوری اطلاعات.",
      url: `https://www.sabzlearn.ir/articles/${article.shortName}`,
      siteName: "سبزلرن",
      images: [
        {
          url: article.cover ? `https://www.sabzlearn.ir/images/${article.cover}` : "https://www.sabzlearn.ir/images/default-article-og.jpg",
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      locale: "fa_IR",
      type: "article",
      publishedTime: new Date(article.createdAt).toLocaleDateString(),
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} | سبزلرن`,
      description: article.description || "مقاله‌ای جامع و کاربردی در زمینه برنامه‌نویسی و فناوری اطلاعات.",
      images: [article.cover ? `https://www.sabzlearn.ir/images/${article.cover}` : "https://www.sabzlearn.ir/images/default-article-twitter.jpg"],
    },
  };
};

const Page = async ({ params }: MainArticleProps) => {
  const article: IArticle = (await getArticle((await params).articleName)).data as IArticle
  return (
    <Article article={article} />
  )
};

export default Page;
