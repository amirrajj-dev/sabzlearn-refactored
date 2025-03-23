import React from 'react'
import { motion } from 'framer-motion'
const ArticleCardSkeleton = () => {
  return (
    <motion.div
        className="relative w-full bg-base-200 border border-base-300 shadow-xl rounded-3xl p-4 overflow-hidden animate-pulse"
      >
        <div className="skeleton h-44 w-full rounded-xl"></div>
        <div className="p-4 space-y-4">
          <div className="skeleton h-4 w-3/4"></div>
          <div className="skeleton h-3 w-full"></div>
          <div className="skeleton h-3 w-5/6"></div>
          <div className="flex justify-between mt-4">
            <div className="skeleton h-3 w-1/3"></div>
            <div className="skeleton h-3 w-1/4"></div>
          </div>
          <div className="skeleton h-10 w-full mt-4"></div>
        </div>
      </motion.div>
  )
}

export default ArticleCardSkeleton