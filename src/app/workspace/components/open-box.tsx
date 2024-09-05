import CustomModal from '@/app/components/custom-modal'
import React, { useState } from 'react'

interface OpenBoxProps {
  isOpen: boolean
  onOpen: () => void
  onOpenChange: () => void
  onClose: () => void
}

const BOX_TYPE = {
  OPEN: 'open',
  CLAIM: 'claim'
}

export default function OpenBox({isOpen, onOpenChange, onOpen, onClose}: OpenBoxProps) {
  const [activeType, setActiveType] = useState(BOX_TYPE.CLAIM)


  return (
    <CustomModal
      full
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onOpen={onOpen}
      onClose={onClose}
      background={
        <img className="absolute top-0 left-0 right-0 mx-auto min-[460px]:h-full object-cover w-full"
          src={`/assets/images/workspace/special-background-${activeType === BOX_TYPE.OPEN ? '01' : '02'}.png`}
          srcSet={`/assets/images/workspace/special-background-${activeType === BOX_TYPE.OPEN ? '01' : '02'}.png 1x, /assets/images/workspace/special-background-${BOX_TYPE.OPEN ? '01' : '02'}@2x.png 2x`}
          alt="DePIN Alliance"/>
      }
    >
      <div className={`h-full flex p-4 ${activeType === BOX_TYPE.OPEN ? 'items-center justify-center' : 'flex-col justify-between'}`}>
        {activeType === BOX_TYPE.OPEN ? (
          <div className="relative size-[250px]">
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[50%] size-full bg-[rgba(0,255,144,0.5)] z-[-1] blur-[75px]"></div>
            <img src="/assets/images/item-special.png" srcSet="/assets/images/item-special.png 1x, /assets/images/item-special@2x.png 2x" alt="DePIN Alliance" className="size-full" />
          </div>
        ) : (
          <>
            <div className="flex flex-1 flex-col items-center justify-center space-y-8">
              <div className="relative drop-shadow-green">
                <img src="/assets/images/workspace/special-image.png" srcSet="/assets/images/workspace/special-image.png 1x, /assets/images/workspace/special-image@2x.png 2x" alt="DePIN Alliance" className="size-full" />
                <div className="absolute p-4 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                  <div className="relative before:content-[''] before:absolute before:top-0 before:left-0 before:size-5 before:border-[10px] before:border-transparent before:transition-all before:border-l-green-500 before:border-t-green-500 drop-shadow-green">
                    <img src="/assets/images/workspace/shape-blur.svg" alt="DePIN Alliance" />
                    <div className="absolute top-0 left-0 right-0 w-full h-full p-4 flex flex-col items-center justify-center space-y-4">
                      <img className="size-[90px] [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)]"
                        src="/assets/images/workspace/special-ram.png"
                        srcSet="/assets/images/workspace/special-ram.png 1x, /assets/images/workspace/special-ram@2x.png 2x"
                        alt="" />
                      <div className="space-y-1 text-center">
                        <p className="text-white font-mona font-semibold text-xs xs:text-[13px] 2xs:text-sm !leading-[16px]">RAM 2GB</p>
                        <p className="text-green-500 text-xs xs:text-[13px] 2xs:text-sm !leading-[16px]">x2</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-6 ">
                <div className="size-1.5 min-w-1.5 bg-green-800"></div>
                <div className="font-airnt font-medium text-lg xs:text-xl tracking-[1px] text-title text-center leading-[22px] xs:leading-[24px]">Congratulation</div>
                <div className="size-1.5 min-w-1.5 bg-green-800"></div>
              </div>
              <p className="text-body text-base leading-[20px] tracking-[-1px] text-center">You’ve received this item. Congratulations!</p>
            </div>
            <div className="m-8">
              <div className="btn">
                <div className="btn-border"></div>
                <div className="btn-primary">Claim Reward</div>
                <div className="btn-border"></div>
              </div>
            </div>
          </>
        )}
      </div>
    </CustomModal>
  )
}
