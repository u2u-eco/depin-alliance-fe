"use client"

import CustomPage from '@/app/components/custom-page'
import React from 'react'

export default function InLeaguePage() {
  return (
    <>
      <CustomPage>
        <div className="relative">
          <div className="absolute top-0 left-[50%] translate-x-[-50%] w-full z-[-1]">
            <img className="mx-auto" src="/assets/images/league/league-background.svg" alt="" />
          </div>
          <div className="space-y-5">
            <div className="relative size-[200px] mx-auto before:content-[''] before:absolute before:top-[5px] before:left-[5px] before:size-[14px] before:border-[7px] before:border-transparent before:border-t-white before:border-l-white after:content-[''] after:absolute after:bottom-0 after:right-0 after:size-8 after:border-[16px] after:border-transparent after:border-b-white after:border-r-white">
              <div className="size-full p-[1px] [clip-path:_polygon(22px_0%,100%_0,100%_calc(100%_-_44px),calc(100%_-_44px)_100%,0_100%,0_22px)] bg-white">
                <img className="size-full [clip-path:_polygon(22px_0%,100%_0,100%_calc(100%_-_44px),calc(100%_-_44px)_100%,0_100%,0_22px)]" src="/assets/images/league/league-04@2x.png" alt="" />
              </div>
            </div>
            <div className="flex items-center justify-center space-x-6">
              <div className="size-1.5 min-w-1.5 bg-white"></div>
              <div className="font-airnt font-medium text-title text-2xl tracking-[1px] leading-[28px] [text-shadow:_0_0_8px_rgba(255,255,255,0.5)]">Space Cartel</div>
              <div className="size-1.5 min-w-1.5 bg-white"></div>
            </div>
          </div>
          <div className="relative w-fit mx-auto my-6">
            <img src="/assets/images/league/in-league-frame.svg" alt="" />
            <div className="absolute top-0 left-0 right-0 w-full h-full flex items-center justify-center space-x-20">
              <div className="space-y-2">
                <div className="text-title uppercase leading-[18px]">TOTAL MINING</div>
                <div className="flex items-center space-x-2">
                  <img className="size-8" src="/assets/images/point.png" srcSet="/assets/images/point.png 1x, /assets/images/point@2x.png 2x" alt="" />
                  <p className="text-green-500 font-semibold text-[28px] leading-[35px]">100K</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-title uppercase leading-[18px]">CONTRIBUTORS</div>
                <div className="flex items-center space-x-2">
                  <img className="size-8" src="/assets/images/icons/icon-group-user-white.svg" alt="" />
                  <p className="text-green-500 font-semibold text-[28px] leading-[35px]">581</p>
                </div>
              </div>
            </div>
          </div>
          <div className="btn">
            <div className="btn-border"></div>
            <div className="btn-primary">MINING TOGETHER</div>
            <div className="btn-border"></div>
          </div>
          <div className="grid grid-cols-4 gap-3 mt-8">
            <div className="btn default size-[90px] mx-auto">
              <div className="btn-border"></div>
              <div className="btn-default !size-[80px] flex items-center justify-center flex-col !p-2">
                <img className="size-8 mx-auto" src="/assets/images/icons/icon-task-green.svg" alt="" />
                <p className="text-gradient capitalize font-geist font-normal tracking-[-1px] leading-[18px] text-xs mt-1 whitespace-nowrap">Super Tasks</p>
              </div>
              <div className="btn-border"></div>
            </div>
            <div className="btn default size-[90px] mx-auto">
              <div className="btn-border"></div>
              <div className="btn-default !size-[80px] flex items-center justify-center flex-col !p-2">
                <img className="size-8 mx-auto" src="/assets/images/icons/icon-chat.svg" alt="" />
                <p className="text-body capitalize font-geist font-normal tracking-[-1px] leading-[18px] text-sm mt-1">Chat</p>
              </div>
              <div className="btn-border"></div>
            </div>
            <div className="btn default size-[90px] mx-auto">
              <div className="btn-border"></div>
              <div className="btn-default !size-[80px] flex items-center justify-center flex-col !p-2">
                <img className="size-8 mx-auto" src="/assets/images/icons/icon-share.svg" alt="" />
                <p className="text-body capitalize font-geist font-normal tracking-[-1px] leading-[18px] text-sm mt-1">Share</p>
              </div>
              <div className="btn-border"></div>
            </div>
            <div className="btn default size-[90px] mx-auto">
              <div className="btn-border"></div>
              <div className="btn-default !size-[80px] flex items-center justify-center flex-col !p-2">
                <img className="size-8 mx-auto" src="/assets/images/icons/icon-leave.svg" alt="" />
                <p className="text-body capitalize font-geist font-normal tracking-[-1px] leading-[18px] text-sm mt-1">Leave</p>
              </div>
              <div className="btn-border"></div>
            </div>
          </div>
        </div>
      </CustomPage>
    </>
  )
}
