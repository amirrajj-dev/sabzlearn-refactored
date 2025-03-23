'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Sidebar from './Sidebar'
import { UseUserPannelStore } from '@/store/userPannelLayout.store'

const SidebarWrapper = () => {
  const {setIsTablet , isExpanded , setIsExpanded , isTablet} = UseUserPannelStore()

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth <= 1200)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <motion.div
      className="fixed top-0 right-0 bottom-0 z-50"
      animate={{ width: isExpanded && !isTablet ? 384 : 80 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onHoverStart={() => !isTablet && setIsExpanded(true)}
      onHoverEnd={() => !isTablet && setIsExpanded(false)}
    >
      <Sidebar setIsTablet={setIsTablet} isExpanded={isExpanded} isTablet={isTablet} />
    </motion.div>
  )
}

export default SidebarWrapper