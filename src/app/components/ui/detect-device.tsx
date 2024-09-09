/* eslint-disable @next/next/no-img-element */

"use client"

import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { IconPoint } from '../icons'

export const DetectDevice = () => {
  return (
    <AnimatePresence mode="wait">

    <div className="section">
      <motion.div
        className="absolute top-0 left-0 right-0 w-full h-full z-[-1]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <img
          className="mx-auto object-cover min-[460px]:h-full w-full"
          src="/assets/images/claim-background.png"
          srcSet="/assets/images/claim-background.png 1x, /assets/images/claim-background@2x.png 2x"
          alt="Background"
        />
        {/* <img
          className="mx-auto object-cover min-[460px]:h-full w-full"
          src="/assets/images/onboarding/onboarding-background.png"
          srcSet="/assets/images/onboarding/onboarding-background.png 1x, /assets/images/onboarding/onboarding-background@2x.png 2x"
          alt="Background"
        /> */}
      </motion.div>
      <motion.div
        layout
        className="h-full max-w-[480px] mx-auto py-6 px-4 overflow-y-auto hide-scrollbar flex flex-col justify-between"
        initial={{ y: 25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -25, opacity: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="space-y-9">
          <div className="mt-[60px] xs:mt-[80px] 2xs:mt-[100px]">
            <img className="h-16 mx-auto" src="/assets/images/logo.svg" alt="Logo" />
          </div>
          <div className="space-y-3">
            <div className="relative w-fit mx-auto">
              <div
                className={`absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[50%] bg-[rgba(0,255,144,0.15)] shadow-[0_0_8px_rgba(0,255,144,0.45)] z-[-1] size-10`}
              >
                <div className="size-full rounded-[50%] bg-[rgba(255,255,255,1)]/20 blur-[4px]"></div>
              </div>
              <IconPoint className="size-11"/>
            </div>
            <div className="text-center text-point text-[40px] font-bold leading-[48px] tracking-[-1px]">50,000</div>
          </div>
          <div className="relative">
            <div className="absolute top-[5%] left-[50%] translate-x-[-50%] rounded-[50%] size-[140px] blur-[75px] bg-green-500 z-[-1]"></div>
            <img
              className={`mx-auto ${'max-h-[220px] xs:max-h-[300px] 2xs:max-h-[380px]'}`}
              src={`/assets/images/${'onboarding/onboarding-ios'}.png`}
              srcSet={`/assets/images/${'onboarding/onboarding-ios'}.png 1x, /assets/images/${'onboarding/onboarding-ios'}@2x.png 2x`}
              alt="Device"
            />
          </div>
          <div className="!mt-3 mx-auto max-w-[350px]">
            <div className="btn default cursor-default">
              <div className="btn-border"></div>
              <div className="btn-default font-normal font-geist normal-case">iPhone 15 Pro Max</div>
              <div className="btn-border"></div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
    </AnimatePresence>
  )
}
