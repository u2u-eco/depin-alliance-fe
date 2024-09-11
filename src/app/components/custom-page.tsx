import { AnimatePresence, motion } from 'framer-motion'
import React, { ReactNode, useEffect } from 'react'
import Info from './ui/info'
import CustomNavbar from './ui/custom-navbar'
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
  const isShowInfo =
    pathName !== '/avatar' &&
    pathName !== '/profile' &&
    pathName !== '/level' &&
    pathName !== '/mission/partners' &&
    pathName !== '/workspace'
  const isShowSidebar =
    pathName !== '/inventory' &&
    pathName !== '/ranking' &&
    pathName !== '/setting' &&
    pathName !== '/workspace' &&
    pathName !== '/avatar' &&
    pathName !== '/profile' &&
    pathName !== '/level'
  return (
    <AnimatePresence mode="wait">
      {/* <div className={cn(classNames?.wrapper)}> */}
      <div
        className={`${isShowSidebar ? 'h-[calc(100vh-75px)]' : 'h-[100vh]'}  bg-gray-850  overflow-y-auto flex flex-col hide-scrollbar`}
      >
        <div className={isShowSidebar ? '' : 'hidden'}>
          <CustomNavbar />
        </div>
        <div className="container-custom">
          <motion.div
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -25, opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {isShowInfo && <Info />}
            <div
              className={`${isShowInfo ? 'my-8 xs:my-10' : 'my-5 xs:my-6 2xs:my-7'} max-w-[480px] mx-auto`}
            >
              {children}
            </div>
          </motion.div>
        </div>
      </div>

      {/* </div> */}
    </AnimatePresence>
  )
}

export default CustomPage
