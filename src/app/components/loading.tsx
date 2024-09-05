/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react'

const Loading = () => {
  return (
    <>
      <div className="loading section bg-black">
        <div className="relative h-full">
          <img
            className="mx-auto min-[460px]:h-full object-cover w-full"
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
          <div className="absolute bottom-[60px] xs:bottom-[80px] 2xs:bottom-[100px] left-0 right-0 text-center space-y-4">
            <span className="font-geist text-body">Logging to your account, please wait...</span>
            <div className="relative h-1 w-full max-w-[320px] mx-auto rounded bg-gray-850">
              <div className="absolute left-0 top-0 h-full w-[2%] bg-gradient rounded animate-[progress_5s_infinite_cubic-bezier(0,0,0,0.99)]"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Loading
