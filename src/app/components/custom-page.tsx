import { AnimatePresence, motion } from 'framer-motion'
import React, { ReactNode, useEffect } from 'react'
import Info from './info'
import CustomNavbar from './custom-navbar'
import { toast, Toaster } from 'sonner'
import CustomToast from './custom-toast'

interface Pageprops {
  children: ReactNode
}

const CustomPage = ({children}: Pageprops) => {
  useEffect(() => {
    toast.success(<CustomToast type="success" content="Mission is completed"/>)
    toast.error(<CustomToast type="error" content="Mission is not completed"/>)
  }, [])

  return (
    <AnimatePresence mode="wait">
      <Toaster
        position="top-center"
        theme="dark"
        visibleToasts={1}
        toastOptions={{
          classNames: {
            toast: "border border-transparent bg-black py-3 shadow-[inset_0_0_40px_rgba(0,255,144,0.45)] rounded-none before:content-[''] before:bottom-0 before:absolute before:left-0 before:w-16 before:h-1 before:bg-error before:[clip-path:_polygon(0_0,calc(100%_-_4px)_0%,100%_100%,0%_100%)] after:content-[''] after:bottom-0 after:absolute after:right-0 after:left-auto after:w-16 after:h-1  after:[clip-path:_polygon(4px_0,100%_0%,100%_100%,0%_100%)]",
            content: "flex items-center w-full",
            title: "font-geist text-base text-title leading-[20px]",
            icon: "hidden",
            success: "shadow-[inset_0_0_40px_rgba(0,255,144,0.45)] !border-success before:bg-success after:bg-success",
            error: "shadow-[inset_0_0_40px_rgba(229,57,53,0.45)] !border-error before:bg-error after:bg-error",
          },
        }}
      />
      <div className="section">
        <div className="h-full overflow-y-auto flex flex-col hide-scrollbar ">
          <div className="container-custom">
            <motion.div
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -25, opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <Info/>
              <div className="my-10 max-w-[480px] mx-auto">
                {children}
              </div>
            </motion.div>
          </div>
          <CustomNavbar/>
        </div>
      </div>
    </AnimatePresence>
  )
}

export default CustomPage
