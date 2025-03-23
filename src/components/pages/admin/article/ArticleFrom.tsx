"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCategoryStore } from "@/store/category.store";
import { useArticleStore } from "@/store/article.store";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useAuthStore } from "@/store/auth.store";

const CKEditor = dynamic(
  () => import("@ckeditor/ckeditor5-react").then((mod) => mod.CKEditor),
  { ssr: false }
);

const ArticleForm = () => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [abstract, setAbstract] = useState("<p>چکیده مقاله</p>");
  const [category, setCategory] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [isDraft, setIsDraft] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { categories, getAllCategories } = useCategoryStore();
  const { createArticle , loading ,  } = useArticleStore();
  const {user , getMe} = useAuthStore()
  useEffect(()=>{
    getMe()
  } , [])
  const validateForm = () => {
    let newErrors: Record<string, string> = {};

    if (!title.trim()) newErrors.title = "عنوان مقاله الزامی است";
    if (!link.trim()) newErrors.link = "لینک مقاله الزامی است";
    if (!description.trim()) newErrors.description = "توضیحات مقاله الزامی است";
    if (!abstract.trim()) newErrors.abstract = "چکیده مقاله الزامی است";
    if (!category) newErrors.category = "لطفا یک دسته بندی انتخاب کنید";
    if (!coverImage) newErrors.coverImage = "لطفا یک تصویر انتخاب کنید";
    else if (coverImage.size > 5 * 1024 * 1024)
      newErrors.coverImage = "حجم فایل نباید بیش از 5 مگابایت باشد";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const articleData = {
      title,
      shortName: link,
      description,
      body: abstract,
      categoryID: category,
      cover: coverImage!,
    };
    const formData = new FormData()
    formData.append('body', articleData.body)
    formData.append('file', articleData.cover)
    formData.append('categoryID', articleData.categoryID)
    formData.append('description', articleData.description)
    formData.append('shortName', articleData.shortName)
    formData.append('title', articleData.title)
    formData.append('publish', isDraft ? '0' : '1')

    const response = await createArticle(user!.id , formData);

    if (response.success) {
      toast.success('مقاله با موفقیت اضافه گردید');
      setTitle("");
      setLink("");
      setDescription("");
      setAbstract("<p>چکیده مقاله</p>");
      setCategory("");
      setCoverImage(null);
      setErrors({});
    } else {
      toast.error("خطا در اضافه کردن مقاله");
    }
  };

  return (
    <div className="bg-base-100 p-6 rounded-xl shadow-lg mb-6">
      <h2 className="text-xl font-bold text-base-content mb-4">
        اضافه کردن مقاله
      </h2>
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <label className="label font-medium">عنوان مقاله</label>
          <input
            type="text"
            placeholder="عنوان مقاله"
            className="input w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="label font-medium">لینک مقاله</label>
          <input
            type="text"
            placeholder="لینک مقاله"
            className="input w-full"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          {errors.link && <p className="text-red-500 text-sm">{errors.link}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="label font-medium">توضیحات مقاله</label>
          <textarea
            className="textarea w-full"
            placeholder="توضیحات مقاله"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="label font-medium">چکیده مقاله</label>
          <CKEditor
            editor={ClassicEditor}
            data={abstract}
            onChange={(event, editor) => setAbstract(editor.getData())}
            config={{ language: "fa" }}
            className="bg-base-300"
            {...({} as any)}
          />
          {errors.abstract && (
            <p className="text-red-500 text-sm">{errors.abstract}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="label font-medium">انتخاب کاور عکس</label>
          <input
            type="file"
            accept="image/png"
            className="file-input file-input-bordered w-full"
            onChange={(e) =>
              setCoverImage(e.target.files ? e.target.files[0] : null)
            }
          />
          {errors.coverImage && (
            <p className="text-red-500 text-sm">{errors.coverImage}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="label font-medium">دسته بندی مقاله</label>
          <select
            className="select w-full"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">انتخاب دسته بندی</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isDraft}
            onChange={(e) => setIsDraft(e.target.checked)}
            className="checkbox checkbox-primary"
          />
          <label className="font-medium">پیش نویس کردن مقاله</label>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          disabled={loading}
          className="btn btn-primary mt-4"
        >
          {loading ? "در حال ارسال..." : "اضافه کردن مقاله"}
        </motion.button>
      </div>
    </div>
  );
};

export default ArticleForm;
