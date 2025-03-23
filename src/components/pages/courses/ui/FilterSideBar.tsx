import React, { useState } from "react";
import { FaSearch, FaChevronDown } from "react-icons/fa";
import { motion } from "framer-motion";
import { ICategory } from "@/interfaces/interfaces";

interface FilterSidebarProps {
  categories: ICategory[];
  isFree: boolean;
  setIsFree: React.Dispatch<React.SetStateAction<boolean>>;
  isPreSale: boolean;
  setIsPreSale: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCategories: string[];
  handleCategoryChange: (categoryID: string) => void;
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  searchQuery : string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  isFree,
  setIsFree,
  isPreSale,
  setIsPreSale,
  selectedCategories,
  handleCategoryChange,
  expanded,
  setExpanded,
  searchQuery,
  setSearchQuery
}) => {
  return (
    <motion.div
      className="lg:w-1/4 bg-base-300 p-4 rounded-xl shadow-lg h-fit w-full"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-bold mb-4">فیلترها</h3>

      <div className="relative mb-4">
        <FaSearch className="absolute left-3 top-3 text-gray-500" />
        <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          placeholder="جستجوی بین دوره‌ها"
          className="input w-full pl-10 bg-base-100 border-none rounded-lg shadow-md focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="space-y-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="checkbox checkbox-success"
            checked={isFree}
            onChange={() => setIsFree(!isFree)}
          />
          <span>دوره های رایگان</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="checkbox checkbox-warning"
            checked={isPreSale}
            onChange={() => setIsPreSale(!isPreSale)}
          />
          <span>در حال پیش فروش</span>
        </label>
      </div>

      <div className="mt-6">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center justify-between w-full text-lg font-bold border-b pb-2"
        >
          دسته بندی دوره ها
          <FaChevronDown className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
        </button>

        <motion.div
          className="mt-3 space-y-2 overflow-hidden"
          initial={{ height: 0 }}
          animate={{ height: expanded ? "auto" : 0 }}
          transition={{ duration: 0.3 }}
        >
          {categories.map((category) => (
            <label key={category.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="checkbox checkbox-info"
                checked={selectedCategories.includes(category.id)}
                onChange={() => handleCategoryChange(category.id)}
              />
              <span>{category.name}</span>
            </label>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default React.memo(FilterSidebar);