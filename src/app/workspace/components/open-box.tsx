import CustomModal from '@/app/components/custom-modal'
import { IconPoint } from '@/app/components/icons'
import { formatNumber } from '@/helper/common'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'

interface OpenBoxProps {
  isOpen: boolean
  onOpen: () => void
  onOpenChange: () => void
  onClose: () => void
  listItem: any
}

const BOX_TYPE = {
  OPEN: 'open',
  CLAIM: 'claim'
}

export default function OpenBox({ isOpen, onOpenChange, onOpen, onClose, listItem }: OpenBoxProps) {
  const [activeType, setActiveType] = useState(BOX_TYPE.OPEN)

  useEffect(() => {
    if (listItem?.length > 0) {
      setActiveType(BOX_TYPE.CLAIM)
    }
  }, [listItem])

  return (
    <CustomModal
      full
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onOpen={onOpen}
      onClose={onClose}
      background={
        <img
          className="absolute top-0 left-0 right-0 mx-auto min-[460px]:h-full object-cover w-full z-[-1]"
          src={`/assets/images/workspace/special-background-02.png`}
          srcSet={`/assets/images/workspace/special-background-02.png 1x, /assets/images/workspace/special-background-02@2x.png 2x`}
          alt="DePIN Alliance"
        />
      }
    >
      <div
        className={`h-full flex p-4 ${activeType === BOX_TYPE.OPEN ? 'justify-center mt-16 xs:mt-20 2xs:mt-24' : 'flex-col justify-between'}`}
      >
        {activeType === BOX_TYPE.OPEN ? (
          <div className="relative size-[220px] xs:size-[260px] 2xs:size-[300px] drop-shadow-[0_0_75px_rgba(0,255,144,0.9)]">
            {/* <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[50%] size-full bg-[rgba(0,255,144,0.5)] z-[-1] blur-[75px]"></div> */}
            <img
              src="/assets/images/item-special.png"
              srcSet="/assets/images/item-special.png 1x, /assets/images/item-special@2x.png 2x"
              alt="DePIN Alliance"
              className="size-full"
            />
          </div>
        ) : (
          <>
            <div className="flex flex-1 flex-col items-center justify-center space-y-6 xs:space-y-7 2xs:space-y-8">
              <div className="relative max-h-[360px] hidden-scrollbar overflow-y-auto py-4 xs:py-5 2xs:py-6 px-4 border border-green-500 drop-shadow-green w-full bg-[linear-gradient(to_bottom,#000,#00371f)]">
                <div className="absolute top-0 left-0 right-0 opacity-50 w-full h-full">
                  <img
                    className="object-cover w-full h-full"
                    src="/assets/images/workspace/congratulation-background.jfif"
                    alt=""
                  />
                </div>

                <div
                  className={`grid grid-cols-${listItem.length > 1 ? 2 : 1} gap-3 relative z-[1]`}
                >
                  {listItem.map((item: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className="relative w-full mx-auto before:content-[''] before:absolute before:top-0 before:left-0 before:size-4 xs:before:size-5 before:border-[8px] xs:before:border-[10px] before:border-transparent before:transition-all before:border-l-green-500 before:border-t-green-500 drop-shadow-green"
                      >
                        <div className="flex flex-col [--shape:_24px] xs:[--shape:_28px] 2xs:[--shape:_32px] h-full relative bg-green-500 space-y-2 xs:space-y-3 p-4 [clip-path:_polygon(var(--shape)_0%,100%_0,100%_100%,0_100%,0%_var(--shape))] before:content-[''] before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:w-[calc(100%_-_2px)] before:h-[calc(100%_-_2px)] before:[clip-path:_polygon(var(--shape)_0%,100%_0,100%_100%,0_100%,0%_var(--shape))] before:bg-black/80 before:blur-[4px] before:z-[-1]">
                          <Image
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="size-[80px] xs:size-[90px] mx-auto [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)]"
                            src={`/assets/images/upgrade/upgrade-${item.type.toLowerCase()}@2x.png`}
                            alt=""
                          />
                          {item.type.toLowerCase() !== 'point' && (
                            <div className="space-y-0.5 xs:space-y-1 text-center !mb-1">
                              <p className="text-white font-mona font-semibold text-xs xs:text-[13px] 2xs:text-sm !leading-[16px]">
                                {item.name}
                              </p>
                              {/* <p className="text-green-500 text-xs xs:text-[13px] 2xs:text-sm !leading-[16px]">
			 x{countRef.current[item.type]?.amount || 1}
		 </p> */}
                            </div>
                          )}

                          {item.type.toLowerCase() !== 'usdt' &&
                            item.type.toLowerCase() !== 'u2u' && (
                              <div className="flex items-center justify-center space-x-1 mt-auto">
                                <IconPoint className="size-4" />
                                <p className="text-green-500 font-semibold text-[13px] xs:text-sm !leading-[16px]">
                                  {formatNumber(item.point, 0, 0)}
                                </p>
                              </div>
                            )}
                        </div>
                      </div>
                    )
                  })}

                  {/* <div className="relative w-fit mx-auto before:content-[''] before:absolute before:top-0 before:left-0 before:size-4 xs:before:size-5 before:border-[8px] xs:before:border-[10px] before:border-transparent before:transition-all before:border-l-green-500 before:border-t-green-500 drop-shadow-green">
                        <div className="[--shape:_24px] xs:[--shape:_28px] 2xs:[--shape:_32px] relative bg-green-500 space-y-2 xs:space-y-3 p-4 [clip-path:_polygon(var(--shape)_0%,100%_0,100%_100%,0_100%,0%_var(--shape))] before:content-[''] before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:w-[calc(100%_-_2px)] before:h-[calc(100%_-_2px)] before:[clip-path:_polygon(var(--shape)_0%,100%_0,100%_100%,0_100%,0%_var(--shape))] before:bg-black/80 before:blur-[4px] before:z-[-1]">
                          <img
                            className="size-[80px] xs:size-[90px] mx-auto [clip-path:_polygon(20px_0%,100%_0,100%_calc(100%_-_20px),calc(100%_-_20px)_100%,0_100%,0_20px)]"
                            src="/assets/images/workspace/special-ram.png"
                            srcSet="/assets/images/workspace/special-ram.png 1x, /assets/images/workspace/special-ram@2x.png 2x"
                            alt=""
                          />
                          <div className="space-y-0.5 xs:space-y-1 text-center">
                            <p className="text-white font-mona font-semibold text-xs xs:text-[13px] 2xs:text-sm !leading-[16px]">
                              RAM 2GB
                            </p>
                            <p className="text-green-500 text-xs xs:text-[13px] 2xs:text-sm !leading-[16px]">
                              x2
                            </p>
                          </div>
                        </div>
                      </div> */}
                </div>
              </div>
              <div className="space-y-2 xs:space-y-3">
                <div className="flex items-center justify-center space-x-4 xs:space-x-5 2xs:space-x-6 ">
                  <div className="size-1.5 min-w-1.5 bg-green-800"></div>
                  <div className="font-airnt font-medium text-lg xs:text-xl tracking-[1px] text-title text-center leading-[22px] xs:leading-[24px]">
                    Congratulation
                  </div>
                  <div className="size-1.5 min-w-1.5 bg-green-800"></div>
                </div>
                <p className="text-body text-[15px] xs:text-base !leading-[20px] tracking-[-1px] text-center">
                  You’ve received this item. Congratulations!
                </p>
              </div>
            </div>
            <div className="m-4 xs:m-6 2xs:m-8">
              <div className="btn" onClick={onClose}>
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
