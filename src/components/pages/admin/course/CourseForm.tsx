"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCategoryStore } from "@/store/category.store";
import { useCourseStore } from "@/store/course.store";
import { toast } from "react-toastify";
import { toastOptions } from "@/helpers/toast";
import InputField from "./ui/InputField";
import TextAreaField from "./ui/TextAreaField";
import FileInput from "./ui/FileInput";
import SelectInput from "./ui/SelectInput";
import EditorInput from "./ui/EditorInput";
import { useAuthStore } from "@/store/auth.store";

const CourseForm = () => {
  const { categories, getAllCategories } = useCategoryStore();
  const { createCourse, loading, getAllCourses } = useCourseStore();
  const { user } = useAuthStore();
  const [formState, setFormState] = useState({
    title: "",
    link: "",
    description: "",
    abstract: "<p>چکیده دوره</p>",
    category: "",
    price: "",
    supportType: "",
    coverImage: null as File | null,
    isDraft: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    getAllCategories();
  }, []);

  const validateForm = () => {
    let newErrors: Record<string, string> = {};

    if (!formState.title.trim()) newErrors.title = "عنوان دوره الزامی است";
    if (!formState.link.trim()) newErrors.link = "لینک دوره الزامی است";
    if (!formState.description.trim())
      newErrors.description = "توضیحات دوره الزامی است";
    if (!formState.abstract.trim())
      newErrors.abstract = "چکیده دوره الزامی است";
    if (!formState.category)
      newErrors.category = "لطفا یک دسته بندی انتخاب کنید";
    if (
      !formState.price.trim() ||
      isNaN(Number(formState.price)) ||
      Number(formState.price) < 0
    )
      newErrors.price = "قیمت معتبر نیست";
    if (!formState.coverImage)
      newErrors.coverImage = "لطفا یک تصویر انتخاب کنید";
    else if (formState.coverImage.size > 5 * 1024 * 1024)
      newErrors.coverImage = "حجم فایل نباید بیش از 5 مگابایت باشد";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (event: any, editor: any) => {
    const data = editor.getData();
    setFormState((prev) => ({ ...prev, abstract: data }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({
      ...prev,
      coverImage: e.target.files ? e.target.files[0] : null,
    }));
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    const formData = new FormData();
    formData.append("name", formState.title);
    formData.append("description", formState.description);
    formData.append("body", formState.abstract);
    formData.append("price", formState.price);
    formData.append("isComplete", "0");
    formData.append("status", "active");
    formData.append("discount", "0");
    formData.append("categoryID", formState.category);
    formData.append("shortName", formState.link);
    formData.append("file", formState.coverImage as File);
    formData.append("supportType", formState.supportType);
    formData.append(
      "user",
      JSON.stringify({
        id: user!.id,
        name: user!.name,
      }) as string
    );

    try {
      const res = await createCourse(formData);

      if (res.success) {
        toast.success("دوره با موفقیت افزوده شد.", toastOptions);
        setFormState({
          title: "",
          link: "",
          description: "",
          abstract: "<p>چکیده دوره</p>",
          category: "",
          supportType: "",
          coverImage: null,
          isDraft: false,
          price: ""
        });
        setErrors({});
      } else {
        toast.error("خطا در افزودن دوره لطفا دوباره تلاش کنید", toastOptions);
      }
    } catch (error: any) {
      toast.error(error.message, toastOptions);
    }
  };

  return (
    <div className="bg-base-100 p-6 rounded-xl shadow-lg mb-6">
      <h2 className="text-xl font-bold text-base-content mb-4">
        اضافه کردن دوره
      </h2>

      <div className="space-y-4">
        <InputField
          label="عنوان"
          name="title"
          placeholder="عنوان دوره"
          value={formState.title}
          onChange={handleChange}
          error={errors.title}
        />
        <InputField
          label="لینک"
          name="link"
          placeholder="لینک دوره"
          value={formState.link}
          onChange={handleChange}
          error={errors.link}
        />
        <InputField
          label="قیمت"
          name="price"
          type="number"
          placeholder="قیمت دوره"
          value={formState.price}
          onChange={handleChange}
          error={errors.price}
        />
        <TextAreaField
          label="توضیحات دوره"
          name="description"
          placeholder="توضیحات دوره"
          value={formState.description}
          onChange={handleChange}
          error={errors.description}
        />
        <EditorInput
          label="چکیده دوره"
          data={formState.abstract}
          onChange={handleEditorChange}
          error={errors.abstract}
        />
        <FileInput
          label="انتخاب کاور عکس"
          onChange={handleFileChange}
          error={errors.coverImage}
        />
        <SelectInput
          label="دسته بندی دوره"
          name="category"
          value={formState.category}
          onChange={handleChange}
          options={categories.map((cat) => ({
            value: cat.id,
            label: cat.name,
          }))}
          error={errors.category}
        />
        <SelectInput
          label="نحوه پشتیبانی دوره"
          name="supportType"
          value={formState.supportType}
          onChange={handleChange}
          options={[
            { value: "آنلاین", label: "آنلاین" },
            { value: "حضوری", label: "حضوری" },
          ]}
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-primary mt-4"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "در حال ارسال..." : "اضافه کردن دوره"}
        </motion.button>
      </div>
    </div>
  );
};

export default CourseForm;
