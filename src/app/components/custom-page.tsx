import { AnimatePresence, motion } from 'framer-motion'
import React, { ReactNode, useEffect } from 'react'
import Info from './info'
import CustomNavbar from './custom-navbar'
import type { ClassValue } from 'clsx'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

interface Pageprops {
  children: ReactNode
  classNames?: {
    wrapper?: ClassValue
  }
}

const CustomPage = ({ children, classNames }: Pageprops) => {
  const pathName = usePathname()
  const isShowSidebar =
    pathName !== '/inventory' && pathName !== '/ranking' && pathName !== '/setting' && pathName !== '/workspace'
  return (
    <AnimatePresence mode="wait">
      <div className={cn('section', classNames?.wrapper)}>
        <div
          className={`${isShowSidebar ? 'h-[calc(100vh-75px)]' : 'h-full'}  overflow-y-auto flex flex-col hide-scrollbar`}
        >
          <div className="container-custom">
            <motion.div
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -25, opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <Info />
              <div className=" my-8 xs:my-10 max-w-[480px] mx-auto ">{children}</div>
            </motion.div>
          </div>
          {isShowSidebar && <CustomNavbar />}
        </div>
      </div>
    </AnimatePresence>
  )
}

export default CustomPage
