import { formatNumber } from '@/helper/common'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import useCommonStore from '@/stores/commonStore'
import { IconPoint, IconThunder } from '@/app/components/icons'
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
  refInterval,
  handleAction
}: IUpgradeModal) {
  const userInfo = useCommonStore((state) => state.userInfo)
  const [timeCountdown, setTimeCountdown] = useState<Array<any>>([])
  const [amount, updateAmount] = useState<number>(1)
  const handleUpdateAmount = (value: number) => {
    if (value < 0 && amount + value < 1) {
      return
    }
    updateAmount(amount + value)
  }

  const handleClick = () => {
    if (activeType === UPGRADE_TYPE.DEVICE) {
      handleAction({
        code: item.code,
        number: amount
      })
    } else {
      if (!userInfo?.pointSkill) {
        return
      }
      handleAction(item.skillId)
      clearInterval(refInterval.current)
    }
  }

  const addPrefix = (number: number) => {
    if (number >= 10) {
      return number
    }
    return `0${number}`
  }
  const countdown = (timeEnd: number) => {
    const interval = () => {
      var now = new Date().getTime()

      // Find the distance between now and the count down date
      var distance = timeEnd - now

      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24))
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      var seconds = Math.floor((distance % (1000 * 60)) / 1000)

      // Display the result in the element with id="demo"
      const listTime = [addPrefix(hours), addPrefix(minutes), addPrefix(seconds)]

      if (days > 0) {
        listTime.unshift(addPrefix(days))
      }
      setTimeCountdown(listTime)

      if (distance <= 0) {
        clearInterval(refInterval.current)
        setTimeCountdown([])
      }
    }
    clearInterval(refInterval.current)
    interval()
    refInterval.current = setInterval(interval, 1000)
  }

  useEffect(() => {
    if (item.timeWaiting) {
      countdown(item.timeWaiting)
    }
  }, [])

  const totalAmount = amount * item.feePointUpgrade

  const disableBtn =
    activeType === UPGRADE_TYPE.SKILL &&
    (!userInfo?.pointSkill || item.levelCurrent === item.maxLevel)
  return (
    <div>
      <div className=" text-body text-base tracking-[-1px] text-center">
        {activeType === UPGRADE_TYPE.DEVICE ? (
          <p>Are you sure you want to buy more RAM?</p>
        ) : (
          <p>
            Are you sure you want to level up <span className="text-gradient">“{item.name}”</span>?
          </p>
        )}
      </div>
      <div className="my-8 flex items-center justify-center space-x-4">
        <div className="p-[1px] bg-green-100 [clip-path:_polygon(30px_0%,100%_0,100%_calc(100%_-_30px),calc(100%_-_30px)_100%,0_100%,0_30px)] flex items-center justify-center size-[130px] min-w-[130px]">
          <img
            className="w-full h-full [clip-path:_polygon(30px_0%,100%_0,100%_calc(100%_-_30px),calc(100%_-_30px)_100%,0_100%,0_30px)]"
            src="/assets/images/upgrade/upgrade-ram-2gb.png"
            srcSet="/assets/images/upgrade/upgrade-ram-2gb.png 1x, /assets/images/upgrade/upgrade-ram-2gb@2x.png 2x"
            alt=""
          />
        </div>
        <div className="space-y-2">
          <p className="font-mona text-white text-2xl font-semibold">{item.name}</p>
          {activeType === UPGRADE_TYPE.DEVICE ? (
            <p className="font-geist font-semibold text-green-600"></p>
          ) : (
            <p className="font-geist font-semibold text-yellow-600">LV. {item.levelCurrent}</p>
          )}
        </div>
      </div>
      <div className="relative w-fit mx-auto">
        <img className="mx-auto" src="/assets/images/action-frame.svg" alt="Frame" />
        <div className="absolute top-0 left-0 right-0 w-full h-full px-10 py-5 flex items-center justify-between">
          <div className="space-y-3 font-geist">
            <p className="tracking-[-1px] text-title uppercase">
              {activeType === UPGRADE_TYPE.DEVICE ? 'TOTAL PROFIT:' : `${item?.description}:`}
            </p>
            {activeType === UPGRADE_TYPE.DEVCIE ? (
              <div className="flex items-center space-x-2">
                <img
                  className="size-7"
                  src="/assets/images/point.png"
                  srcSet="/assets/images/point.png 1x, /assets/images/point@2x.png 2x"
                  alt="Point"
                />
                <div className="text-lg font-semibold text-primary">
                  {item.miningPower ? `${formatNumber(item.miningPower, 0, 0)}/h` : ''}
                </div>
              </div>
            ) : (
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
            )}
          </div>
          <div className="space-y-3 font-geist">
            <p className="tracking-[-1px] text-title uppercase">
              {activeType === UPGRADE_TYPE.DEVICE ? 'Amount:' : 'GROWTH:'}
            </p>
            {activeType === UPGRADE_TYPE.DEVICE ? (
              <div className="flex items-center space-x-6">
                <img
                  className="size-6 cursor-pointer"
                  src="/assets/images/icons/icon-minus-circle-green.svg"
                  alt="Icon Minus"
                  onClick={() => handleUpdateAmount(-1)}
                />
                <p className="text-lg font-semibold text-green-100">{amount}</p>
                <img
                  className="size-6 cursor-pointer"
                  src="/assets/images/icons/icon-plus-circle-green.svg"
                  alt="Icon Plus"
                  onClick={() => handleUpdateAmount(1)}
                />
              </div>
            ) : (
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
            )}
          </div>
        </div>
      </div>
      <div className={`btn mt-6 ${disableBtn ? 'inactive' : ''}`}>
        {activeType === UPGRADE_TYPE.SKILL && item.timeWaiting && timeCountdown.length > 0 ? (
          <div className="btn-default flex items-center justify-center !py-2.5 !px-3">
            <div className="min-h-6 xs:min-h-[28px]">
              {timeCountdown.length === 0 ? null : (
                <div className="flex items-center text-[15px] xs:text-base font-geist font-semibold text-title">
                  {timeCountdown.map((item: any, index) => (
                    <React.Fragment key={index}>
                      <p className="size-6 xs:size-[28px] flex items-center justify-center bg-white/10">
                        {item}
                      </p>
                      {index === timeCountdown.length - 1 ? null : <span>:</span>}
                    </React.Fragment>
                  ))}
                </div>
              )}
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
                    {formatNumber(totalAmount, 0, 0)}
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
