/* eslint-disable @next/next/no-img-element */

import React from 'react'
import { IconChevron } from '../icons'

interface ItemProps {
  placement?: string
  content?: string
  handleNext: () => void
}

const ItemTutorial = ({ placement, handleNext, content }: ItemProps) => {
  return (
    <div className="pt-10 2xs:pt-16">
      <div className="relative max-w-[480px] mx-auto mt-0 drop-shadow-yellow before:content-[''] before:absolute before:bottom-[16px] before:left-0 before:border-transparent before:size-5 before:border-[10px] before:border-l-yellow-300 before:border-b-yellow-300 before:z-[1] after:content-[''] after:absolute after:top-[5px] after:right-[5px] after:size-3 after:border-[6px] after:border-transparent after:border-r-green-500 after:border-t-green-500">
        <div className="absolute bottom-0 left-0 bg-gradient-reverse h-3 w-[calc(100%_-_106px)] [clip-path:_polygon(0_0,calc(100%_-_12px)_0%,100%_100%,0%_100%)] z-[1]"></div>
        <div className="absolute top-[-80px] left-0 max-w-[100px] 2xs:max-w-[120px] pointer-events-none">
          <img src="/assets/images/tutorial-char.png" alt="DePIN Alliance" />
        </div>
        <div className="relative mt-auto p-[1px] bg-gradient-reverse [clip-path:_polygon(0_0,calc(100%_-_20px)_0,100%_20px,100%_calc(100%_-_16px),calc(100%_-_16px)_100%,calc(100%_-_100px)_100%,calc(100%_-_116px)_calc(100%_-_16px),0_calc(100%_-_16px))]">
          <div className="relative min-h-[200px] xs:min-h-[220px] space-y-2 p-4 xs:p-5 2xs:p-6 !pb-8 xs:!pb-10 bg-[linear-gradient(to_bottom,#000,#00331d)] [clip-path:_polygon(0_0,calc(100%_-_20px)_0,100%_20px,100%_calc(100%_-_16px),calc(100%_-_16px)_100%,calc(100%_-_99px)_100%,calc(100%_-_115px)_calc(100%_-_16px),0_calc(100%_-_16px))]">
            <div className="flex items-center space-x-4 xs:space-x-5 2xs:space-x-6 mx-auto">
              <div className="size-1.5 min-w-1.5 bg-green-800"></div>
              <div className="font-airnt font-medium text-base xs:text-lg 2xs:text-xl text-white !leading-[calc(24/20)] tracking-[1px] uppercase">
                depin leader
              </div>
              <div className="size-1.5 min-w-1.5 bg-green-800"></div>
            </div>
            <div className="max-h-[140px] no-scrollbar overflow-y-auto">
              <div className="text-left text-sm xs:text-[15px] 2xs:text-base !leading-[16px] xs:!leading-[18px] 2xs:!leading-[20px] text-body tracking-[-1px] max-w-[240px] xs:max-w-[300px] 2xs:max-w-[360px]">
                {content}
              </div>
            </div>
            <div
              className="absolute bottom-1.5 xs:bottom-2 right-4 mt-0 flex items-center space-x-1 uppercase text-green-500 cursor-pointer"
              onClick={handleNext}
            >
              <p className="font-mona font-semibold text-sm leading-[16px]">Next</p>
              <IconChevron className="size-5 xs:size-6 -rotate-90" />
            </div>
          </div>
        </div>
      </div>
      {placement && (
        <div
          className={`flex mt-6 xs:mt-8 2xs:mt-10 ${placement === 'bottom-center' ? 'justify-center' : ''}`}
        >
          <div className="w-12 xs:w-14 2xs:w-16">
            <img
              className="max-w-8 xs:max-w-9 2xs:max-w-10 mx-auto"
              src="/assets/images/level/level-arrow-color@2x.png"
              alt="DePIN Alliance"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default ItemTutorial
