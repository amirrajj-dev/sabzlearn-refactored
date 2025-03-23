'use client'
import React, { useEffect } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import AddCategoryModal from "@/components/modals/category/AddCategoryModal";
import EditCategoryModal from "@/components/modals/category/EditCategoryModal";
import DeleteModal from "@/components/modals/shared/DeleteModal";
import { useCategoryStore } from "@/store/category.store";
import { toastOptions } from "@/helpers/toast";
import { toast } from "react-toastify";

const CategoriesPage = () => {
  const { loading, getAllCategories, categories , deleteCategory } = useCategoryStore();
  const handleDeleteCategory = async (categoryId : string)=>{
    if (!categoryId) return
    const res  = await deleteCategory(categoryId)
    if (res.success) {
      toast.success("دسته‌بندی با موفقیت حذف شد", toastOptions);
    }else{
      toast.error("خطا در حذف دسته بندی", toastOptions);
    }
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-0 justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-base-content">📂 دسته‌بندی‌ها</h1>
        <AddCategoryModal />
      </div>

      <div className="shadow-lg rounded-xl overflow-x-auto">
        <table className="table bg-base-300 min-w-[600px] w-full text-center">
          <thead className="bg-base-300 text-base-content">
            <tr>
              <th className="p-4 whitespace-nowrap">شناسه</th>
              <th className="p-4 whitespace-nowrap">عنوان</th>
              <th className="p-4 whitespace-nowrap">لینک</th>
              <th className="p-4 whitespace-nowrap">ویرایش</th>
              <th className="p-4 whitespace-nowrap">حذف</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              [...Array(4)].map((_, index) => (
                <tr key={index} className="border-b bg-base-200">
                  <td className="p-4">
                    <div className="skeleton h-5 w-16"></div>
                  </td>
                  <td className="p-4">
                    <div className="skeleton h-5 w-32"></div>
                  </td>
                  <td className="p-4">
                    <div className="skeleton h-5 w-40"></div>
                  </td>
                  <td className="p-4">
                    <div className="skeleton btn rounded-full"></div>
                  </td>
                  <td className="p-4">
                    <div className="skeleton btn rounded-full"></div>
                  </td>
                </tr>
              ))
            ) : categories?.length > 0 ? (
              categories.map((category, index) => (
                <tr
                  key={category.id}
                  className={`border-b hover:bg-base-300 transition ${
                    index % 2 === 0 ? "bg-base-200" : "bg-base-100"
                  }`}
                >
                  <td className="p-4 font-medium text-base-content">{index + 1}</td>
                  <td className="p-4 font-semibold text-base-content">{category.name}</td>
                  <td className="p-4">
                    <span className="text-primary hover:underline">{category.title}</span>
                  </td>
                  <td className="p-4">
                    <EditCategoryModal category={category} />
                  </td>
                  <td className="p-4">
                    <DeleteModal
                      title="حذف دسته بندی 📂"
                      message="آیا از حذف این دسته بندی اطمینان دارید ؟"
                      deleteBtnText="حذف دسته بندی"
                      messageDesc="این اقدام قابل بازگشت نیست !"
                      deleteId={category.id}
                      onDelete={handleDeleteCategory}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-6 text-lg text-base-content">
                  هیچ دسته‌بندی‌ای وجود ندارد 😔
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoriesPage;