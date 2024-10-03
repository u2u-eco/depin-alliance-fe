/* eslint-disable @next/next/no-img-element */

import React from 'react'
import { IconChevron } from '../icons'

const ItemTutorial = () => {
  return (
    <div className="relative mt-[140px] xs:mt-[150px] 2xs:mt-[160px] drop-shadow-yellow before:content-[''] before:absolute before:bottom-[16px] before:left-0 before:border-transparent before:size-5 before:border-[10px] before:border-l-yellow-300 before:border-b-yellow-300 before:z-[1] after:content-[''] after:absolute after:top-[5px] after:right-[5px] after:size-3 after:border-[6px] after:border-transparent after:border-r-green-500 after:border-t-green-500">
      <div className="absolute bottom-0 left-0 bg-gradient-reverse h-3 w-[calc(100%_-_106px)] [clip-path:_polygon(0_0,calc(100%_-_12px)_0%,100%_100%,0%_100%)] z-[1]"></div>
      <div className="absolute top-[-140px] xs:top-[-150px] 2xs:top-[-160px] left-0 max-w-[180px] xs:max-w-[200px] 2xs:max-w-[220px]">
        <img src="/assets/images/tutorial-char.png" alt="DePIN Alliance" />
      </div>
      <div className="relative p-[1px] bg-gradient-reverse [clip-path:_polygon(0_0,calc(100%_-_20px)_0,100%_20px,100%_calc(100%_-_16px),calc(100%_-_16px)_100%,calc(100%_-_100px)_100%,calc(100%_-_116px)_calc(100%_-_16px),0_calc(100%_-_16px))]">
        <div className="relative min-h-[220px] space-y-2 p-4 xs:p-5 2xs:p-6 !pb-8 xs:!pb-10 bg-[linear-gradient(to_bottom,#000,#00331d)] [clip-path:_polygon(0_0,calc(100%_-_20px)_0,100%_20px,100%_calc(100%_-_16px),calc(100%_-_16px)_100%,calc(100%_-_99px)_100%,calc(100%_-_115px)_calc(100%_-_16px),0_calc(100%_-_16px))]">
          <div className="flex items-center space-x-4 xs:space-x-5 2xs:space-x-6 mx-auto">
            <div className="size-1.5 min-w-1.5 bg-green-800"></div>
            <div className="font-airnt font-medium text-base xs:text-lg 2xs:text-xl text-white !leading-[calc(24/20)] tracking-[1px] uppercase">
              depin leader
            </div>
            <div className="size-1.5 min-w-1.5 bg-green-800"></div>
          </div>
          <div className="text-sm xs:text-[15px] 2xs:text-base !leading-[16px] xs:!leading-[18px] 2xs:!leading-[20px] text-body tracking-[-1px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua sed do eiusmod tempor incididunt sed do
            eiusmod tempor incididunt ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua sed do eiusmod tempor
            incididunt sed do eiusmod tempor incididunt ut. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua sed
            do eiusmod tempor incididunt sed do eiusmod tempor incididunt ut.
          </div>
          <div className="absolute bottom-2 right-4 flex items-center space-x-1 uppercase text-green-500 cursor-pointer">
            <p className="font-mona font-semibold leading-[16px]">Next</p>
            <IconChevron className="size-6 -rotate-90" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ItemTutorial
