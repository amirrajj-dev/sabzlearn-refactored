import React from "react";
import { motion } from "framer-motion";

interface SortOption {
  label: string;
  key: string;
  icon: React.ReactNode;
}

interface SortOptionsProps {
  sortingOptions: SortOption[];
  selectedSort: string;
  setSelectedSort: React.Dispatch<React.SetStateAction<string>>;
}

const SortOptions: React.FC<SortOptionsProps> = ({ sortingOptions, selectedSort, setSelectedSort }) => {
  return (
    <motion.div
      className="flex flex-wrap items-center justify-between bg-base-300 p-4 rounded-xl shadow-md w-full"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <span className="text-base-content">مرتب سازی بر اساس:</span>

      <div className="flex flex-wrap justify-center gap-3 mt-4 sm:mt-0 w-full md:w-auto">
        {sortingOptions.map(({ label, key, icon }) => (
          <button
            key={key}
            className={`btn ${
              selectedSort === key ? "bg-primary text-primary-content scale-105" : "bg-base-100 hover:bg-primary/20"
            }`}
            onClick={() => setSelectedSort(key)}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default React.memo(SortOptions);