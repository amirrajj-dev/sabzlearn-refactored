'use client'
import { UseUserPannelStore } from '@/store/userPannelLayout.store'
import { motion } from 'framer-motion'
import UserPannelHeader from './shared/UserPannelHeader'

const MainContentWrapper = ({ children }: { children: React.ReactNode }) => {
  const {isExpanded , isTablet} = UseUserPannelStore()
    return (
    <>
    
    <motion.div 
        className="flex-shrink-0"
        animate={{ width: isExpanded && !isTablet ? 384 : 80 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
    <motion.main
      className="flex-grow p-4 md:p-8 mt-5 md:!pl-36 md:mt-20"
      layout="position"
    >
        <UserPannelHeader/>
      {children}
    </motion.main>
    </>
  )
}

export default MainContentWrapper