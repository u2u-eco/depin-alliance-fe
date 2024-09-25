import { formatNumber } from '@/helper/common'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import useCommonStore from '@/stores/commonStore'
import { IconPoint, IconThunder, IconUpDown } from '@/app/components/icons'
import CountdownTime from '@/app/components/countdown-time'
import ImageDevice from '@/app/components/image-device'
import useSound from 'use-sound'
interface IUpgradeModal {
  activeType: string
  UPGRADE_TYPE: any
  item: any
  refInterval: any
  handleAction: (data: any) => void
}
export default function UpgradeModal({
  activeType,
  UPGRADE_TYPE,
  item,
  handleAction
}: IUpgradeModal) {
  const { userInfo, soundEnabled } = useCommonStore()
  const [play] = useSound('/assets/sounds/interaction/button-click.mp3', {
    soundEnabled
  })
  const [timeCountdown, setTimeCountdown] = useState<number>(item.timeWaiting)

  const handleClick = () => {
    if (!userInfo?.pointSkill || disableBtn) {
      return
    }
    play()
    handleAction(item.skillId)
  }

  const cbReset = () => {
    setTimeCountdown(0)
  }

  const getBonusRate = () => {
    return `${userInfo?.rateBonusReward ? formatNumber(userInfo?.rateBonusReward + item.rateEffect * 100, 0, 2) : formatNumber(item.rateEffect * 100, 0, 2)}%`
  }

  const disableBtn =
    activeType === UPGRADE_TYPE.SKILL &&
    (!userInfo?.pointSkill || item.levelCurrent === item.maxLevel)
  return (
    <div>
      <div className=" text-body text-[15px] xs:text-base !leading-[20px] tracking-[-1px] text-center">
        <p>
          Are you sure you want to level up <span className="text-gradient">“{item.name}”</span>?
        </p>
      </div>
      <div className="my-6 xs:my-7 2xs:my-8 flex items-center justify-center space-x-4">
        <div className="[--shape:_22px] xs:[--shape:_26px] 2xs:[--shape:_30px] p-[1px] bg-green-100 [clip-path:_polygon(var(--shape)_0%,100%_0,100%_calc(100%_-_var(--shape)),calc(100%_-_var(--shape))_100%,0_100%,0_var(--shape))] flex items-center justify-center size-[100px] xs:size-[115px] 2xs:size-[130px] min-w-[100px] xs:min-w-[115px] 2xs:min-w-[130px]">
          <ImageDevice
            className="w-full h-full [clip-path:_polygon(var(--shape)_0%,100%_0,100%_calc(100%_-_var(--shape)),calc(100%_-_var(--shape))_100%,0_100%,0_var(--shape))]"
            image={item.image}
            type=""
          />
        </div>
        <div className="space-y-3 xs:space-y-4">
          <div className="space-y-1 xs:space-y-2">
            <p className="font-mona text-white text-lg xs:text-xl 2xs:text-2xl !leading-[24px] xs:!leading-[26px] 2xs:!leading-[28px] font-semibold">
              {item.name}
            </p>
            {/* <p className="font-geist text-yellow-600 leading-[20px]">LV. {item.levelCurrent}</p> */}
          </div>
          <div className="space-y-1 xs:space-y-2 2xs:space-y-3 font-geist">
            <p className="tracking-[-1px] text-title uppercase text-[13px] xs:text-sm !leading-[18px]">
              GROWTH:
            </p>
            <div className="flex items-center space-x-1">
              <p className="text-[15px] xs:text-base 2xs:text-lg font-semibold text-green-700 !leading-[20px] 2xs:!leading-[24px]">
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
              <p className="text-[15px] xs:text-base 2xs:text-lg font-semibold text-green-700 !leading-[20px] 2xs:!leading-[24px]">
                LV.{' '}
                <span className="text-green-300 -ml-2">
                  {item.levelUpgrade || item.levelCurrent}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      {item.effectCurrent && item.rateEffect && (
        <div className="btn default cursor-default">
          <div className="btn-border"></div>
          <div className="btn-default !bg-white/5 !backdrop-blur-[8px]">
            <div className="flex items-center justify-center space-x-4 font-geist">
              <div className="flex items-center space-x-2">
                <IconUpDown
                  className={`size-5 xs:size-6 ${(item.effectCurrent + item.rateEffect) * 100 >= 100 ? 'text-green-500 drop-shadow-[0_0_8px_rgba(0,153,86,0.8)]' : 'text-[#E53935] rotate-180 drop-shadow-[0_0_8px_rgba(229,57,53,0.8)]'} `}
                />
                <p className="tracking-[-1px] text-title capitalize font-normal">
                  {item?.description}:
                </p>
              </div>
              <div className="flex items-center space-x-1">
                {/* <p className="text-lg font-semibold text-green-700 leading-[24px]">1%</p> */}
                <div className="w-[20px] overflow-hidden">
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
                <p className="text-[15px] xs:text-base 2xs:text-lg font-semibold text-green-300 !leading-[20px] 2xs:!leading-[24px]">
                  {item.effectCurrent && item.rateEffect
                    ? item.name === 'Data Analysis'
                      ? getBonusRate()
                      : `${formatNumber((item.effectCurrent + item.rateEffect) * 100, 0, 2)}%`
                    : null}
                </p>
              </div>
            </div>
          </div>
          <div className="btn-border"></div>
        </div>
      )}
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
                className={`flex items-center justify-center space-x-2 xs:space-x-3 2xs:space-x-4 text-[15px] 2xs:text-base ${disableBtn ? 'text-inactive' : 'text-green-900'}`}
                onClick={handleClick}
              >
                <span>{activeType === UPGRADE_TYPE.DEVICE ? 'Buy Now' : 'Level Up'}</span>
                {item.feeUpgrade || item.feePointUpgrade ? (
                  <div
                    className={`w-5 xs:w-6 2xs:w-[30px] h-[1px] ${disableBtn ? 'bg-inactive' : 'bg-green-800'}`}
                  ></div>
                ) : null}

                {item.feeUpgrade && (
                  <div className="flex items-center space-x-0.5 xs:space-x-1">
                    <IconThunder className="size-4 xs:size-5" />
                    <p className="font-geist font-semibold">{item.feeUpgrade}</p>
                  </div>
                )}

                {item.feePointUpgrade && (
                  <div className="flex items-center space-x-0.5 xs:space-x-1">
                    <IconPoint color className="size-4 xs:size-5" />
                    <p className="font-geist font-semibold">
                      {formatNumber(item.feePointUpgrade, 0, 0)}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="btn-border"></div>
          </>
        )}
      </div>
    </div>
  )
}
