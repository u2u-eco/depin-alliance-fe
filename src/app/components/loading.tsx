/* eslint-disable @next/next/no-img-element */
'use client'
import { motion } from 'framer-motion'
import React from 'react'

const Loading = ({ isDone }: { isDone?: boolean }) => {
  return (
    <>
      <div className="loading section bg-black">
        <div className="relative h-full">
          <img
            className="mx-auto h-full object-cover w-full"
            src="/assets/images/loading-background.png"
            srcSet="/assets/images/loading-background.png 1x, /assets/images/loading-background@2x.png 2x"
            alt="Loading Background"
          />
          <div className="absolute top-[90px] 2xs:top-[100px] left-0 right-0">
            <img
              className="mx-auto h-[60px] xs:h-20 2xs:h-full"
              src="/assets/images/logo.svg"
              alt="Logo"
            />
          </div>
          <div className="absolute bottom-[40px] min-[355px]:bottom-[60px] xs:bottom-[80px] 2xs:bottom-[100px] left-0 right-0 text-center space-y-4">
            <span className="font-geist text-body text-[13px] min-[355px]:text-sm">
              Logging to your account, please wait...
            </span>
            <div className="relative h-1 w-full max-w-[300px] xs:max-w-[320px] mx-auto rounded bg-gray-850">
              <motion.div
                style={{ width: 0 }}
                animate={{ width: isDone ? '100%' : '95%' }}
                transition={{ duration: 3 }}
                className="absolute left-0 top-0 h-full w-[2%] bg-gradient rounded "
              ></motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Loading
