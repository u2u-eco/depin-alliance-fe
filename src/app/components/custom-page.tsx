import { AnimatePresence, motion } from 'framer-motion'
import React, { ReactNode, useEffect } from 'react'
import Info from './info'
import CustomNavbar from './custom-navbar'

interface Pageprops {
  children: ReactNode
}

const CustomPage = ({ children }: Pageprops) => {
  return (
    <AnimatePresence mode="wait">
      <div className="section">
        <div className="h-full overflow-y-auto flex flex-col hide-scrollbar ">
          <div className="container-custom">
            <motion.div
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -25, opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <Info />
              <div className="my-10 max-w-[480px] mx-auto">{children}</div>
            </motion.div>
          </div>
          <CustomNavbar />
        </div>
      </div>
    </AnimatePresence>
  )
}

export default CustomPage
