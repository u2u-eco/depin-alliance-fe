/* eslint-disable @next/next/no-img-element */

import React from 'react'
import { IconChevron, IconDoubleArrow } from '../icons'
import parse from 'html-react-parser'
import { useTourGuideContext } from '@/contexts/tour.guide.context'
import { usePathname } from 'next/navigation'
import CustomButton from '../button'

interface ItemProps {
  placement?: string
  content?: string
  hideImage?: boolean
  arrow?: boolean
  arrowClass?: string
  handleNext?: () => void
  handleSkip?: () => void
  handleComplete?: () => void
}

const ItemTutorial = ({
  placement,
  handleNext,
  content,
  hideImage,
  handleComplete,
  handleSkip,
  arrow,
  arrowClass
}: ItemProps) => {
  const pathName = usePathname()
  const { state: tourState } = useTourGuideContext()

  return (
    <>
      {arrow ? (
        <div className={`pointer-events-none ${arrowClass}`}>
          <img
            className="animate-bounce max-w-8 xs:max-w-9 2xs:max-w-10 mx-auto"
            src="/assets/images/level/level-arrow-color@2x.png"
            alt="DePIN Alliance"
          />
        </div>
      ) : (
        <div
          className={`flex flex-col ${!hideImage ? (placement === 'top-center' || placement === 'top-right' ? '' : 'pt-10 2xs:pt-16') : ''} ${pathName !== '/map' ? (tourState.stepIndex === 4 ? 'pr-5' : tourState.stepIndex === 7 ? 'pl-10 max-[354px]:pt-8' : 'pl-5') : tourState.stepIndex === 2 || tourState.stepIndex === 3 || tourState.stepIndex === 5 || tourState.stepIndex === 6 || tourState.stepIndex === 8 || tourState.stepIndex === 9 || tourState.stepIndex === 12 ? '' : tourState.stepIndex === 7 ? 'pr-5' : 'pl-5'}`}
        >
          <div
            className={`relative w-full max-w-[480px] mx-auto mt-0 drop-shadow-yellow before:content-[''] before:absolute before:bottom-[16px] before:left-0 before:border-transparent before:size-5 before:border-[10px] before:border-l-yellow-300 before:border-b-yellow-300 before:z-[1] after:content-[''] after:absolute after:top-[5px] after:right-[5px] after:size-3 after:border-[6px] after:border-transparent after:border-r-green-500 after:border-t-green-500 ${placement === 'top-center' || placement === 'top-right' ? 'order-2' : ''}`}
          >
            <div className="absolute bottom-0 left-0 bg-gradient-reverse h-3 w-[calc(100%_-_106px)] [clip-path:_polygon(0_0,calc(100%_-_12px)_0%,100%_100%,0%_100%)] z-[1]"></div>
            {!hideImage && (
              <div
                className={`absolute top-[-80px] left-0 max-w-[100px] 2xs:max-w-[120px] pointer-events-none ${pathName !== '/map' ? (tourState.stepIndex === 2 || tourState.stepIndex === 3 || tourState.stepIndex === 7 || tourState.stepIndex === 10 ? 'max-[354px]:hidden' : '') : ''}`}
              >
                <img src="/assets/images/tutorial-char.png" alt="DePIN Alliance" />
              </div>
            )}
            {handleSkip && (
              <div
                className="absolute top-[-30px] right-8 cursor-pointer text-green-500 flex items-center space-x-2 font-mona font-semibold text-sm xs:text-[15px] 2xs:text-base !leading-[18px] xs:!leading-[20px]"
                onClick={handleSkip}
              >
                Skip
                <IconDoubleArrow className="size-5 xs:size-6 rotate-90" gradient />
              </div>
            )}
            <div className="relative mt-auto p-[1px] bg-gradient-reverse [clip-path:_polygon(0_0,calc(100%_-_20px)_0,100%_20px,100%_calc(100%_-_16px),calc(100%_-_16px)_100%,calc(100%_-_100px)_100%,calc(100%_-_116px)_calc(100%_-_16px),0_calc(100%_-_16px))]">
              <div className="relative min-h-[160px] space-y-2 p-4 xs:p-5 2xs:p-6 !pb-10 xs:!pb-12 bg-[linear-gradient(to_bottom,#000,#00331d)] [clip-path:_polygon(0_0,calc(100%_-_20px)_0,100%_20px,100%_calc(100%_-_16px),calc(100%_-_16px)_100%,calc(100%_-_99px)_100%,calc(100%_-_115px)_calc(100%_-_16px),0_calc(100%_-_16px))]">
                <div className="flex items-center space-x-4 xs:space-x-5 2xs:space-x-6 mx-auto">
                  <div className="size-1.5 min-w-1.5 bg-green-800"></div>
                  <div className="font-airnt font-medium text-base xs:text-lg 2xs:text-xl text-white !leading-[calc(24/20)] tracking-[1px] uppercase">
                    depin leader
                  </div>
                  <div className="size-1.5 min-w-1.5 bg-green-800"></div>
                </div>
                <div className="text-left text-sm xs:text-[15px] 2xs:text-base !leading-[16px] xs:!leading-[18px] 2xs:!leading-[20px] text-body tracking-[-1px] ">
                  {content && parse(content)}
                </div>
                {handleComplete && (
                  <CustomButton
                    buttonClass="!mt-8"
                    title="COMPLETE TUTORIAL"
                    onAction={handleComplete}
                  />
                )}
                {handleNext && (
                  <div
                    className="absolute bottom-1.5 xs:bottom-2 right-4 mt-0 flex items-center space-x-1 uppercase text-green-500 cursor-pointer"
                    onClick={handleNext}
                  >
                    <p className="font-mona font-semibold text-sm leading-[16px]">Next</p>
                    <IconChevron className="size-5 xs:size-6 -rotate-90" />
                  </div>
                )}
              </div>
            </div>
          </div>
          {placement && (
            <div
              className={`flex mt-6 xs:mt-8 2xs:mt-10 pointer-events-none ${placement === 'bottom-center' ? 'justify-center' : placement === 'bottom-right' ? 'justify-end' : placement === 'top-center' ? 'order-1 justify-center rotate-180 mt-0 mb-12 xs:mb-16 2xs:mb-20' : placement === 'top-right' ? 'justify-end order-1 rotate-180 mt-0 mb-12 xs:mb-16 2xs:mb-20' : ''} ${pathName !== '/map' ? (tourState.stepIndex === 2 || tourState.stepIndex === 3 || tourState.stepIndex === 7 ? 'max-[354px]:hidden' : tourState.stepIndex === 1 ? 'opacity-0 h-0' : '') : tourState.stepIndex === 0 || tourState.stepIndex === 4 || tourState.stepIndex === 7 ? 'max-[354px]:hidden height:hidden' : tourState.stepIndex === 1 ? 'opacity-0 h-0' : ''}`}
            >
              <div className={placement !== 'top-right' ? `w-12 xs:w-14 2xs:w-16` : ''}>
                <img
                  className="animate-bounce max-w-8 xs:max-w-9 2xs:max-w-10 mx-auto"
                  src="/assets/images/level/level-arrow-color@2x.png"
                  alt="DePIN Alliance"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default ItemTutorial
