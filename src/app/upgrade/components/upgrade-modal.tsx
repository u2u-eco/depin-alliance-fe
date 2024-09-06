import { formatNumber } from '@/helper/common'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import useCommonStore from '@/stores/commonStore'
import { IconPoint, IconThunder } from '@/app/components/icons'
import CountdownTime from '@/app/components/countdown-time'
import ImageDevice from '@/app/components/image-device'
interface IUpgradeModal {
  activeType: string
  UPGRADE_TYPE: any
  item: any
  refInterval: any
  handleAction: (data: any) => void
  handleFetchList: () => void
}
export default function UpgradeModal({
  activeType,
  UPGRADE_TYPE,
  item,
  handleAction,
  handleFetchList
}: IUpgradeModal) {
  const userInfo = useCommonStore((state) => state.userInfo)
  const [timeCountdown, setTimeCountdown] = useState<number>(item.timeWaiting)

  const handleClick = () => {
    if (!userInfo?.pointSkill) {
      return
    }
    handleAction(item.skillId)
  }

  const cbReset = () => {
    setTimeCountdown(0)
    handleFetchList()
  }

  const disableBtn =
    activeType === UPGRADE_TYPE.SKILL &&
    (!userInfo?.pointSkill || item.levelCurrent === item.maxLevel)
  return (
    <div>
      <div className=" text-body text-base tracking-[-1px] text-center">
        <p>
          Are you sure you want to level up <span className="text-gradient">“{item.name}”</span>?
        </p>
      </div>
      <div className="my-8 flex items-center justify-center space-x-4">
        <div className="p-[1px] bg-green-100 [clip-path:_polygon(30px_0%,100%_0,100%_calc(100%_-_30px),calc(100%_-_30px)_100%,0_100%,0_30px)] flex items-center justify-center size-[130px] min-w-[130px]">
          <ImageDevice
            className="w-full h-full [clip-path:_polygon(30px_0%,100%_0,100%_calc(100%_-_30px),calc(100%_-_30px)_100%,0_100%,0_30px)]"
            image={item.image}
            type=""
          />
        </div>
        <div className="space-y-2">
          <p className="font-mona text-white text-lg xs:text-xl 2xs:text-2xl font-semibold">{item.name}</p>

          <p className="font-geist font-semibold text-yellow-600">LV. {item.levelCurrent}</p>
        </div>
      </div>
      <div className="relative w-fit mx-auto">
        <img className="mx-auto" src="/assets/images/action-frame.svg" alt="Frame" />
        <div className="absolute top-0 left-0 right-0 w-full h-full px-10 py-5 flex items-center justify-between">
          <div className="space-y-3 font-geist">
            <p className="tracking-[-1px] text-title uppercase">{item?.description}</p>

            <div className="flex items-center space-x-1">
              {/* <p className="text-lg font-semibold text-green-700 leading-[24px]">1%</p> */}
              <div className="w-[20px] overflow-hidden mr-[2px]">
                <motion.div
                  initial={{ x: -24 }}
                  animate={{ x: 0 }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  <div className="flex space-x-1">
                    <img
                      className="size-6"
                      src="/assets/images/icons/icon-double-arrow-right-gradient.svg"
                      alt="Icon Double Arrow"
                    />
                    <img
                      className="size-6"
                      src="/assets/images/icons/icon-double-arrow-right-gradient.svg"
                      alt="Icon Double Arrow"
                    />
                  </div>
                </motion.div>
              </div>
              <p className="text-lg font-semibold text-green-300 leading-[24px]">
                {formatNumber((item.effectCurrent + item.rateEffect) * 100, 0, 0)}%
              </p>
            </div>
          </div>
          <div className="space-y-3 font-geist">
            <p className="tracking-[-1px] text-title uppercase">GROWTH:</p>
            <div className="flex items-center space-x-1">
              <p className="text-lg font-semibold text-green-700 leading-[24px]">
                LV. <span className="text-green-300 -ml-2">{item.levelCurrent}</span>
              </p>
              <div className="w-[20px] overflow-hidden mr-[2px]">
                <motion.div
                  initial={{ x: -24 }}
                  animate={{ x: 0 }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  <div className="flex space-x-1">
                    <img
                      className="size-6"
                      src="/assets/images/icons/icon-double-arrow-right-gradient.svg"
                      alt="Icon Double Arrow"
                    />
                    <img
                      className="size-6"
                      src="/assets/images/icons/icon-double-arrow-right-gradient.svg"
                      alt="Icon Double Arrow"
                    />
                  </div>
                </motion.div>
              </div>
              <p className="text-lg font-semibold text-green-700 leading-[24px]">
                LV. <span className="text-green-300 -ml-2">{item.levelUpgrade}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={`btn mt-6 ${disableBtn ? 'inactive' : ''}`}>
        {activeType === UPGRADE_TYPE.SKILL && item.timeWaiting > Date.now() && timeCountdown ? (
          <div className="btn-default flex items-center justify-center !py-2.5 !px-3">
            <div className="min-h-6 xs:min-h-[28px]">
              <CountdownTime time={item.timeWaiting} cb={cbReset} />
            </div>
          </div>
        ) : (
          <>
            <div className="btn-border"></div>
            <div className={`${disableBtn ? 'btn-inactive' : ' btn-primary'}`}>
              <div
                className={`flex items-center justify-center space-x-4 ${disableBtn ? 'text-inactive' : 'text-green-900'}`}
                onClick={handleClick}
              >
                <span>{activeType === UPGRADE_TYPE.DEVICE ? 'Buy Now' : 'Level Up'}</span>
                <div
                  className={`w-[30px] h-[1px] ${disableBtn ? 'bg-inactive' : 'bg-green-800'}`}
                ></div>
                <div className="flex items-center space-x-1">
                  <IconThunder className="size-5" />
                  <p className="font-geist text-base font-semibold">{item.feeUpgrade}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <IconPoint color className="size-5" />
                  <p className="font-geist text-base font-semibold">
                    {formatNumber(item.feePointUpgrade, 0, 0)}
                  </p>
                </div>
              </div>
            </div>
            <div className="btn-border"></div>
          </>
        )}
      </div>
    </div>
  )
}
