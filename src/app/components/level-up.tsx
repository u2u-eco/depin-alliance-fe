/* eslint-disable @next/next/no-img-element */
"use client"

import React from 'react'

const LevelUp = () => {
  return (
    <div className="section z-30">
      <div className="absolute top-0 left-0 right-0 w-full h-full z-[-1]">
        <img
          className="mx-auto h-full object-cover"
          src="/assets/images/level-up-background.png"
          srcSet="/assets/images/level-up-background.png 1x, /assets/images/level-up-background@2x.png 2x"
          alt="Level Up Background"
        />
      </div>
      <div className="container-custom">
        <div className="pb-24">
          <img className="mx-auto h-14" src="/assets/images/logo.svg" alt="Logo" />
        </div>
        <div className="relative w-fit mx-auto">
          <img src="/assets/images/level-up-frame.svg" alt="Frame" />
          <div className="absolute top-0 left-0 right-0 w-full h-full text-center flex items-center justify-center flex-col">
            <p className="text-base tracking-[-1px] text-body uppercase leading-[20px]">LEVEL</p>
            <p className="text-gradient font-bold text-5xl leading-[60px]">16</p>
          </div>
        </div>
        <div className="mt-10 space-y-3 text-center">
          <div className="flex items-center justify-center space-x-6">
            <div className="size-1.5 min-w-1.5 bg-green-800"></div>
            <div className="text-title font-airnt font-medium text-3xl uppercase">Level up</div>
            <div className="size-1.5 min-w-1.5 bg-green-800"></div>
          </div>
          <div className="text-body text-base tracking-[-1px] leading-[20px]">Congratulations! You’ve reached level 13 and received 1 skill point.</div>
        </div>
      </div>
    </div>
  )
}

export default LevelUp